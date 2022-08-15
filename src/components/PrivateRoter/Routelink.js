import {useSelector} from 'react-redux'
import {Route,Redirect} from "react-router-dom"
const Routelink=(props)=>{
    const {user}=useSelector(e=>e.AuthReducer)
    return user ? <Redirect to="/dashboard/1"/> : <Route path={props.path} exactS component={props.component}  /> 
    
}
export default Routelink