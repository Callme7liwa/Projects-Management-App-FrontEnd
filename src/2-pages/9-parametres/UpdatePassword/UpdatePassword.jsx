import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../../4-actions/2-auth";
import { clearMessage } from "../../../4-actions/message";
import {  Form, Formik } from "formik";
import * as Yup  from "yup"; 
import TextFieldPassword from "../../../1-component/InputPassword/TextFieldPassword";
import { ResponseComponent } from "../../../1-component";

export const UpdatePasswordComponent = () => {

    const dispatch = useDispatch();

    const {user} =  useSelector(state=>state.auth);

    // const {message} = useSelector(state=>state.message);
    // const [show , setShow] = useState(true);

    const [isSubmited , setIsSubmited] = useState(false);
        
    // useEffect(() => {
    //     var timeId ; 
    //     setShow(true);
    //     if(message !== "")
    //     {
    //     timeId = setTimeout(() => {
    //              setShow(false)
    //              }, 5000)
    //     }
             
    //     return () => {
    //         clearTimeout(timeId)            
    //     }
    // }, [message]);

    // if(show===false && message !=="")
    //     dispatch(clearMessage());
    
    const validate = Yup.object({
        oldPassword: Yup.string()
        .max(25, 'Must be 25 characters or less')
        .required('old password is required '),
        newPassword: Yup.string()
        .max(25, 'Must be 25 characters or less')
        .min(5,"At least five characters")
        .required('new password is required'),
        confirmPassword: Yup.string()
        .max(25, 'Must be 25 characters or less')
        .min(5,"At least five characters")
        .required('confirm password is required ')
        .oneOf([Yup.ref("newPassword"), null], "Password must match")
    })


    
    return (
        <>

    <ResponseComponent classStyle="request-parametres"  dispatch={dispatch} isSubmited = {isSubmited} setIsSubmited={setIsSubmited} />            

        {/* {
            show === true && message !== ""
            ?
            (
            <div className="request-result request-parametres animate__animated animate__backInRight">
                <div className="result">
                    <span> Response </span>
                </div>
                <div className="body">
                    <div className="body-result-icon">
                             {
                                message.includes("SUCCESS")
                                ?
                                (<i className="fa fa-check-circle"></i>)
                                :
                                (<i className="fa fa-times-circle-o"></i>)
                            }
                    </div>
                    <div className="body-message"> 
                        <span>
                            {
                                message.includes("SUCCESS")
                                ?
                                (<>You request has been sent and treated succesfuly ! </>)
                                :
                                (<>Error please try a gain </>)
                            }
                         
                         </span>
                    </div>
                    <div className="body-footer">
                     
                    </div>
                </div>
            </div>
             ) 
             :
             (null)
             }
         */}
        
        <div className='password-update-component'>
            <div className='component-header'>
                <div className=''> <i className='fa fa-refresh mr-1'></i> <span>Update Your Profile</span></div>
                <div className=''> <span>Change Your <span style={{color : "black"}}>Password</span> </span></div>
            </div>
        <Formik
            initialValues={{
            id : user?.id,
            oldPassword:"",
            newPassword:"",
            confirmPassword:""
            }}
            validationSchema={validate}
            onSubmit={(values) => {
                setIsSubmited(true);
                 dispatch(updatePassword(values));
                document.getElementById("myForm").reset();
            }}
        >
                {formik => (
                    <Form id="myForm">
                        <div className='component-body'>
                            <TextFieldPassword  label="Old Password"   type="password" name="oldPassword" placeholder='Enter Your oldPassword ...'></TextFieldPassword>
                            <TextFieldPassword label="New Password"   type="password" name="newPassword" placeholder='Enter Your newPassword ...'></TextFieldPassword>
                            <TextFieldPassword label="Confirm Password"   type="password" name="confirmPassword" placeholder='Confirm Your Password ...'></TextFieldPassword>
                        </div>
                        <div className='component-footer'>
                            <button type="submit" className='submit' >
                                Change Password 
                            </button>
                        </div>
                    </Form>
                 )}
            </Formik>   
            </div>
        </>
    )
}


