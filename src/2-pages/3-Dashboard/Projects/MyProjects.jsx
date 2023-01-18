import "./MyProjects.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  CardProjectUser } from "../../../1-component";
import { SideBare } from "../../../1-component/SideBare/SideBare";
import { getAffectation, searchAffectation } from "../../../4-actions/2-auth";
import { PROJECTS_PER_PAGE } from "../../constants";
import PopUpTasks from "../PopUp/PopUpTasks/PopUpTasks";
import logo from "./../../../assets/logo.png";
import folder from "./../../../assets/folder.png";
import { useHistory } from "react-router-dom";

const MyProjects = ({navIsClicked}) => {

 const [search , setSearch] = useState(false);
 
 const [key , setKey] = useState("");

 const {affectationSearch} = useSelector(state=>state.auth);


 const {user} = useSelector(state=>state.auth);

 const [page, setPage] = useState(1);
 
 const {affectations} = useSelector(state=>state.auth) ; 
   
 const {colors} = useSelector(state=>state.colors);
 

 const [seeMyTasks , setSeeMyTasks] = useState(0);

 const [selectedProject , setSelectedProject] = useState(null);
 
 
 const dispatch = useDispatch();
 const history = useHistory();
 
 
useEffect(()=>{
      if(affectations === null ||affectations === undefined  || affectations?.length<=0 )
      dispatch(getAffectation(user?.id));
},[]);

useEffect(()=>{
      if(key!=="")
      dispatch(searchAffectation(key));
},[key])


const getRandomIndex = () =>{
      const val =  Math.floor(Math.random() * colors?.length) ; 
      return val ; 
};
  
 const DisplayProjects = () => {
      const startIndex = ( page - 1 ) * PROJECTS_PER_PAGE;
      const selectedProjects = affectations?.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  
      return (
          affectations === undefined || affectations === null ||  affectations?.filter(affectation=>affectation?.projectChef?.id!==user?.id).length <=0 ? 
          (
            <div className="affectations-empty ">
                 <div className="image"><img src={folder} className="" /></div>
                 <div className="affectation-message"> You  have any project for the moment</div>
                 <div className="go-back" onClick={() => history.goBack()}> <i className="fa fa-long-arrow-left"></i></div>
            </div>
          )
          :
          affectationSearch.length>0 && key.length>0
          ?
          affectationSearch.filter(project=>project.projectChef!==user?.id).
            map(project=>{
            return (
                  <CardProjectUser setSeeMyTasks={setSeeMyTasks} setSelectedProject={setSelectedProject} key={project?.id} project={project} color={colors[getRandomIndex()]}> </CardProjectUser>
                  )
            })
            :
          affectations?.filter(affectation=>affectation?.projectChef?.id!==user?.id).
             map(project => {
              return (
              <CardProjectUser setSeeMyTasks={setSeeMyTasks} setSelectedProject={setSelectedProject} key={project?.id} project={project} color={colors[getRandomIndex()]}> </CardProjectUser>
              )
          })
      );
  };
  
  const Pagination = ({projects}) => {
          const pages = [...Array(Math.ceil(affectations?.length / PROJECTS_PER_PAGE)).keys()].map(num=>num+1);
          return  pages.map(num=>{
              return (<span className="page-number" key={num} onClick={()=>setPage(num)}> {num} </span>)
          })
  };
  
  const RenderContent = () => {
      
      return (
            <>
           
            
            <div className="page-main-content projects-containers">
                  <DisplayProjects   />
            </div>      
            </>
       );  
  }

  const handleChangeKey = (e) => {
      setKey(e.target.value) ; 
      dispatch(searchAffectation(key));
  }
 
return (
      <div className='page-container admin-page'>
            <SideBare navIsClicked={navIsClicked}/>
            <div className='page-main admin'>
            <div className="admin page-main-title">
                  <span>YOUR PROJECTS </span>
                  <div className="actions">
                        <span className="mr-2"><input  className={`${search === true ? ' active' : ''}`} type="text" onChange={(e)=>setKey(e.target.value)}  value={key} ></input></span>
                        <span className="action search" onClick={()=>setSearch(!search)}> <i className="fa fa-search"> </i></span>
                        
                  </div>
            </div>
            <RenderContent />
            </div>

            {
                  seeMyTasks === true 
                  ? 
                  <PopUpTasks projectId={selectedProject?.id} setSeeMyTasks={setSeeMyTasks} />
                  :
                  (null)
            }

      </div>
)
}

export default MyProjects ; 