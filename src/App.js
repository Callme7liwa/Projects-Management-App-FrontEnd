import "bootstrap/dist/css/bootstrap.min.css";
import 'animate.css';
import "./app.css";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Dashboard, Admin , Login, Parametres, Project, ProjectOfCategory, Projects, Test, Employe, MyProjects, Inbox} from './2-pages';
import { Navbar } from './1-component';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import Coucou from "./2-pages/Test/Coucou";
import AuthenticatedRoute from "./2-pages/AuthenticatedRoute";
import AuthorizationRoute from "./2-pages/AuthorizationRoute";
import { UnAuthorized } from "./2-pages/UnAutorized";
import { PasswordRecover } from "./2-pages/9-parametres/PasswordRecovery/PasswordRecovery";
import { RouteNotFound } from "./2-pages/RouteNotFound";
import { Navigate } from "react-router";



 axios.defaults.baseURL = "http://localhost:8080/";
// axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type']="application/json";
// axios.defaults.headers.post['Accept']="application/json";
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
function App()  {

  const [navIsClicked , setNavIsClicked] = useState(true);
  return (
    <>
      <Router>
          <Navbar navIsClicked={navIsClicked}  setNavIsClicked = {setNavIsClicked}></Navbar>
          <Switch>
            <AuthorizationRoute path="/dashboard" component={Dashboard} role={["SIMPLE" , "CHEF"]}/>
                        
            <Route path="/login" exact component={Login}></Route>
            
    
            
            <AuthenticatedRoute path="/parametres" exact component={Parametres}></AuthenticatedRoute>
            

            <AuthenticatedRoute path="/categories" exact>
                <Test navIsClicked={navIsClicked}></Test>
            </AuthenticatedRoute>
           
            
            <AuthenticatedRoute path="/project/:id" exact  component={Project} navIsClicked={navIsClicked}/>          
            
            <AuthorizationRoute path="/myprojects"   exact component={MyProjects} role={["SIMPLE","CHEF"]}></AuthorizationRoute>

            <AuthorizationRoute path="/admin" exact component={Admin} role={["ADMIN","CHEF"]}/>

            <AuthorizationRoute path="/inbox" exact component={Inbox} navIsClicked={navIsClicked} role={["SIMPLE" , "CHEF"]}/>

            <Route path="/unAuthorized">
              <UnAuthorized    />
            </Route>
            <Route path="/passwordRecovery">
              <PasswordRecover    />
            </Route>
            <Route  component={RouteNotFound}></Route>

        </Switch>
      </Router>
    </>
  );
}

export default App ; 