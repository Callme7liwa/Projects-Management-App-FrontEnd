import axios from "axios";
import instance from "./0-auth-header";

const URL_CONSTANTE = "auth/";

const accessToken = localStorage.getItem("accessToken");


const register = (username , email , password) =>{
    return instance.post( URL_CONSTANTE+"signup" , 
    {
        username,
        email,
        password
    }
    );
};

const registerJournalist = (values) => {
    return instance.post(
        "/journalistes" ,
         values,
        {
            headers:{
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'X-Requested-With':'XMLHttpRequest',
            "Authorization" : "Bearer "+accessToken
            }
        }
    );
}

const login = (userName , password) => {
    console.log("request " , {userName, password});
    return instance.post( URL_CONSTANTE+"login",
    {
        userName,
        password
    }
    );
};


const upload = (file , id ) => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id" , id);
    return axios.post("/journalistes/uploadPicture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization" : "Bearer "+accessToken,
      },
    });
}

const updatePicture = (id , photoName) => {
    let formData = new FormData();
    formData.append("photoName" , photoName);
    return axios.post("/journalistes/changeImagePrincipal/"+id, formData , {
        headers : {
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+accessToken,
        }
    })
}

const addFunctionsToUser = (id , functionsName) => {

    return axios.post("/journalistes/addFunctions/"+id ,
     {functionsName} , 
     {
        headers : {
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+accessToken,
        }
     } 
     )
}

const getAffectations = (id) => {
    return axios.get("/journalistes/affectations/"+id , {
        headers : {
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+accessToken,

        }
    })
}

const getMessages = (id) => {
    let formData = new FormData();
    formData.append("user",id);
    return axios.get("/conversations/user/"+id,{
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer "+accessToken,
        }
    })
}

const changeStatusMessage = (conversationId , userId) => {
    let formData = new FormData();
    formData.append("user",userId);
    return axios.post("conversations/changeStatusMessage/"+conversationId,formData,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : "Bearer "+accessToken,
        }
    })
}

const addMessage = (conversationId , body  ,  sender , receiver) => {
    let formData = new FormData();
    console.log(conversationId , body  ,  sender , receiver);
    formData.append("body" , body);
    formData.append("sender" , sender);
    formData.append("receiver" , receiver);
    return axios.post("conversations/saveMessageWithoutFile/"+conversationId , formData , {
        headers:{
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken,
        }
    })
}

const addMessageWithFile = (conversationId  , file , sender , receiver) => {
    let formData = new FormData() ;
    formData.append("file" , file);
    formData.append("sender" , sender);
    formData.append("receiver" , receiver);
    formData.append("body" , "");
    return axios.post("conversations/saveMessageWithFile/"+conversationId , formData , {
        headers:{
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken,

        }
    })
}

const saveNewConversation  = (user1Id,user2Id,projectId,tachName) =>
{
    return axios.post("conversations" , {user1Id,user2Id,projectId,tachName} , {
        headers:{
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken,

        }
    }) ;
}

export const updateEmail = (userId , email ) => {
    let formData = new FormData() ; 
    formData.append("email"  , email );
    return axios.post("journalistes/updateEmail/"+userId , formData  , {
        headers:{
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken,

        }
    } )
}

export const updatePersonalInfo = (userId , values) => {
    return axios.post("journalistes/updatePersonalInfo/"+userId , values  , {
        headers:{
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken,
        }
    } )
}

export const updatePassword = (id , oldPassword , newPassword, passwordConfirmation ) => {
    let formData = new FormData();
    formData.append("newPassword" , newPassword) ;
    formData.append("confirmationPassword" , passwordConfirmation); 
    formData.append("oldPassword" , oldPassword) ; 
    return axios.post("journalistes/updatePassword/"+id , formData  , {
        headers:{
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken,
        }
    } )

}

const DownloadFile = (fileName) => {
    return  axios.get("server/files/"+fileName) ; 
}

const logout = () => {
    localStorage.removeItem("user");
}

export const passwordRecovery = (email) => {
    let formData = new  FormData();
    formData.append("email" , email)
    return axios.post("journalistes/passwordRecovering" ,  formData  , {
        headers:{
            "Content-Type":"application/json",
        }
    });
}

export const removeEmploye = (id) => {
    return axios.post("journalistes/deleteJournalist/"+id , {
        headers:{
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+accessToken,
        }
    }  );
}

export default {
    register ,
    login,
    logout , 
    upload , 
    registerJournalist,
    updatePicture,
    addFunctionsToUser , 
    getAffectations , 
    getMessages,
    changeStatusMessage,
    addMessage ,
    saveNewConversation,
    updateEmail,
    addMessageWithFile,
    updatePassword,
    updatePersonalInfo,
    DownloadFile,
    passwordRecovery,
    removeEmploye
}

