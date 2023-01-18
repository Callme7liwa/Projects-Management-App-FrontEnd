import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTaskStatus, getCurrentProjectOfAuth } from "../../../../4-actions/6-projects";
import exclamation from "./../../../../assets/exclamation.png"
import "./PopUpTasks.css";

const PopUpTasks = ({projectId,setSeeMyTasks}) => {

    const {user} = useSelector(state=>state.auth);
    const {project} = useSelector(state=>state.auth);

    const dispatch = useDispatch() ; 

    useEffect(()=>{
        dispatch(getCurrentProjectOfAuth(projectId));
    },[])


    return (
        <>
        <div className={`pic-container skill-container pop`}>
              <div className='pic-content skills-content tasks-content'>
                    <span className='close-page'   onClick={()=>{setSeeMyTasks(false)}}></span>
                    <div className="skills-content-header tasks-content-header ">
                          <h2> YOUR TASKS IN THIS PROJECT  </h2>
                          <h4> {project?.name} </h4>
                    </div>
                    <div className="old-skills tasks">
                        <div className=""> Your Tasks  :  </div>
                        {
                            project?.tasks?.length > 0
                            ?
                            (
                                project?.tasks?.map(task=>{
                                    return (
                                        <div className="tasks-container">
                                            <div className="task-container">
                                                <div> <i className="fa fa-wrench"></i></div>
                                                <div> {task.name}</div>
                                                <div>
                                                    {
                                                        task.tachStatus === "WORKING"
                                                        ?
                                                        (<span className="" > <i className="fa fa-hand-pointer-o "></i> Working  </span>)
                                                        :
                                                        (<span className=""> <i className="fa fa-check-circle-o"></i> Finished</span>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                            :
                                (
                                    <div className="form-group">
                                        <img  src={exclamation} width="150px" height="150px"/>
                                        <span className="text-white"> You have any task for the moment ! </span>
                                    </div>
                                )
                        }
                        
                    </div>
              </div>
        </div>
    </>
    );
}


export default PopUpTasks;