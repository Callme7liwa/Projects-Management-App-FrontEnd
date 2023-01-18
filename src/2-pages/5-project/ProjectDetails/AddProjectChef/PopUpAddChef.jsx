import { useState } from "react";
import { useSelector } from "react-redux";
import { addProjectChefToProject } from "../../../../4-actions/6-projects";
import { profileDefault } from "../../../../assets";

export const PopUpAddChef = ({dispatch , setAddProjectChef  , colors  ,getRandomIndex}) => {

    const [selectedEmploye , setSelectedEmploye] = useState();
    const {project} = useSelector(state=>state.project);
    const {employes} = useSelector(state=>state.employe);

    const handleAddProjectChef = () => {
        dispatch(addProjectChefToProject(project?.id , selectedEmploye.id));
        setAddProjectChef(false);
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
