import jwt_decode from "jwt-decode";

const initialState = {
    loading: false,
    register_errore: "",
    login_errore: "",
    post_errore: "",
    token: "",
    user: "",
    redirect: false,
    post: [],
    count: "",
    perpage: "",
    all_post: [],
    update:false,
    updatedata:[]
}
const varificationToken = (token) => {
    var decoded = jwt_decode(token);
    const expire = new Date(decoded.exp * 1000)
    if (new Date() > expire) {
        localStorage.removeItem(token)
        return null
    }
    else {
        return decoded
    }
}
const token = localStorage.getItem("mytoken")
if (token) {
    const decode = varificationToken(token)
    if (decode) {
        const { createUser } = decode
        initialState.token = token
        initialState.user = createUser
    }
}
const AuthReducer = (state = initialState, action) => {
    if (action.type === "Start") {
        return { ...state, loading: true, register_errore: action.payload, login_errore: action.payload, post_errore: action.payload }
    }
    else if (action.type === "End") {
        return { ...state, loading: false ,update:false}
    }
    else if (action.type === "REGISTER_ERRORS") {
        return { ...state, register_errore: action.payload }
    }
    else if (action.type === "LOGIN_ERRORS") {
        return { ...state, login_errore: action.payload }
    }
    else if (action.type === "POST_ERRORS") {
        return { ...state, post_errore: action.payload }
    }
    else if (action.type === "REDIRECT") {
        return { ...state, redirect: true }
    }
    else if (action.type === "REMOVE_REDIRECT") {
        return { ...state, redirect: false }
    }
    else if (action.type === "SET_TOKEN") {
        const decode = varificationToken(action.payload)
        const { createUser } = decode
        return { ...state, token: action.payload, user: createUser }
    }
    else if (action.type === "LOGOUT") {
        return { ...state, token: "", user: "" }
    }
    else if (action.type === "UPDATE") {
        return { ...state, update:true,updatedata:action.payload }
    }
    else if (action.type === "POST") {
        return { ...state, post: action.payload.response, count: action.payload.count, perpage: action.payload.perpage }
    }
    else if (action.type === "All_POST") {
        return { ...state, all_post: action.payload.response,count: action.payload.count, perpage: action.payload.perpage }
    }
    else {
        return state
    }
}
export default AuthReducer