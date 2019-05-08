import {CHANGE_ADDRESS, CLEAR_ADD_LOCATION_OLD_DATA} from '../types/app/add-location';

const initialState = {
    addr: {
        address: ""
    }
};
export default function addLocationReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_ADDRESS:
            Object.assign({}, state, {
               addr: action.newState
            });
        case CLEAR_ADD_LOCATION_OLD_DATA:
            Object.assign({}, state, {
                addr: {
                    address: ""
                }
            });
        default:
            return state
    }

}