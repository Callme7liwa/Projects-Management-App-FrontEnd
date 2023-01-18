import { ADD_TASK, SEARCH_TASK, SET_CURRENT_USER_OF_TASK, SET_TASKS } from "../4-actions/1-types";

const initialState = {
    tasks : null  , 
    currentUser : null ,
    tasksSearched : []
}

export default function (state = initialState , action)
{
    const {type , payload} = action ; 
    switch(type)
    {
        case SET_TASKS : 
            return {
                ...state , 
                tasks:payload
            }
        case ADD_TASK :
        const arrayOftask = [...state.tasks]; 
        arrayOftask.push(payload);
            return {
                ...state , 
                tasks:arrayOftask
            }
        case SET_CURRENT_USER_OF_TASK : 
            return {
                ...state , 
                currentUser:payload
            }
        case SEARCH_TASK :
            return {
                ...state , 
                tasksSearched : state.tasks.filter(task=>task.name.includes(payload))
            }
        default :
            return state ; 
    }
}