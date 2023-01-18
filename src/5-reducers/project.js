import update from "react-addons-update";
import { ADD_CATEGORY_TO_PROJECT, ADD_CHEF_TO_PROJECT, ADD_CLIENT_TO_PROJECT, ADD_MEMBER_TO_PENDING_LIST, ADD_MEMBER_TO_PROJECT, ADD_TASKS_TO_PROJECT, ADD_TASKS_TO_PROJECTS, CLEAR_PROJECTS_SEARCHED, ON_ACCEPT_USER, ON_REJECT_USER, REMOVE_EMPLOYE, REMOVE_EMPLOYE_FROM_TEAM, REMOVE_FROM_TASK_PENDING, REMOVE_PROJECT, REMOVE_TASK_FROM_PROJECT, SET_EMPLOYE_TACH, SET_NEW_PROJECT, SET_PENDING_TASKS, SET_PROJECT, SET_PROJECTS, SET_PROJECTS_COMPLETED_SEARCHED, SET_PROJECTS_CURRENT_USER, SET_PROJECTS_FINISHED, SET_PROJECTS_PENDING, SET_PROJECTS_PENDING_SEARCHED, SET_PROJECTS_SEARCHED, SET_PROJECTS_WORKING, SET_PROJECTS_WORKING_SEARCHED, SET_PROJECT_FROM_SERVER, SET_TERMINATED_TASKS, SET_WORKING_TASKS, VALIDATE_PROJECT, VALIDATE_TASK  } from "../4-actions/1-types";

const initialState = {
    projects : [] ,
    projectsPending : [] , 
    projectsWorking : [] , 
    projectsFinished: [] ,
    // 
    project : null,
    pendingTasks:[] , 
    workingTasks:[],
    terminatedTasks:[] ,
    //
    tasksEmployes : [] ,  
    //
    projectsCurrentUser : [],
    projectsSearched : [],
}

