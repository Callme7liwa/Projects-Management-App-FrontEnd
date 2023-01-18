import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addClientToProject } from "../../../../4-actions/6-projects";
import { searchClient } from "../../../../4-actions/7-client";
import { profileDefault } from "../../../../assets";

export const PopUpAddClientProject = ({dispatch , setAddClient , colors , getRandomIndex}) => {
    
    const [selectedClient , setSelectedClient] = useState();
    const [clientKey , setClientKey] = useState("");

    const {clients} = useSelector(state=>state.client);
    const {clientsSearched} = useSelector(state=>state.client);

    const {project} = useSelector(state=>state.project);

    useEffect(()=>{
        if(clientKey!==null)
            dispatch(searchClient(clientKey))
    },[clientKey])

    const handleAddClientToProject = () => {
       dispatch(addClientToProject(project.id , selectedClient));
       setAddClient(false)
    }

    const ClientComponent = ({client}) => {
        return (
            <div className={`employe-container ${selectedClient?.id === client.id ? " active" : ""}`} onClick={()=>setSelectedClient(client)}>
                <div className="employe-image-container">
                    <div className="employe-image">
                        {
                            client?.photo!=="" && client?.photo!==null
                            ?
                            ( <img src={"http://localhost:8080/clients/files/"+client.photo}></img>)
                            :
                            ( <img src={profileDefault}></img>)
                        }
                    </div>
                </div>
                <div className="employe-name" > <span style={{backgroundColor: colors[getRandomIndex()] }}>{client.name}</span> </div>
            </div>
        )
    }

    const DisplayClients = () => {
        return (

            clientsSearched!==null && clientsSearched !== undefined && clientsSearched.length>0 
            ?
            (
                clientsSearched
                ?.map(client=>{
                    return(
                        <ClientComponent  client={client}/>
                    )
                })
            )
            :
            (
                clients
                ?.map(client=>{
                    return (
                        <ClientComponent  client={client}/>
                    )
                })
            )
            
            
        )
    }


    return (
    <div className={`page-add-employe-container`} >
        <div className="page-add-employe-content">
            <span className="close-page" onClick={()=>{setAddClient(false);setSelectedClient(null)}}> </span>
            <div className="page-header">
                <h1> ADD CLIENT TO THE PROJECT  </h1>
                <h3> {project.name} </h3>
                <span className="badge badge1"></span>
            </div>
           
            <div className="page-body page-add-employe-to-team">
                <div className="body1">
                    <input  onChange={(e)=>setClientKey(e.target.value)} value={clientKey} type="text" className="" placeholder="search client here ... "></input>
                </div>
                <div className="body2 webkit">
                    <DisplayClients />
                </div>
            </div>

            <div className="footer">
                {
                    selectedClient!==null 
                    ?
                    (
                    <button type="submit" onClick={handleAddClientToProject}> <i className="fa fa-check-circle-o mr-2"></i> Submit </button>
                    )
                    :
                    (
                    <button type="submit " className="bg-danger text-black"> <i className="fa fa-times-o mr-2"></i> can't Submit </button>
                    )
                }
            </div>

        </div>
    </div>
    )
}

