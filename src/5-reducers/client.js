import { client } from "stompjs";
import { ADD_CLIENT, SAVE_CLIENT, SEARCH_CLIENT, SET_CLIENTS } from "../4-actions/1-types";

const initialState = {
    clients : []  , 
    clientsSearched : [] , 
}

export default function (state=initialState , action){
    const {type , payload} = action ; 
    switch(type)
    {
        case SET_CLIENTS : 
            return {
                ...state,
                clients:payload,
            }
        case SAVE_CLIENT : 
            console.log("clients",state.clients);
            var newClients = state.clients;
            console.log("clients",newClients);
            newClients.push(payload)
            return {
                ...state , 
                clients : newClients,
                clientsSearched : newClients
            }
        case SEARCH_CLIENT : 
            return {
                ...state,
                clientsSearched : state.clients.filter(client=>client.name.toLowerCase().includes(payload))
            }
        default : 
            return state ; 
    }
}