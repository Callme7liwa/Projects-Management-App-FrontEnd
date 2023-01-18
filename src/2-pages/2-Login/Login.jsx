import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import {  Form, Formik } from "formik";
import * as Yup  from "yup"; 
import "./Login.css";
import { ResponseComponent, TextField } from '../../1-component';
import { useDispatch } from 'react-redux';
import { getEmployes } from '../../4-actions/4-employes';
import { useSelector } from 'react-redux';
import { login } from '../../4-actions/2-auth';
import { useState } from 'react';

const Login = () => {

  const {employes} = useSelector(state=>state.employe);
  const {user} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const [isSubmited , setIsSubmited] = useState(false);
  
  const hasRole = (role) => {
    for(var i=0 ; i<user?.roles.length ; i++)
     {
       if(user?.roles[i].role === role)
        {
          return true ;
        }
    }
    return false ; 
  }


  if(user)
  { 
    if(hasRole("ADMIN") === true)
    history.push("/admin");
    else
    history.push("/dashboard");
  }
  
  

  const validate = Yup.object({
    userName: Yup.string()
      .max(50, 'Must be 15 characters or less')
      .min(2,"At least two characters")
      .required('Required'),
    password: Yup.string()
    .required("Password must not be empty")
  })

  return (

    <Formik
        initialValues={{
          userName:"",
          password:""
        }}
        validationSchema={validate}
        onSubmit={values => {
          setIsSubmited(true);
          dispatch(login(history , values.userName , values.password));
        }}
      >
        {formik => (
          <Form>
              <div className='page-login-container'>
                 <ResponseComponent classStyle="request-parametres"  dispatch={dispatch} isSubmited = {isSubmited} setIsSubmited={setIsSubmited} />            
                  <div className="page-login-content-container">
                    <div className='page-login-content'>
                        <section className='login-header'>
                          <h3 > Hello  <span className='span-color'> A Gain !</span> </h3>
                          <h3 > Wellcome back you've <span className='span-color'> Been Missed</span></h3>
                        </section>
                        <section className='login-body'>
                          <TextField label="Username"  classname1="form-group" type="text" name="userName" placeholder='Enter Your Username ...'></TextField>
                          <TextField label="Password"  classname1="form-group" type="password" name="password" placeholder='Enter Your Password ...'></TextField> 
                          <span><Link className="nav-link" to="/passwordRecovery"> Did you forget your password ?</Link></span>
                        </section>
                        <section className='login-footer'>
                          <button type="submit" className='btn btn-block w-100'>Submit </button>
                        </section>
                    </div>
                  </div>
            </div>
          </Form>
        )}
      </Formik>
    
  )
}

export default Login ; 