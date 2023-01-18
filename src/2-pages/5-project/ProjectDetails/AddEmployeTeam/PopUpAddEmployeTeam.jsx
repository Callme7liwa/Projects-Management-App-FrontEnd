import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { searchEmployes } from "../../../../4-actions/4-employes";
import { addMemberToPendingList, addMemberToProject } from "../../../../4-actions/6-projects";
import { profileDefault } from "../../../../assets";

export const PopUpAddEmployeTeam = ({dispatch , hasRole , setAddEmployeToTeam  , getRandomIndex , colors}) => {

    const [selectedEmploye , setSelectedEmploye] = useState();

    const {project} = useSelector(state=>state.project) ; 

    const [key , setKey] = useState("");

    const {employes} = useSelector(state=>state.employe);
    const {employesSearched} = useSelector(state=>state.employe);



    useEffect(()=>{
        if(key !== "")
            dispatch(searchEmployes(key));
    },[key])

    const handleAddMember = () => {
        if(hasRole(["ADMIN"]))
            dispatch(addMemberToProject(project?.id , selectedEmploye.id));
        else
            dispatch(addMemberToPendingList(project?.id , selectedEmploye.id));
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

    const CardEmploye = ({employe}) => {
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
                    <input type="text" value={key} onChange={(e)=>setKey(e.target.value)} className="" placeholder="search employe here ... "></input>
                </div>
                <div className="body2 webkit">
                    {
                        employesSearched !== null && employesSearched !== undefined && employesSearched.length >=0 && key.length>0 
                        ?
                        employesSearched.filter(emp=>((testIfExist(emp.id)===false  && userHasRole(["ADMIN"],emp) === false ) && (employesSearched?.projectChef?.id !==emp.id)))
                        .map(employe=>{
                            return (
                                <CardEmploye employe={employe} />
                            )
                        })
                        :
                        employes.filter(emp=>((testIfExist(emp.id)===false  && userHasRole(["ADMIN"],emp) === false ) && (project?.projectChef?.id !==emp.id)))
                        .map(employe=>{
                            return (
                                <CardEmploye employe={employe} />
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
