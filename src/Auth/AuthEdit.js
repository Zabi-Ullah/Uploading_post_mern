import axios from 'axios'

const AuthEdit=(id)=>{
    return async(dispatch,getState)=>{
        const {AuthReducer:{token}}=getState()
        const config={
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        dispatch({type:"Start",payload:""})
        try{
            const {data}=await axios.get(`/edit/${id}`,config)
            dispatch({type:"UPDATE",payload:data})
            dispatch({type:"End"})
            
        }catch(error){
            console.log(error)
            dispatch({type:"End"})
        }
    }
}
export default AuthEdit