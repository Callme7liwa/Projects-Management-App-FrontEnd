import { useSelector } from "react-redux";

export const  PopUpRoles = ({userInfo , setUserInfo , setAddRole , selectedRoles , setSelectedRoles }) => {

    const {roles} = useSelector(state=>state.role);

        
    const TestIfExiste = (array,value) => {
        for(var i=0  ; i<array?.length ; i++)
        {
            if(array[i].id === value)
                return true ; 
        }
        return false ; 
    }
    const handleSelectRoles = (role) => {
        if(TestIfExiste(selectedRoles,role.id) === false)
        {
            setSelectedRoles((prev)=>[...prev , role]);
        }
        else
        {
            const arrayRoles = [...selectedRoles];
            arrayRoles.pop(role );
            setSelectedRoles(arrayRoles);
        }
    }

    const handleValidRoles = () => {
         setUserInfo({
            ...userInfo , 
            roles :  selectedRoles.map(role=>role.role),
         })
        setAddRole(false);
    }
    
    return (
        <div className={`page-add-roles-container page-add-functions-container page-add-employe-container `} >
            <div className="page-add-functions-content page-add-roles-content">
                <span className="close-page" onClick={()=>setAddRole(false)}> </span>
                <div className="page-header">
                    <h1>  EMPLOYE REGISTRYING !  </h1>
                    <h3>  ADD ROLE  </h3>
                    <span className="badge badge1">cc</span>
                </div>
                <div className="page-body">
            
                         {
                            roles?.length>0
                            ?
                            ( 
                            <div className="list-functions list-roles webkit">
                               { 
                                    roles.map(role=>{
                                        console.log(role);
                                        return (
                                            <div className={`role-container  ${TestIfExiste(selectedRoles,role.id)===true ? " active" : ""}`} onClick={()=>handleSelectRoles(role)}>
                                                <span> { role.role.slice(0,2)  }</span>
                                                <span className="function-name">{role.role} </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            )
                            :
                            (<> no Roles to select !  </>) 
                            }
                        
                   <div className="form-group employe-add button">
                    <button className="button" onClick={handleValidRoles}> <i className="fa fa-check-circle-o "></i> <span>Valider</span>  </button>
                    </div>
                </div>
            </div>
        </div>
    )
}