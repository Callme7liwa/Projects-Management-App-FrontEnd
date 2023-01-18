import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CardProject } from "../../../../1-component";
import { searchInProjectsPage  , clearProjectsSearched , searchProjectsWorking , searchProjectsCompleted , searchProjectsPending} from "../../../../4-actions/6-projects";
import { PROJECTS_PER_PAGE } from "../../../constants";
import { AddProject } from "../AddProject/AddProject";
import exclamation from "../../../../assets/exclamation.png"

import "./Projects.css";
  
  // List les differentes projets dans la base de donnees , pending , finished , started
export const Projects = ({title , projects , etat}) => {

const [key , setKey] = useState("");

const [search , setSearch] = useState(false);

const {colors} = useSelector(state=>state.colors);

const [clicked , setClicked] = useState(false);

const {user} = useSelector(state=>state.auth);

const {projectsSearched} = useSelector(state=>state.project);

const dispatch = useDispatch();



const [page, setPage] = useState(1);

const [totalPages , setTotalPages ] = useState(Math.ceil(projects.length / PROJECTS_PER_PAGE));

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
    if(key!=="" )
        if(etat === 1)
        dispatch(searchProjectsCompleted(key));   
        else
            if(etat === 2)
                dispatch(searchProjectsWorking(key));
            else
                dispatch(searchProjectsPending(key))
    else
     dispatch(clearProjectsSearched()); 
},[key]);

// Permer d'afficher les card de chaque projet !
const DisplayProjects = () => {
    const startIndex = ( page - 1 ) * PROJECTS_PER_PAGE;
    const selectedProjects = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
    // si je veux la pagination je vais utiliser selectedProjects a la place de projects 

    return (
        projectsSearched !== null  && projectsSearched !== undefined && projectsSearched.length>0
        ?
        (
            projectsSearched?.map(project => {
                return (
                <CardProject key={project.id} project={project} color={colors[getRandomIndex()]}></CardProject>
                )
            })
        )
        :
        (
            projects.length<=0 || projects === undefined || projects === null  ? 
            (<div className="container-not-found">
                <div className="image-not-found">
                    <img src={exclamation}></img>
                </div>
                <div className="message-not-found"> No projects has been found </div>
            </div>)
            :
            projects?.map(project => {
                return (
                <CardProject key={project.id} project={project} color={colors[getRandomIndex()]}></CardProject>
                )
            })

        )
    );
};

const Pagination = ({projects}) => {
    if(projects != null && projects?.length<=PROJECTS_PER_PAGE)
        return (<>   </>) ;
    else
    {
        const pages = [...Array(totalPages).keys()].map(num=>num+1);
        
       return  pages.map(num=>{
            return (<span className="page-number" key={num} onClick={()=>setPage(num)}> {num} </span>)
        })
        
    };
};

const getRandomIndex = () =>{
    const val =  Math.floor(Math.random() * colors?.length) ; 
    return val ; 
};



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
    <div className="page-main-content projects-containers animate__animated animate__backInLeft ">
        <DisplayProjects />
        {/* {
            projects !=undefined && projects != null ? 
            (     
            <div className='page-main-pagination'>
                <Pagination projects={projects} /> 
            </div>
            )
            :
            (null)
        } */}
    </div>
        
        {clicked === true ? (<AddProject clicked={clicked} setClicked = {setClicked }/>) : (null)}

    </>
);
};