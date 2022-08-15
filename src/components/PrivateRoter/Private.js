import {useSelector} from 'react-redux'
import {Route,Redirect} from "react-router-dom"
const Private=(props)=>{
    const {user}=useSelector(e=>e.AuthReducer)
    return user ? <Route path={props.path} exactS component={props.component}  /> :
    <Redirect to="/login"/>
}
export default Private