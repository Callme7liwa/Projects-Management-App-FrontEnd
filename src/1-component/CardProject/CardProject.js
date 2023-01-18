import { Link } from "react-router-dom";
import "./CardProject.css";
import profileDefault from "./../../assets/profileDefault.jpg";
const CardProject = ({project , color}) => {


    const displayImages = () => {
        project.team.journalistes.map(source =>{
            return (
                <div className="pic-container">
                        <img className="image" src={"http://localhost:8080/server/files/"+source.photo}></img>
                </div>
            )
        });
    }

    const displayStatus = (status) => {
            return (
               <>{ status === "WORKING" ? "En cours" : status == "PENDING" ? "Pending" : "Finished"} </> 
            )
    }


    return (
        <div className="project-card"  style={{backgroundColor: color }}>
            <div className="project-text project-card-header"> {project?.name}</div>
            {
                project?.projectChef === null || project?.projectChef === undefined 
                ?
                (
                    <div className="project-text project-respo">  not already assigned to any project chef </div>
                )
                :
                (
                    <div className="project-text project-respo"> Assigned to <span> {project.projectChef.firstName+" "}{project.projectChef.secondName}</span></div>
                )
            }            <div className="project-text project-date"> Created at {project?.creationDate?.slice(0,10)} - {displayStatus(project?.projectStatus)} </div>
            <div className="project-text project-team">
                <div className="team-text"> Team </div>
                <div className="team-projects-pics">
                {
                    project.team.journalistes.slice(0,11).map(source =>{
                        return (
                            
                                source.photo !== null 
                                ?
                                (
                                    <div key={source.id} className="pic">
                                        <img className="" src={"http://localhost:8080/journalistes/files/"+source.photo}></img>
                                     </div>
                                )
                                :
                                (
                                    <div key={source.id} className="pic">
                                        <img className="" src={profileDefault}></img>
                                     </div>
                                )
                        )
                    })
                }
                {
                    project.team.journalistes.length > 11
                    ?
                    (
                        <div className="pic d-flex bg-success align-items-center justify-content-center"> <i className="fa fa-plus"></i></div>
                    )
                    :
                    (null)
                }
                </div>
            </div> 
            <div className="project-details-button">
               <button><Link to={"/project/"+project.id} project={project} className="nav-link"> See the details <i className="fa fa-angle-double-right ml-1"></i></Link> </button>
            </div>
        </div>
    )
}

export default CardProject ;