import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMidlleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import AuthReducer from './reducer/authReducer'
const rootReducer=combineReducers({
    AuthReducer,
})
const middlware=[thunkMidlleware]
const Store=createStore(rootReducer,
    composeWithDevTools(applyMiddleware(...middlware)))
export default Store
