import {CHANGE_ADDRESS, CLEAR_ADD_LOCATION_OLD_DATA} from "../types/app/add-location";

export function changeAddress(newState) {
    return {type: CHANGE_ADDRESS, newState}
}
export function clearAddLocationOldData() {
    return {type: CLEAR_ADD_LOCATION_OLD_DATA}
}