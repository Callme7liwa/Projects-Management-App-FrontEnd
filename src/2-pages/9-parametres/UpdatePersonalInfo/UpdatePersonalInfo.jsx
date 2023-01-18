import { useSelector } from "react-redux"
import {  Form, Formik } from "formik";
import * as Yup  from "yup"; 
import TextFieldPassword from "../../../1-component/InputPassword/TextFieldPassword";
import { useDispatch } from "react-redux";
import { updatePersonalInfo } from "../../../4-actions/2-auth";
import { useEffect, useState } from "react";
import { clearMessage } from "../../../4-actions/message";
import { ResponseComponent } from "../../../1-component";

export const UpdatePersonalInfoComponent = () => {

    const dispatch  = useDispatch();
    const {user} = useSelector(state=>state.auth);
    const [isSubmited , setIsSubmited] = useState(false);
    
      
    const validate = Yup.object({
        firstName: Yup.string()
        .max(25, 'Must be 25 characters or less')
        .required('old password is required '),
        secondName: Yup.string()
        .max(25, 'Must be 25 characters or less')
        .min(5,"At least five characters")
        .required('second name is required'),
        country: Yup.string()
        .max(25, 'Must be 25 characters or less')
        .min(3,"At least 3 characters")
        .required('country  is required '),
        city: Yup.string()
        .max(25, 'Must be 25 characters or less')
        .min(2,"At least TWO characters")
        .required('city is required ')
    })

  

    return (
        <>

        <ResponseComponent classStyle="request-parametres"  dispatch={dispatch} isSubmited = {isSubmited} setIsSubmited={setIsSubmited} />            

        <div className='password-update-component'>
            <div className='component-header'>
                <div className=''> <i className='fa fa-refresh mr-1'></i> <span>Update Your Profile</span></div>
                <div className=''> <span>Change Your <span style={{color : "black"}}>Personal Info </span> </span></div>
            </div>
            <div className='component-body'>

            <Formik
            initialValues={{
            id : user?.id,
            firstName:user?.firstName,
            secondName:user?.secondName,
            country:user?.country,
            city:user?.city,
            phone:user?.phone,
            address:user?.address,
            }}
            validationSchema={validate}
            onSubmit={(values) => {
                console.log(values)
                 dispatch(updatePersonalInfo(values))
            }}
        >
                {formik => (
                    <Form id="myForm">
                        <div className='component-body'>
                            <TextFieldPassword label="First Name"   type="text" name="firstName" placeholder='Enter Your Fisrt Name ...'></TextFieldPassword>
                            <TextFieldPassword label="Second Name"   type="text" name="secondName" placeholder='Enter Your Second Name ...'></TextFieldPassword>
                            <TextFieldPassword label="Country "   type="text" name="country" placeholder='Enter Your Country ...'></TextFieldPassword>
                            <TextFieldPassword label="City "   type="text" name="city" placeholder='Enter Your City ...'></TextFieldPassword>
                            <TextFieldPassword label="Phone"   type="number" name="phone" placeholder='Enter Your phone number ...'></TextFieldPassword>
                            <TextFieldPassword label="Address"   type="text" name="address" placeholder='Enter Your adress here  ...'></TextFieldPassword>
                        </div>
                        <div className='component-footer'>
                            <button type="submit" className='submit' >
                                Submit
                            </button>
                        </div>
                    </Form>
                 )}
            </Formik> 
            </div>
        </div>
     </>
    )
}