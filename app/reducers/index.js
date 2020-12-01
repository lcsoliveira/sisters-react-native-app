import { combineReducers } from 'redux';
import authReducer from "./auth";
import user from "./user"


export default function rootReducer() {
    return combineReducers({
        user
        // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
    })
}

