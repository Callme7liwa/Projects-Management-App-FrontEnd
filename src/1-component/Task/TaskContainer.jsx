import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getEmployeTach } from "../../4-actions/6-projects";
import employe from "../../5-reducers/employe";


const TaskContainer = ({project , tasks , status }) => {


    const [tachName , setTachName] = useState("");

    const {tasksEmployes} = useSelector(state=>state.employe);
    const {tachEmploye} = useSelector(state=>state.employe);
    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getEmployeTach(tasks ,project))
    },[project.id])
    
    console.log(tasksEmployes);
    

    return (
        <div className="task-body">
            <div className="color-white">
                {status === "pending" ? "Task Not Already Completed" : "Tasks Completed"}
            </div>
            <select className="form-select">
                <option value="">filter By </option>
                <option value="">Date </option>
            </select>
            {
                tasks.map( task => {
                    dispatch(getEmployeTach(tachName , project))
                    return (
                        <div className="task-content">
                            <div className="image-container">
                                <img src={"http://localhost:8080/server/files/"+tachEmploye?.photo} alt="" srcset="" />
                            </div>
                            <div className="task-description">
                                {tachEmploye?.firstName} {tachEmploye?.secondName}
                                     {status === "pending" ? "is working on " : "Has terminat the"}
                                {task.tachName} 
                            </div>
                            <div className={` task-status ${status === "pending" ? "loading" : "completed"}`}>
                                <i className={`fa ${status === "pending" ? "sfa-cog" : "fa-check"} `} ></i>
                            </div>
                        </div>
                    )
                })
            }
        </div>              
    )
}

export default TaskContainer ; 