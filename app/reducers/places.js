import { SET_GEOCODING } from "../actions/places";

const initialState = {
    location: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_GEOCODING: {
            const { location } = action;
            return { 
                ...state,
                location
            }
        }
        default:
            return state;
    }
}

export const getLocations = state => state.location || {};