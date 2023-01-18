import TaskService from "../3-services/6-task.service"
import { ADD_TASK, SEARCH_TASK, SET_CURRENT_USER_OF_TASK, SET_TASKS } from "./1-types"


export const getTasks = () => async (dispatch) => {
    await TaskService
        .getTaches()
        .then((response)=>{
            dispatch({
                type:SET_TASKS  , 
                payload:response.data
            })
        })
        .catch((error)=>{console.log("Error while getting list of task from data base")})
        .finally(()=>{console.log("list of task are loading from database ")})
}

export const saveTask = (name) => async (dispatch) => {
    TaskService
    .saveTache(name)
    .then((response)=>{
        console.log("tesponse " , response.data);
        dispatch({
            type:ADD_TASK,
            payload:response.data
        })
    })
    .catch((error)=>console.log("erreur lors de la creation : " , error))
    .finally(()=>console.log("en cours"));
}

export const searchTask = (key) =>  (dispatch) => {
    dispatch({
        type:SEARCH_TASK , 
        payload:key
    })
}

export const setCurrentUserOfTheTask = (user) => (dispatch) => {
    dispatch({
        type:SET_CURRENT_USER_OF_TASK  , 
        payload : user 
    })
}

