import instance from "./0-auth-header";

const accessToken = localStorage.getItem("accessToken");


const API_URL = "/functions";

const getFunctions = () => {
    return instance.get(API_URL, {
        headers : {
            "Content-Type" : "Application/json",
            "Authorization" : "Bearer "+accessToken,
        }
    });
}

const saveFunction = (data) => {
    let formData = new FormData();
    formData.append("functionName",data)
    return instance.post(API_URL  , formData , {
        headers : {
            "Content-Type" : "Application/json",
            "Authorization" : "Bearer "+accessToken,
        }
    });
}

export default {
    getFunctions , 
    saveFunction , 
}