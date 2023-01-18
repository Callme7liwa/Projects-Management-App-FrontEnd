
import "./CardEmploye.css";
import profileDefault from "./../../assets/profileDefault.jpg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeEmploye } from "../../4-actions/2-auth";

const CardEmploye = ({employe , setSelectedEmploye  , setShowInformations}) => {

    const {user} = useSelector(state=>state.auth);
    const dispatch = useDispatch();

    const makeTheFirstLetterUpper = (val) => {
        // return val.charAt(0).toUpperCase() + val.slice(1);
        return val ;
    }

    const DisplayFunctions = ({functions}) => {
    return (
        functions === undefined || functions === null  ? 
        (<>nothing to render</>)
        :
        functions.slice(1,3)?.map(functionValue => {
        return (
            <span>{functionValue.name}</span>
            )
        })
    )
    }

    const hasRole = (role , user) => {
        for(var i=0 ; i<user?.roles.length ; i++)
         {
           if(user?.roles[i].role === role)
            {
              return true ;
            }
        }
        return false ; 
      }
    
    const handleRemoveEmploye = (employe) => {
        dispatch(removeEmploye(employe));
    }
    


    return(
        <div className="card-employe-container" key={employe.id} >
            {
                hasRole("ADMIN",user) && hasRole("ADMIN",employe) === false
                ?
                ( <i className="delete-employe fa fa-times" onClick={()=>handleRemoveEmploye(employe)}></i>)
                :
                (null)

            }
            <div className="card-employe-content">
                <div className="card-header">
                    <div className="image-container">
                        {
                            employe.photo !== null
                            ?
                            (
                                <img src={"http://localhost:8080/journalistes/files/"+employe.photo}></img>
                            )
                            :
                            (
                                <img src={profileDefault}></img>
                            )
                        }
                        
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="text username">{employe.firstName} {employe.secondName}</div>
                    <div className="text function"> 
                    {
                        employe?.functions?.length > 0
                        ?
                        (<>{employe?.functions[0]?.name}</>)
                        :
                        (<>no  skills </>)
                    }
                    </div>
                    <div className="others functions">
                        {DisplayFunctions({functions :employe.functions})}
                        {
                            employe.functions.length > 4 ?
                            (<span> more ... </span>)
                            :
                            (null)
                        }
                    </div>
                </div>
                <div className="card-buttom" >
                    <i className="fa fa-long-arrow-right" onClick={()=>{setSelectedEmploye(employe); setShowInformations(true)}}></i> 
                </div>
            </div>
        </div>
    )

}

export default CardEmploye ; 