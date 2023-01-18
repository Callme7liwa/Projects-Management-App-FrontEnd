import axios from "axios";
import instance from "./0-auth-header"

const URL_API = "/projects";

const accessToken = localStorage.getItem("accessToken");


const getProjects = () => {
    return instance.get(URL_API , {
        headers : {
            "Authorization" : "Bearer "+accessToken
        }
    });
}

const getProject = (id) => {
    return axios.get(URL_API+"/"+id, {
        headers : {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken

        }
    }
    )
}


const saveListTasksToProject = (id , taches) => {
    // return instance.put(URL_API+"/addTachesToProjesct/"+id ,request) ; 
    // // axios.put(URL_API + "/addTachesToProject/"+id , request);
    // return instance.put(URL_API+`/addTachesToProjesct${id}`,request);
    console.log({taches});
    const formData = new FormData ();
    return axios.post(URL_API+`/addTachesToProject/${id}` , {taches},{  
        headers: {
           "Content-Type": "application/json",
           "Authorization" : "Bearer "+accessToken

         },
        //  cors:({
        //     origin: "http://localhost:3000",
        //  })
        }
       );

}

const affecterTach = (journalistId , tachName , id) => {
    // return instance.put(URL_API+"/addTachesToProjesct/"+id ,request) ; 
    // // axios.put(URL_API + "/addTachesToProject/"+id , request);
    // return instance.put(URL_API+`/addTachesToProjesct${id}`,request);
    return axios.post(URL_API+`/affecterTach/${id}` , {journalistId , tachName},{  
        headers: {
           "Content-Type": "application/json",
           "Authorization" : "Bearer "+accessToken

         },
     
        }
       );

}

const saveProject = (project) => { 

    console.log("in service" ,project)
    return axios.post(URL_API  , project,{  
        headers: {
           "Content-Type": "application/json",
           "Authorization" : "Bearer "+accessToken

         },
        }
       );   
}

const changeStatusOfTask = (projectId , tachName , status) => {

    const formData = new FormData ();
    formData.append("tachName" , tachName );
    formData.append("status" , status) ; 
    return axios.post(URL_API + "/changeStatusOfTask/"+projectId , formData , {
        headers : {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken

        }
    })
    
}

const addMember = (projectId , journalistId) => {
    const formData = new FormData();
    formData.append("employe" , journalistId);
    return axios.post(URL_API+"/addMember/"+projectId , formData , {
        headers : {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken

        }
    }); 
}

const addProjectChef = (projectId , journalistId) => {
    const formData = new FormData();
    formData.append("user" , journalistId);
    return axios.post(URL_API+"/addProjectChef/"+projectId , formData , {
        headers : {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken

        }
    })
}

const addClient = (projectId , clientName) => {
    let formData = new FormData();
    formData.append("client" , clientName);
    return axios.post(URL_API+"/addClient/"+projectId , formData , {
        headers : {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken

        }
    })
}

const addCategoryToProject = (projectId , categoryName) => {
    let formData = new FormData ();
    formData.append("category" , categoryName);
    return axios.post(URL_API+"/addCategory/"+projectId , formData, {
        headers : {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken

        }
    })
}

const changeStatusTask = (id , taskName , status) => {
    let formData = new FormData();
    formData.append("tachName" , taskName);
    formData.append("status" , status);
    return axios.post(URL_API + "/changeStatusOfTask/"+id , formData , {
        headers : {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken
        }
    })
}

const removeTaskFromProject = (projectId , tachName) => {
    let formData = new FormData ();
    formData.append("task",tachName);
    return axios.post(URL_API+"/removeTask/"+projectId , formData, {
        headers : {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken
        }
    });
}

const onAccepteUser = (project , journalist) => {
    let formData = new FormData();
    formData.append("employe", journalist.id);
    return axios.post(URL_API + "/acceptMember/"+project.id , formData, {
        headers : {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken
        }
    });
}

const onRejectUser = (project , journalist) => {
    let formData = new FormData();
    formData.append("employe", journalist.id);
    return axios.post(URL_API + "/rejectMember/"+project.id , formData, {
        headers : {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken
        }
    });
}

const validateProject = (project) => {
    return axios.post(URL_API + "/validerProject/"+project.id, {
        headers : {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken
        }
    })
}

const removeProject = (project) => {
    return axios.post(URL_API+"/"+project.id,{
        headers : {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken
        }
    })
}

const removeEmployeFromTeam = (project , journalist) =>{
    let formData = new FormData();

    formData.append("employe" , journalist.id);
    return axios.post(URL_API + "/deleteMember/" + project.id,formData , {
        headers : {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken
        }
    }) ;
}

export default {
    getProjects ,
    getProject,
    saveListTasksToProject,
    affecterTach , 
    saveProject,
    changeStatusOfTask,
    addMember,
    addProjectChef,
    addClient,
    addCategoryToProject,
    changeStatusTask,
    removeTaskFromProject,
    onAccepteUser,
    onRejectUser,
    validateProject,
    removeProject,
    removeEmployeFromTeam
}