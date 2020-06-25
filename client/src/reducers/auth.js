<<<<<<< HEAD
import { REGISTER_FAIL, REGISTER_SUCCESS,USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE, ACCOUNT_DELETED } from "../actions/types";
=======
import { REGISTER_FAIL, REGISTER_SUCCESS,USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from "../actions/types";
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialState, action){
    const { type, payload } = action;
    switch(type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case CLEAR_PROFILE:
<<<<<<< HEAD
        case ACCOUNT_DELETED:
=======
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false

            }
        default:
            return state;
    }
}