import TeamService from "../3-services/7-team.service"
import { CLEAR_TEAM, SAVE_TEAM, SET_NEW_TEAM, SET_TEAM } from "./1-types";



export const  saveTeam = (employes) => (dispatch) =>{
    TeamService
    .saveTeam(employes)
    .then((response)=>{
        console.log("my response " , response);
        dispatch(
            {
                type:SET_NEW_TEAM, 
                payload:response.data
            }
        )
    })
    .catch((error) => console.log(error))
    .finally(()=>console.log("saving is loading"))
}

export const clearTeam  = () => (dispatch) => {
    dispatch({
        type:CLEAR_TEAM
    })
}