import { CLEAR_MESSAGE, SET_MESSAGE } from "../4-actions/1-types";

const initialState = {
    message:''
};

export default function (state=initialState,action) {

    const {type,payload} = action ; 

    switch(type)
    {
        case SET_MESSAGE : 
            return {message:payload};
        
        case CLEAR_MESSAGE:
            return {message : ""};
        
        default :
            return state ; 

    }
}