import axios from 'axios'

const AuthHome = (page) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        dispatch({ type: "Start", payload: "" })
        try {
            const { data:{response,count,perpage} } = await axios.get(`/home/${page}`, config)
            dispatch({ type: "End" })
            dispatch({ type: "All_POST", payload:{response,count,perpage} })

        } catch (error) {
            console.log(error.response.data)
            dispatch({ type: "End" })
        }
    }
}
export default AuthHome