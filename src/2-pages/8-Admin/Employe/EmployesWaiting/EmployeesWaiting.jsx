
import React from 'react' ; 
import { useSelector } from 'react-redux';
import "./EmployeWaiting.css";
import profileDefault from "./../../../../assets/profileDefault.jpg"
import { useDispatch } from 'react-redux';
import { onAccepteUser , onRejectUser } from '../../../../4-actions/6-projects';

export const EmployeesWaiting = ({title}) => {

  const {projects} = useSelector(state=>state.project);

  const dispatch = useDispatch();
  
   const handleAccepteUser = (project , journalist) => {
      dispatch(onAccepteUser(project , journalist));
    }

    const handleRejectUser = (project , journalist) => {
      dispatch(onRejectUser(project , journalist))
    }
   
 
    return (
        <>
          <div className="admin page-main-title">
            <span>{title}</span>
            <div className="actions">
              <span className="action search" > <i className="fa fa-search"> </i></span>
            </div>
          </div>
          <div className="page-main-content animate__animated animate__backInLeft">
            {
              projects !== undefined && projects !== null && projects.length>0
              ?
              (
                projects.map(project=>{
                  return project?.pendingJouranlistes?.map(journalist=>{
                    return (
                      <div className="card-employe-waiting-container">
                          <div className="card-employe-waiting-content">
                              <div className="card-image-container">
                                  <div className="image-container">
                                       {
                                          journalist.photo !== undefined && journalist.photo !== null && journalist.photo!==""
                                          ?
                                          (<img src={"http://localhost:8080/journalistes/files/"+journalist.photo} />)
                                          :
                                          (<img src={profileDefault} />)
                                       }
                                  </div>
                              </div>
                              <div className="card-employe-info">
                                  <span className="employe-name">{journalist.firstName+" "} {journalist.secondName}</span>
                                  <span className="project-name">{project.name}</span>
                                  <span className="team-number"> the team contain {project.team.journalistes.length} employees </span>
                              </div>
                              <div className="card-employe-action">
                                  <i className="fa fa-times" onClick={()=>handleRejectUser(project , journalist)}></i>
                                  <i className="fa fa-check" onClick={()=>handleAccepteUser(project , journalist )}></i>
                              </div>
                          </div>
                      </div>
                   )
                  })
                      
                })
              )
              :
              (<div>  No Request for the moment ! </div>)
            }
          </div>
        </>
      )
}