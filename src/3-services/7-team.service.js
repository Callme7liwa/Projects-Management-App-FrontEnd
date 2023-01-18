import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

const API_URL = "/teams" ; 

const saveTeam = (employes) => {

    const journalistsId = employes.map(employe=>employe.id);
 
    return axios.post(API_URL , {journalistsId},{  
        headers: {
           "Content-Type": "application/json",
           "Authorization" : "Bearer "+accessToken,
         },
         cors:({
            origin: "http://localhost:3000",
         })}
    );
}

export  default {
    saveTeam ,
}