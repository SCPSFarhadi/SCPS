import {combineReducers} from "redux";
import leads from './leads.js'
import auth from "./auth.js";
export default combineReducers({
    leads,
    auth
});