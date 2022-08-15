import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux'
import AuthEdit from '../Auth/AuthEdit'
import Authupdate from '../Auth/AuthUpdate'

const Edit=(props)=>{
    const [value, setValue] = useState('');
    const [errore, setErrore] = useState('');
    const [imageview, setImageview] = useState('');
    const [image,setImage]=useState('')
    const [slug, setSlug] = useState('');
    const [butn, setButn] = useState(false);
    const [state, setState] = useState({
        title: "",
        description: "",
        image: ""
    })
    const {id}=useParams()
    const dispatch = useDispatch()
     const { update,updatedata,post_errore,redirect } = useSelector(e => e.AuthReducer)
    const handletitle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        const createslug = e.target.value.trim().split(" ").join("-")
        setSlug(createslug)
    }
    const filehandle = (e) => {
        if (e.target.files.length !== 0) {
            setImage(e.target.files[0].name)
            setState({
                ...state,
                [e.target.name]: e.target.files[0]
            })
            
            console.log(e.target.files[0].name)
            const render = new FileReader()
            render.onloadend = () => {
                setImageview(render.result)
            }
            render.readAsDataURL(e.target.files[0])
            }

    }
    const slughandle = (e) => {
        setSlug(e.target.value)
        setButn(true)
    }
    const butnhandle = (e) => {
        e.preventDefault()
        setSlug(slug.trim().split(" ").join("-"))
        setButn(false)
    }
    const handledesc = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const UpdatePost=(e)=>{
        e.preventDefault()
        const form=new FormData()
        form.append("title",state.title)
        form.append("description",state.description)
        form.append("image",state.image)
        form.append("slug",slug)
        form.append("body",value)
        form.append("id",id)
        dispatch(Authupdate(form))
    }
    useEffect(() => {
        if(post_errore){
            setErrore(post_errore)
        }
        
        if(update){
            setState({
                title:updatedata[0].title,
                description:updatedata[0].description,
                image:updatedata[0].image,
            })
           setSlug(updatedata[0].slug)
           setValue(updatedata[0].body)
        }else{
            dispatch(AuthEdit(id))
        }
        if(redirect){
            setErrore("")
            props.history.push("/dashboard/1")
        }
        
    }, [redirect,updatedata,post_errore])
    
    return(
        <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Update Post</title>
            <link rel="canonical" href="http:// createPost.com" />
        </Helmet>
        <div className="container top">
            <div className="row">
                <div className="col-sm-6">
                    <div className="container p-3 my-3 border box">
                        <form >
                            <h3>Create a new post</h3>
                            <input type="text" name="title" placeholder="title" value={state.title} onChange={handletitle} class="form-control"></input>
                            <br />
                            <label htmlFor="image"  className=" btn btn-success butn">{imageview ? image :"Choose Image"}</label>
                            <input type="file" name="image"  class="form-control-file border choose" id="image" onChange={filehandle}></input>
                            <br />
                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                            <br />
                            <h3>Discription</h3>
                            <textarea name="description"
                                className="body"
                                rows='10'
                                placeholder="Post Decription"
                                maxLength="150"
                                defaultValue={state.description}
                                onChange={handledesc}
                            >
                            </textarea>
                            {state.description.length}
                        </form>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="container p-3 my-3 border box">
                        <form onSubmit={UpdatePost}>
                            <h3>Post URL</h3>
                            <input type="text" placeholder="post url" value={slug} onChange={slughandle} class="form-control"></input>
                            {butn ? <input type="submit" value="Update title" onClick={butnhandle} className=" btn btn-success butn" /> : ''}
                            <img className="img" src={imageview} />
                            <br />
                            <p className="text-danger">{errore}</p>
                            <input type="submit" value="Submit" className=" btn btn-success butn" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default Edit