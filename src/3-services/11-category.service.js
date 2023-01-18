import axios from "axios";
import instance from "./0-auth-header"


const accessToken = localStorage.getItem("accessToken");

const API_BASE = "/categories"


const saveCategory = (name) => {
    let formData = new FormData();
    formData.append("name" , name) ; 
    return axios.post(API_BASE  , formData);
}

const getCategories = () => {
    return axios.get(API_BASE ,{
        headers : {
            "Content-type" : "Application/json",
            "Authorization" : "Bearer "+accessToken,

        }
    });
}

const getCategoryById = (name) => {
    return instance.get(API_BASE+`/${name}`,{
        headers : {
            "Content-type" : "Application/json",
            "Authorization" : "Bearer "+accessToken,

        }
    });
}

const getCategoryByName = (name) => {
    return instance.get(API_BASE+`/${name}`,{
        headers : {
            "Content-type" : "Application/json",
            "Authorization" : "Bearer "+accessToken,

        }
    });
}

export default  {
    saveCategory , 
    getCategories , 
    getCategoryByName,
    getCategoryById
}