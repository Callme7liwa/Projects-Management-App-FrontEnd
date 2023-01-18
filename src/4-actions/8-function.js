import FunctionService from "../3-services/5-function.service"
import { ADD_FUNCTION, SET_FUNCTIONS } from "./1-types"


export const getAllFunctions = () => (dispatch) => {
     FunctionService
            .getFunctions()
            .then((response)=>{
                dispatch({
                    type:SET_FUNCTIONS,
                    payload:response.data
                });
            })
            .catch((error)=>console.log("erreur : get all functions =>",error))
            .finally(console.log(" "));
}

export const saveFunction = (data) => (dispatch) => {

    FunctionService
        .saveFunction(data)
        .then((response)=>{
            console.log(response);
                dispatch({
                    type:ADD_FUNCTION,
                    payload:response.data
                });
        })
        .catch((error)=>console.log("error save function => " , error))
        .finally(()=>console.log("working to save the function ! "));

}

