import { useState, useEffect } from 'react'

import { Helmet } from "react-helmet";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux'
import AuthPost from '../Auth/AuthPost'

const CreatePost = (props) => {
    const [value, setValue] = useState('');
    const [errore, setErrore] = useState('');
    const [imageview, setImageview] = useState('');
    const [image, setImage] = useState('');
    const [slug, setSlug] = useState('');
    const [butn, setButn] = useState(false);
    const [state, setState] = useState({
        title: "",
        description: "",
        image: ""
    })
    const dispatch = useDispatch()
    const { user: { _id, name }, post_errore,redirect } = useSelector(e => e.AuthReducer)
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
    const postCreated = async (e) => {
        e.preventDefault()
        const { title, description, image } = state
        let formdata = new FormData()
        formdata.append("title", title)
        formdata.append("body", value)
        formdata.append("image", image)
        formdata.append("description", description)
        formdata.append("slug", slug)
        formdata.append("name", name)
        formdata.append("id", _id)
        dispatch(AuthPost(formdata))
    }
    useEffect(() => {
        if (post_errore) {
            setErrore(post_errore)
        }
        else {
            setErrore("")
        }
        
        if(redirect){
            props.history.push("/dashboard/1")
        }
    }, [post_errore,redirect])
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Create Post</title>
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
                                <label htmlFor="image"  className=" btn btn-success butn">{image ? image :"Choose Image"}</label>
                                <input type="file" name="image" class="form-control-file border choose" id="image" onChange={filehandle}></input>
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
                            <form onSubmit={postCreated}>
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
export default CreatePost