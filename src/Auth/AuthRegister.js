import axios from 'axios'

const AuthRegister = (state) => {
    return async(dispatch)=>{
        const config={
            headers:{
                "content-type":"application/json",
            }
        }
        dispatch({type:"Start",payload:""})
        try{
            const {data}=await axios.post("/register",state,config)
            localStorage.setItem("mytoken",data)
            dispatch({type:"End"})
            dispatch({type:"SET_TOKEN",payload:data})

        }catch(error){
            console.log(error.response.data);
            dispatch({type:"End"})
            dispatch({type:"REGISTER_ERRORS",payload:error.response.data})
            
        }
    }
}

export default AuthRegister
