import { useSelector } from "react-redux";
import { validateTask } from "../../../../4-actions/6-projects";

export const RightContentComponent = ({dispatch , getUserOfTheTask}) => {

    const {workingTasks} = useSelector(state=>state.project);
    const {project} = useSelector(state=>state.project);

    const handleChangeTaskStatus = (task) => {
        dispatch(validateTask(project , task));
    }

    return(
        
        <div className="details-project">
            <div className="list-task-working">
            {
                workingTasks.map(task => {
                    var user =   getUserOfTheTask(task.journalistId);                           
                    return (
                            <div className="task-container">
                                <div className="task-image-user-container">
                                    <div className="image-container">
                                        {
                                            user?.photo !== null && user?.photo!==undefined && user.photo !=="" 
                                            ?
                                            (<><img src={"http://localhost:8080/journalistes/files/"+user?.photo} /></>)
                                            :
                                            (<><img src={"http://localhost:8080/journalistes/files/profileDefault.jpg"} /></>)
                                        }
                                    </div>
                                </div>
                                <div className="task-info">
                                    <span className="task-username">{user?.firstName+" "} {user?.secondName}</span>
                                    <span className="task-name">{task?.name}</span>
                                </div>
                                <div className="task-validate">
                                    <i className="fa fa-check"  onClick={()=>handleChangeTaskStatus(task)}></i>
                                </div>
                            </div>
                    )
                })
            }
            </div>
        </div>
    )
}