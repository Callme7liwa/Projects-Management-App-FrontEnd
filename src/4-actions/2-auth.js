
import authService from "../3-services/1-auth.service";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS, SET_MESSAGE, SET_MY_PROJECTS, SET_MY_TEAMS, UPDATE_USER  , SET_MY_MESSAGES, SET_INFO_OTHER, CHANGE_STATUS_MESSAGE, ADD_MESSAGE_TO_CONVERSATION, ADD_NEW_CONVERSATION, SET_INFORMATION_OTHER, ADD_EMPLOYE, SEARCH_AFFECTATION, SET_PROJECTS_ACHEIVED, SET_PROJECT, SET_PROJECT_WORKING, SET_MY_PROJECTS_ACHEIVED, SET_MY_PROJECT_WORKING, SET_SHOW_SIDE_BARE, SET_CHEF_PROJECTS, SET_SIMPLE_EMPLOYES, SET_ADMINS, REMOVE_EMPLOYE, CLEAR_MESSAGE } from "./1-types";

const API_URL = "http://localhost:8080/user";




export const register =  (username,email,password) => (dispatch) => {
    
    return   authService
    .register(username,email,password)
            .then((response)=> {
                console.log(response);
                dispatch({
                    type:REGISTER_SUCCESS,
                });
              
                return Promise.resolve();
            },(error)=>{
                console.log("im in error")
                dispatch({
                    type:SET_MESSAGE , 
                    payload:"ERROR , Please Try A gain !"
                });
                return Promise.reject();
            });
        };
        
        export const registerJournalist = (values) => (dispatch) => {
            return  authService
            .registerJournalist(values)
            .then(response=>{
                
                dispatch({
                    type:ADD_EMPLOYE , 
                    payload : response.data
                })
                dispatch({
                    type: CLEAR_MESSAGE,
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: 'SUCCESS  , the user is registred succesfuly ',
                });
                dispatch({
                    type:SET_CHEF_PROJECTS 
                })
                dispatch({
                    type:SET_SIMPLE_EMPLOYES
                })
                dispatch({
                    type:SET_ADMINS
                })
                })
                .catch((error) => {
                    dispatch({
                        type: SET_MESSAGE,
                        payload: 'ERROR  , the user cannot be registred  ',
                    });
                })
                .finally(()=>{
                    // dispatch({
                    //     type: SET_MESSAGE,
                    //     payload: 'LOADING  , your request is loading',
                    // });
                })
}

export const login =  (history , userName,password) =>(dispatch) => {
    return  authService
            .login(userName,password)
            .then((response)=>{
                console.log(response);
                const userJson = JSON.stringify(response.data.journalist);
                localStorage.setItem("user",userJson);
                localStorage.setItem("accessToken",response.data.accessToken);
                localStorage.setItem("refreshToken",response.data.refreshToken);
                dispatch({
                    type:LOGIN_SUCCESS,
                    payload:response.data.journalist
                });
                dispatch(getAffectation(response.data.journalist.id))    
                return Promise.resolve();
            }).catch((error)=>{
                dispatch({
                    type: SET_MESSAGE,
                    payload: 'ERROR  ,cannot be logged in !',
                });
                dispatch({
                    type:LOGIN_FAIL,
                })
                return Promise.reject();
            });
};

export const uploadImage = (file , id ) => (dispatch) => {
    authService
    .upload(file , id)
    .then((response) => {
        console.log(response);
        localStorage.setItem("user",JSON.stringify(response.data.journalist));
        dispatch({
            type:UPDATE_USER,
            payload:response.data.journalist
        });
        dispatch({
            type:SET_MY_TEAMS
        })
        return Promise.resolve();
    })
    .catch(error=>console.log(error))
    .finally(()=>console.log(" uploading is loading .... "));
}

export const updateProfileImage = (id , photoName) => (dispatch) => {
    authService
    .updatePicture(id,photoName)
    .then((response) => {
        localStorage.setItem("user",JSON.stringify(response.data));
        dispatch({
            type:UPDATE_USER,
            payload:response.data
        });
        return Promise.resolve();
    })
    .catch(error=>console.log(error))
    .finally(()=>console.log(" uploading is loading .... "));
}

export const getAffectation = (id) => (dispatch) => {
    authService
        .getAffectations(id)
        .then((response)=>{
            dispatch ({
                type:SET_MY_PROJECTS ,
                payload:response.data
            })
            dispatch({
                type : SET_MY_PROJECTS_ACHEIVED 
            })
            dispatch({
                type : SET_MY_PROJECT_WORKING
            })
        })
}

export const addFunctionsToJournalist = ( id , functionsName) => (dispatch) => {
    console.log({id , functionsName});
    authService
    .addFunctionsToUser(id,functionsName)
    .then((response)=>
        {
            localStorage.setItem("user",JSON.stringify(response.data));
            dispatch({
                type:UPDATE_USER,
                payload:response.data
            });
        }
    )
    .catch((error)=>console.log(error))
    .finally(()=>console.log("add functions is loeading ...."));
}

export const getMessages = (id) => (dispatch) => {
    authService
    .getMessages(id)
    .then((response)=>{
        console.log(response)
        dispatch({
            type:SET_MY_MESSAGES,
            payload:[...response.data]
        })
    })
    .catch((error)=> console.log("my error => " , error))
    .finally(()=>console.log("message is loading .... "));
}

export const setInformationOther = (user) => (dispatch) => {
    console.log("info other mine" , user)
    dispatch({
        type:SET_INFORMATION_OTHER, 
        payload:user 
    })
}

