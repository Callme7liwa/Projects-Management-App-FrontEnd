import { SET_MESSAGE, CLEAR_MESSAGE } from "./1-types";

export const setMessage = (message)  => {
    return {
        type : SET_MESSAGE,
        payload:message 
    }
}

export const clearMessage = () => {
    return {
        type : CLEAR_MESSAGE , 
    }
}