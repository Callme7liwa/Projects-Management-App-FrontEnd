import projectsService from "../3-services/projects.service";
import { ADD_CATEGORY_TO_PROJECT, ADD_CHEF_TO_PROJECT, ADD_CLIENT_TO_PROJECT, ADD_MEMBER_TO_PROJECT, ADD_TASKS_TO_PROJECT, ADD_TASKS_TO_PROJECTS, REMOVE_FROM_TASK_PENDING, SET_CURRENT_USER_OF_TASK, SET_EMPLOYE_TACH, SET_NEW_PROJECT, SET_PENDING_TASKS, SET_PROJECT, SET_PROJECTS, SET_PROJECTS_CURRENT_USER, SET_PROJECTS_FINISHED, SET_PROJECTS_PENDING, SET_PROJECTS_SEARCHED, SET_PROJECTS_WORKING, SET_PROJECTS_WORKING_SEARCHED, SET_PROJECTS_COMPLETED_SEARCHED,SET_PROJECTS_PENDING_SEARCHED,CLEAR_PROJECTS_SEARCHED, SET_PROJECT_FROM_SERVER, SET_TERMINATED_TASKS, SET_WORKING_TASKS, UPDATE_TASK, VALIDATE_TASK, REMOVE_TASK_FROM_PROJECT, ON_ACCEPT_USER, ON_REJECT_USER, ADD_MEMBER_TO_PENDING_LIST, VALIDATE_PROJECT, REMOVE_PROJECT, REMOVE_EMPLOYE_FROM_TEAM, SET_MESSAGE } from "./1-types";


export const getProjects = () => (dispatch) => {
    projectsService
    .getProjects()
    .then(projects=>{
        dispatch({
            type:SET_PROJECTS,
            payload : projects.data
        });
        dispatch({
            type:SET_PROJECTS_FINISHED
        })
        dispatch({
            type:SET_PROJECTS_PENDING
        })
        dispatch({
            type:SET_PROJECTS_WORKING
        })
    })
    .catch((err)=>console.log(err))
    .finally(console.log("projects is loading ..... "))
}

export const getProject = (id) => (dispatch) => {
    dispatch({
        type:SET_PROJECT,
        payload:id
    })
    dispatch({
        type:SET_PENDING_TASKS
    })
    dispatch({
        type:SET_WORKING_TASKS
    })
    dispatch({
        type:SET_TERMINATED_TASKS
    })
}

