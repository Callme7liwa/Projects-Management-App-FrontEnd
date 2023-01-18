import instance from "./0-auth-header";
import { getLocalAccessToken, getLocalRefreshToken } from "./9-token.service";

import axios from "axios" ; 

const API_URL = "/users" ; 

const accessToken = localStorage.getItem("accessToken");


const getAllUsers = () => {
  console.log("here is all "  , getLocalAccessToken())
  return axios.get("/users/",{
    headers:{
      Authorization: 'Bearer ' + getLocalAccessToken(),
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'X-Requested-With':'XMLHttpRequest',
      "Authorization" : "Bearer "+accessToken,

    }
   });
}






export default {
    getAllUsers
}
