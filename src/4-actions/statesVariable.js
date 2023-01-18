import { CLEAR_VARIABLE_IMAGE, SET_IMAGE_VARIABLE } from "./1-types"

export const setVariableImage = (image) => (dispatch) => {

    dispatch({
        type : SET_IMAGE_VARIABLE  , 
        payload : image 
    })
}

export const clearVariableImage = () => (dispatch) => {
    dispatch({
        type : CLEAR_VARIABLE_IMAGE
    })
}