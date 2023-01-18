import ClientService from "../3-services/4-client.service"
import {  SAVE_CLIENT, SEARCH_CLIENT, SET_CLIENTS, SET_MESSAGE } from "./1-types"



export const saveClient = (name,file) => (dispatch) => {
    ClientService
    .saveClient(name,file)
    .then((response) => {
        dispatch({
            type: SET_MESSAGE,
            payload: 'SUCCESS  , the client has been added succesfuly',
        });
        dispatch({
            type:SAVE_CLIENT , 
            payload : response.data
        });
    }
    )
    .catch((error)=>{
        if(error)
        {
            console.log("my error");
            console.log(error);
            dispatch({
                type: SET_MESSAGE,
                payload: 'ERROR  , the client cannot be added   , please try a gain ',
            });
        }
    })
    .finally(()=>console.log("data is loading"))
}

export const searchClient = (key) => (dispatch) => {
    console.log("the key" , key);
    dispatch({
        type:SEARCH_CLIENT,
        payload:key.toLowerCase()
    })
}

export const getClients = () => (dispatch) => {
    ClientService
        .getClients()
        .then((response)=>{
            dispatch({
                type:SET_CLIENTS,
                payload: response.data
            })
        })
        .catch((error)=>{console.log(error)})
        .finally((data) => {console.log("clients Data is loading ...")})
}

