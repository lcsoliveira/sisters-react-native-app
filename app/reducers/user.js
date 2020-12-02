import { ADD_CONTACTS } from "../actions/user";

const initialState = {
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_CONTACTS: {
            const { user } = action;
            return { 
                ...state,
                user
            }
        }
        default:
            return state;
    }
}

export const getUserContactcs = state => state.user?.contacts || {};