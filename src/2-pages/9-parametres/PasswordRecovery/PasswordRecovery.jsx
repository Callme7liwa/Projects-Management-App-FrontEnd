import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import TextFieldPassword from "../../../1-component/InputPassword/TextFieldPassword";
import { clearMessage } from "../../../4-actions/message";
import {  Form, Formik } from "formik";
import * as Yup  from "yup"; 
import { passwordRecovery } from "../../../4-actions/2-auth";
import "./PasswordRecovery.css";
import { useHistory } from "react-router-dom";
import { ResponseComponent } from "../../../1-component";


export const PasswordRecover = () => {
    const dispatch = useDispatch();
    const [isSubmited , setIsSubmited] = useState(false);

    const history = useHistory();
  

   
    const validate = Yup.object({
        email: Yup
        .string()
        .required('email is required ')
        .email("must be in email format ")
  })

    return (
        <div className="password-recovery-container">
            <ResponseComponent classStyle="request-parametres"  dispatch={dispatch} isSubmited = {isSubmited} setIsSubmited={setIsSubmited} />            
           
            <div className='password-update-component left-0'>
                <div className='component-header'>
                    <div className=''> <i className='fa fa-refresh mr-1'></i> <span>Recover Your Password</span></div>
                    <div className=''> <span>Tape your  <span style={{color : "black"}}>Email</span> </span></div>
                </div>
                <Formik
                initialValues={{
                email:"",
                }}
                validationSchema={validate}
                onSubmit={(values) => {
                    setIsSubmited(true);
                    dispatch(passwordRecovery(values.email , history));
                    document.getElementById("myForm").reset();
                }}
                >
                    {formik => (
                        <Form id="myForm">
                            <div className='component-body'>
                                <TextFieldPassword label="Your  email here ! "   type="text" name="email" placeholder='Enter Your  email ...'></TextFieldPassword>
                            </div>
                            <div className='component-footer'>
                                <button type="submit" className='submit' >
                                    Change Email
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>   
            </div>
        </div>
    )
}