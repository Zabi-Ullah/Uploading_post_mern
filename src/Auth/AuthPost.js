import axios from 'axios'

const AuthPost=(state)=>{
    return async(dispatch,getState)=>{
        const {AuthReducer:{token}}=getState()
        const config={
            headers:{
                Authorization:`Bearer ${token}`,
            },
        }
        dispatch({type:"Start",payload:""})
        try{
            const {data}=await axios.post("/create_post",state,config)
            dispatch({type:"End"})
            dispatch({type:"REDIRECT"})
        }catch(error){
            console.log(error.response.data)
            dispatch({type:"End"})
            dispatch({type:"POST_ERRORS",payload:error.response.data})
        }
    }
}
export default AuthPost