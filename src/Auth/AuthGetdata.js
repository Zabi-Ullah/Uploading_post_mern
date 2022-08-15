import axios from 'axios'

const AuthGetdata=(id,page)=>{
    return async(dispatch,getState)=>{
        const {AuthReducer:{token}}=getState()
        const config={
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        dispatch({type:"Start",payload:""})
        try{
            const {data:{response,count,perpage}}=await axios.get(`/userdata/${id}/${page}`,config)
            dispatch({type:"End"})
            dispatch({type:"POST",payload:{response,count,perpage}})
            
        }catch(error){
            console.log(error)
            dispatch({type:"End"})
        }
    }
}
export default AuthGetdata