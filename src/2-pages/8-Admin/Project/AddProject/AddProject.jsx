
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AddProject.css";
import { useEffect } from "react";
import { saveProject } from "../../../../4-actions/6-projects";
import { clearMessage } from "../../../../4-actions/message";
import { ResponseComponent } from "../../../../1-component";
import { PopUpClient } from "./PopUpClient/PopUpClient";
import { PopUpTeam } from "./PopUpTeam/PopUpTeam";
import { PopUpAddTask } from "./PopUpTask/PopUpTask";


export const AddProject = ({clicked , setClicked}) => {


    const {currentTeam} = useSelector(state=>state.team);

    const [isSubmited , setIsSubmited] = useState(false);
    
    const dispatch = useDispatch();

    

    // Form Data : 
    const [projectInfo , setProjectInfo] = useState(
        {
            name:"",
            resume :  "",
        }
    )

    // List to input  client change ! 
    const [changeClient , setChangeClient] = useState(false);

    // contain the client selected
    const [clientSelected , setClientSelected] = useState();

    // Listen when the user click on the validate button to choice the client ! 
    const [validateChoice , setValidateChoice] = useState(false);

    // list to the click to add new task 
    const [addTaskIsSelected , setAddTaskIsSelected] = useState(false);
    // la list des taches selected 
    const [tasksSelected  , setTasksSelected] = useState([]);
    //


    const [changeTeam , setChangeTeam] = useState(false);

    const [employeSelected , setEmployeSelected] = useState([]);



    /******************************************************* */
    
    // verifier les donnees saisie avant de valider l'ajout du projet .
    const DataIsValid = () => {
        if(employeSelected.length>1 && tasksSelected.length>0 && clientSelected != null && projectInfo.name!="" && projectInfo.resume!="")
            return true ; 
        return false ; 
    }

    const handleSubmitProject = () => {
        const teamId=currentTeam.id;
        const {name , resume} = projectInfo ;
        const tachesNames = tasksSelected.map(task=> task.name) ; 
        const clientName = clientSelected.name;
        dispatch(saveProject({ teamId, name , resume , tachesNames , clientName})) ; 
        setIsSubmited(true);
    }
    
    /******************************************************* */
        
    const testIfExiste = (data , id) => {
        var booleanResult = false ; 
            data.map(
                (myData) => {
                    if(myData.id === id)
                      {  booleanResult=true ;  return booleanResult; }
                }
            )
           return booleanResult;
    }


    const handleChange = (e) => {
        setProjectInfo({
            ...projectInfo , 
            [e.target.name] : e.target.value
        })
    }


    
    return (
        <>
            <div className={`page-add-employe-container   page-add-project-container`} >
                 <ResponseComponent dispatch={dispatch} isSubmited={isSubmited} classStyle="request-result-client" setIsSubmited={setIsSubmited} />

                    <div className="page-add-employe-content page-add-project-content">
                        <span className="close-page" onClick={()=>setClicked(!clicked)}> </span>
                        <div className="pop-up-title">
                            <h1> Keep the work up !</h1>
                            <h4> ADD NEW PROJECT  </h4>
                        </div>
                        <div className="page-body page-body-add-project">
                                <div className="form-group w-100">
                                    <label className="form-label"> Project Name </label>
                                    <input className="form-control" name="name" value={projectInfo.name} onChange={handleChange} placeholder="Tape name here  ... "></input>
                                </div>

                                <div className="form-group w-100">
                                    <label className="form-label"> Add Team  </label>
                                    <input className="form-control" placeholder="Select a team" onClick={()=>setChangeTeam(!changeTeam)}></input>
                                    {
                                    
                                        employeSelected.length >0 ? 
                                        (
                                            <span className="result-employes-selected" /* onClick={()=>{{setChangeTeam(!changeTeam) ; setValidateChoice(false)}}}*/>
                                                <span className="number-container"> {employeSelected.length} </span>
                                                <span> {employeSelected.length} employees has been selected </span>
                                                <span> <i className="fa fa-send"></i> </span>
                                            </span>
                                        )
                                        :
                                        (null)
                                
                                    }
                                </div>
                                <div className="form-group">
                                    <label> Select client </label>
                                    <input  className={`form-control input-client ${(clientSelected != null || clientSelected != undefined ) ? " not-active" : ""}`} onClick={()=>setChangeClient(!changeClient)} ></input>
                                    {
                                        (clientSelected != null || clientSelected != undefined)  
                                        ?
                                        (
                                            <span className="client-selected-container"> 
                                            <div><img src={"http://localhost:8080/clients/files/"+clientSelected?.photo}></img></div>
                                            <div>{clientSelected?.name}</div> 
                                            <div> <i className="fa fa-times-circle-o"  onClick={()=>setClientSelected(null)}></i> </div>
                                            </span>
                                            )
                                            :
                                            (null)
                                        }
                                </div>
                                <div className="form-group w-100">
                                    <label className="form-label"> Add Tasks  </label>
                                    <input className="form-control"  name="task" placeholder="add tasks here  ..." onClick={()=>setAddTaskIsSelected(true)}></input>
                                    {
                                    
                                    tasksSelected.length >0 ? 
                                    (
                                        <span className="result-employes-selected"  onClick={()=>{{setAddTaskIsSelected(true) }}}>
                                            <span className="number-container"> {tasksSelected.length} </span>
                                            <span> {tasksSelected.length} tasks has been selected </span>
                                            <span> <i className="fa fa-dollar"></i> </span>
                                        </span>
                                    )
                                    :
                                    (null)
                            
                                }
                                </div>
                                <div className="form-group w-100">
                                    <label className="form-label"> Add Resume  </label>
                                    <input className="form-control" value={projectInfo.resume} onChange={handleChange} name="resume" placeholder="Add a resume here ... "></input>
                                </div>
                                {
                                    DataIsValid() === true 
                                    ?
                                    (
                                        <div className="form-groupp submit-add-project w-100">
                                             <span className="button" onClick={handleSubmitProject}> <i className="fa fa-check-circle-o mr-1 mb-1"></i> Submit </span>
                                         </div>
                                    )
                                    :
                                    (
                                        <div className="form-groupp submit-add-project w-100 ">
                                            <span className="button text-white bg-danger"> <i className="fa fa-times-circle-o mr-1 mb-1"></i>Can't Submit </span>
                                         </div>
                                    )
                                }
                               
                        </div>
                    </div>
                    {
                    changeClient === true 
                    ? 
                    (
                        <PopUpClient dispatch={dispatch} setChangeClient={setChangeClient} setValidateChoice={setValidateChoice} validateChoice={validateChoice} setClientSelected={setClientSelected} clientSelected={clientSelected} /> 
                    ) 
                    : 
                    (null)
                    }
                    {
                    changeTeam === true 
                    ?
                    (
                        <PopUpTeam dispatch={dispatch} employeSelected={employeSelected}  setEmployeSelected={setEmployeSelected}  testIfExiste={testIfExiste}   setChangeTeam={setChangeTeam}  setValidateChoice={setValidateChoice} />
                    )
                    :
                    (null)
                    }
                    {
                    addTaskIsSelected  === true 
                    ?
                    (<PopUpAddTask  dispatch={dispatch}  setTasksSelected={setTasksSelected} tasksSelected={tasksSelected} setAddTaskIsSelected={setAddTaskIsSelected} />)
                    :
                    (null)
                    }
   
            </div>
        </>
    )


   
   

}
