
import instance from "./0-auth-header";
import axios  from "axios";

const accessToken = localStorage.getItem("accessToken");


const URL_CONSTANTE = "journalistes" ;



const  getEmployes = () => {
    return instance
            .get(URL_CONSTANTE , {
                headers : {
                    "Authorization" : "Bearer "+accessToken,
                }
            });
}

const getProjects = (id) => {
    return instance.get(
        URL_CONSTANTE+`/getAffectations/${id}`, {
            headers : {
                "Authorization" : "Bearer "+accessToken,
            }
        }
    );
}

const getTeams = (id) => {
    return instance.get(
        URL_CONSTANTE+`/getTeams/${id}`, {
            headers : {
                "Authorization" : "Bearer "+accessToken,
            }
        }
    )
}


export default {
    getEmployes , 
    getProjects , 
    getTeams , 
}