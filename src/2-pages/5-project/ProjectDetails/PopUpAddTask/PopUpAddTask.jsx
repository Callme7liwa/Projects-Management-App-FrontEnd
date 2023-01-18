import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveTask } from "../../../../4-actions/3-task";
import { addListTasksToProject, getProject } from "../../../../4-actions/6-projects";
import "./PopUpAddTask.css";

const AddTaskPopUp = ({setAddTask}) => {


    const [name , setName] = useState("");
    const [error ,setError] = useState("");
    const {tasks} = useSelector(state=>state.task);
    const dispatch = useDispatch();
    const [tasksSelected  , setTasksSelected] = useState([]);
    const {project} = useSelector(state=>state.project);


  

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
        
        if(testTaskIfExist(project?.tasks , mytask.name) === false &&  testTaskIfExist(tasksSelected , mytask.name) === false)
             setTasksSelected((prev)=>[...prev , mytask]);
        else
            {
                let array = [...tasksSelected];
                array.pop(mytask);
                setTasksSelected(array);
            }
    }

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

    const handleSubmit   = (e)=> {
        dispatch(saveTask(name))
    }

    const handleSubmitListTach = () => {
        let taches = [];
        taches  = tasksSelected.map(task=>{return task.name}) ;
        dispatch(addListTasksToProject(project.id , taches))       
        setTasksSelected([]);  
    }

    return (
        <div className="pop-up-add-task-container">
        <div className="pop-up-add-task-content">
            <i className="fa fa-times" onClick={()=>setAddTask(false)}></i>
            <div className="content-header">
                <h2> Keep the project bigger ! </h2>
                <h4> add a  task  </h4>
                <span className="badge"> </span>
            </div>
            <div className="content-body">
                <div className="form-groupp">
                    <input  value={name} name="name" onChange={handleChangeTaskName}  className="text-white"   placeholder="! existe = true ? add name here : look down ...   " />
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
                                            <div className="task-selected task-container" > 
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
                    <input type="text" name="" placeholder="Type the text here ... " />
                </div>

                    {
                        tasks?.length > 0 
                        ?
                        (
                            <div className="list list-tasks">
                            {    
                                tasks.map(task=>{


                                    return (
                                        <div className={`task-container ${ testTaskIfExist(project?.tasks,task.name) == true  ? "active bg-warning" : testTaskIfExist(tasksSelected , task.name) == true ? " active" :"" }`} onClick={()=>addTaskToList(task)}>
                                            <i class="fa fa-usd mr-2" aria-hidden="true"></i>
                                            <span>{task.name}</span>  
                                            <i class="fa fa-tasks" aria-hidden="true"></i>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        )
                        :
                        (null)
                    }

                    {error == "" && name != "" ?
                        (
                        <span className="submit" onClick={()=>handleSubmit()} > <i className="fa fa-check-circle-o"></i> submit </span>
                        )
                        :
                        ( 
                        <span className="unsubmit"  > <i className="fa fa-times-circle-o"></i> can't submit </span>
                        )
                    }
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

export default AddTaskPopUp ; 