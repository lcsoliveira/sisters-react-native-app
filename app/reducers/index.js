import { combineReducers } from 'redux';
// import authReducer from "./auth";
import user, * as fromUserReducer from "./user"


export default function rootReducer() {
    return combineReducers({
        user
        // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
    })
}


export const getUserContactcs = state => fromUserReducer.getUserContactcs(state.user);