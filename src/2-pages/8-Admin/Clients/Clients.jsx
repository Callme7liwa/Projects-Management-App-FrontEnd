import { useState } from "react";
import { useSelector } from "react-redux"
import { CardClient } from "../../../1-component" ; 
import "./Client.css";
import {AddClient} from "./AddClient/AddClient";
import { useEffect } from "react";
import { searchClient } from "../../../4-actions/7-client";
import { useDispatch } from "react-redux";

export const Clients = ({}) => {

    const [clicked , setClicked] = useState(false);
    const [search , setSearch] = useState(false); 
    const {clients} = useSelector(state=>state.client);
    const {user} = useSelector(state=>state.auth);
    const {clientsSearched} = useSelector(state=>state.client);
    const [key , setKey] = useState("");
    const dispatch = useDispatch();
    



    useEffect(()=>{
        if(key!=="")
           dispatch(searchClient(key));
    },[key])


    const hasRole = (roleName) => {
        console.log(roleName);
        for(var i=0 ; i<user?.roles.length ; i++)
         {
            if(user?.roles[i].role === roleName)
              return true ;
        }
        return false ; 
      }

    const displayContent = () => {
        if(clients === null || clients === undefined)
            return (<> Nothing ro Render  </>)
        else

           return (
            
                clientsSearched === null ||  clientsSearched.length <=0 || key.length<=0
                ?
                (
                    clients.map(client=>{
                        return (
                            <CardClient client={client} key={client.id} /> 
                        )
                    })
                )
                :
                (
                    clientsSearched.map(client=>{
                        return (
                            <CardClient client={client} key={client.id} /> 
                        )
                    })
                )
            
           )
    }

    
    return (
        <>
             <div className="admin page-main-title">
                <span> ALL CLIENTS </span>
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
            <div className="page-main-content page-main-content-clients animate__animated animate__backInLeft">
                {displayContent()}
            </div>    
            {clicked === true ? (<AddClient  clicked={clicked} setClicked = {setClicked}  />) : (null)}        
        </>
    )
}