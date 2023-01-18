import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { searchClient } from "../../../../../4-actions/7-client";
import { ClientComponent } from "./ClientComponent";

export const PopUpClient = ({ setChangeClient , setClientSelected , clientSelected,setValidateChoice,validateChoice ,dispatch}) => {

    const [keySearchClient , setKeySearchClient] = useState("");
    const {clientsSearched} = useSelector(state=>state.client);
    const {clients} = useSelector(state=>state.client);


    useEffect(()=>{
            if(keySearchClient!="")
              dispatch(searchClient(keySearchClient));
    },[keySearchClient]);

    return (
        <div className="pop-up-client-container">
        <div className="pop-up-client-content">
                <span className="close-page" onClick={()=>{{setChangeClient(false) ; setValidateChoice(false)}}}> </span>
            <div className="pop-up-title">
                <h2> KEEP THE NETWORK BIGGER !</h2>
                <h5> Select A Client </h5>
                <span className="badg" >  </span>
            </div>
           <div className="pop-up-body">
                <div className="form-group">
                    <input className=""  name="keySearchClient"  value={keySearchClient} onChange={(e)=>setKeySearchClient(e.target.value)} placeholder="tape client name here ... "/>    
                </div>
                <div className="list-clients-container webkit">
                    {clientSelected != null || clientSelected != undefined 
                    ?
                    (
                        <div className="client-selected-container w-100"> 
                            <div className="client-selected-content">
                                <div><img src={"http://localhost:8080/clients/files/"+clientSelected?.photo}></img></div>
                                <div>{clientSelected?.name}</div> 
                                <div> <i className="fa fa-times-circle-o" onClick={()=>setClientSelected(null)}></i> </div>
                            </div>
                         </div>
                    )
                    :
                    (null)
                }
                {
                    (validateChoice === true  && (clientSelected == null || clientSelected == undefined)  ? (<div className="error-validation text-danger">You Must Select an client ! </div>) : (null))
                }
                    <div className="container-name w-100">
                        Clients
                    </div>
                    {
                      clientsSearched.length > 0  && keySearchClient!==""
                        ?
                        clientsSearched.map(client=>{
                            return(
                                <ClientComponent client = {client} clientSelected ={clientSelected}  setClientSelected={setClientSelected}/>
                            )
                        })
                        :
                        clients?.map(client=>{
                            return (
                                <ClientComponent client = {client} clientSelected ={clientSelected} setClientSelected={setClientSelected} />
                            )
                        })
                    }
                </div>
           </div>
            <div className="button w-100"> 
                <span className="btn-choice-team" onClick={()=>{setValidateChoice(true); if(clientSelected != null || clientSelected != undefined ) {setChangeClient(false) ; setValidateChoice(false)}}}>
                     Valider 
                </span>
            </div>
        </div>
    </div>
    )
}