import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import TextFieldPassword from "../../../1-component/InputPassword/TextFieldPassword";
import { updateEmail } from "../../../4-actions/2-auth";
import { clearMessage } from "../../../4-actions/message";
import {  Form, Formik } from "formik";
import * as Yup  from "yup"; 
import { ResponseComponent } from "../../../1-component";


export const UpdateEmailComponent = () => {
    
    const {user} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const [isSubmited , setIsSubmited] = useState(false);


console.log("the is submited ", isSubmited);

    const validate = Yup.object({
        email: Yup
        .string()
        .required('email is required ')
        .email("must be in email format ")
  })



    return (
        <>

            <ResponseComponent classStyle="request-parametres"  dispatch={dispatch} isSubmited = {isSubmited} setIsSubmited={setIsSubmited} />            

            <div className='password-update-component'>
                <div className='component-header'>
                    <div className=''> <i className='fa fa-refresh mr-1'></i> <span>Update Your Profile</span></div>
                    <div className=''> <span>Change Your <span style={{color : "black"}}>Email</span> </span></div>
                </div>
            <Formik
            initialValues={{
            email:user?.email,
            }}
            validationSchema={validate}
            onSubmit={(values) => {
                setIsSubmited(true);
                dispatch(updateEmail(user?.id , values.email));
            }}
        >
                {formik => (
                    <Form>
                        <div className='component-body'>
                            <TextFieldPassword label="Your new email ! "   type="text" name="email" placeholder='Enter Your new email ...'></TextFieldPassword>
                        </div>
                        <div className='component-footer'>
                            <button type="submit" className='submit'  >
                                Change Email
                            </button>
                        </div>
                    </Form>
                 )}
            </Formik>   
            </div>
        </>
)

}