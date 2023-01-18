import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthenticatedRoute = ({ auth, component: Component, ...rest }) => {
    const {user} = useSelector(state=>state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user!==null && user!==undefined) return <Component  />;
        else
          return (
            <Redirect to={"/login"} />
          );
      }}
    />
  );
};

export default AuthenticatedRoute;