export default function (state = initialState , action)
{
    const {type , payload } = action ; 

    var projectsFiltred  ; 
    var projectFiltred;

    switch(type)
    {
        case SET_NEW_PROJECT : 
            return {
                ...state,
                projects : [...state.projects , payload],
                projectsPending:[...state.projectsPending , payload]
            }
        case SET_PROJECTS  : 
            return {
                ...state , 
                projects:payload
            }
        case SET_PROJECTS_PENDING :
            const projectsPendingPayload = state.projects.filter(project=>project.projectStatus =="PENDING")
            return {
                ...state , 
                projectsPending:projectsPendingPayload
            }
        case SET_PROJECTS_WORKING : 
            const projectsWorkingPaylaod = state.projects.filter(project=>project.projectStatus == "WORKING")
            return {
                ...state , 
                projectsWorking:projectsWorkingPaylaod
            }
        case SET_PROJECTS_FINISHED : 
            const projectsFinishedPayload = state.projects.filter(project=>project.projectStatus == "FINISHED")
            return {
                ...state , 
                projectsFinished : [...projectsFinishedPayload] 
            }
        case SET_PROJECT : 
            const projectSelected = state.projects.filter(project=>project.id == payload);
            console.log(projectSelected);
            return {
                ...state , 
                project:projectSelected[0]
            }
        case SET_PROJECT_FROM_SERVER:
            return {
                ...state , 
                project:payload
            }
        case SET_PENDING_TASKS:
            const pendingTaskFilter = state.project?.tasks?.filter(task=>task.tachStatus==="PENDING");
            return {
                ...state , 
                pendingTasks:pendingTaskFilter 
            }
        case SET_WORKING_TASKS : 
            const workingTasksFilter = state.project?.tasks?.filter(task=>task.tachStatus==="WORKING");
            
            return {
                ...state , 
                workingTasks:workingTasksFilter,
            }
        case SET_TERMINATED_TASKS : 
            const terminatedTasksFilter = state.project?.tasks?.filter(task=>task.tachStatus==="FINISHED");
            return {
                ...state , 
                terminatedTasks:terminatedTasksFilter,
            }
        case VALIDATE_TASK :
             projectsFiltred = state.projects.filter(project=>project.id !== payload.id); 
             projectFiltred = state.projects.filter(project=>project.id === payload.id)[0];
            projectFiltred.tasks.map(myTask=>{
                    if(myTask.name === payload.task.name)
                        {
                            projectFiltred.tasks.pop(myTask);
                            myTask.tachStatus = "FINISHED"  ; 
                            projectFiltred.tasks.push(myTask);
                        }
                    return myTask ; 
                }
            )

            projectsFiltred.push(projectFiltred);
            return {
                ...state , 
                projects : [...projectsFiltred],
                terminatedTasks : [...state.terminatedTasks , payload.task],
                workingTasks : state.workingTasks.filter(myTask=>myTask.name!== payload.task.name)
            }
        case SET_EMPLOYE_TACH : 
                    const {tasks , project} = payload ; 
                    var data = {task:null , journalist:null};
                    var arrayEmploye = [];
                    tasks
                        ?.map(task=>{
                            project.team.jouranlistes(
                                journalist=>{
                                    if(task.journalistId === journalist.id)
                                       {
                                        data.task = task ; 
                                        data.journalist = journalist ; 
                                        arrayEmploye.push(data);
                                        return true ; 
                                       }
                                }
                            )
                        })
            case ADD_TASKS_TO_PROJECTS: 
                    const {id , taches} = payload;
                    const index = state.projects.findIndex(project => project.id === id)  
                    const projectUpdated = state.projects[index] ;
                    taches.forEach(tache=>{projectUpdated?.tasks?.push(tache)}) 
                    return {
                        ...state , 
                        projects : state.projects.map(project=> project.id === id ? projectUpdated : project ),
                        project  : projectUpdated,
                        pendingTasks : [...state.pendingTasks, ...taches ]
                    }
            case ADD_TASKS_TO_PROJECT:
                console.log("all projects " , state.projects);
                return {
                    ...state , 
                    
                }
            case REMOVE_TASK_FROM_PROJECT : 
                projectsFiltred = state.projects.filter(project=>project.id!==payload.id);

                projectFiltred = state.projects.filter(project=>project.id === payload.id)[0];
                

                projectFiltred
                .tasks.map(myTask => {
                        if(myTask.name === payload.task.name )
                            projectFiltred.tasks.pop(myTask) ; 
                        return  myTask ; 
                })
                

                projectsFiltred.push(projectFiltred);
                
                return {
                    ...state , 
                    projects : [...projectsFiltred]  , 
                    project : projectFiltred,
                    pendingTasks : state.pendingTasks.filter(task=>task.name!==payload.task.name)
                }
            case REMOVE_FROM_TASK_PENDING:

                const {name,tachStatus,journalistId , fileName,projectId} = payload ; 
                const task = {name , tachStatus ,journalistId, fileName} ; 
                const taskRestPending = state.pendingTasks.filter(task=>task.name!=name);
                 const allworkingtasks = [...state.workingTasks,task] ; 
                
                const projectOfTask = state.projects.filter(project=>project.id === projectId);

                const tasksRest = projectOfTask[0].
                                    tasks.map(mytask=>{
                                        if(mytask.name === name)
                                        return  task ; 
                                        return mytask ; 
                                    })
                projectOfTask[0].tasks=[];

                tasksRest.map(myTask=>{
                    projectOfTask[0].tasks.push(myTask);
                });
            
                return {
                    ...state,
                    pendingTasks : taskRestPending,
                    workingTasks : [...allworkingtasks],
                    projects : state.projects.map(project=>{if(project.id===projectId) return projectOfTask[0]; return project ;  }),
                    project : projectOfTask[0]
                } 
            case SET_PROJECTS_CURRENT_USER : 
                var projectsCurrentUser = [];
                state.projects.map(project=>{
                    if(project?.projectChef?.id===payload)
                        projectsCurrentUser.push(project);
                    else
                        project?.team?.journalistes?.map(journalist=>{
                            if(journalist?.id===payload)
                                projectsCurrentUser.push(project);
                        })
                })
                return {
                    ...state ,
                    projectsCurrentUser : [...projectsCurrentUser]
                }
                
            case SET_PROJECTS_SEARCHED :
                var projectsSearched = state.projects.filter(project => (project.projectChef.firstName+" "+project.projectChef.secondName).toLowerCase().includes(payload)||project.name.includes(payload) ); 
                return {
                    ...state,
                    projectsSearched : [...projectsSearched]
                }

            case SET_PROJECTS_COMPLETED_SEARCHED : 
                projectsSearched =state.projectsFinished.filter(project => (project.projectChef.firstName+" "+project.projectChef.secondName).toLowerCase().includes(payload)||project.name.includes(payload) );
                return {
                    ...state , 
                    projectsSearched : [...projectsSearched]
                } 

            case SET_PROJECTS_WORKING_SEARCHED : 
                projectsSearched =state.projectsWorking.filter(project => (project.projectChef.firstName+" "+project.projectChef.secondName).toLowerCase().includes(payload)||project.name.includes(payload) );
                return {
                    ...state , 
                    projectsSearched : [...projectsSearched]
                } 
            
            case SET_PROJECTS_PENDING_SEARCHED : 
                projectsSearched =state.projectsPending.filter(project => (project.projectChef.firstName+" "+project.projectChef.secondName).toLowerCase().includes(payload)||project.name.includes(payload) );
                return {
                    ...state , 
                    projectsSearched : [...projectsSearched]
                } 

            case CLEAR_PROJECTS_SEARCHED : 
                return {
                    ...state , 
                    projectsSearched : []
                }
                
            case ADD_MEMBER_TO_PROJECT :
                projectFiltred = state.project ; 
                projectFiltred.team.journalistes.push(payload.member);
                return {
                    ...state,
                    projects : state.projects.map(project=>{if(project.id===payload.projectId) return projectFiltred ; return project }),

                }
            case ADD_MEMBER_TO_PENDING_LIST : 
               projectFiltred = state.project ; 
                projectFiltred.pendingJouranlistes.push(payload.member);
                return {
                    ...state , 
                    projects : state.projects.map(project=>{if(project.id === payload.projectId) project.pendingJouranlistes.push(payload.member) ; return project}),
                   // project :  projectFiltred
                }

            case ADD_CHEF_TO_PROJECT : 
                projectFiltred = state.project ; 
                projectFiltred.projectChef = payload.chef;
                return {
                    ...state,
                    projects : state.projects.map(project=>{if(project.id===payload.id) project.projectChef = payload.chef ; return project})
                }
            case ADD_CLIENT_TO_PROJECT :
                projectFiltred = state.project ; 
                projectFiltred.pendingJouranlistes.push(payload.client);
                return {
                    ...state , 
                    projects : state.projects.map(project=>{if(project.id===payload.id) project.client = payload.client ; return project})
                }
            case ADD_CATEGORY_TO_PROJECT : 
                projectFiltred = state.project ; 
                projectFiltred.categoryName = payload.name;
                return {
                    ...state , 
                    projects : state.projects.map(project=>{if(project.id===payload.id) project.categoryName=payload.name ; return project})
                }
            case ON_ACCEPT_USER : 
                projectsFiltred = state.projects.filter(project=>project.id!==payload.id);
                projectFiltred = state.projects.filter(project=>project.id===payload.id)[0];
                projectFiltred.pendingJouranlistes.map(journalist=>{
                    if(journalist.id === payload.journalist.id)
                    projectFiltred.pendingJouranlistes.pop(journalist)
                }) 
                projectFiltred.team.journalistes.push(payload.journalist);
                projectsFiltred.push(projectFiltred);
                return {
                    ...state ,
                   projects : [...projectsFiltred]
                }
            case ON_REJECT_USER :
                projectsFiltred = state.projects.filter(project=>project.id!==payload.id);
                projectFiltred = state.projects.filter(project=>project.id===payload.id)[0];
                projectFiltred.pendingJouranlistes.map(journalist=>{
                    if(journalist.id === payload.journalist.id)
                        projectFiltred.pendingJouranlistes.pop(journalist)
                }) 
                projectsFiltred.push(projectFiltred); 
                return {
                    ...state,
                    projects : [...projectsFiltred]
                }
            case VALIDATE_PROJECT : 
                state.projectStatus = "FINISHED";
                return {
                    ...state ,
                    projectsWorking : state.projectsWorking.filter(project=>project.id!==payload.id),
                    projectsFinished : [...state.projectsFinished , state.project]
                }
            case REMOVE_PROJECT:
                return {
                    ...state,
                    projects : state.projects.filter(project=>project.id !== payload.id),
                    projectsFinished : state.projectsFinished.filter(project=>project.id !== payload.id),
                    projectsWorking : state.projectsWorking.filter(project=>project.id !== payload.id),
                    projectsPending : state.projectsPending.filter(project=>project.id !== payload.id),
                }
            case REMOVE_EMPLOYE_FROM_TEAM : 
                projectFiltred = state.project ; 
                projectFiltred.team.journalistes = projectFiltred.team.journalistes.filter(journalist => journalist.id!==payload.journalist.id );
                projectFiltred.tasks.map(task=>{if(task.journalistId !== payload.journalist.id) projectFiltred.tasks.pop(task) ; return true }  )
                return {
                    ...state,
                    projects : state.projects.map(project=>{if(project.id===payload.id) return projectFiltred  ; return project ;}),
                    terminatedTasks : state.terminatedTasks.filter(task=>task.journalistId !== payload.journalist.id),
                    workingTasks : state.workingTasks.filter(task=>task.journalistId !== payload.journalist.id),
                    pendingTasks : state.pendingTasks.filter(task=>task.journalistId !== payload.journalist.id),
                }
            case REMOVE_EMPLOYE : 
              projectsFiltred = state.projects.map(project=>{
                 if(project.projectChef === payload.id)
                    project.projectChef = null 
                 else
                 {
                    var teamFiltred = project.team.journalistes.filter(journalist=>journalist.id !== payload.id);
                    var tasksFiltred = project.tasks.map(task=>payload.id != task.journalistId)
                    project.team.journalistes = teamFiltred ;
                    project.tasks = tasksFiltred;
                 } 
                 return project ; 
              })
               return {...state , projects : [...projectsFiltred]};
            default : 
                return state ; 
    }
}