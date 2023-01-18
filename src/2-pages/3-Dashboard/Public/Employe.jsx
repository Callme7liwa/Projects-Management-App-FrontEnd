import React, { useState } from 'react';
import "./../Dashboard.css";
import 'animate.css';
import ayoub from "./../../../assets/ayoub.jpg";
import ayoub2 from "./../../../assets/profil2.jpg";
import ayoub3 from "./../../../assets/ayoub3.jpg";
import ayoub4 from "./../../../assets/ayoub4.jpg";
import ayoub5 from "./../../../assets/ayoub5.jpg";
import ayoub6 from "./../../../assets/profil3.jpg";
import ayoub7 from "./../../../assets/profil1.jpg";
import can2022 from "./../../../assets/can2022.jpg";
import mond2022 from "./../../../assets/mond2022.jpg";
import ultras from "./../../../assets/ultras.jpg";
import drugs from "./../../../assets/drugs.jpg";
import economie from "./../../../assets/economie.jpg";
import education from "./../../../assets/education.jpg";
import culture from "./../../../assets/culture.jpg";
import enginnering from "./../../../assets/enginnering.jpg";

const Employe = ({user}) => {

  const [page , setPage] = useState(0);

  const [clicked , setClicked] = useState(false);

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
      <div class="project-container">
        <div class="project-content">
          <div class="project-image">
            <img class="image" src={can2022} ></img>
          </div>
          <div class="project-title">
            <span class="title"> Coup d'afric 2022</span>
          </div>
          <div class="project-resume">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa magni veritatis necessitatibus illo iste consectetur pariatur sunt fugiat ipsam, cumque doloribus dignissimos dolorem consequatur ea quaerat harum debitis nam in sapiente. Debitis at qui laboriosam.
          </div>
          <div class="project-status">
            <i class="fa fa-check"></i>
          </div>
        </div>
      </div>
      <div class="project-container">
        <div class="project-content">
          <div class="project-image">
            <img class="image" src={mond2022} ></img>
          </div>
          <div class="project-title">
            <span class="title"> Coup du monde 2022</span>
          </div>
          <div class="project-resume">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa magni veritatis necessitatibus illo iste consectetur pariatur sunt fugiat ipsam, cumque doloribus dignissimos dolorem consequatur ea quaerat harum debitis nam in sapiente. Debitis at qui laboriosam.
          </div>
          <div class="project-status">
            <i class="fa fa-check"></i>
          </div>
        </div>
      </div>
      <div class="project-container">
        <div class="project-content">
          <div class="project-image">
            <img class="image" src={ultras} ></img>
          </div>
          <div class="project-title">
            <span class="title">Ultras Supporters</span>
          </div>
          <div class="project-resume">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa magni veritatis necessitatibus illo iste consectetur pariatur sunt fugiat ipsam, cumque doloribus dignissimos dolorem consequatur ea quaerat harum debitis nam in sapiente. Debitis at qui laboriosam.
          </div>
          <div class="project-status">
            <i class="fa fa-check"></i>
          </div>
        </div>
      </div>
      <div class="project-container">
        <div class="project-content">
          <div class="project-image">
            <img class="image" src={drugs} ></img>
          </div>
          <div class="project-title">
            <span class="title">Drugs Consuming</span>
          </div>
          <div class="project-resume">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa magni veritatis necessitatibus illo iste consectetur pariatur sunt fugiat ipsam, cumque doloribus dignissimos dolorem consequatur ea quaerat harum debitis nam in sapiente. Debitis at qui laboriosam.
          </div>
          <div class="project-status">
            <i class="fa fa-check"></i>
          </div>
        </div>
      </div>
      </>
    )
  }

  const ProjectsWaited = () => {
    return (
      <> 
        <div class="project-container">
        <div class="project-content">
          <div class="project-image">
            <img class="image" src={culture} ></img>
          </div>
          <div class="project-title">
            <span class="title"> Moroccan Culure </span>
          </div>
          <div class="project-resume">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa magni veritatis necessitatibus illo iste consectetur pariatur sunt fugiat ipsam, cumque doloribus dignissimos dolorem consequatur ea quaerat harum debitis nam in sapiente. Debitis at qui laboriosam.
          </div>
          <div class="project-status">
            <i class="fa fa-spinner"></i>
          </div>
        </div>
      </div>
        <div class="project-container">
        <div class="project-content">
          <div class="project-image">
            <img class="image" src={enginnering} ></img>
          </div>
          <div class="project-title">
            <span class="title">Enginnering at morocco </span>
          </div>
          <div class="project-resume">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa magni veritatis necessitatibus illo iste consectetur pariatur sunt fugiat ipsam, cumque doloribus dignissimos dolorem consequatur ea quaerat harum debitis nam in sapiente. Debitis at qui laboriosam.
          </div>
          <div class="project-status">
            <i class="fa fa-spinner"></i>
          </div>
        </div>
      </div>
        <div class="project-container">
        <div class="project-content">
          <div class="project-image">
            <img class="image" src={education} ></img>
          </div>
          <div class="project-title">
            <span class="title">moroccan education</span>
          </div>
          <div class="project-resume">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa magni veritatis necessitatibus illo iste consectetur pariatur sunt fugiat ipsam, cumque doloribus dignissimos dolorem consequatur ea quaerat harum debitis nam in sapiente. Debitis at qui laboriosam.
          </div>
          <div class="project-status">
            <i class="fa fa-spinner"></i>
          </div>
        </div>
      </div>
        <div class="project-container">
        <div class="project-content">
          <div class="project-image">
            <img class="image" src={economie} ></img>
          </div>
          <div class="project-title">
            <span class="title">Moroccan economie health</span>
          </div>
          <div class="project-resume">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa magni veritatis necessitatibus illo iste consectetur pariatur sunt fugiat ipsam, cumque doloribus dignissimos dolorem consequatur ea quaerat harum debitis nam in sapiente. Debitis at qui laboriosam.
          </div>
          <div class="project-status">
            <i class="fa fa-spinner"></i>
          </div>
        </div>
      </div>
       </>
    )
  }

  const OldPicture = () => {
    return(
    <div className="images-container-dashboard">
      <div className="user-image">
        <img className="image" src={ayoub}></img>
      </div>
      <div className="user-image">
        <img className="image" src={ayoub2}></img>
      </div>
      <div className="user-image">
        <img className="image" src={ayoub7}></img>
      </div>
      <div className="user-image">
        <img className="image" src={ayoub4}></img>
      </div>
      <div className="user-image">
        <img className="image" src={ayoub5}></img>
      </div>
      <div className="user-image">
        <img className="image" src={ayoub6}></img>
      </div>
    </div>
    )
  }
 
  return (
    <>
    <section className='dashboard-main'>
        <div className='dashboard-header'>
            <section className='user-image-container'>
              <div className='user-image'>
                <img className="image" src={ayoub}></img> 
              </div>
            </section>
            <section className='info user-info-container'>
                <div className='user-info-header'>
                  <span className="info-username">Callme7liwa</span>
                  <span className="info-update">update profil</span>
                  <span className="parametres" onClick={()=>setClicked(!clicked)}><i className='fa fa-cog'></i></span>
                </div>
                <div className="info user-info-main">
                  <span className="number-of-pics"> <span className="number">11</span> pics</span>
                  <span className="number-of-projects-acheived"> <span className="number">11</span> acheived</span>
                  <span className="number-of-projects-acheived"> <span className="number">11</span> waiting</span>
                </div>
                <div className='info user-info-bottom'>
                  <span className='info-name'> AYOUB SEDDIKI </span>
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

export default Employe ; 