import { useEffect } from "react";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CardEmploye } from "../../../../1-component"
import { clearEmployesSearched, searchAdmins, searchChef, searchEmployes, searchSimple } from "../../../../4-actions/4-employes";
import { getProjectsOfCurrentUser } from "../../../../4-actions/6-projects";
import employe from "../../../../5-reducers/employe";
import { AddEmploye } from "../AddEmploye/AddEmploye";
import profileDefault from "./../../../../assets/profileDefault.jpg";
import exclamation from  "./../../../../assets/exclamation.png";


export const  Employees = ({title , employees , etat}) => {

  const {user} = useSelector(state=>state.auth);
  const [clicked , setClicked] = useState(false);
  const [search , setSearch] = useState(false);
  const [key , setKey] = useState("");
  const [showInformations , setShowInformations] = useState(false);
  const [selectedEmploye , setSelectedEmploye]  = useState(null);
  

  const {colors } = useSelector(state=>state.colors); 
  const {employesSearched} = useSelector(state=>state.employe);
  
  const dispatch = useDispatch();

  const hasRole = (roleName) => {
    console.log(roleName);
    for(var i=0 ; i<user?.roles.length ; i++)
     {
        if(user?.roles[i].role === roleName)
          return true ;
    }
    return false ; 
  }

  useEffect(()=>{
       if(key!=="")
          if(etat === 4)
            dispatch(searchAdmins(key));
          else
            if(etat === 5)
              dispatch(searchChef(key));
            else
              dispatch(searchSimple(key));
      else
      dispatch(clearEmployesSearched());
        
  },[key]);



  const getRandomIndex = () =>{
    const val =  Math.floor(Math.random() * colors?.length) ; 
    return val ; 
  };

  
  const DisplayEmployes = () => {
    return (
      
        employesSearched !== null &&  employesSearched !==undefined && employesSearched.length>0
        ?
        (employesSearched.map(employe=>{
          return(
            <CardEmploye  employe={employe}  setShowInformations={setShowInformations} setSelectedEmploye={setSelectedEmploye}/>
          )
        }))
        :
        (
         employees === undefined || employees === null  || employees.length<=0
        ?
        (
        <div className="container-not-found">
          <div className="image-not-found">
              <img src={exclamation}></img>
          </div>
          <div className="message-not-found"> No Users  has been found </div>
        </div>
        )
        :
        employees?.map(employe => {
          return (
            <CardEmploye  employe={employe} setSelectedEmploye={setSelectedEmploye} setShowInformations={setShowInformations}/>
            )
        })
        )
    )
    }
  
  //
  const [first , setFirst] = useState(true);

  const UserInfo = () => {

    const {projectsCurrentUser} = useSelector(state=>state.project);

    useEffect(()=>{
      if(first === true)
      {
        console.log("here")
        if(projectsCurrentUser===null || projectsCurrentUser.length<=0)
           dispatch(getProjectsOfCurrentUser(selectedEmploye?.id)) ; 
      }
        setFirst(false)
    },[]);


    return (
      <>
           <div className={`page-add-employe-container`} >
            <div className="page-add-employe-content">
                <span className="close-page" onClick={()=>{setShowInformations(false) ; setFirst(true)}}> </span>
                <div className="page-header">
                    <h1> USER INFORMATIONS</h1>
                    <h3> {selectedEmploye?.firstName} {selectedEmploye?.secondName} </h3>
                    <span className="badge badge1">cc</span>
                </div>
                <div className="page-body page-body-info-user">
                    <div className="page-info-body-left">
                        <div className="image-container">
                           <div className="image-content">
                            {
                              selectedEmploye?.photo !== "" &&  selectedEmploye?.photo !== null
                              ?
                              (<img src={"http://localhost:8080/journalistes/files/"+selectedEmploye?.photo }/>)
                              :
                              (<img src={profileDefault}></img>)
                              
                            }
                             
                           </div>
                           <div className="username">{selectedEmploye?.userName}</div>
                        </div>
                        {/* <div className="info ">
                              <span >  <i className="fa fa-birthday-cake"></i></span>
                              <span>  {selectedEmploye?.birthday?.slice(0,10)}</span>
                        </div> */}
                        <div className="info ">
                              <span >  <i className="fa fa-envelope"></i></span>
                              <span>  {selectedEmploye?.email}</span>
                        </div>
                        <div className="info ">
                              <span >  <i className="fa fa-phone"></i></span>
                              {console.log( selectedEmploye?.phone)}
                              <span>  
                                 {
                                 selectedEmploye?.phone !=="" &&  selectedEmploye?.phone !== null && selectedEmploye?.phone !== undefined
                                 ? 
                                 (<>{selectedEmploye.phone}</>) 
                                 :
                                 (<>Indisponible</>)
                                 }
                              </span>
                        </div>
                        <div className="info ">
                              <span >  <i className="fa fa-address-card"></i></span>
                              {console.log( selectedEmploye?.address)}
                              <span>  
                                 {
                                 selectedEmploye?.address !=="" &&  selectedEmploye?.address !== null && selectedEmploye?.address !== undefined
                                 ? 
                                 (<>{selectedEmploye.address}</>) 
                                 :
                                 (<>Indisponible</>)
                                 }
                              </span>
                        </div>
                    </div>
                    <div className="page-info-body-right">
                      
                      <div className="myskills">
                        <div className="w-100"> <i className="fa fa-check-circle-o mr-2"></i> Skills </div>
                        {
                          selectedEmploye?.functions?.length > 0
                          ?
                          (
                          selectedEmploye?.functions.map(fonction=>{
                            return (
                              <span className="" style={{backgroundColor: colors[getRandomIndex()] }}> {fonction.name} </span>
                            )
                          })
                          )
                          :
                          (
                            <span> <i className="fa fa-times-circle-o"></i> No Functions to render </span>

                          )
                        }
                      </div>
                      <div className="myskills">
                        <div className="w-100"> <i className="fa fa-check-circle-o mr-2"></i> Projects </div>
                        
                        {
                          projectsCurrentUser.length>0 
                          ?
                          (
                            projectsCurrentUser.map(project=>{
                              return (
                                <span className="" style={{backgroundColor: colors[getRandomIndex()] }}> {project.name} </span>
                              )
                            })
                          )
                          :
                          (
                            <span> <i className="fa fa-times-circle-o"></i> No Projects to render </span>
                          )
                        }
                      </div>
                      <div className="myskills">
                        <div className="w-100"> <i className="fa fa-check-circle-o mr-2"></i> Roles </div>
                        {
                          selectedEmploye.roles.length>0
                          ?
                          (
                            selectedEmploye.roles.map(role=>{
                              return (
                                <span className="" style={{backgroundColor: colors[getRandomIndex()] }} > {role.role} </span>
                              )
                            })
                          )
                          :
                          (
                            <span> <i className="fa fa-times-circle-o"></i> No roles to render </span>
                          )
                        }
                      </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
  }


    return (
      <>
        <div className="admin page-main-title">
          <span>{title}</span>
          <div className="actions">
            <span className="mr-2"><input  className={`${search === true ? ' active' : ''}`} type="text" onChange={(e)=>setKey(e.target.value)} value={key}></input></span>
            <span className="action search" onClick={()=>setSearch(!search)}> <i className="fa fa-search"> </i></span>
            {
              hasRole("ADMIN")
              ?
              (<span className="action add " onClick={()=>setClicked(!clicked)} ></span>)
              :
              (null)
            } 
          </div>
        </div>
        <div className="page-main-content animate__animated animate__backInLeft">
            <DisplayEmployes  /> 
        </div>
        {clicked === true ? (<AddEmploye text="helloword" clicked={clicked} setClicked = {setClicked}  />) : (null)}
        {showInformations === true ? (<UserInfo   />) : (null)}
      </>
    )
}
