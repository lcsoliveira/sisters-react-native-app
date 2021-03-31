import { combineReducers } from 'redux';
// import authReducer from "./auth";
import user, * as fromUserReducer from "./user"
import places, * as fromPlaces from "./places"


export default function rootReducer() {
    return combineReducers({
        user,
        places
        // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
    })
}


export const getUserContactcs = state => fromUserReducer.getUserContactcs(state.user);
export const getLocation = state => fromPlaces.getLocations(state.places);