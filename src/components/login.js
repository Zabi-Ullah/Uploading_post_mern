import React,{ useState,useEffect } from "react";
import { Helmet } from "react-helmet";
import {useDispatch,useSelector} from 'react-redux'
import AuthLogin from "../Auth/AuthLogin";


const Login = () => {
    const [error,setError]=useState("")
    const [state, setState] = useState({
        email:"",
        password:""
    })
    const setvalue=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    const {loading,login_errore}=useSelector(e=>e.AuthReducer)
    
    
    const dispatch = useDispatch()
    const submitForm=async(e)=>{
        e.preventDefault()
        dispatch(AuthLogin(state))
    }
    useEffect(() => {
        if(login_errore){
            setError(login_errore)
        }
        else{
            setError("")
        }
      },[login_errore]);
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <link rel="canonical" href="http:// login.com" />
            </Helmet>
            <div className="container regis">
                <h1>Login</h1>
                <form onSubmit={submitForm} className="was-validated">
                    <div class="form-group">
                        <label for="uname">Email:</label>
                        <input type="email" class="form-control" placeholder="Enter Email" 
                        name="email" value={state.email} onChange={setvalue} required />
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" class="form-control" placeholder="Enter password"
                        name="password" value={state.password} onChange={setvalue} required />
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <p className="text-danger">{error}</p>
                    <button type="submit"  class="btn btn-primary mb-2">{loading ? "..." : "Submit"}</button>
                </form>
            </div>
        </>
    )
}

export default Login
