import { CLEAR_VARIABLE_IMAGE, SET_IMAGE_VARIABLE } from "../4-actions/1-types"

const initialState = {
    image : null 
}

export default function(state = initialState , action )
{
    const {type , payload} = action 

    switch(type)
    {
        case SET_IMAGE_VARIABLE  : {
            return {
                ...state , 
                image : payload
            }
        }
        case CLEAR_VARIABLE_IMAGE  : {
            return {
                ...state , 
                image : null
            }
        }
        default : 
            return {
                ...state
            }
    }
}