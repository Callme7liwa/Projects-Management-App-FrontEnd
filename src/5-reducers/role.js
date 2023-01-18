import { SET_ROLES } from "../4-actions/1-types";

const initialState = {
    roles:[]
}

export default function (state=initialState , action)
{
    const {type , payload} = action ; 
    switch(type)
    {
        case SET_ROLES : 
        return {
            roles : [...payload]
        }
        default : return {
            ...state
        }
    }
}