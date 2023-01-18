import { ADD_FUNCTION, SET_FUNCTIONS } from "../4-actions/1-types";

const initialState = {
    fonctions : null 
}

export default function (state = initialState , action )
{
    const {type , payload} = action ; 

    switch(type)
    {
        case SET_FUNCTIONS :
            return {
                ...state,
                fonctions:[...payload]
            }
        case ADD_FUNCTION :
            return {
                ...state , 
                fonctions : [...state.fonctions , payload]
            }
        default:
            return state ; 
    }
}