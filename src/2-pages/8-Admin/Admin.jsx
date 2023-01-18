import React from 'react'
import { SideBare } from '../../1-component/SideBare/SideBare';
import "./Admin.css";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProjects } from '../../4-actions/6-projects';
import { useComponentDidMount } from '../../Hooks/useComponentDidMount';
import { useSelector } from 'react-redux';
import { businnes, checked, colabs, collabs, employee, head, sandclock, settings, teamwork , admin  } from '../../assets';
import { CardDashboard, CardEmploye, CardProject } from '../../1-component';
import { useState } from 'react';
import { getEmployes } from '../../4-actions/4-employes';
import { Employees } from './Employe/Employes/Employees';
import { Teams } from './Team/Teams/Teams';
import { Projects } from './Project/Projects/Projects';
import { getClients } from '../../4-actions/7-client';
import { Clients } from './Clients/Clients';
import { getAllFunctions } from '../../4-actions/8-function';
import { getTasks } from '../../4-actions/3-task';
import { EmployeesWaiting } from './Employe/EmployesWaiting/EmployeesWaiting';

const Admin = ({navIsClicked}) => {

  /******************************** DATA ************************************** */
  const isComponentMounted = useComponentDidMount();
  const {user} = useSelector(state=>state.auth);
  const [isAdmin , setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  //
  const [etat , setEtat] = useState(0);
  //
  //
  const {projects} = useSelector(state => state.project);
  const {projectsWorking} = useSelector(state=>state.project)
  const {projectsPending} = useSelector(state=>state.project)
  const {projectsFinished} = useSelector(state=>state.project)
  //
  const {employes} = useSelector(state=>state.employe);
  const {simpleEmployes} = useSelector(state=>state.employe);
  const {chefEmployes} = useSelector(state=>state.employe);
  const {admins} = useSelector(state=>state.employe);
  //
  const {clients} = useSelector((state)=>state.client);

  /********************************************************************************** */
  const hasRole = (role) => {
    for(var i=0 ; i<user?.roles.length ; i++)
    {
    for(var j=0 ; j<role.length ; j++)
    {
        if(user?.roles[i].role === role[j])
          {setIsAdmin(true); return true ;}
    }
  }
  return false ; 
  }

  useEffect(()=>{
    dispatch(getProjects());
  },[]);
  useEffect(()=>{
    dispatch(getEmployes());
  },[]);
  useEffect(()=>{
    dispatch(getClients());
  },[])
  useEffect(()=>{
    dispatch(getAllFunctions())
  })

  useEffect(()=>{
    dispatch(getTasks());
  },[]);

  useEffect(()=>{
    hasRole(["ADMIN"])
  },[]);



/*************************************** SWITCH BETWEEN PAGES ****************************************** */
  
  const displayComponent = () => {
    switch(etat)
    {
        case 0 : return <DashboardAcceuil /> ; 
        case 1 : return <Projects title="Projects Terminated" projects={projectsFinished} etat={etat} />
        case 3 : return <Projects title="Projects Pending"  projects={projectsPending} etat={etat}/>
        case 2 : return <Projects title="Projects Working " projects={projectsWorking} etat={etat}/>
        case 4 : return <Employees etat={etat} title = "Admins "  employees={admins}/>
        case 5 : return <Employees etat={etat} title = "Projects Chef" employees={chefEmployes} />
        case 6 : return <Employees etat={etat} title = "Simple Employee" employees={simpleEmployes}/>
        case 7 : return <Clients />
       // case 8 : return <Teams />
        case 9 : return <EmployeesWaiting etat={etat} title = "Employees Waiting" employees={simpleEmployes}/>
        default : return <DashboardAcceuil /> 
    }
  }

  const DashboardAcceuil = () => {
      return (
        <div className='page-header '>
          {/* <div className='pourcentage'>
            <div className='value'> 5/10 works Done </div>
          </div> */}
          <CardDashboard image={checked} description={`${projectsFinished?.length} projects completed`} handleClick={()=>setEtat(1)}/>
          <CardDashboard image={sandclock} description={`${projectsWorking?.length} projects in progress`} handleClick={()=>setEtat(2)} />
          <CardDashboard image={settings} description={`${projectsPending?.length} projects pending`} handleClick={()=>setEtat(3)} />
          <CardDashboard image={admin} description={`${admins?.length} Admins in the label`} handleClick={()=>setEtat(4)} />
          <CardDashboard image={head} description={`${chefEmployes?.length} Projects Chefs`} handleClick={()=>setEtat(5)} />
          <CardDashboard image={employee} description={`${simpleEmployes?.length} Employees in the label`}handleClick={()=>setEtat(6)} />
          { isAdmin ===true  ? (<CardDashboard image={businnes} description={`Employees waiting `}handleClick={()=>setEtat(9)} />) : ( null)}
          <CardDashboard image={collabs} description={`More than ${clients?.length} businness colaborators`} handleClick={()=>setEtat(7)} />
          {/* <CardDashboard image={teamwork} description="More than 9 differents teams" handleClick={()=>setEtat(8)} /> */}
        </div>
      )
  }
 

  return (
    <div className='page-container admin-page'>
          <SideBare navIsClicked = {navIsClicked} />
          <div className='page-main admin '>
            {
              etat === 0 ? 
              (null) 
              : 
              (
                <div className='go-back-container'> <i className="go-back fa fa-long-arrow-left" onClick={()=>setEtat(0)}> </i> </div>
              )
            }
            {displayComponent()}
          </div>

    </div>
  )
}

export default Admin ; 
