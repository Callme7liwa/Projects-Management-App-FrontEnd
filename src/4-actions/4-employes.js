
import EmployeService from "../3-services/3-employe.service"
import { CLEAR_SEARCH_EMPLOYES, SEARCH_ADMINS, SEARCH_CHEF, SEARCH_EMPLOYES, SEARCH_SIMPLE, SET_ADMINS, SET_CHEF_PROJECTS, SET_EMPLOYES , SET_SIMPLE_EMPLOYES } from "./1-types"



export const getEmployes = () => (dispatch) => {
    EmployeService
    .getEmployes()
    .then((response)=>{
        dispatch({
            payload:response.data,
            type:SET_EMPLOYES
        })
        dispatch({
            type:SET_CHEF_PROJECTS 
        })
        dispatch({
            type:SET_SIMPLE_EMPLOYES
        })
        dispatch({
            type:SET_ADMINS
        })
    })
    .catch((error)=>{console.log(error)})
    .finally(data=>{console.log("employees are loading ...")})
}

export const searchEmployes = (value) => (dispatch) => {
    dispatch({
        type:SEARCH_EMPLOYES,
        payload:value.toLowerCase()
    })
}

export const searchAdmins = (value) => (dispatch) => {
    dispatch({
        type:SEARCH_ADMINS , 
        payload  : value.toLowerCase()
    })
}

export const searchChef = (value) => (dispatch) => {
    dispatch({
        type:SEARCH_CHEF , 
        payload : value.toLowerCase()
    })
}

export const searchSimple = (value) => (dispatch) => {
    dispatch({
        type : SEARCH_SIMPLE  , 
        payload : value.toLowerCase()
    })
}

export const clearEmployesSearched = () => (dispatch) => {
    dispatch({
        type: CLEAR_SEARCH_EMPLOYES  ,
    })
}

export const getChefProjects = () => (dispatch) => {
    dispatch({
        type : SET_CHEF_PROJECTS,
    })
}

export const getSimpleUsers = () => (dispatch) => {
    dispatch({
        type : SET_CHEF_PROJECTS,
    })
}



export const getProjectsEmploye = () => (dispatch) => {
    EmployeService
    .getProjects()
    .then((response)=>{})
    .finally(()=>{console.log("data is loading")});
}

