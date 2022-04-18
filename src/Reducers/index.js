import {combineReducers} from "redux";
import leads from './leads.js'
import auth from "./auth.js";
import receiveData from './receiveData'
export default combineReducers({
    leads,
    auth,
    receiveData,
});