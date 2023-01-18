import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeEmployeFromTeam, removeProject, validateProject } from "../../../../4-actions/6-projects";
import { profileDefault } from "../../../../assets";

export const LeftContentComponent = ({ hasRole , dispatch , setAddEmployeToTeam,setAddProjectChef , setAddClient , setAddCategory}) => {

    const history = useHistory();

    const {project} = useSelector(state=>state.project);
    const {pendingTasks} = useSelector(state=>state.project);
    const {workingTasks} = useSelector(state=>state.project);
    const {terminatedTasks} = useSelector(state=>state.project);

     // Avoir  la date en format dd//mm//yy et non en format date time 
     const customDate = (date) => {
        return date?.slice(0,10);
    }


      //Calculer l'avancement du projet ! entouré !
    const calculateAvancements = ()=> {
        var somme = workingTasks?.length+pendingTasks?.length ;
        if(somme === 0  )
            if(terminatedTasks?.length > 0)
                return  100;
            else
                 return 0 ; 
        else
            return ~~((terminatedTasks?.length/(workingTasks?.length+pendingTasks?.length+terminatedTasks?.length))*100) ;


        
    }

    const setColor =  (newColor) => {
        document.documentElement.style.setProperty('--logo-color', newColor);
    }

    const handleRemoveEmploye = (project , employe) => {
        dispatch(removeEmployeFromTeam(project , employe))
    }

    const handleValidateProject = (project) => {
        dispatch(validateProject(project , history));
    }
    const handleRemoveProject = (project) => {
        dispatch(removeProject(project , history));
    }

    return(
        
        <div className="details-project">
            <div className="details-project-header"> 
                <div className="commune name">{project?.name}</div>
                <div className="commune date"> The project has been started at {customDate(project?.creationDate)} ~~ {project?.projectStatus}</div>
            </div>  
            <div className="details-project-body">
                <div className="commune project-tach"> 
                    <div className="tach-title">
                        <div> Tach Status</div>
                        <div className="d-flex flex-wrap">
                            <span className="w-100"> {calculateAvancements()} % </span>
                            <span className="w-100">Work Done</span>
                        </div>
                    </div> 
                </div>
                <div className="commune project-team">
                    <div className="title-name"> Project Category  </div>
                    {
                    project?.categoryName !== "" && project?.categoryName!==null && project?.categoryName!==undefined
                      ?
                      (
                          <div className="category-container">
                             <div className="category-name-circle">
                                {project.categoryName.slice(0,1).toUpperCase()+project.categoryName.slice(1,2).toLowerCase()}
                             </div>
                             <div className="category-name">{project.categoryName.slice(0,1).toUpperCase()+project.categoryName.slice(1,project.categoryName.length).toLowerCase()}</div>
                          </div>
                      )
                      :
                      (
                        <div className="category-container" onClick={()=>setAddCategory(true)}>
                            <div className="category-name-circle circle-add">
                                <i className="fa fa-plus"></i>
                            </div>
                            <div className="category-name"> New Category </div>
                        </div>   
                      )
                    }
                </div>
                <div className="commune project-team">
                    <div className="title-name"> The Complete Team </div>
                    {
                    project?.team?.journalistes?.map(journalist=>{
                        return (
                            <div className="team-container" key={journalist.id}>
                                {
                                    hasRole(["ADMIN"]) === true && project.projectStatus !== "FINISHED"
                                    ?
                                    (<i  style={{zIndex : 999999}} className="fa fa-times" onClick={()=>handleRemoveEmploye(project , journalist)}></i>)
                                    :
                                    (null)
                                }
                                
                                <div className="image-container">
                                    {
                                        journalist?.photo !== null && journalist?.photo!==""
                                        ?
                                        (
                                            <img src={"http://localhost:8080/journalistes/files/"+journalist?.photo}></img>
                                        )
                                        :
                                        (
                                            <img src={profileDefault}></img>
                                        )
                                    }
                                </div>
                                <div className="username">
                                    {journalist?.firstName} {journalist?.secondName}
                                </div>
                            </div>
                        )
                    })
                    }
                    {
                    project?.pendingJouranlistes?.map(journalist=>{
                        return (
                            <div className="team-container" key={journalist.id}>
                                <div className="image-container">
                                    {
                                        journalist?.photo !== null && journalist?.photo!==""
                                        ?
                                        (
                                            <img src={"http://localhost:8080/journalistes/files/"+journalist?.photo}></img>
                                        )
                                        :
                                        (
                                            <img src={profileDefault}></img>
                                        )
                                    }
                                </div>
                                <div className="username">
                                    {journalist?.firstName} {journalist?.secondName}
                                </div>
                                <i className="fa fa-refresh"></i>
                            </div>
                        )
                    })
                    }
                    {
                        project?.projectStatus !=="FINISHED"
                        ?
                        (
                            <div className="team-container"  onClick={()=>setAddEmployeToTeam(true)}>
                                <i className="fa fa-plus"></i>
                            </div>  
                        )
                        :
                        (null)
                    }
                </div>
                <div className="commune project-team">        
                    <div className="title-name"> Project Chef  </div>
                        {
                            project?.projectChef !== null && project?.projectChef !== undefined 
                            ?
                            (
                                <div className="team-container" >
                                    <div className="image-container">
                                    {
                                        project?.projectChef?.photo !== null && project?.projectChef?.photo!==""
                                        ?
                                        (
                                            <img src={"http://localhost:8080/journalistes/files/"+project?.projectChef?.photo}></img>
                                        )
                                        :
                                        (
                                            <img src={profileDefault}></img>
                                        )
                                    }
                                    </div>
                                    <div className="username">
                                        {project?.projectChef?.firstName} {project?.projectChef?.secondName}
                                    </div>
                                </div>

                            )
                            :
                            project?.projectStatus !== "FINISHED"
                            ?
                            (
                                <div className="team-container" onClick={()=>setAddProjectChef(true)}>
                                <i className="fa fa-plus"></i>
                                </div>  
                            )
                            :
                            (null)

                        }
                </div>
                <div className="commune project-team">        
                    <div className="title-name"> Project Client  </div>
                        {
                            project?.client !== null && project?.client !== undefined 
                            ?
                            (
                                <div className="team-container" >
                                    <div className="image-container">
                                    {
                                        project?.client?.photo !== null && project?.client?.photo!==""
                                        ?
                                        (
                                            <img src={"http://localhost:8080/clients/files/"+project?.client?.photo}></img>
                                        )
                                        :
                                        (
                                            <img src={profileDefault}></img>
                                        )
                                    }
                                    </div>
                                    <div className="username">
                                        {project?.client?.name} 
                                    </div>
                                </div>

                            )
                            :
                            (
                                <div className="team-container" onClick={()=>setAddClient(true)}>
                                <i className="fa fa-plus"></i>
                                </div>  
                            )
                        }
                </div>
                <div className=" commune project-resume">
                    <div className="title-name"> Resume</div>
                    <div className="resume"> 
                        {project?.resume}
                    </div>
                </div>
                <div className=" project-actions ">
                    <div className="title-name">  Actions </div>
                    <div className="actions mt-2">
                       
                        {
                            calculateAvancements() === 100
                            ?
                            (
                                <span className="valider" onClick={()=>handleValidateProject(project)}> <i className="fa fa-check mr-1"></i> <>valider</>  </span>        
                            )
                            :
                            (
                                <span className="valider validated"> <i className="fa fa-times mr-1"></i> <> cant Validated</>  </span>        
                            )
                        }
                        <span className="delete" onClick={()=>handleRemoveProject(project)}> <i className="fa fa-times mr-1"></i> <>delete</>  </span>
                </div>
                </div>
            </div>
        </div>
    )
}
