import { profileDefault } from "../../../../../assets";


export const CardEmployeSelectedComponent = ({employe , removeFromSelectedEmployes}) => {
    return (
        <div className="employe-content"> 
            <div className="image-container">
                {
                    employe?.photo !==null && employe?.photo!==""
                    ?
                    (
                        <img src={"Http://localhost:8080/journalistes/files/"+employe?.photo}></img>
                        )
                        :
                        (
                            
                            <img src={profileDefault}></img>
                        )
                }
            </div>
            <div className="name-employe-selected"> {employe?.firstName} {employe?.secondName} </div>
            <div> <i className="fa fa-times-circle-o" onClick={()=> removeFromSelectedEmployes(employe)}></i></div>
        </div>
    ) 
}