export const changeMessageStatus = (conversationId , userId) => (dispatch) => {
    authService
    .changeStatusMessage(conversationId,userId)
    .then((response)=>{
        console.log(response);
        dispatch({
            type:CHANGE_STATUS_MESSAGE,
            payload:conversationId
        })
    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log(" change status message is loading ...."));
}

export const addMessageToConversationWithoutFile = (conversationId , body  , sender,receiver ) => (dispatch) => {
    authService
    .addMessage(conversationId , body ,sender , receiver)
    .then((response)=>{
        dispatch({
            type:ADD_MESSAGE_TO_CONVERSATION , 
            payload : {conversationId:conversationId,message:response.data} 
        })
    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log("en train d 'ajouter un message"))
}

export const addMessageToConversationWithFile = (conversationId , file , sender , receiver) => (dispatch) => {
    authService
    .addMessageWithFile(conversationId , file , sender , receiver)
    .then((response)=>{
        dispatch({
            type:ADD_MESSAGE_TO_CONVERSATION , 
            payload : {conversationId:conversationId,message:response.data} 
        })
    })
    .catch((error)=>console.log(error))
    .finally((dataLoading)=>console.log("data is loading" , dataLoading));
}

export const saveNewConversation = (user1Id , user2Id , projectId , tachName) => (dispatch) => {
    authService
    .saveNewConversation(user1Id , user2Id , projectId , tachName)
    .then((response)=>{
        dispatch({
            type:ADD_NEW_CONVERSATION,
            payload:response.data
        })
    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log(" save conversation ...."));
}

export const downloadFile = (documentName) => (dispatch) => {
    authService
    .DownloadFile(documentName)
    .then((response)=>console.log(response))
    .catch((error)=>console.log(error))
    .finally(()=>console.log("loadgin f file ... "))
}

export const searchAffectation = (key) => (dispatch) => {
    dispatch({
        type:SEARCH_AFFECTATION , 
        payload:key 
    })
    return Promise.resolve("Réponse pour éviter une erreur dans la console");
}

export const showSideBare = () =>(dispatch) =>  {
    dispatch({
        type : SET_SHOW_SIDE_BARE
    })
}

export const logOut = (history) => (dispatch) => {
    authService.logout();
    dispatch({
      type: LOGOUT,
    });
    history.push("/login");
};

export const updatePassword = ({id , oldPassword , newPassword , confirmPassword}) => (dispatch) => {
    authService
    .updatePassword(id,oldPassword , newPassword , confirmPassword)
    .then((response)=>{      
          dispatch({
            type: SET_MESSAGE,
            payload: 'SUCCESS  , the password has been changed succesfult ',
          });
    })
    .catch(
        dispatch({
            type: SET_MESSAGE,
            payload: 'ERROR  , the password  cannot  be updated   ,please try a gain ',
        })
    )
    .finally(()=>console.log("update apssword is loading ... "));
}

export const updateEmail = (id, email) => (dispatch) => {
    authService
    .updateEmail(id , email)
    .then((response)=>{

        dispatch({
          type: SET_MESSAGE,
          payload: 'SUCCESS  , the email has been updated succesfuly',
        });
        dispatch({
          type:LOGIN_SUCCESS,
          payload:response.data.response
        });
        console.log("update email  response" , response) ; 
        const userJson = JSON.stringify(response.data.response);
        localStorage.setItem("user",userJson);
    })
    .catch(dispatch({
        type: SET_MESSAGE,
        payload: 'ERROR  , the email cannot  be updated succesfuly  ,please try a gain ',
      }))
    .finally(()=>console.log("...... "))
}

export const updatePersonalInfo = ({id , firstName , secondName , city , country , phone , address }) => (dispatch) => {
    authService
    .updatePersonalInfo(id ,{firstName , secondName , city , country  , phone , address } )
    .then((response)=>{
        const userJson = JSON.stringify(response.data.response);
        localStorage.setItem("user",userJson);
        dispatch({
            type: SET_MESSAGE,
            payload: 'SUCCESS  , the personal information has been updated succesfuly',
          });
          dispatch({
            type:LOGIN_SUCCESS,
            payload:response.data.response
        });
    })
    .catch((error)=>{
        dispatch({
            type: SET_MESSAGE,
            payload: 'ERROR  , the personal information cannot be updated , please try later',
          });
    })
    .finally(()=>console.log("loading ..."))
}

export const passwordRecovery = (email , history) => (dispatch) => {
    authService
    .passwordRecovery(email)
    .then((response)=>{
        dispatch({
            type: SET_MESSAGE,
            payload: 'SUCCESS  , the password is recovered  succesfuly',
        });
        dispatch(logOut(history))
    })
    .catch((error)=>{
        dispatch({
            type: SET_MESSAGE,
            payload: 'ERROR  , the password  cannot be recoverd , please try later',
          });
    })
    .finally(()=>console.log("password recovering is loading ... "))
}

export const removeEmploye = (employe) => (dispatch) => {

    authService
    .removeEmploye(employe.id)
    .then((response)=>{
        dispatch({
            type : REMOVE_EMPLOYE , 
            payload : employe
        })
        dispatch({
            type:SET_CHEF_PROJECTS 
        })
        dispatch({
            type:SET_SIMPLE_EMPLOYES
        })
    })
    .catch((error)=>{
        dispatch({
            type: SET_MESSAGE,
            payload: 'ERROR  , the USER  cannot be deleted , please try later',
        });
    })
    .finally(()=>console.log("usser deleting is loading  ... "))

}