export const getProjectFromServer = (id) => (dispatch) => {
    projectsService
    .getProject(id)
    .then((response)=>{
        console.log("from server :" , response);
        dispatch({
            type:SET_PROJECT_FROM_SERVER,
            payload:response.data
        })
        dispatch({
            type:SET_PENDING_TASKS
        })
        dispatch({
            type:SET_WORKING_TASKS
        })
        dispatch({
            type:SET_TERMINATED_TASKS
        })
    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log("data is loading from data base ..."));
}

export const getEmployeTach = (tasks,project) => (dispatch) => {
    dispatch({
        type:SET_EMPLOYE_TACH,
        payload:{
            tasks:tasks,
            project : project
        }
    })
   
}

export const addListTasksToProject = (id,taches) => (dispatch)=>{
    projectsService
    .saveListTasksToProject(id , taches)
    .then((response)=>{
        if(response.status === 200)
        {
            console.log([...response.data])
            dispatch({
                type:ADD_TASKS_TO_PROJECTS,
                payload : {id:id , taches : [...response.data]}
            })
            dispatch({
                type:ADD_TASKS_TO_PROJECT,
                payload:{taches:[...response.data]}
            })
        }
    })
    .catch((error)=>console.log("error lors d'ajout la list des taches" , error))
    .finally(()=>console.log("ajout des taches en cours .... "));
}

export const affecterTask = (journalistId,tachName,id) => (dispatch) =>  {
    projectsService
        .affecterTach(journalistId , tachName  , id )
        .then((response)=>{
            if(response.status === 200)
            {
                dispatch({
                    type:REMOVE_FROM_TASK_PENDING,
                    payload:{name:tachName,tachStatus:"WORKING", journalistId:journalistId,fileName:null,projectId:id}
                })
            } 
        })
        .catch((error)=>console.log(error))
        .finally(()=>console.log(" affectation encoures ....."))
}

export const saveProject = ({ teamId, name , resume , tachesNames , clientName}) => (dispatch) => {
    
    projectsService
    .saveProject({ teamId, name , resume , tachesNames  , clientName})
    .then((response)=>{
        dispatch({
            type:SET_NEW_PROJECT,
            payload:response.data
        });
        dispatch({
            type: SET_MESSAGE,
            payload: 'SUCCESS  , the project has been added succesfuly ',
        });
    })
    .catch((error)=>{
        dispatch({
            type: SET_MESSAGE,
            payload: 'ERROR  , the project cannot be added  ',
        });
    })
    .finally(()=>console.log("saving pending ..... "))
}

export const changeTaskStatus = (projectId , task , status , journalistId ) => (dispatch) => {
    // projectsService
    // .changeStatusOfTask(projectId , task.name , status)
    // .then((response)=>{
    //      console.log(response.data)
    //     })    
        dispatch({
            type:UPDATE_TASK,
            payload:{ task:task.name , status:status , journalistId : journalistId}
        })
}

export const validateTask  = (project , task ) => (dispatch) => {

    projectsService
    .changeStatusTask(project.id , task.name , "FINISHED")
    .then((response) => {
        dispatch({
            type : VALIDATE_TASK  , 
            payload : {id:project.id , task:task}
        })
    })
    .catch((error) => console.log(error))
    .finally(()=>console.log("status changing loading "));
}


export const getCurrentProjectOfAuth = (id) => (dispatch) => {
    dispatch({
        type:SET_CURRENT_USER_OF_TASK,
        payload:id
    })
}

export const searchInProjectsPage = (key) => (dispatch) => {
    dispatch({
        type:SET_PROJECTS_SEARCHED,
        payload:key.toLowerCase()
    })
}
export const searchProjectsCompleted = (key) => (dispatch) => {
    dispatch({
        type:SET_PROJECTS_COMPLETED_SEARCHED,
        payload:key.toLowerCase()
    })
}
export const searchProjectsWorking = (key) => (dispatch) => {
    dispatch({
        type:SET_PROJECTS_WORKING_SEARCHED,
        payload:key.toLowerCase()
    })
}
export const searchProjectsPending = (key) => (dispatch) => {
    dispatch({
        type : SET_PROJECTS_PENDING_SEARCHED,
        payload : key.toLowerCase()
    })
}
export const clearProjectsSearched = () => (dispatch) => {
    dispatch({
        type:CLEAR_PROJECTS_SEARCHED 
    })
}

// When the admin try to show the complete information about an employe ! 
export const getProjectsOfCurrentUser = (id) => (dispatch) => {
    dispatch({
        type : SET_PROJECTS_CURRENT_USER,
        payload : id 
    })
}

export const addMemberToProject = (projectId , journalistId) =>(dispatch) => {
    projectsService
    .addMember(projectId , journalistId)
    .then((response) => {
        dispatch({
            type : ADD_MEMBER_TO_PROJECT  , 
            payload : {member:response.data.response , projectId:projectId}
        })
    })
    .catch((error) => console.log(error))
    .finally(()=>console.log("adding member to the project by the admin is loading ... "))
}
export const addMemberToPendingList = (projectId , journalistId) => (dispatch) => {
    projectsService
    .addMember(projectId , journalistId)
    .then((response)=>{
        console.log(response);
        dispatch({
            type : ADD_MEMBER_TO_PENDING_LIST , 
            payload : {member : response.data.response , projectId :projectId}
        })
    })
    .catch((error) => console.log(error))
    .finally(()=>console.log("adding member to the project by the projectChef is loading ... "))

}

export const addProjectChefToProject = (projectId , journalistId) => (dispatch) => {

    projectsService
    .addProjectChef(projectId , journalistId)
    .then((response)=>{
        dispatch({
            type:ADD_CHEF_TO_PROJECT,
            payload:{chef : response.data.response , id:projectId}
        })
    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log("save project chef is loading !"))
}

export const addClientToProject = (projectId , client) => (dispatch) => {
     projectsService
    .addClient(projectId , client.name)
    .then((response)=>{
        dispatch({
            type:ADD_CLIENT_TO_PROJECT,
            payload:{id:projectId , client:response.data.response}
        })
    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log("add client to project is laoding ..."))
}

export const addCategoryToProject = (projectId , category) => (dispatch) => {
    projectsService
    .addCategoryToProject(projectId , category)
    .then((response)=>{
        console.log(response);
        dispatch({
            type : ADD_CATEGORY_TO_PROJECT , 
            payload : {id : projectId , name : category}
        })
    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log("add category to project is loading "));
}

export const removeTaskFromProject = (projectId , task ) => (dispatch) => {

    projectsService
    .removeTaskFromProject(projectId,task.name)
    .then((response)=>{
        dispatch({
            type : REMOVE_TASK_FROM_PROJECT  , 
            payload : {id : projectId , task : task }
        });
    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log("remove task is loading .... "));
}

export const onAccepteUser = (project , journalist) => (dispatch) => {
    projectsService
    .onAccepteUser(project , journalist)
    .then((response)=>{
        dispatch({
            type : ON_ACCEPT_USER , 
            payload : {id : project.id , journalist:journalist}
        })
    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log("accepte user is loading ...")) ;
}

export const onRejectUser = (project , journalist) => (dispatch) => {

    projectsService
    .onRejectUser(project , journalist)
    .then((response)=>{
        dispatch({
            type: ON_REJECT_USER  , 
            payload : {id : project.id , journalist:journalist}
        })
    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log("reject user is loading ...")) ;   
}

export const validateProject  = (project , history ) =>(dispatch) => {
    projectsService
    .validateProject(project)
    .then((response)=>{
        history.goBack();
        dispatch({
            type  : VALIDATE_PROJECT  , 
            payload : project 
        })
    })
}

export const removeProject = (project , history) => (dispatch) => {
    projectsService
    .removeProject(project)
    .then((response)=>{
        history.goBack();
        dispatch({
            type : REMOVE_PROJECT , 
            payload : project 
        })
    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log(" removing project is loading ... "))
}

export const removeEmployeFromTeam = (project , journalist) => (dispatch) => {
    projectsService
    .removeEmployeFromTeam(project , journalist)
    .then((response)=>{
        dispatch({
            type:REMOVE_EMPLOYE_FROM_TEAM , 
            payload :  {id : project.id , journalist:journalist}
        })
       
    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log("removing employe from the team is loading ... "))
}