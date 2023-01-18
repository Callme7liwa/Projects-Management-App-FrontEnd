import { profileDefault } from "../../../../../assets";

export const CardEmployeComponent = ({employe , testIfExiste , addEmploye ,employeSelected}) => {
    return (
            
        <div className={`employe-info ${testIfExiste(employeSelected , employe.id) === true ?  " active" : ""}`}onClick={()=>{addEmploye(employe)}}>
            <div className="employe-image-container">
                {
                    employe?.photo!==null && employe?.photo!==""
                    ?
                    (
                        <img src={"Http://localhost:8080/journalistes/files/"+employe.photo} alt="" srcset="" />
                    )
                    :
                    (
                        <img src={profileDefault} alt="" srcset="" />
                    )
                }
            </div>
            <div className="perso-info"><span>{employe?.firstName} {employe?.secondName}</span> <span>{employe?.email}</span> </div>
            <div className="function "><span>{employe?.functions[0]?.name}</span></div>
        </div>  
    )
}