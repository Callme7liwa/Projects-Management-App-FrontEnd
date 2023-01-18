import { SAVE_CATEGORY, SET_CATEGORIES } from "../4-actions/1-types";


const initialState = {
    categories : [] 
}

export default function(state = initialState , action)
{
    const {type , payload} = action ; 

    switch(type)
    {
        case SET_CATEGORIES : 
        return {
            ...state  ,
            categories : [...payload]
        }
        case SAVE_CATEGORY : 
            return {
                ...state , 
                categories : [payload , ...state.categories]
            }
        default : 
        return {
            ...state
        }
    }
}