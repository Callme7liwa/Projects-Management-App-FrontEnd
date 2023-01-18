import React, { useState } from 'react';
import "./Dashboard.css";
import 'animate.css';

import profileDefault from "./../../assets/profileDefault.jpg";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddPic from './PopUp/PopUpPic/AddPic';
import { PopUpSkills } from './PopUp/PopUpSkills/PopUpSkills';
import { getAllFunctions } from '../../4-actions/8-function';
import { getAffectation, getMessages } from '../../4-actions/2-auth';

const Dashboard = () => {

  const history = useHistory();
  
  const {user} = useSelector(state=>state.auth);
  const {projectsWorking} = useSelector(state=>state.auth) ; 
  const {projectsAcheived} = useSelector(state=>state.auth) ;
  

  useEffect(()=>{
    dispatch(getMessages(user?.id));
    dispatch(getAllFunctions());
    dispatch(getAffectation(user?.id));
  },[]);

  
  const dispatch = useDispatch();

  const [page , setPage] = useState(0);

  const [popSkills , setPopSkills]= useState(false);

  const [clicked , setClicked] = useState(false);
  
  // Lorsqu'on click sur le button plus a fin de selectionner une nouvelle photo 
  const [changeImage , setChangeImage] = useState(false);

  const Content = () => {
    switch(page) {
      case 0 :  return <OldPicture /> ;
      case 1 : return <ProjectAcheived /> ;  
      case 2 :  return  <ProjectsWaited />; 
      default : return <OldPicture />; 
    }
  }
  
  
  const ProjectAcheived = () => {
    return (
      <>
        {
        projectsAcheived?.map(project=>{
          return(
            <div class="project-container">
              <div class="project-content">
                <div class="project-image">
                  <span> {project.name}</span>
                </div>
                <div class="project-title">
                  <span class="title">
                     {project.name}</span>
                </div>
                <div class="project-resume">
                {project.resume}
                </div>
              </div>
            </div>
          )
        })
      }
      </>
    )
  }
  
  const ProjectsWaited = () => {
    return (
      <> 
      {
        projectsWorking?.map(project=>{
          return(
            <div class="project-container">
              <div class="project-content">
                <div class="project-image">
                  <span> {project.name}</span>
                </div>
                <div class="project-title">
                  <span class="title"> {project.name}</span>
                </div>
                <div class="project-resume">
                 {project.resume}
                </div>
              </div>
            </div>
          )
        })
      }
       </>
    )
  }

  const OldPicture = () => {

    return (
       <div className="images-container-dashboard">
        {
          
          user?.oldPics?.length > 0 
          ?
          user?.oldPics.map(pic=>{
            return (
              <div className="user-image">
                         <img className="image" src={"http://localhost:8080/journalistes/files/"+pic}></img>
              </div>
            )
         
          })
          :
          (
            <>
              <div className="user-image">
                <img className="image" src={profileDefault}></img>
              </div>
            </>
        
          )
        }
        </div>
    )
  }

 
  return (
    <>
    <section className='dashboard-main'>
      {
        changeImage === true ? (<AddPic setChangeImage={setChangeImage} />) : (null)
      }
      {
        popSkills === true ? (<PopUpSkills setPopSkills={setPopSkills} />) : (null)
      }
        <div className='dashboard-header col-md-12 col-sm-12'>
            <section className='user-image-container'>
              <div className='user-image'>
                {
                  user?.photo === null || user?.photo === undefined || user?.photo === ""
                  ?
                  <img className="image" src={profileDefault}></img> 
                  :
                  <img className="image" src={"http://localhost:8080/journalistes/files/"+user.photo}></img> 
                }
                <i className='fa fa-plus' onClick={()=>setChangeImage(!changeImage)}> </i>
              </div>
            </section>
            <section className='info user-info-container'>
                <div className='user-info-header'>
                  <span className="info-username">{user?.userName}</span>
                  <span className="info-update" onClick={()=>{history.push("/parametres")}}>update profil</span>
                  <span className="parametres"  onClick={()=>{history.push("/parametres")}}><i className='fa fa-cog'></i></span>
                </div>
                <div className="info user-info-main">
                  <span className="number-of-pics" onClick={()=>setPopSkills(true)}> <span className="number">{user?.functions?.length}</span> Skills </span>
                  <span className="number-of-projects-acheived"> <span className="number">{projectsAcheived?.length}</span> acheived</span>
                  <span className="number-of-projects-acheived"> <span className="number">{projectsWorking?.length}</span> waiting</span>
                </div>
                <div className='info user-info-bottom'>
                  <span className='info-name'> {user?.firstName?.toUpperCase()} {user?.secondName?.toUpperCase()}</span>
                </div>
            </section> 
        </div>
        <div className="dashboard-body">
            <section className='dashboard-body-navbar'>
              <ul className="navbar-list-items">
                  <li  className={`navbar-item ${page==0?"active":""}`}  onClick={()=>setPage(0)} > <i className="fa fa-list"></i>Old Pics</li>
                  <li  className={`navbar-item ${page==1?"active":""}`}  onClick={()=>setPage(1)}  ><i className="fa fa-check-circle-o "></i>Projects Achieved</li>
                  <li  className={`navbar-item ${page==2?"active":""}`}  onClick={()=>setPage(2)} ><i className="fa fa-spinner"></i>Projects waiting</li>
              </ul>
            </section>
            <section className='dashboard-body-content'>
              <Content />
            </section>
            <section className='footer-section'>
              
            </section>
        </div>
    </section>
    { 
      clicked === true ?  (
        <section className='pop-up-parametres' onClick={()=>setClicked(!clicked)}>
            <div className='animate__animated animate__fadeInUp parametres-content'>
                <div className='para'><span>Update Password</span></div>
                <div className='para'><span>Add Journaliste</span></div>
                <div className='para'><span>Add Team</span></div>
                <div className='para'><span>Add Tache</span></div>
            </div>
        </section>
      ) : 
      (null)
    }
    
    </>
  )
}

export default Dashboard ; 