
import { useState } from "react";
import "./Project.css";
import { SideBare } from "../../../1-component/SideBare/SideBare";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCategoryToProject, addClientToProject, addMemberToPendingList, addMemberToProject, addProjectChefToProject, getProject, getProjectFromServer, getProjects, removeEmployeFromTeam, removeProject, validateProject, validateTask } from "../../../4-actions/6-projects";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getTasks } from "../../../4-actions/3-task";
import profileDefault from "./../../../assets/profileDefault.jpg";
import { searchClient } from "../../../4-actions/7-client";
import { getCategories } from "../../../4-actions/10-category";
import { getEmployes } from "../../../4-actions/4-employes";
import { exclamation, folder } from "../../../assets";
import { PopUpAddEmployeTeam } from "./AddEmployeTeam/PopUpAddEmployeTeam";
import { PopUpAddChef } from "./AddProjectChef/PopUpAddChef";
import { PopUpAddCategory } from "./AddCategoryProject/PopUpAddCategory";
import { PopUpAddClientProject } from "./AddClientProject/PopUpAddClientProject";
import { LeftContentComponent } from "./LeftContent/LeftContent";
import { CenterContentComponent } from "./CenterContent/CenterContent";
import { RightContentComponent } from "./RightContent/RightContentComponent";


const  ProjectTest = ({navIsClicked  }) => {

    const {user} = useSelector(state=>state.auth);
    //
    const [etat , setEtat] = useState(0);
    const [etat1 , setEtat1] = useState(0);
    const [search , setSearch] = useState(0);
    
    const [currentTaskUser , setCurrentTaskUser ] = useState();
    const [addTask , setAddTask] = useState();
    //

    const [addEmployeToTeam , setAddEmployeToTeam] = useState(false );

    const [addProjectChef , setAddProjectChef]   = useState(false);

    const [addClient , setAddClient] = useState(false);

    const [addCategory , setAddCategory] = useState(false);

    //
    const {employes} = useSelector(state => state.employe); 

    //
    const { id } = useParams();

    const {project} = useSelector(state=>state.project);
    const {pendingTasks} = useSelector(state=>state.project);
    const {workingTasks} = useSelector(state=>state.project);
    const {terminatedTasks} = useSelector(state=>state.project);
    const {tasks} = useSelector(state=>state.task);
    //
    const {colors } = useSelector(state=>state.colors); 
    //
    const history = useHistory();



    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProject(id));
        dispatch(getTasks());
        setSearch(1);
    },[id]);


    useEffect(()=>{
        if(search === 1  && (project === null || project === undefined))
           {
             dispatch(getProjects());
             dispatch(getProjectFromServer(id));
             dispatch(getTasks());
             setSearch(2)
             dispatch(getEmployes());
           }
    },[project])

    
    
    
    /************************** SIMPLE FUNCTIONS ******************************** */
    
   
    const getRandomIndex = () =>{
        const val =  Math.floor(Math.random() * colors?.length) ; 
        return val ; 
    };

   //Pour chaque tach on voulais savoir l'employe afin de recupere les donnees , et afficher le responsable sur la tach 
    const getUserOfTheTask = (journalistId) => {
        var employe = null ; 
        project?.team?.journalistes.map(journalist=>{
            if(journalist.id == journalistId)
            {         
                employe = journalist ;
                setCurrentTaskUser(employe);
                return employe ; 
            }
        })
        return employe ; 
    }
    
    const hasRole = (role) => {
        for(var i=0 ; i<user?.roles.length ; i++)
        {
        for(var j=0 ; j<role.length ; j++)
        {
            if(user?.roles[i].role === role[j])
            return true ;
        }
    }
    return false ; 
    }
    if((search==2 && (project === null || project === undefined)))
        return (
            <div className="projects-empty  ">
                <div className="image" ><img src={exclamation} className="" /></div>
                <div className="project-empty-message"> Project cannot be found </div>
                <div className="go-back" onClick={() => history.push("/admin")}> <i className="fa fa-long-arrow-left"></i></div>
            </div>
    )

    if(search === 2 && project!==undefined && (project !== null ) )
    {
        if(hasRole(["ADMIN"]) === false && project?.projectChef?.id!==user?.id)
                history.push("/unauthorized")
            
    }


    /****************************** POP UP ADD EMPLOYE TO TEAM ! ************************************** */

    const AddEmployeToTeam = () => {

        const [selectedEmploye , setSelectedEmploye] = useState();

        const handleAddMember = () => {
            if(hasRole(["ADMIN"]))
            {
                console.log("im the admin");
                dispatch(addMemberToProject(project?.id , selectedEmploye.id));}
            else
            {dispatch(addMemberToPendingList(project?.id , selectedEmploye.id));}
            setAddEmployeToTeam(false);
        }

        const testIfExist = (id) => {
            var employeArray= [];
            employeArray = project
            .team
            .journalistes
            .filter(journalist => journalist.id===id);

            if(employeArray.length>0)
                return true ; 
            return false ;  
        }

        const userHasRole = (role , user) => {
            for(var i=0 ; i<user?.roles.length ; i++)
            {
            for(var j=0 ; j<role.length ; j++)
            {
                if(user?.roles[i].role === role[j])
                return true ;
            }
            }
            return false ; 
        }
    


        return (
        <div className={`page-add-employe-container`} >
            <div className="page-add-employe-content">
                <span className="close-page" onClick={()=>{setAddEmployeToTeam(false);setSelectedEmploye(null)}}> </span>
                <div className="page-header">
                    <h1> ADD NEW MEMBER TO TEAM </h1>
                    <h3> {project.name} </h3>
                    <span className="badge badge1"></span>
                </div>
               
                <div className="page-body page-add-employe-to-team">
                    <div className="body1">
                        <input type="text" className="" placeholder="search employe here ... "></input>
                    </div>
                    <div className="body2 webkit">
                        {
                            employes.filter(emp=>((testIfExist(emp.id)===false  && userHasRole(["ADMIN"],emp) === false ) && (project?.projectChef?.id !==emp.id)))
                            .map(employe=>{
                                return (
                                    <div className={`employe-container ${selectedEmploye?.id === employe.id ? " active" : ""}`} onClick={()=>setSelectedEmploye(employe)}>
                                        <div className="employe-image-container">
                                            <div className="employe-image">
                                                {
                                                    employe?.photo!=="" && employe?.photo!==null
                                                    ?
                                                    ( <img src={"http://localhost:8080/journalistes/files/"+employe.photo}></img>)
                                                    :
                                                    ( <img src={profileDefault}></img>)
                                                }
                                            </div>
                                        </div>
                                        <div className="employe-name" > <span style={{backgroundColor: colors[getRandomIndex()] }}>{employe.firstName + " " }{employe.secondName}</span> </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="footer">
                    {
                        selectedEmploye!=null 
                        ?
                        (
                        <button type="submit" onClick={handleAddMember}> <i className="fa fa-check-circle-o mr-2"></i> Submit </button>
                        )
                        :
                        (
                        <button type="submit " className="bg-danger text-black"> <i className="fa fa-times-o mr-2"></i> can't Submit </button>
                        )
                    }
                </div>

            </div>
        </div>
        )
    }

    /*********************************** POP UP ADD PROJECT CHEF !******************************************** */

    const AddProjectChefToProject = () => {

        const [selectedEmploye , setSelectedEmploye] = useState();

        const handleAddProjectChef = () => {
            dispatch(addProjectChefToProject(project?.id , selectedEmploye.id));
        }

        const testIfExist = (id) => {
            var employeArray= [];
            employeArray = project
            .team
            .journalistes
            .filter(journalist => journalist.id===id);

            if(employeArray.length>0)
                return true ; 
            return false ;  
        }

        return (
        <div className={`page-add-employe-container`} >
            <div className="page-add-employe-content">
                <span className="close-page" onClick={()=>{setAddProjectChef(false);setSelectedEmploye(null)}}> </span>
                <div className="page-header">
                    <h1> ADD NEW MEMBER TO TEAM </h1>
                    <h3> {project.name} </h3>
                    <span className="badge badge1"></span>
                </div>
               
                <div className="page-body page-add-employe-to-team">
                    <div className="body1">
                        <input type="text" className="" placeholder="search employe here ... "></input>
                    </div>
                    <div className="body2 webkit">
                        {
                            employes
                            .filter(emp=>testIfExist(emp.id)===false)
                            .map(journalist=>{
                                var founded = false ; 
                                journalist.roles.map(role=>{
                                    if(role.role === "CHEF")
                                        founded = true ;  
                                })
                                if(founded)
                                    return journalist ; 
                                return null ; 
                            })
                            .filter(journalist=>journalist!==null) 
                            .map(employe=>{
                                return (
                                    <div className={`employe-container ${selectedEmploye?.id === employe.id ? " active" : ""}`} onClick={()=>setSelectedEmploye(employe)}>
                                        <div className="employe-image-container">
                                            <div className="employe-image">
                                                {
                                                    employe?.photo!=="" && employe?.photo!==null
                                                    ?
                                                    ( <img src={"http://localhost:8080/journalistes/files/"+employe.photo}></img>)
                                                    :
                                                    ( <img src={profileDefault}></img>)
                                                }
                                            </div>
                                        </div>
                                        <div className="employe-name" > <span style={{backgroundColor: colors[getRandomIndex()] }}>{employe.firstName + " " }{employe.secondName}</span> </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="footer">
                    {
                        selectedEmploye!=null 
                        ?
                        (
                        <button type="submit" onClick={handleAddProjectChef}> <i className="fa fa-check-circle-o mr-2"></i> Submit </button>
                        )
                        :
                        (
                        <button type="submit " className="bg-danger text-black"> <i className="fa fa-times-o mr-2"></i> can't Submit </button>
                        )
                    }
                </div>

            </div>
        </div>
        )
    }

    /**************************************** POP UP ADD CATEGORY ********************************************* */

    const AddCategoryToProject  = () => {

        const [selectedCategory , setSelectedCategory] = useState(null);


        const {categories} = useSelector(state=>state.category);

        useEffect(()=>{
            dispatch(getCategories())
        },[])

        const handleAddCategoryToProject = () => {
           dispatch(addCategoryToProject(project?.id , selectedCategory.name));
           setAddCategory(false)
        }



        const DisplayCategories = () => {
            return (
                categories?.map(category=>{
                    return(
                        <div className={`category-container ${selectedCategory?.categoryId === category.categoryId ? " active" : ""}` } onClick={()=>setSelectedCategory(category)}>
                            <div className="category-name-circle">
                            {category.name.slice(0,1).toUpperCase()+category.name.slice(1,2).toLowerCase()}
                            </div>
                            <div className="category-name">{category.name.slice(0,1).toUpperCase()+category.name.slice(1,category.name.length).toLowerCase()}</div>
                        </div>
                    )
                })
            )
        }
        
        return (
        <div className={`page-add-employe-container`} >
            <div className="page-add-employe-content">
                <span className="close-page" onClick={()=>{setAddCategory(false);setSelectedCategory(null)}}> </span>
                <div className="page-header">
                    <h1> ADD Category TO THE PROJECT  </h1>
                    <h3> {project.name} </h3>
                    <span className="badge badge1"></span>
                </div>
               
                <div className="page-body page-add-employe-to-team">
                    <div className="body1">
                        <input   placeholder="search category here ... "></input>
                    </div>
                    <div className="body2 webkit">
                        <DisplayCategories />
                    </div>
                </div>

                <div className="footer">
                {
                    selectedCategory!==null 
                    ?
                    (
                    <button type="submit" onClick={handleAddCategoryToProject}> <i className="fa fa-check-circle-o mr-2"></i> Submit </button>
                    )
                    :
                    (
                    <button type="submit " className="bg-danger text-black"> <i className="fa fa-times-o mr-2"></i> can't Submit </button>
                    )
                }
                </div>

            </div>
        </div>
        )
    }

    /****************************************** POP UP  ADD CLIENT TO PROJECT ************************************************ */
    const AddClientToProject = () => {

        const [selectedClient , setSelectedClient] = useState();
        const [clientKey , setClientKey] = useState("");

        const {clients} = useSelector(state=>state.client);
        const {clientsSearched} = useSelector(state=>state.client);

        useEffect(()=>{
            if(clientKey!==null)
                dispatch(searchClient(clientKey))
        },[clientKey])

        const handleAddClientToProject = () => {
           dispatch(addClientToProject(project.id , selectedClient));
           setAddClient(false)
        }

        const ClientComponent = ({client}) => {
            return (
                <div className={`employe-container ${selectedClient?.id === client.id ? " active" : ""}`} onClick={()=>setSelectedClient(client)}>
                    <div className="employe-image-container">
                        <div className="employe-image">
                            {
                                client?.photo!=="" && client?.photo!==null
                                ?
                                ( <img src={"http://localhost:8080/clients/files/"+client.photo}></img>)
                                :
                                ( <img src={profileDefault}></img>)
                            }
                        </div>
                    </div>
                    <div className="employe-name" > <span style={{backgroundColor: colors[getRandomIndex()] }}>{client.name}</span> </div>
                </div>
            )
        }

        const DisplayClients = () => {
            return (

                clientsSearched!==null && clientsSearched !== undefined && clientsSearched.length>0 
                ?
                (
                    clientsSearched
                    ?.map(client=>{
                        return(
                            <ClientComponent  client={client}/>
                        )
                    })
                )
                :
                (
                    clients
                    ?.map(client=>{
                        return (
                            <ClientComponent  client={client}/>
                        )
                    })
                )
                
                
            )
        }


        return (
        <div className={`page-add-employe-container`} >
            <div className="page-add-employe-content">
                <span className="close-page" onClick={()=>{setAddClient(false);setSelectedClient(null)}}> </span>
                <div className="page-header">
                    <h1> ADD CLIENT TO THE PROJECT  </h1>
                    <h3> {project.name} </h3>
                    <span className="badge badge1"></span>
                </div>
               
                <div className="page-body page-add-employe-to-team">
                    <div className="body1">
                        <input  onChange={(e)=>setClientKey(e.target.value)} value={clientKey} type="text" className="" placeholder="search client here ... "></input>
                    </div>
                    <div className="body2 webkit">
                        <DisplayClients />
                    </div>
                </div>

                <div className="footer">
                    {
                        selectedClient!==null 
                        ?
                        (
                        <button type="submit" onClick={handleAddClientToProject}> <i className="fa fa-check-circle-o mr-2"></i> Submit </button>
                        )
                        :
                        (
                        <button type="submit " className="bg-danger text-black"> <i className="fa fa-times-o mr-2"></i> can't Submit </button>
                        )
                    }
                </div>

            </div>
        </div>
        )
    }


    /***************************** PARTIE QUI CONTIENT TOUS LES INFORMATIONS SUR LE PROJET ( A GAUCHE ) ********************** */
   

    // const LeftContent = () => {

    //     const history = useHistory();

    //       //Calculer l'avancement du projet ! entouré !
    //     const calculateAvancements = ()=> {
    //         var completed = 0 ; 
    //             project?.tasks?.map(task=>{
    //                 if(task.tachStatus === "FINISHED")
    //                     completed++ ; 
    //             })
    //             setColor("blue")
    //             return ~~((completed/project?.tasks?.length )*100) ; 
    //     }

    //     const setColor =  (newColor) => {
    //         document.documentElement.style.setProperty('--logo-color', newColor);
    //     }

    //     const handleRemoveEmploye = (project , employe) => {
    //         dispatch(removeEmployeFromTeam(project , employe))
    //     }

    //     const handleValidateProject = (project) => {
    //         dispatch(validateProject(project , history));
    //     }
    //     const handleRemoveProject = (project) => {
    //         dispatch(removeProject(project , history));
    //     }

    //     return(
            
    //         <div className="details-project">
    //             <div className="details-project-header"> 
    //                 <div className="commune name">{project?.name}</div>
    //                 <div className="commune date"> The project has been started at {customDate(project?.creationDate)} ~~ {project?.projectStatus}</div>
    //             </div>  
    //             <div className="details-project-body">
    //                 <div className="commune project-tach"> 
    //                     <div className="tach-title">
    //                         <div> Tach Status</div>
    //                         <div className="d-flex flex-wrap">
    //                             <span className="w-100"> {calculateAvancements()} % </span>
    //                             <span className="w-100">Work Done</span>
    //                         </div>
    //                     </div> 
    //                 </div>
    //                 <div className="commune project-team">
    //                     <div className="title-name"> Project Category  </div>
    //                     {
    //                     project?.categoryName !== "" && project?.categoryName!==null && project?.categoryName!==undefined
    //                       ?
    //                       (
    //                           <div className="category-container">
    //                              <div className="category-name-circle">
    //                                 {project.categoryName.slice(0,1).toUpperCase()+project.categoryName.slice(1,2).toLowerCase()}
    //                              </div>
    //                              <div className="category-name">{project.categoryName.slice(0,1).toUpperCase()+project.categoryName.slice(1,project.categoryName.length).toLowerCase()}</div>
    //                           </div>
    //                       )
    //                       :
    //                       (
    //                         <div className="category-container" onClick={()=>setAddCategory(true)}>
    //                             <div className="category-name-circle circle-add">
    //                                 <i className="fa fa-plus"></i>
    //                             </div>
    //                             <div className="category-name"> New Category </div>
    //                         </div>   
    //                       )
    //                     }
    //                 </div>
    //                 <div className="commune project-team">
    //                     <div className="title-name"> The Complete Team </div>
    //                     {console.log("the project" , project)}
    //                     {
    //                     project?.team?.journalistes?.map(journalist=>{
    //                         return (
    //                             <div className="team-container" key={journalist.id}>
    //                                 {
    //                                     hasRole(["ADMIN"]) === true && project.projectStatus !== "FINISHED"
    //                                     ?
    //                                     (<i className="fa fa-times" onClick={()=>handleRemoveEmploye(project , journalist)}></i>)
    //                                     :
    //                                     (null)
    //                                 }
                                    
    //                                 <div className="image-container">
    //                                     {
    //                                         journalist?.photo !== null && journalist?.photo!==""
    //                                         ?
    //                                         (
    //                                             <img src={"http://localhost:8080/journalistes/files/"+journalist?.photo}></img>
    //                                         )
    //                                         :
    //                                         (
    //                                             <img src={profileDefault}></img>
    //                                         )
    //                                     }
    //                                 </div>
    //                                 <div className="username">
    //                                     {journalist?.firstName} {journalist?.secondName}
    //                                 </div>
    //                             </div>
    //                         )
    //                     })
    //                     }
    //                     {
    //                     project?.pendingJouranlistes?.map(journalist=>{
    //                         return (
    //                             <div className="team-container" key={journalist.id}>
    //                                 <div className="image-container">
    //                                     {
    //                                         journalist?.photo !== null && journalist?.photo!==""
    //                                         ?
    //                                         (
    //                                             <img src={"http://localhost:8080/journalistes/files/"+journalist?.photo}></img>
    //                                         )
    //                                         :
    //                                         (
    //                                             <img src={profileDefault}></img>
    //                                         )
    //                                     }
    //                                 </div>
    //                                 <div className="username">
    //                                     {journalist?.firstName} {journalist?.secondName}
    //                                 </div>
    //                                 <i className="fa fa-refresh"></i>
    //                             </div>
    //                         )
    //                     })
    //                     }
    //                     {
    //                         project?.projectStatus !=="FINISHED"
    //                         ?
    //                         (
    //                             <div className="team-container"  onClick={()=>setAddEmployeToTeam(true)}>
    //                                 <i className="fa fa-plus"></i>
    //                             </div>  
    //                         )
    //                         :
    //                         (null)
    //                     }
    //                 </div>
    //                 <div className="commune project-team">        
    //                     <div className="title-name"> Project Chef  </div>
    //                         {
    //                             project?.projectChef !== null && project?.projectChef !== undefined 
    //                             ?
    //                             (
    //                                 <div className="team-container" >
    //                                     <div className="image-container">
    //                                     {
    //                                         project?.projectChef?.photo !== null && project?.projectChef?.photo!==""
    //                                         ?
    //                                         (
    //                                             <img src={"http://localhost:8080/journalistes/files/"+project?.projectChef?.photo}></img>
    //                                         )
    //                                         :
    //                                         (
    //                                             <img src={profileDefault}></img>
    //                                         )
    //                                     }
    //                                     </div>
    //                                     <div className="username">
    //                                         {project?.projectChef?.firstName} {project?.projectChef?.secondName}
    //                                     </div>
    //                                 </div>

    //                             )
    //                             :
    //                             project?.projectStatus !== "FINISHED"
    //                             ?
    //                             (
    //                                 <div className="team-container" onClick={()=>setAddProjectChef(true)}>
    //                                 <i className="fa fa-plus"></i>
    //                                 </div>  
    //                             )
    //                             :
    //                             (null)

    //                         }
    //                 </div>
    //                 <div className="commune project-team">        
    //                     <div className="title-name"> Project Client  </div>
    //                         {
    //                             project?.client !== null && project?.client !== undefined 
    //                             ?
    //                             (
    //                                 <div className="team-container" >
    //                                     <div className="image-container">
    //                                     {
    //                                         project?.client?.photo !== null && project?.client?.photo!==""
    //                                         ?
    //                                         (
    //                                             <img src={"http://localhost:8080/clients/files/"+project?.client?.photo}></img>
    //                                         )
    //                                         :
    //                                         (
    //                                             <img src={profileDefault}></img>
    //                                         )
    //                                     }
    //                                     </div>
    //                                     <div className="username">
    //                                         {project?.client?.name} 
    //                                     </div>
    //                                 </div>

    //                             )
    //                             :
    //                             (
    //                                 <div className="team-container" onClick={()=>setAddClient(true)}>
    //                                 <i className="fa fa-plus"></i>
    //                                 </div>  
    //                             )
    //                         }
    //                 </div>
    //                 <div className=" commune project-resume">
    //                     <div className="title-name"> Resume</div>
    //                     <div className="resume"> 
    //                         {project?.resume}
    //                     </div>
    //                 </div>
    //                 <div className=" project-actions ">
    //                     <div className="title-name">  Actions </div>
    //                     <div className="actions mt-2">
    //                         {/* {
    //                            hasRole("ADMIN") === true 
    //                            ?
    //                            (  <span> <i className="fa fa-times"></i> delete </span>)
    //                            :
    //                            (null)
    //                         } */}
    //                         {
    //                             project?.projectStatus === "FINISHED"
    //                             ?
    //                             (
    //                                 <span className="valider" onClick={()=>handleValidateProject(project)}> <i className="fa fa-check mr-1"></i> <>valider</>  </span>        
    //                             )
    //                             :
    //                             (
    //                                 <span className="valider validated"> <i className="fa fa-times mr-1"></i> <> cant Validated</>  </span>        
    //                             )
    //                         }
    //                         <span className="delete" onClick={()=>handleRemoveProject(project)}> <i className="fa fa-times mr-1"></i> <>delete</>  </span>
    //                 </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }



   // TASK TABS !
    
   
//    const CenterContent = () => {
        
//         const TaskHeader = ({classValue,title, etatValue , setEtat1 , length}) => {
            
//             return (
//                 <div className={`task ${classValue} ${etat1 === etatValue ? "active" : ""}`} onClick={()=>setEtat1(etatValue)}>
//                     <div> {title}  </div>
//                     <div> {length} </div>
//                 </div>
//             )
//         }
//         return (
//             <>
//                 <div className="task-header-container">
//                     <div className="task-header">
//                         <TaskHeader classValue="task-completed" title="Completed Task " length = {terminatedTasks?.length} etatValue={0} setEtat1={setEtat1} />
//                         <TaskHeader classValue="task-working" title="Working Task" length= {workingTasks?.length}  etatValue={1}  setEtat1={setEtat1} />
//                         <TaskHeader classValue="task-pending" title =" Pending Task" length={pendingTasks?.length}  etatValue={2}  setEtat1={setEtat1} />
//                     <div className={`page-line-commun page-line ${etat1===0 ? "left" : etat1===1 ? "center" : etat1===2 ? "right" : ""}`}></div>
//                     </div>
//                     {
//                             etat1 === 0
//                             ?
//                             (<TaskComponent currentTaskUser={currentTaskUser} getUserOfTheTask={getUserOfTheTask} project={project} setAddTask={setAddTask} tasks={terminatedTasks} status="finished" />)
//                             :
//                             etat1 === 1 
//                             ?
//                             (<TaskComponent currentTaskUser={currentTaskUser} getUserOfTheTask={getUserOfTheTask} project={project} setAddTask={setAddTask} tasks={workingTasks} status="working"/>)
//                             :
//                             etat1 === 2
//                             ?
//                             (
//                             <TaskComponent currentTaskUser={currentTaskUser}getUserOfTheTask={getUserOfTheTask} project={project} setAddTask={setAddTask} tasks={pendingTasks} status="pending"></TaskComponent>
//                             )
//                             :
//                             (
//                                  null
//                             )              
//                     } 

//                     {
//                         addTask === true ?
//                         <AddTaskPopUp setAddTask={setAddTask} />
//                         :
//                         (null)
//                     }
//                </div>
//             </>
//         )
//     }

    
    // const RightContent = () => {

    //     const handleChangeTaskStatus = (task) => {
    //         dispatch(validateTask(project , task));
    //     }

    //     return(
            
    //         <div className="details-project">
    //             <div className="list-task-working">
    //             {
    //                 workingTasks.map(task => {
    //                     var user =   getUserOfTheTask(task.journalistId);                           
    //                     return (
    //                             <div className="task-container">
    //                                 <div className="task-image-user-container">
    //                                     <div className="image-container">
    //                                         {
    //                                             user?.photo !== null && user?.photo!==undefined && user.photo !=="" 
    //                                             ?
    //                                             (<><img src={"http://localhost:8080/journalistes/files/"+user?.photo} /></>)
    //                                             :
    //                                             (<><img src={"http://localhost:8080/journalistes/files/profileDefault.jpg"} /></>)
    //                                         }
    //                                     </div>
    //                                 </div>
    //                                 <div className="task-info">
    //                                     <span className="task-username">{user?.firstName+" "} {user?.secondName}</span>
    //                                     <span className="task-name">{task?.name}</span>
    //                                 </div>
    //                                 <div className="task-validate">
    //                                     <i className="fa fa-check"  onClick={()=>handleChangeTaskStatus(task)}></i>
    //                                 </div>
    //                             </div>
    //                     )
    //                 })
    //             }
    //             </div>
    //         </div>
    //     )
    // }

    /**************************************************************** */

    /**************************************************** */

    const DisplayContent = () => {
        switch(etat)
        {
            case 0 : return <LeftContentComponent hasRole={hasRole} dispatch={dispatch} setAddEmployeToTeam={setAddEmployeToTeam} setAddProjectChef={setAddProjectChef} setAddClient={setAddClient} setAddCategory={setAddCategory} />
            case 1 : return <CenterContentComponent etat1={etat1}  setEtat1={setEtat1} currentTaskUser={currentTaskUser}  getUserOfTheTask={getUserOfTheTask}  setAddTask={setAddTask} addTask={addTask}  />
            case 2 : return <RightContentComponent dispatch={dispatch}  getUserOfTheTask={getUserOfTheTask} />
            default : return <LeftContentComponent hasRole={hasRole} dispatch={dispatch} setAddEmployeToTeam={setAddEmployeToTeam} setAddProjectChef={setAddProjectChef} setAddClient={setAddClient} setAddCategory={setAddCategory} />
        }
    }

    return (
        <div className="page-container">
            <SideBare navIsClicked = {navIsClicked} />
            <div className="page-main">
                <ul className="nav-tab">
                    <li className={`nav-item ${etat===0 ? "active" : ""}`} onClick={()=>setEtat(0)}>Details</li>
                    <li className={`nav-item ${etat===1 ? "active" : ""}`} onClick={()=>setEtat(1)}>Tasks</li>
                    <li className={`nav-item ${etat===2 ? "active" : ""}`} onClick={()=>setEtat(2)}>Configuration</li>
                </ul>
            <div className={`page-line-commun page-line ${etat===0 ? "left" : etat===1 ? "center" : etat===2 ? "right" : ""}`}></div>
            <div className="page-content">
                <DisplayContent />
            </div>
            </div>
            {
                addEmployeToTeam === true 
                ?
                (<PopUpAddEmployeTeam dispatch={dispatch} hasRole={hasRole}  setAddEmployeToTeam={setAddEmployeToTeam}  getRandomIndex={getRandomIndex}  colors={colors} />)
                :
                (null)
             }
            {
                addProjectChef === true 
                ?
                (<PopUpAddChef dispatch={dispatch}  setAddProjectChef={setAddProjectChef} colors={colors} getRandomIndex={getRandomIndex}/>)
                :
                (null)
             }
            {
                addClient === true 
                ?
                (<PopUpAddClientProject dispatch={dispatch}  setAddClient={setAddClient}  colors={colors}  getRandomIndex={getRandomIndex} />)
                :
                (null)
             }
            {
                addCategory === true 
                ?
                (<PopUpAddCategory dispatch={dispatch} setAddCategory={setAddCategory} />)
                :
                (null)
             }
        </div>
    )

}

export default ProjectTest ; 