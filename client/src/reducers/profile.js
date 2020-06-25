<<<<<<< HEAD
import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILES, GET_REPOS } from "../actions/types";
=======
import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE } from "../actions/types";
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error:{}
}
export default function(state = initialState, action){
    const { type, payload } = action;
    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
<<<<<<< HEAD
        case GET_PROFILES:
            return {
                ...state,
                profiles:payload,
                loading:false
            }
=======
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
<<<<<<< HEAD
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        default:
            return state
=======
        default:
            return {
                state
            }
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5
    }
}