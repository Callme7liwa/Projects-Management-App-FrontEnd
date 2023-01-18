import { useSelector } from "react-redux";
import AddTaskPopUp from "../PopUpAddTask/PopUpAddTask";
import TaskComponent from "../Task/TaskComponent"

export const CenterContentComponent = ({currentTaskUser , etat1 , setEtat1 ,  getUserOfTheTask , addTask , setAddTask}) => {

    const {pendingTasks} = useSelector(state=>state.project);
    const {workingTasks} = useSelector(state=>state.project);
    const {terminatedTasks} = useSelector(state=>state.project);
    const {project} = useSelector(state=>state.project)  ; 

        
    const TaskHeader = ({classValue,title, etatValue , setEtat1 , length}) => {
        
        return (
            <div className={`task ${classValue} ${etat1 === etatValue ? "active" : ""}`} onClick={()=>setEtat1(etatValue)}>
                <div> {title}  </div>
                <div> {length} </div>
            </div>
        )
    }

    return (
        <>
            <div className="task-header-container">
                <div className="task-header">
                    <TaskHeader classValue="task-completed" title="Completed Task " length = {terminatedTasks?.length} etatValue={0} setEtat1={setEtat1} />
                    <TaskHeader classValue="task-working" title="Working Task" length= {workingTasks?.length}  etatValue={1}  setEtat1={setEtat1} />
                    <TaskHeader classValue="task-pending" title =" Pending Task" length={pendingTasks?.length}  etatValue={2}  setEtat1={setEtat1} />
                <div className={`page-line-commun page-line ${etat1===0 ? "left" : etat1===1 ? "center" : etat1===2 ? "right" : ""}`}></div>
                </div>
                {
                        etat1 === 0
                        ?
                        (<TaskComponent currentTaskUser={currentTaskUser} getUserOfTheTask={getUserOfTheTask} project={project} setAddTask={setAddTask} tasks={terminatedTasks} status="finished" />)
                        :
                        etat1 === 1 
                        ?
                        (<TaskComponent currentTaskUser={currentTaskUser} getUserOfTheTask={getUserOfTheTask} project={project} setAddTask={setAddTask} tasks={workingTasks} status="working"/>)
                        :
                        etat1 === 2
                        ?
                        (
                        <TaskComponent currentTaskUser={currentTaskUser}getUserOfTheTask={getUserOfTheTask} project={project} setAddTask={setAddTask} tasks={pendingTasks} status="pending"></TaskComponent>
                        )
                        :
                        (
                             null
                        )              
                } 

                {
                    addTask === true ?
                    <AddTaskPopUp setAddTask={setAddTask} />
                    :
                    (null)
                }
            
           </div>
        </>
    )
}
