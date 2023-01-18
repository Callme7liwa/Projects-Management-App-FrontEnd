import instance from "./0-auth-header";
import axios from "axios";

const API_URL = "/taches";
const accessToken = localStorage.getItem("accessToken");



const getTaches = () => {
    return instance.get(API_URL, {
        headers : {
            "Content-Type" : "Application/json",
            "Authorization" : "Bearer "+accessToken,
        }
    });
}

const saveTache = (request) => {
    let formData = new FormData();
    formData.append("name" , request);
    return axios.post(API_URL , formData,{  
     headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer "+accessToken,
      },
      cors:({
         origin: "http://localhost:3000",
      })}
    );
}



export default {
    getTaches,
    saveTache
}


// const loadTasks = useCallback(async () => {
//     dispatch(getProject(id));
//     dispatch(getTasks())
//   }, [tasks]) 

// //   useEffect(()=>{
// //     dispatch(getProject(id));
// //     dispatch(getTasks());
// //   },[id])

// // useEffect(()=>{
// //     loadTasks();
// // },[loadTasks]);