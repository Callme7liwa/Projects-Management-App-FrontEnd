import { ADD_MESSAGE_TO_CONVERSATION, ADD_NEW_CONVERSATION, CHANGE_STATUS_MESSAGE, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, SEARCH_AFFECTATION, SET_CURRENT_PROJECT_USER, SET_CURRENT_USER_OF_TASK, SET_INFORMATION_OTHER, SET_INFO_OTHER, SET_MY_MESSAGES, SET_MY_PROJECTS, SET_MY_PROJECTS_ACHEIVED, SET_MY_PROJECT_WORKING, SET_PROJECT, SET_PROJECTS_ACHEIVED, SET_SHOW_SIDE_BARE, UPDATE_TASK, UPDATE_USER } from "../4-actions/1-types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = 
    {
        isLoggedIn : user ? true : false , 
        user : user? user : null ,
        affectations:[] , 
        projectsWorking : []  , 
        projectsAcheived : [] , 
        affectationSearch:[],
        teams : [],
        project : null,
        conversations:[],
        informationOther : null ,

        sideBareEtat : true ,

    }



export default function (state=initialState , action) {

    const {type,payload} = action ; 

    switch(type)
    {
        case SET_INFORMATION_OTHER : 
            return {
                ...state , 
                informationOther:payload
            }
        
        case SET_MY_MESSAGES : 
            return {
                ...state , 
                conversations:[...payload]
        }
        case ADD_NEW_CONVERSATION  : 
        return {
            ...state , 
            conversations:[payload,...state.conversations]
        }
        case ADD_MESSAGE_TO_CONVERSATION:
            var conversationsUpdate = state.conversations
                                    .map(conversation => {
                                        const result = conversation.id === payload.conversationId ; 
                                        if(result)
                                            conversation.messages.push(payload.message)
                                        return conversation ; 
                                    })
            return {
                ...state , 
                conversations:[...conversationsUpdate]
            }
        case CHANGE_STATUS_MESSAGE :
            var conversationsUpdate = state.conversations
                            .map(conversation=>{
                                const messagesLength = conversation.messages.length-1  ; 
                                const result = conversation.id === payload;
                                if(result)
                                     conversation.messages[messagesLength].messageStatus = "VISITED" 
                                
                                return conversation ; 
                            })
            return {
                ...state , 
                conversations : [...conversationsUpdate]
            }
        case SET_MY_PROJECTS :
            return {
                ...state , 
                affectations : [...payload],
                teams : payload.map(affectation => affectation.team)
            }
        case SET_MY_PROJECTS_ACHEIVED : 
            return {
                ...state , 
                projectsAcheived : state.affectations.filter(project=>project.projectStatus === "FINISHED")
            }
        case SET_MY_PROJECT_WORKING : 
            return {
                ...state , 
                projectsWorking : state.affectations.filter(project=>project.projectStatus === "WORKING")
            }
        case UPDATE_TASK : {

             const { task , status , journalistId} = payload ; 

             const taskUpdated = {name:task , tachStatus : status , journalistId : journalistId};

            const tasks = state.project.tasks.map(mytask=>{
                    if(taskUpdated.name === mytask.name)
                    {
                        return taskUpdated ; 
                    }
                    else 
                    { 
                        return mytask ;
                    }; 
            });


            var myProject = state.project ; 

            myProject.tasks=[];

            tasks.map(myTask=>{
                myProject.tasks.push(myTask);
            })

            return {
                ...state , 
                 project : myProject
            }
        }
        case SET_CURRENT_USER_OF_TASK:
            console.log({payload})
            const myProj = state.affectations.filter(affectation => affectation.id === payload) ; 
       
            return {
                ...state , 
                project : myProj[0]
            }
        case REGISTER_SUCCESS :
            return {
                ...state,
                isLoggedIn:false
            }
        
        case REGISTER_FAIL : 
            return {
                ...state,
                isLoggedIn:false,
            }
        case LOGIN_SUCCESS :
            return {
                isLoggedIn:true,
                user:payload
            }
        case LOGIN_FAIL:
            return {
                isLoggedIn:false,
                user:null
            }
        case LOGOUT : 
            return {
                isLoggedIn:false,
                user:null 
            }
        case UPDATE_USER:
            return {
                ...state , 
                user : payload
            }
        case SEARCH_AFFECTATION : 
            return {
                ...state , 
                  affectationSearch : state.affectations.filter(project => project.name.includes(payload))
            }
        case SET_SHOW_SIDE_BARE : 
            return {
                ...state , 
                sideBareEtat : !state.sideBareEtat
            }
        default :
            return state  ; 
    }
}