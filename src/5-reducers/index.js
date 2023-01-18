import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import user from "./user";
import employe from "./employe";
import project from "./project";
import colors from "./colors";
import client from "./client";
import fonction from "./fonctions" ;
import task from "./task" ;
import team from "./team" ;
import role from "./role" ;
import category from "./category" ;
import statesVariables from "./statesVariables" ;

export default combineReducers({
  auth,
  message,
  user,
  employe,
  project,
  colors , 
  client, 
  fonction,
  task,
  team,
  role,
  category,
  statesVariables,
});