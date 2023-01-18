import { useState } from "react";
import { useSelector } from "react-redux";
import { saveTask, searchTask } from "../../../../../4-actions/3-task";

export const PopUpAddTask = ({dispatch , setTasksSelected, tasksSelected , setAddTaskIsSelected  }) => {

    const [taskKey , setTaskKey] = useState('');
    const [error  , setError] = useState("");
    const [name , setName] = useState('');

    const {tasks} = useSelector(state=>state.task);

    const {tasksSearched} = useSelector(state=>state.task);


    if(tasks!=null)
        console.log("okok")

    const testTaskIfExist = (tasks , taskName) => {
        var booleanResult = false ; 
         tasks.map(task=>{
            if(task.name === taskName)
             {  
                 booleanResult = true ;
                 return booleanResult;
            }  
            return booleanResult;
        })    
        return booleanResult;
    }

    const handleChangeTaskName=(e) => {
        setName(e.target.value)
        if(name.length<=2)
            setError("at least 3 letters")
        else
        {
              
            if(testTaskIfExist(tasks,e.target.value) === true)
                {
                    setError("this task already existe ")
                }
            else
                setError("")
        }    
    }
    
    const addTaskToList = (mytask ) => {
        if(testTaskIfExist(tasksSelected , mytask.name) === false)
            setTasksSelected((prev)=>[...prev , mytask]);
        else
            {
                let array = [...tasksSelected];
                array.pop(mytask);
                setTasksSelected(array);
            }
    }

    const handleSubmitListTach = () => {
            setAddTaskIsSelected(false);
    }

    const handleSubmit   = (e)=> {
        dispatch(saveTask(name))
        setName("")
    }

    const  handleChangeTaskKey = (e) => {
        setTaskKey(e.target.value);
        dispatch(searchTask(e.target.value))
    }

    const DisplayTasks = () => {

        const TaskComponent = ({task}) => {
                return (
                    <div className={`task-container new-project ${ testTaskIfExist(tasksSelected , task.name) == true ? " active" :"" }`} onClick={()=>addTaskToList(task)}>
                        <i class="fa fa-usd mr-2" aria-hidden="true"></i>
                        <span>{task.name}</span>  
                        <i class="fa fa-tasks" aria-hidden="true"></i>
                    </div>
                )
        }

        return (
            tasksSearched !=null && tasksSearched!= undefined && tasksSearched.length>0
            ?

            (
                <>
                    <div className="list list-tasks">
                        {tasksSearched.map(task=>{
                            return (
                                <TaskComponent task={task} />
                            )
                        })}
                    </div>
                </>
                
            )
            :
            (
                tasks?.length > 0 
                ?
                (
                    <div className="list list-tasks">
                    {    
                        tasks.map(task=>{
                            return (
                                <TaskComponent task={task} />
                            )
                        })
                    }
                    </div>
                )
                :
                (null)
            )
            
        )
    }

    return (
        <div className="pop-up-client-container">
        <div className=" pop-up-client-content pop-up-add-task-content">
                <span className="close-page" onClick={()=>setAddTaskIsSelected(false)}> </span>
            <div className="pop-up-title">
                <h2> KEEP THE PROJECT  BIGGER !</h2>
                <h5> ADD NEW TASK </h5>
                <span className="badg"  >  </span>
            </div>
           <div className="pop-up-body content-body">
           <div className="form-groupp">
            {/* Add new task  */}
                <input  value={name} name="name" onChange={handleChangeTaskName}   placeholder="! existe = true ? add name here : look down ...   " />
                <p className="text-danger"> {error} </p>
                {error == "" && name != "" ?
                    (
                    <span className="submit" onClick={()=>handleSubmit()} > <i className="fa fa-check-circle-o"></i> submit </span>
                    )
                    :
                    ( 
                    <span className="unsubmit"  > <i className="fa fa-times-circle-o"></i> can't submit </span>
                    )
                }
            </div>
                {
                    tasksSelected?.length > 0 
                    ?
                    (
                        <div className="list list-selected">
                            {
                                tasksSelected?.map(task=>{
                                    return(
                                        <div className="task-selected task-container " > 
                                            <span>{task.name}</span>  <i className="fa fa-times-circle-o" ></i>
                                        </div>
                                    )

                                })
                            }
                         </div>
                    )
                    :
                    (null)
                }
                    
            <div className="form-groupp">
                <input type="text" value={taskKey} onChange={handleChangeTaskKey} name="taskKey" placeholder="Type the text here ... " />
            </div>
            <DisplayTasks />
            <div className="form-groupp">
                {
                tasksSelected.length > 0  ?
                    (
                    <span className="submit" onClick={()=>handleSubmitListTach()} > <i className="fa fa-check-circle-o"></i> submit </span>
                    )
                    :
                    ( 
                    <span className="unsubmit"  > <i className="fa fa-times-circle-o"></i> can't submit </span>
                    )
                }
            </div>
           </div>
            
        </div>
    </div>
    )
}