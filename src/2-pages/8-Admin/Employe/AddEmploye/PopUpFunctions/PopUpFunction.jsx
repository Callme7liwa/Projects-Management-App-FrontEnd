import { useSelector } from "react-redux";

export const  PopUpFunction = ({setUserInfo , userInfo , setAddFunctions,selectedFunctions , setSelectedFunctions}) => {
    var i=1 ; 

    const {fonctions} = useSelector(state=>state.fonction) ; 

    const TestIfExiste = (array,value) => {
        for(var i=0  ; i<array?.length ; i++)
        {
            if(array[i].id === value)
                return true ; 
        }
        return false ; 
    }

    const handleSelectFunction = (myFunction) =>{

        console.log(TestIfExiste(selectedFunctions,myFunction.id))
        if(TestIfExiste(selectedFunctions,myFunction.id) === false)
        {
            setSelectedFunctions((prev)=>[...prev , myFunction]);
        }
        else
        {
            const arrayFunctions = [...selectedFunctions];
            arrayFunctions.pop(myFunction );
            setSelectedFunctions(arrayFunctions);
        }
    }

    const handleValidFunction = () => {
        setUserInfo({
            ...userInfo , 
            functions : selectedFunctions.map(fonction=>fonction.name),
        })
        setAddFunctions(false) ; 
    }
    return (
        
        <div className={`page-add-functions-container page-add-employe-container `} >
            <div className="  page-add-functions-content">
                <span className="close-page" onClick={()=>setAddFunctions(false)}> </span>
                <div className="page-header">
                    <h1>  KEEP THE WORK UP !  </h1>
                    <h3>  ADD FUNCTION </h3>
                    <span className="badge badge1">cc</span>
                </div>
                <div className="page-body">
                        {    
                            fonctions?.length>0
                            ?
                            ( 
                            <div className="list-functions functions webkit">
                               { 
                                    fonctions.map(myFunction=>{
                                        return (
                                            <>
                                            <div className={`function-container ${TestIfExiste(selectedFunctions,myFunction.id)===true ? " active" : ""}`} onClick={()=>handleSelectFunction(myFunction)}>
                                                <span> {i++ }</span>
                                                <span className="function-name">{myFunction.name} </span>
                                            </div>
                                            
                                            </>
                                        )
                                    })
                                    
                                }
                            </div>
                            )
                            :
                            (<> no functions to select !  </>)
                        }
                   <div className="form-group employe-add button">
                    {/* <i className="fa fa-check"></i> */}
                    <button className="button" onClick={handleValidFunction}><i className="fa fa-check-circle-o "></i> <span>Valider</span>  </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
