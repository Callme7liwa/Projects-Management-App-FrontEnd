import { CLEAR_TEAM, SET_NEW_TEAM, SET_TEAM, SET_TEAMS } from "../4-actions/1-types"


const initialState = {
    currentTeam : null ,
    teams : null ,
    team : {
        info : null  , 
        projects  : [],
    },
}


export default function (state = initialState , action )
{
    const {type, payload} = action ; 

    switch(type)
    {
        case SET_TEAMS : 
            return {
                ...state , 
                teams:payload
            }
        case SET_TEAM : 
            return {
                state
            }
        case SET_NEW_TEAM :
            return {
                ...state , 
                currentTeam:payload
            }
        case CLEAR_TEAM : 
            return {
                ...state , 
                currentTeam:null
            }
        default :
            return state ;
        
    }
        
}