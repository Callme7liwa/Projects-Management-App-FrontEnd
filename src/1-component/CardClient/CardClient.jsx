import "./CardClient.css"
import { clientImage } from "../../assets";
const CardClient = ({client}) => {

    if(client === null || client === undefined)
        return null ; 
    
    const makeTheFirstLetterUpper = (stringValue) => {
        return stringValue?.charAt(0)?.toUpperCase() + stringValue?.slice(1)?.toLowerCase();
    }
    

    return(
        <div className="client-card-container">
            <div className="client-card-content">
                <div className="card-left"></div>
                <div className="card-right">
                    <div className="image-container">
                        {
                            client.photo !==""
                            ?
                            (
                                <img src={"http://localhost:8080/clients/files/"+client.photo}></img>
                            )
                            :
                            (
                                <img src={clientImage}></img>
                            )
                        }
                    </div>
                    <div className="card-title">
                        {makeTheFirstLetterUpper(client.name)}
                    </div>
                        <div className="button"> 
                            <div className="button-left"></div>
                            <a className="button-right">
                                <span className=""> Web Site </span>
                                <i className="fa fa-tags"></i>
                            </a>
                        </div> 
                </div>
            </div>
        </div>
    )
}

export default CardClient ; 