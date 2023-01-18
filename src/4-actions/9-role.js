import rolesService from "../3-services/10-roles.service";
import { SET_ROLES } from "./1-types";


export const getRoles = () => (dispatch) =>{
    rolesService
    .getRoles()
    .then((response)=>{
       dispatch({
        type:SET_ROLES , 
        payload:response.data
       })
    })
    .catch((error)=>console.log("error when catching roles data" , error))
    .finally(()=>console.log("role is loading"));
}

export const getRoleByName = (name) => (dispatch)=> {
    rolesService
    .getRoleByName(name)
    .then((response)=>{
        console.log(response)
    })
    .catch((error)=>console.log("error when catching role by name  data" , error))
    .finally(()=>console.log("role by name  is loading"));
}
export const saveRole = (name) => (dispatch)=>{
    rolesService
    .getRoleByName(name)
    .then((response)=>{
        console.log(response)
    })
    .catch((error)=>console.log("error when catching role by name  data" , error))
    .finally(()=>console.log("role by name  is loading"));
}