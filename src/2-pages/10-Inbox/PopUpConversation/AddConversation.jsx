import "./AddConversation.css";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { saveNewConversation } from "../../../4-actions/2-auth";
import { setCurrentUserOfTheTask } from "../../../4-actions/3-task";
import exclamation from "./../../../assets/exclamation.png"

export const AddConversation = ({setAddConversation}) => {

    const [addProject , setAddProject] = useState(false);

    const [addTask , setAddTask] = useState(false);

    const [selectedProject , setSelectedProject]   = useState(null);

    const [selectedTask , setSelectedTask]   = useState(null);

    const [errorTask , setErrorTask]= useState();

    const {user} = useSelector((state)=>state.auth);

    const {affectations} = useSelector(state=>state.auth);

    const {currentUser} = useSelector(state=>state.task) ; 

    const {conversations} = useSelector(state=>state.auth);

    // const {colors} = useSelector(state=>state.colors);

    const dispatch = useDispatch();





    const handleClickSetTask = () => {
        if(selectedProject === null )
           { setErrorTask("You Must select the project !"); return false}
        setErrorTask("");
        setAddTask(true);
        return true ;         

    }
        
    const AddProject = () => {

        const [errorMessage , setErrorMessage] = useState();

        var counter = 0  ; 

        const closePopUp = () => {
            setSelectedProject(null)
            setErrorMessage("");
            setAddProject(false)
        }

        const refreshCounter = () => {
            counter = 0 ; 
        }

        const handleClickProject = (affectation) => {
            if(affectation?.id === selectedProject?.id)
            { 
                setSelectedProject(null); 
                return false ; 
            }
            setSelectedProject(affectation);
            return true ;    
        }

        const handleValidAjoutProject = () => {
            console.log(selectedProject)
            if(selectedProject === null)
                {setErrorMessage("You Must Select a project !") ; return false}
            setErrorMessage("");
            setAddProject(false);
            setErrorTask("");
            return true ; 
        }



        return (
            <div className="pop-up-add-project-conversation pop-up-add-conversation pop-up-add-task-container">
                <div className="pop-up-add-project-conversation-content pop-up-add-task-content">
                    <i className="fa fa-times" onClick={()=>closePopUp()}></i>
                    <div className="content-header">
                        <h2> ADD TOPIC </h2>
                        <h4>  SELECT PROJECT   </h4>
                        <span className="badge"> </span>
                    </div>
                    <div className="error-message">
                        <p className="text-danger">{selectedProject === null ? errorMessage : ""}</p>
                    </div>
                    <div className="content-body-conversation content-body ">
                        <div className="title-conversation"> CHOOSE A PROJECT FROM YOURS </div>
                        <div className="list-projects"> 
                        {refreshCounter()}

                        {
                            affectations?.length <=0 || affectations === null || affectations === undefined
                            ?
                            (
                                <div className="affectations-empty ">
                                    <div className=""><img src={exclamation} className="" width="150px" height="150px" /></div>
                                    <div className="affectation-message"> You  have any project for the moment</div>
                                 </div>
                            )
                            :
                            affectations.filter(affectation=>affectation.projectChef!=null).map(affectation=>{
                                counter=counter +1 ; 
                                console.log(affectation.id === selectedProject )
                                return (
                                    <div className={`project-container ${affectation.id === selectedProject?.id ? ' active' : ''}`} onClick={()=>handleClickProject(affectation)} >
                                        <div className="project-number">
                                            <span  /*style={{backgroundColor: colors[getRandomIndex()] }}*/> {counter} </span>
                                        </div>
                                        <div className="project-name">
                                            <span> {affectation.name}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                        
                        <div className="project-validation">
                            {
                                selectedProject == null
                                ?
                                (<span className="submit bg-danger" > <i className="fa fa-times-circle-o"></i> can't submit</span>)
                                :
                                (<span className="submit" onClick={handleValidAjoutProject}> <i className="fa fa-check-circle-o"></i> submit </span>) 
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

 
    const AddTask = () => {

        const [errorValidation , setErrorValidation] = useState("");

        const testIfExiste = (task) => {
            var drapeau  = false ;
            conversations.map(conversation=>{
                if(conversation.project.id=== selectedProject.id && conversation.tachName === task.name)
                   { drapeau = true ;  return true ;   }
                return false ;
            })
            return drapeau ; 
        }

        const handleClickTask = (task) => {
            if(testIfExiste(task))
            {
                alert("this task aleardy existe !")
                return false ; 
            }
            if(task?.name == selectedTask?.name)
            { 
                setSelectedTask(null)
                return false ;
            } 
            
            setSelectedTask(task);
            return true ; 

        }   

        const handleValidateAddTask = () => {
            if(selectedTask===null)
                {setErrorValidation("You have to select a task "); return false;}
            else
                {
                    if(selectedProject?.journalistId !== user?.id)
                    {
                        var journalistTask = selectedProject.team.journalistes.filter(journalist=>journalist.id === selectedTask.journalistId)
                        dispatch(setCurrentUserOfTheTask(journalistTask[0])) ; 
                    }
                    setAddTask(false);
                }
        }

        return (
            <div className="pop-up-add-task-conversation pop-up-add-project-conversation pop-up-add-conversation pop-up-add-task-container">
                <div className="pop-up-add-task-conversation-content pop-up-add-project-conversation-content pop-up-add-task-content">
                    <i className="fa fa-times" onClick={()=>setAddTask(false)}></i>
                    <div className="content-header">
                        <h2> ADD TOPIC </h2>
                        <h4>  SELECT TASK    </h4>
                        <span className="badge"> </span>
                    </div>
                    <div className="error-message">
                        <p className="text-danger">{selectedTask === null ? errorValidation : ""}</p>
                    </div>
                    <div className="content-body-conversation content-body ">
                        <div className="title-conversation"> CHOOSE A TASK FROM THE PROJECT SELECTED  </div>
                        <div className="list-projects"> 
                            {
                                 selectedProject?.tasks?.length <=0 
                                 ?
                                 (
                                    <div className="affectations-empty ">
                                        <div className=""><img src={exclamation} className="" width="150px" height="150px" /></div>
                                        <div className="affectation-message"> You  have any task  on  this project </div>
                                    </div>
                                 )
                                 :
                                selectedProject?.tasks?.map(task=>{
                                    
                                    return (
                                        <div className={`project-container project-task-container  ${testIfExiste(task) === true ? " not-active" :  task.name === selectedTask?.name ? ' active' : ''} `} onClick={()=>handleClickTask(task)} >
                                            <div className="project-number">
                                                <span  /*style={{backgroundColor: colors[getRandomIndex()] }}*/> {task.name.slice(0,2)} </span>
                                            </div>
                                            <div className="project-name task-name ">
                                                <span> {task.name}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                        <div className="project-validation">
                            <span className="submit"  onClick={handleValidateAddTask}> <i className="fa fa-check-circle-o"></i> valider</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const handleSubmitConversation = () => {
        if(selectedProject!=null && selectedTask != null)
        {
            if(selectedProject.projectChef.id !== user?.id)
                dispatch(saveNewConversation(selectedProject?.projectChef?.id,user?.id , selectedProject.id ,  selectedTask.name ))
            else
                dispatch(saveNewConversation(selectedProject?.projectChef?.id , currentUser?.id , selectedProject?.id , selectedTask?.name));
        }
    }

    return (
        <>
    
            <div className=" pop-up-add-conversation pop-up-add-task-container">
                <div className="pop-up-add-conversation-content pop-up-add-task-content">
                    <i className="fa fa-times" onClick={()=>setAddConversation(false)}></i>
                    <div className="content-header">
                        <h2> KEEP THE WORK FAIR  ! </h2>
                        <h4>  ADD NEW CONVERSATION   </h4>
                        <span className="badge"> </span>
                    </div>
                    <div className="content-body">
                        <div className="form-group">
                            <label> Select Project </label>
                            <input onClick={()=>setAddProject(true)}></input>
                            {
                                selectedProject !== null 
                                ?
                                (
                                     <div className="selected">
                                        <span> <i className="fa fa-check-circle-o"></i></span>
                                        <span> {selectedProject?.name}</span>
                                        <span onClick={()=>{setSelectedProject(null);setSelectedTask(null);}}><i className="fa fa-times-circle-o"> </i> </span>
                                    </div>
                                )
                                :
                                ( null )
                            }
                        </div>
                        <div className="form-group">
                            <label> Select Task </label>
                            <input onClick={()=>handleClickSetTask()}></input>
                            <p className="text-danger"> {errorTask}</p>
                            {
                                selectedProject !== null  && selectedTask !== null
                                ?
                                (
                                     <div className="selected">
                                        <span> <i className="fa fa-check-circle-o"></i></span>
                                        <span> {selectedTask?.name}</span>
                                        <span onClick={()=>{setSelectedTask(null)}}><i className="fa fa-times-circle-o"> </i> </span>
                                    </div>
                                )
                                :
                                ( null )
                            }
                        </div>
                        
                        <div className="form-group">
                            <label>  {selectedProject?.projectChef?.id === user?.id ? "Employee" : "Project Chef " } </label>
                            <input ></input>
                            {
                                selectedProject !== null  && selectedTask !== null
                                ?
                                (
                                    <>                
                                    {
                                        selectedProject.projectChef.id != user?.id
                                        ?
                                        (
                                            <div className="selected">
                                                <span> <i className="fa fa-check-circle-o"></i></span>
                                                <span> {selectedProject.projectChef.firstName} {selectedProject.projectChef.secondName}</span>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className="selected">
                                                <span> <i className="fa fa-check-circle-o"></i></span>
                                                <span> {currentUser?.firstName} {currentUser?.secondName}</span>
                                            </div>
                                        )
                                    }
                                    </>
                                )
                                :
                                ( null )
                            }
                        </div>
                        <div className="form-group">
                            <span className="submit" onClick={handleSubmitConversation}> <i className="fa fa-check-circle-o"></i> create </span>
                        </div>
                    </div>
                </div>
            </div>
            {
                addProject === true 
                ?
                (<AddProject />)
                :
                (null)
            }
            
            {
                addTask === true 
                ?
                (<AddTask />)
                :
                (null)
            }
            
        </>
    )
}