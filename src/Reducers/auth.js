import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from '../Actions/types.js';
import {b64_to_utf8} from "./base64";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
};

export default function (state = initialState, action) {
    function getUserInfo() {
        let refresh_token = action.payload['refresh'];
        let user_payload = refresh_token.split('.')[1];
        user_payload = JSON.parse(b64_to_utf8(user_payload))

        localStorage.setItem('username', user_payload.user_name);
        localStorage.setItem('role', user_payload.role);
    }

    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            getUserInfo();
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case LOGIN_SUCCESS:

            localStorage.setItem('token',action.payload['refresh']);
            getUserInfo();
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };

        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        default:
            return state;
    }
}