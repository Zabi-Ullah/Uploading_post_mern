import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const NavBar = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(e => e.AuthReducer)
    const logout = () => {
        localStorage.removeItem("mytoken")
        dispatch({ type: "LOGOUT" })
    }
    const link=user ? <div>
        <ul className="navbar-nav ">
            <li className="nav-item ">
                <Link className="nav-link link" to="/dashboard/1" >{user.name}</Link>
            </li>
            <li className="nav-item">
                    <Link className="nav-link link" to="/home/1">Home</Link>
                </li>
            <li className="nav-item">
                <Link className="nav-link link" to="/createPost">Create Post</Link>
            </li>
            <li className="nav-item">
            <button onClick={logout} className="nav-link btn link" >Logout</button>
            </li>
        </ul>
    </div> :
        <div>
            <ul className="navbar-nav ">
                <li className="nav-item">
                    <Link className="nav-link link" to="/home/1">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link" to="/login">Login</Link>
                </li>
            </ul>
        </div>
    return (
        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container">
                    <a className="navbar-brand" to="#"><img className="logo" src="/Image/logo.png" /></a>
                    {link}
                </div>
            </nav>

        </>
    )
}
export default NavBar