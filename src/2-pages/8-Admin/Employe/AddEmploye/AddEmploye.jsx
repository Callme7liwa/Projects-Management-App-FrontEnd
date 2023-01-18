
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResponseComponent } from "../../../../1-component";
import { registerJournalist } from "../../../../4-actions/2-auth";
import { getAllFunctions } from "../../../../4-actions/8-function";
import { getRoles } from "../../../../4-actions/9-role";
import "./AddEmploye.css";
import { PopUpFunction } from "./PopUpFunctions/PopUpFunction";
import { PopUpRoles } from "./PopUpRoles/PopUpRoles";


export const AddEmploye = ({text , clicked  , setClicked}) => {

    const dispatch = useDispatch();

    const [userInfo , setUserInfo] = useState({
        firstName :"",
        secondName:"",
        userName:"",
        email:"",
        gender:"",
        birthday:"",
        country:"",
        city:"",
        functions:[],
        roles:[]
    });
    const [selectedFunctions  , setSelectedFunctions] = useState([]);
    const [selectedRoles  , setSelectedRoles] = useState([]);
    const [addFunctions , setAddFunctions] = useState(false) ; 
    const [addRole  , setAddRole] = useState(false);

    const {fonctions} = useSelector(state=>state.fonction) ; 
    const {roles} = useSelector(state=>state.role);



    const [isSubmited , setIsSubmited] = useState(false);
    

    useEffect(()=>{
        if(fonctions === null || fonctions.length<=0)
        dispatch(getAllFunctions());
        if(roles === null || roles.length<=0)
        dispatch(getRoles());
    },[]);

    /********************************* USER INFO VALUES *************************************** */
    const handleChange = (e) => {
        setUserInfo({
            ...userInfo , 
           [ e.target.name]:e.target.value
        })
    }

   
    /**************************** SUBMIT FORM  *******************************************************/

    const handleAddEmploye = (e) => {
        setIsSubmited(true);
        dispatch(registerJournalist(userInfo))
    }
    return (
        <>
        <div className={`page-add-employe-container animate__animated ${clicked === true ? "animate__backInDown":"animate__backOutDown"}`} >
            <ResponseComponent dispatch={dispatch} isSubmited={isSubmited} classStyle="request-result-client" setIsSubmited={setIsSubmited} />
            <div className="page-add-employe-content">
                <span className="close-page" onClick={()=>setClicked(!clicked)}> </span>
                <div className="page-header">
                    <h1>  keep the teams grow up </h1>
                    <h3>  ADD NEW EMPLOYEE </h3>
                    <span className="badge badge1">cc</span>
                </div>
                <div className="page-body">
                    <div className="form-group">
                        <label className="form-label"> First Name </label>
                        <input className="form-control" name='firstName' onChange={handleChange} value={userInfo.firstName} placeholder="Tape name here "></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label"> Second Name </label>
                        <input className="form-control" name='secondName' onChange={handleChange} value={userInfo.secondName} placeholder="Tape second name here "></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label"> Username </label>
                        <input className="form-control" name='userName' onChange={handleChange} value={userInfo.userName} placeholder="Tape username here "></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label"> Email </label>
                        <input className="form-control" name='email' onChange={handleChange} value={userInfo.email} placeholder="Tape email here "></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label"> City </label>
                        <input className="form-control" name='city' onChange={handleChange} value={userInfo.city} placeholder="Tape email here "></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label"> Country </label>
                        <input className="form-control" name='country' onChange={handleChange} value={userInfo.country} placeholder="Tape email here "></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label"> Date </label>
                        <input className="form-control"  name='birthday'  onChange={handleChange} value={userInfo.birthday} type="Date" placeholder="Tape Date here "></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label"> Gender </label>
                        <select name='gender' onChange={handleChange} value={userInfo.gender} className="form-control">
                            <option> Male </option>
                            <option> Female </option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label"> Functions </label>
                        <input className="form-control" onClick={()=>setAddFunctions(true)} type="text" placeholder="Tape Date here "></input>
                        {
                            selectedFunctions?.length > 0
                            ?
                            (<div className="numbre-selected"> <span className="numbre">{selectedFunctions?.length}</span> functions has been selected <i className="fa fa-check-circle-o"></i></div>)
                            :
                            (null)
                        }
                    </div>
                    <div className="form-group">
                        <label className="form-label"> Roles </label>
                        <input className="form-control" type="text" onClick={()=>setAddRole(true)} placeholder="Tape Role  here "></input>
                        {
                            selectedRoles?.length > 0
                            ?
                            (<div className="numbre-selected"> <span className="numbre">{selectedRoles?.length}</span> roles has been selected <i className="fa fa-check-circle-o"></i></div>)
                            :
                            (null)
                        }
                    </div>
                    <div className="form-group employe-add button">
                        {/* <i className="fa fa-check"></i> */}
                        <button className="button" onClick={handleAddEmploye}> <span>Register</span>  <i className="fa fa-send "></i></button>
                    </div>
                </div>
            </div>
        </div>
        {
            addFunctions === true 
            ?
            (<PopUpFunction setUserInfo={setUserInfo} userInfo={userInfo} setAddFunctions={setAddFunctions} selectedFunctions={selectedFunctions} setSelectedFunctions={setSelectedFunctions} />)
            :
            addRole === true 
            ?
            (<PopUpRoles setUserInfo={setUserInfo} userInfo={userInfo}  selectedRoles={selectedRoles}  setSelectedRoles={setSelectedRoles} setAddRole={setAddRole}/>)
            :
            (null)
        }
        </>
    )
}

