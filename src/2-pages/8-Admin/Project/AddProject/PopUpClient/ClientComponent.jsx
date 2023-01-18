export const ClientComponent = ({client  , clientSelected , setClientSelected}) => {
    return (
        <div className={`client-item ${clientSelected?.id === client?.id ? "active" :""}`} onClick={()=>setClientSelected(client)}>
                <div className="image-container">
                    <img src={"http://localhost:8080/clients/files/"+client.photo}></img>
                </div>
                <div className="name-client"> 
                    <span>{client.name}</span> 
                </div>
        </div>
    )
}