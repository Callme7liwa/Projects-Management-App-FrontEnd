import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthorizationRoute = ({ role, component: Component , ...rest }) => {
  
    const {user} = useSelector(state=>state.auth);
    const hasRole = (role) => {
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
  
  return (
    <Route
      render={(props) => {
        if (user!==null && user!==undefined){
            if(hasRole(role))
            {
              return <Component  />;
            }
            else 
            {

              return  <Redirect to = {"/unAuthorized"} />
            }
        }
        else
          return (
            <Redirect to={"/login"} />
          );
      }}
    />
  );
};

export default AuthorizationRoute;