
import { useState } from "react";
import $ from 'jquery';
import "./SideBare.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../4-actions/10-category";
import { getProjects } from "../../4-actions/6-projects";
import {Link} from "react-router-dom";

export const SideBare = () => {

    const {user} = useSelector(state=>state.auth);

    const [clicked , setClicked] = useState(false) ; 
    const [visited , setVisited] = useState(true) ; 
    const [clicked1 , setClicked1] = useState(false) ; 
    const {affectations} = useSelector(state=>state.auth);

    const {sideBareEtat} = useSelector(state=>state.auth);
    const {categories} = useSelector(state=>state.category);
    const {projects} = useSelector(state=>state.project);
    const {colors } = useSelector(state=>state.colors);
    const [search , setSearch] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(search === false && (categories !==null || projects !==null) )
        {
            dispatch(getCategories());
            dispatch(getProjects());
            setSearch(true);
        }
    },[]);



    
    
    const getRandomIndex = () =>{
        return Math.floor(Math.random() , colors?.length) ; 
    }


    
    const hasRoles = (role) => {
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

    const getMyProject = () => {
        var myProjects = [];
        for(var i=0  ; i<projects.length ; i++)
        {
            if(projects[i].projectChef?.id === user?.id)
            {
                myProjects.push(projects[i]);
            }
            else
            {
                for(var j=0 ;  j<projects[i].team.journalistes.length ; j++)
                {
                    console.log(projects[i].team.journalistes[j].id , user?.id);
                    if(projects[i].team.journalistes[j].id === user?.id)
                    {
                        myProjects.push(projects[i]);
                        break ;
                    }
                }
            }
        }
        return myProjects ; 
    }


    return (
        <div className={`component-side-bare-container ${sideBareEtat === true ? ' active' : ' ' }`}>
            <div className="component-side-bare-content">
                <ul >
                    <li className="title" onClick={()=>setVisited(!visited)}> 
                        <i className={`fa ${visited === true ? 'fa-angle-double-down' : "fa-angle-double-right"} mr-1` } ></i>
                        <span >Categories</span>
                    </li>
                    {
                        visited ===  true? 
                        (
                        <ul>
                            {categories.slice(0,4).map(category=>{
                                return (
                                <li className="title-items">
                                    <div class="color" style={{backgroundColor: colors[getRandomIndex()] }}></div>
                                    <div> {category.name}</div>
                                </li>
                                )
                            })}
                            <li className="title-items">
                                <div><i class=" fa fa-angle-double-right mr-1"></i></div>

                                <div className="view-all"> 
                                     <Link to="/categories" className="nav-link"> View All  </Link>
                                </div>
                            </li> 
                        </ul>
                        ) 
                        : 
                        (null)   
                    }
                </ul>
                <ul >
                    <li className="title" onClick={()=>setClicked1(!clicked1)}> 
                    <i className={`fa ${clicked1 === true ? 'fa-angle-double-down' : "fa-angle-double-right"} mr-1` } ></i>
                        <span >Projects</span>
                    </li>
                    {
                        clicked1 === true ?
                         (
                             <ul>
                                { 
                                hasRoles(["ADMIN"]) === true 
                                ?
                                    projects.slice(0,4).map(project=>{
                                        return(
                                            <li className="title-items">
                                            <div class="color" style={{backgroundColor: colors[getRandomIndex()] }}></div>
                                            <div> {project.name}</div>
                                            </li>
                                        )
                                    })
                                :
                                affectations.slice(0,4).map(project=>{
                                    return(
                                        <li className="title-items">
                                        <div class="color" style={{backgroundColor: colors[getRandomIndex()] }}></div>
                                        <div> {project.name}</div>
                                        </li>
                                    )
                                })
                                }
                                
                                <li className="title-items">
                                    <div><i class=" fa fa-angle-double-right mr-1"></i></div>
                                    <div className="view-all"> 
                                    {
                                    hasRoles(["ADMIN"]) === true
                                    ?
                                    (
                                            <Link to="/admin" className="nav-link"> View All  </Link>
                                    )
                                    :
                                    (
                                        <Link to="/myprojects" className="nav-link"> View All  </Link>
                                    )
                                     }
                                     </div>
                                </li> 

                            </ul>
                        ) 
                         : 
                         (null)
                    }
                    
                </ul>
                <ul >
                    <li className="title" onClick={()=>setClicked(!clicked)}> 
                    <i className={`fa ${clicked === true ? 'fa-angle-double-down' : "fa-angle-double-right"} mr-1` } ></i>
                        <span >Team</span>
                    </li>
                    {
                        clicked === true ?
                         (
                            <ul>
                                { 
                                hasRoles["ADMIN"]
                                ?
                                    projects.slice(0.4).map(project=>{
                                        return(
                                            <li className="title-items">
                                                <div class="color" style={{backgroundColor: colors[getRandomIndex()] }}></div>
                                                <div>{project.team} </div>
                                            </li>
                                        )
                                    })
                                :
                                getMyProject().slice(0,4).map(project=>{
                                    return(
                                        <li className="title-items">
                                        <div class="color" style={{backgroundColor: colors[getRandomIndex()] }}></div>
                                        <div> {project.team.name}</div>
                                        </li>
                                    )
                                })
                                }
                                {
                                hasRoles["ADMIN"]
                                ?
                                (
                                        <Link to="/admin" className="nav-link"> View All  </Link>
                                )
                                :
                                (
                                    <Link to="/myprojects" className="nav-link"> View All  </Link>
                                )
                                }
                                
                            </ul>
                                
                                
                        ) 
                         : 
                         (null)
                    }
                    
                </ul>

                <div className="side-bare-bottom">
                    <div className="side-bare-bottom-title">
                        Teams
                    </div>
                    <div className="side-bare-bottom-content">
                        <div className="subtitle"> Need To Form a Team ? </div>
                        <div className="description"> A group project is an ideal opportunity to sharpen your problem-solving and team-building techniques.</div>
                        <div className="button"><button className="">Create</button></div>
                    </div> 
                </div>
               
            </div>
        </div>
    )
}