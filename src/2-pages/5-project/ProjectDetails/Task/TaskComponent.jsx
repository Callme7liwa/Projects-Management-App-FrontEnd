import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { affecterTask, removeTaskFromProject } from "../../../../4-actions/6-projects";
import "./TaskComponent.css"

const TaskComponent = ({tasks,status,setAddTask,getUserOfTheTask , currentTaskUser  }) => {

    let  i = 0 ; 

    const [tachSelected , setTachSelected] = useState(null);
    const [taskIsSelected, setTaskIsSelected] = useState(false);
    const [selectedEmploye , setSelectedEmploye] = useState(null);
    const  dispatch = useDispatch();

    const {project} = useSelector(state=>state.project) ; 

    
    const handleSelectEmploye = (task) => {
        setTachSelected(task);
        setTaskIsSelected(true);
    }

    const handleRemoveTaskFromProject = (task) => {
        dispatch(removeTaskFromProject(project?.id , task ));
    }

    const handleAffecteTach = () => {
        setTaskIsSelected(false);
        dispatch(affecterTask(selectedEmploye.id , tachSelected.name , project.id));
    }
    
    
    // Affecter la tach a un employe !
    const PopUpSelectEmploye = () => {
        return (
            <div className="pop-up-select-employe-container">
                <div className="pop-up-select-employe-content">
                    <i className="custom-fa fa fa-times" onClick={()=>{setTaskIsSelected(false) ; setSelectedEmploye(null)}}></i>
                    <div className="pop-up-header">
                        <h1> MADE THIS TASK UP </h1>
                        <h4> CHOICE AN EMPLOYE </h4> 
                    </div>
                    <div className="pop-up-body">
                        <div className="body-title">
                            Choice an employe from the team !
                        </div>
                        <div className="employes-container">
                            {project?.team.journalistes.map(journalist=>{
                                return (
                                    <div className={`employe-container ${journalist.id === selectedEmploye?.id ? " active" : ""}`} onClick={()=>setSelectedEmploye(journalist)}>
                                        <div className="image-container">
                                            {
                                                journalist.photo !== null &&  journalist.photo!== undefined && journalist.photo!=="" 
                                                ?
                                                 (  <img src={"http://localhost:8080/journalistes/files/"+journalist.photo}  /> )
                                                :
                                                (<><img src={"http://localhost:8080/journalistes/files/profileDefault.jpg"} /></>)
                                            }
                                        </div>
                                        <div className=""> {journalist.firstName} {journalist.secondName} </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="submit-button">
                        {
                            selectedEmploye != null && selectedEmploye != undefined
                                ? 
                            (   <span className="submit" onClick={handleAffecteTach } > <i className="fa fa-check-circle-o"></i> submit </span>
                            )
                            :
                            (<span className="unsubmit">  <i className="fa fa-times-circle-o"></i> can't submit </span>)
                        }
                    </div>
                </div>
            </div>
        )
    }
    //
    
    return (
        <div className="task-body">
            <div className="color-white task-body-header" >
               <span>{status === "pending" ? "Task Not Already Completed" :  status === "finished"  ? "Tasks Completed" : "Tasks On Progress "}</span> 
               {
                project?.projectStatus !== "FINISHED"
                ?
                (               <span onClick={()=>setAddTask(true)}></span>                )
                :
                (null)
               }
            </div>
            <select className="form-select">
                <option value="">filter By </option>
                <option value="">Date </option>
            </select>
            {/*  le cas ou la tach n 'est pas encore affecter - c - a - d on est dans la partie PENDING TASK */}
        {
            status === "pending"
            ?
            (
                <div className="list-task-working">
                {
                    tasks?.map(task => {
                        var user =   getUserOfTheTask(task.journalistId);                           
                        return (
                                <div className="task-container">
                                    <div className="task-image-user-container">
                                        <div className="image-container task-name-container">
                                           <span>{task.name.slice(0,2)+".."+task.name.slice(task.name.length-2,task.name.length)}</span>
                                        </div>
                                    </div>
                                    <div className="task-info">
                                        <span className="task-name">{task?.name}</span>
                                    </div>
                                    <div className="task-actions">
                                        <i className="fa fa-plus" onClick={()=>handleSelectEmploye(task)}></i>
                                        <i className="fa fa-times" onClick={()=>handleRemoveTaskFromProject(task)}></i>
                                    </div>
                                  
                                </div>
                        )
                    })

                }
                </div>

            )
            :
            (
                <div className="list-task-working">
                {
                    tasks?.map(task => {
                        var user =   getUserOfTheTask(task.journalistId);                           
                        return (
                                <div className="task-container">
                                    <div className="task-image-user-container">
                                        <div className="image-container">
                                            {
                                                user?.photo!==undefined && user?.photo!== null && user?.photo !=="" 
                                                ?
                                                <img src={"http://localhost:8080/journalistes/files/"+user?.photo} />
                                                :
                                                (<><img src={"http://localhost:8080/journalistes/files/profileDefault.jpg"} /></>)
                                            }
                                        </div>
                                    </div>
                                    <div className="task-info">
                                        <span className="task-username">{user?.firstName+" "} {user?.secondName}</span>
                                        <span className="task-name">{task?.name}</span>
                                    </div>
                                  
                                </div>
                        )
                    })

                }
                </div>
            )

        }


        {
            taskIsSelected == true 
            ?
            <PopUpSelectEmploye />
            :
            (null)
        }


               
        </div>
    )
}


export default TaskComponent ; 