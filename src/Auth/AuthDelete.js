import axios from 'axios'

const AuthDelete=(id)=>{
    return async(dispatch,getState)=>{
        const {AuthReducer:{token}}=getState()
        const config={
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        dispatch({type:"Start",payload:""})
        try{
            const {data}=await axios.get(`/delete/${id}`,config)
            console.log(data)
            dispatch({type:"End"})
            
        }catch(error){
            console.log(error)
            dispatch({type:"End"})
        }
    }
}
export default AuthDelete