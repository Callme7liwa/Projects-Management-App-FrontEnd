import TokenService, { getLocalAccessToken, getLocalRefreshToken } from "./9-token.service"
import axios from "axios";
import { json } from "body-parser";



const instance = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": getTokenValue() + "hello world"
    },
    // cors:({
    //    origin: "http://localhost:3000",
    // })
    
});





export default instance ; 