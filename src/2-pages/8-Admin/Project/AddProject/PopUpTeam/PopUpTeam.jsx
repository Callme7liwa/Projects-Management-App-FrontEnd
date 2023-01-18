import { useState } from "react";
import { useSelector } from "react-redux";
import { searchEmployes } from "../../../../../4-actions/4-employes";
import { saveTeam } from "../../../../../4-actions/5-team";
import { profileDefault } from "../../../../../assets";
import { CardEmployeComponent } from "./CardEmployeComponent";
import { CardEmployeSelectedComponent } from "./CardEmployeSelectedComponent";

export const   PopUpTeam = ({employeSelected , setEmployeSelected , testIfExiste  , setChangeTeam , setValidateChoice , dispatch}) => {
    const {employes} = useSelector(state=>state.employe);
    const {employesSearched} = useSelector(state=>state.employe);
    const [key , setkey] = useState("");

    const handleSubmitTeam = () => {
        // Fermer le pop up 
        setChangeTeam(false) ;
        // mettre le listener false 
         setValidateChoice(false) ; 
        dispatch(saveTeam(employeSelected));            
    }
    
    const addEmploye = (employe) => {
        // Pour ajouter un employe a la clique on doit verifier si elle deja existe dans la list selectionnée , 
        //si oui (cvdr double clique) on doit le supprimer , sinon on le rajoute dans la list
        const resultTest = testIfExiste( employeSelected,employe.id ) ; 
        var anArray = [...employeSelected];
        if(employeSelected.length === 0|| resultTest === false)
        {
            anArray.push(employe)
            setEmployeSelected(
                    anArray
            )
            return true ; 
        }       
        else
        {
            anArray = employeSelected.filter(employee=>employee.id!==employe.id) ; 
            setEmployeSelected(
                    [...anArray]
            )
            return false ; 
        } 
    }

    const removeFromSelectedEmployes = (employe) => {
        var anArray = [];
        anArray = employeSelected.filter(employee=>employee.id !== employe.id);
        setEmployeSelected([...anArray]);
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

    // const CardEmploye = ({employe}) => {
    //     return (
            
    //             <div className={`employe-info ${testIfExiste(employeSelected , employe.id) === true ?  " active" : ""}`}onClick={()=>{addEmploye(employe)}}>
    //                 <div className="employe-image-container">
    //                     {
    //                         employe?.photo!==null && employe?.photo!==""
    //                         ?
    //                         (
    //                             <img src={"Http://localhost:8080/journalistes/files/"+employe.photo} alt="" srcset="" />
    //                         )
    //                         :
    //                         (
    //                             <img src={profileDefault} alt="" srcset="" />
    //                         )
    //                     }
    //                 </div>
    //                 <div className="perso-info"><span>{employe?.firstName} {employe?.secondName}</span> <span>{employe?.email}</span> </div>
    //                 <div className="function "><span>{employe?.functions[0]?.name}</span></div>
    //             </div>  
    //     )
    // }

    // const CardEmployeSelected = ({employe}) => {
    //     return (
    //         <div className="employe-content"> 
    //             <div className="image-container">
    //                 {
    //                     employe?.photo !==null && employe?.photo!==""
    //                     ?
    //                     (
    //                         <img src={"Http://localhost:8080/journalistes/files/"+employe?.photo}></img>
    //                         )
    //                         :
    //                         (
                                
    //                             <img src={profileDefault}></img>
    //                         )
    //                 }
    //             </div>
    //             <div className="name-employe-selected"> {employe?.firstName} {employe?.secondName} </div>
    //             <div> <i className="fa fa-times-circle-o" onClick={()=> removeFromSelectedEmployes(employe)}></i></div>
    //         </div>
    //     ) 
    // }
    

    const DisplayEmployes = () => {
        return (
            <>
                {/*  */}
                {employeSelected !=null && employeSelected!=undefined && employeSelected?.length>0
                ?
                (
                    <div className="employes-selected-container">
                        {
                            employeSelected.map(employe=>{
                                return (
                                    <CardEmployeSelectedComponent employe={employe} removeFromSelectedEmployes={removeFromSelectedEmployes} />
                                ) 
                            })
                            
                        }
                    </div> 
                )
                :
                (null)
                } 
                <div className="number"> {employeSelected?.length>0 ? (<>{employeSelected?.length} Projects Members</>) : (<> Select employes</>)}  </div>
                {
                    employesSearched !== null &&  employesSearched !==undefined && employesSearched.length>0
                    ?
                    (
                        <div className="list-employes">
                            {
                                employesSearched.map(employe=>{
                                    return(
                                        <CardEmployeComponent employeSelected={employeSelected} testIfExiste={testIfExiste} addEmploye={addEmploye} employe={employe} />
                                    )
                                })   
                            }
                        </div>

                    )
                    :
                    employes?.length > 0  ? 
                    (
                    <div className="list-employes">
                        {
                            employes?.filter(employe=> userHasRole(["ADMIN"] , employe) === false )?.map(employe=>{
                                return (
                                    <CardEmployeComponent employeSelected={employeSelected} testIfExiste={testIfExiste} addEmploye={addEmploye} employe={employe} />
                                )
                            })        
                        }
                    </div>
                    )
                    :
                    (null)
                }
            </>
        )
    }
    
    const handleChangeKey = (e) => {
        setkey(e.target.value);
        dispatch(searchEmployes(key))
    }

    return (
        <div className="pop-up-client-container ">
        <div className="pop-up-client-content pop-team">
            <span className="close-page" onClick={()=>{{setChangeTeam(false) ; setValidateChoice(false)}}}> </span>
            <div className="pop-up-title">
                        <h2> WHERE ITS MINDS GETS CREATIVE!</h2>
                        <h5> CREATE A TEAM   </h5>
                        <span className="badg badg-team">  </span>
            </div>
             <div className="pop-up-body pop-body-team">
             <div className="employes">
                <div className="form-group">
                    <input value={key} onChange={handleChangeKey} name="key" className="input-search"  placeholder="Type name of employe"  ></input>
                </div>
                <DisplayEmployes />
             </div>
           </div>
           <div className="button w-100 "> 
           {
                employeSelected.length>1 
                ? 
                (
                <span className="btn-choice-team" onClick={handleSubmitTeam}>
                    <i className="fa fa-check-circle-o mr-2 "></i>Valider 
                </span>
                )
                :
                (
                <span className="btn-choice-team bg-danger">
                    <i className="fa fa-times-circle-o mr-2  "></i> can't submit 
                </span>
                )
           }
            </div> 
        </div>
    </div>
    )
}