import CategoryService from "../3-services/11-category.service"
import { SAVE_CATEGORY, SET_CATEGORIES, SET_MESSAGE } from "./1-types"


export const getCategories = () => (dispatch) => {
    CategoryService
    .getCategories()
    .then((response=>{
        dispatch({
            type:SET_CATEGORIES,
            payload:response.data
        })
    }))
}

export const saveCategory = (categoryName) => (dispatch) => {

    CategoryService
    .saveCategory(categoryName)
    .then((response)=>{
         dispatch({
                type: SET_MESSAGE,
                payload: 'SUCCESS  , the category has been   added succesfuly  ! ',
        });
        dispatch({
            type : SAVE_CATEGORY , 
            payload : response.data.response
        })
    })
    .catch((error)=>{ 
        if(error)
        {
            console.log("my error");
            console.log(error);
            dispatch({
                type: SET_MESSAGE,
                payload: 'ERROR  , the category cannot be added   , please try a gain ',
            });
        }
    }) 
    .finally(()=>console.log("category is saving ..."))
}