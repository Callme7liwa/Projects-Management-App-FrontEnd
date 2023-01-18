import React, { useState } from 'react'
import "./Navbar.css";
import profileDefault from "./../../assets/profileDefault.jpg";
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut, showSideBare } from '../../4-actions/2-auth';
import { useEffect } from 'react';

const Navbar = ({navIsClicked , setNavIsClicked}) => {

  const {user} = useSelector(state => state.auth);

  const [clicked , setClicked] = useState(false);


  const dispatch = useDispatch();

  const history = useHistory();


  const handleLogOut = () => {
    dispatch(logOut(history));
  }

  const handleSideBare = () => {
    dispatch(showSideBare());
  }



  const hasRole = (role) => {
    for(var i=0 ; i<user?.roles.length ; i++)
     {
       if(user?.roles[i].role === role)
        {
          return true ;
        }
    }
    return false ; 
  }

  return (
    <>
      {
        user !== null 
        ?
        (
          <>
            <div className="navbar-container">
            <div className='navbar-bars' onClick={handleSideBare}> <i className='fa fa-bars'></i> </div>
            <div className='navbar-center'>
                <ul className='navbar-items'>
                  {
                    hasRole("ADMIN")===false
                    ?
                    (
                      <>
                        <Link to="/myprojects" className='nav-link'><li className='item'> projects </li></Link>
                        <Link to="/inbox" className='nav-link'><li className='item'> Inbox </li></Link>
                      </>
                    )
                    :
                    (null)
                  }
                </ul>
            </div>
            <div class="navbar-items-container">
                    <ul className='navbar-items'>
                      {/* <li className='navbar-item'> <i className='fa fa-home'></i></li> */}
                      <li className="navbar-item" onClick={()=>{setClicked(!clicked)}}>
                        {
                          user?.photo === undefined || user?.photo===null || user?.photo ===""
                          ?
                          <img src={profileDefault}/>
                          :
                          <img src={"http://localhost:8080/journalistes/files/"+user.photo}></img>
                        }
                        </li>
                    </ul>
              </div>
          </div>
                      
        
          <div className={`navbar-actions ${clicked===true ? "active" : ""}`}>
            <div class="action-items">
            <span className='action-item'><a><i className='fa fa-long-arrow-right'></i> {user.userName}</a></span>
                {
                  hasRole("CHEF") === true || hasRole("SIMPLE")===true
                  ?
                  <span class="action-item"> <Link to="/dashboard" className='' onClick={()=>{setClicked(false)}}><i className='fa fa-user-circle-o '></i> Dashboard </Link ></span>
                  :
                  (null)
              } 
                {
                  hasRole("ADMIN") === true || hasRole("CHEF")===true
                  ?
                  (<span class="action-item"> <Link to="/admin" className=''  onClick={()=>{setClicked(false)}}><i className='fa fa-user-circle-o '></i> Admin Side  </Link ></span>)
                  :
                  (null)
              } 
                <span class="action-item"> <Link to="/parametres" onClick={()=>{setClicked(!clicked)}} ><i className='fa fa-cog '></i> Parametres </Link ></span>
                <span class="action-item" onClick={()=>{handleLogOut() ; setClicked(false)}}  > <a href="#"> Logout </a > </span>
            </div> 
          </div>
        </>
        )
        :
        (<div className='navbar-container unauthenticated'></div>)
      }
    </>  
    
  )
}

export default Navbar ; 