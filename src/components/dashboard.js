import { useState, useEffect } from 'react'
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux'
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import AuthGetdata from '../Auth/AuthGetdata'
import { Link, useParams } from "react-router-dom";
import Pagination from './Pagination'
import Moment from 'react-moment';
import AuthDelete from '../Auth/AuthDelete'


const Dashboard = () => {
    const { loading, redirect, user: { _id } } = useSelector(e => e.AuthReducer)
    let { page } = useParams()
    if (page === undefined) {
        page = 1
    }
    const { post, count, perpage } = useSelector(e => e.AuthReducer)
    const [seepost, setSeepost] = useState(false)
    const dispatch = useDispatch()
    const deletepost = (id) => {
        const confirm = window.confirm("What you are delete the post")
        if (confirm) {
            dispatch(AuthDelete(id))
            dispatch(AuthGetdata(_id, page))
        }
    }
    useEffect(() => {
        dispatch(AuthGetdata(_id, page))
        if (redirect) {
            dispatch({ type: "REMOVE_REDIRECT" })
        }
        if (loading) {
            setSeepost(true)
        }
        else {
            setSeepost(false)
        }
    }, [_id, page, dispatch])
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard</title>
                <link rel="canonical" href="http:// dashboard.com" />
            </Helmet>
            <div className="container">
                {seepost ? <div className="spinner-border process text-success"></div> :
                    <div className="posts">
                        {post.map(posts => (
                            <div className="post">
                                <div>
                                    <Link className="text-body item">{posts.title}</Link><br />
                                    <Moment className="date" format="YYYY/MM/DD">{posts.createdAt}</Moment>
                                </div>
                                <div className="icon">
                                    <Link to={`/edit/${posts._id}`}><BsPencil class="pencil" /></Link>
                                    <BsFillTrashFill onClick={() => deletepost(posts._id)} class="del" />
                                </div>
                            </div>
                        ))}
                        <Pagination page={page} count={count} perpage={perpage} />
                    </div>
                }

            </div>
        </>
    )
}
export default Dashboard