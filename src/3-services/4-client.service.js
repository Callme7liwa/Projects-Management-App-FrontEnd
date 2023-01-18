import instance from "./0-auth-header"

const accessToken = localStorage.getItem("accessToken");


const API_BASE = "/clients"


const saveClient = (name , file) => {
    let formData = new FormData();
    formData.append("name" , name) ; 
    if(file!==null)
    formData.append("file" , file);
    return instance.post(API_BASE  , formData, {
        headers : {
            "Content-Type" :"application/json",
            "Authorization" : "Bearer "+accessToken,
        }
    });
}

const getClients = () => {
    return instance.get(API_BASE , {
        headers : {
            "Authorization" : "Bearer "+accessToken,
        }
    });
}

const getClient = (id) => {
    return instance.get(API_BASE+`/${id}`, {
        headers : {
            "Authorization" : "Bearer "+accessToken,
        }
    });
}

export default  {
    saveClient , 
    getClients , 
    getClient
}