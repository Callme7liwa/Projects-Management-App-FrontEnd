import instance from "./0-auth-header"

const accessToken = localStorage.getItem("accessToken");

const API_BASE = "/roles"


const saveRole = (name) => {
    let formData = new FormData();
    formData.append("name" , name);
    return instance.post(API_BASE  , formData ,{
        headers : {
            "Content-type" : "Application/json",
            "Authorization" : "Bearer "+accessToken,

        }
    });
}

const getRoles = () => {
    return instance.get(API_BASE ,{
        headers : {
            "Content-type" : "Application/json",
            "Authorization" : "Bearer "+accessToken,

        }
    } );
}

const getRoleByName = (name) => {
    let formData = new FormData();
    formData.append("name" , name);
    return instance.get(API_BASE+"/name" , formData ,{
        headers : {
            "Content-type" : "Application/json",
            "Authorization" : "Bearer "+accessToken,

        }
    });
}

export default  {
    saveRole , 
    getRoles , 
    getRoleByName
}