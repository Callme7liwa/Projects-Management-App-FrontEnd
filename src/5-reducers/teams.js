import { SET_CLIENTS } from "../4-actions/1-types";

const initialState = {
    clients : null 
}

export default function (state=initialState , action){
    const {type , payload} = action ; 
    switch(type)
    {
        case SET_CLIENTS : 
            return {
                ...state,
                clients:payload,
            }
        default : 
            return state ; 
    }
}