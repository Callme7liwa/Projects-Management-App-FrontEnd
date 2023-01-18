
import {  Form, Formik } from "formik";
import { useEffect, useState } from "react"
import { clearMessage } from "../../../../4-actions/message";

import * as Yup  from "yup"; 
import "./AddClient.css";
import { ResponseComponent, TextField } from "../../../../1-component";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearVariableImage, setVariableImage } from "../../../../4-actions/statesVariable";
import { saveClient } from "../../../../4-actions/7-client";

export const AddClient = ({clicked  , setClicked}) => {

    const {image} = useSelector(state=>state.statesVariables);
    const [isSubmited , setIsSubmited] = useState(false);

    const dispatch = useDispatch();

    const RenderPhoto = () => {

        const handleRemovePicture = () => {
            dispatch(clearVariableImage()); 
            document.getElementById("uploadFile").value = "";

        }
    
        return (
            <>
            {
                image !== undefined  && image!==null
                ?
                (
                   
                    <div className="form-group w-100 pl-4">
                        <div className="image-selected-container">
                            <img src={URL.createObjectURL(image)} alt="" key={image.URL} />
                            <i class="fa fa-trash-o" onClick={handleRemovePicture}></i>
                        </div>
                    </div>
                )
                :
                (
                  <></>
                )
            }
             
              </>
            );
      };
    
    const handleChangeImage = (e) => {
        if(e.target.files[0] !== null && e.target.files[0] != undefined)
        {
            dispatch(setVariableImage(e.target.files[0]))
        }
    };
    
    const validate = Yup.object({
        name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .min(2,"At least two characters")
        .required('Required'),
    });

    return (
        <>
        <div className={`page-add-employe-container page-add-client animate__animated ${clicked === true ? "animate__backInDown":"animate__backOutDown"}`} >
             <ResponseComponent classStyle="request-result-client"  dispatch={dispatch} isSubmited = {isSubmited} setIsSubmited={setIsSubmited} />
            <div className="page-add-employe-content">
                <span className="close-page" onClick={()=>setClicked(!clicked)}> </span>
                <div className="page-header">
                    <h1>  keep the teams grow up </h1>
                    <h3>  ADD NEW CLIENT </h3>
                    <span className="badge badge1">cc</span>
                </div>

                <Formik
                    initialValues={{
                        name:"",
                    }}
                    validationSchema={validate}
                    onSubmit={(values) => {
                        dispatch(saveClient(values.name , image));
                       document.getElementById("form").reset();
                       dispatch(clearVariableImage())
                       document.getElementById("uploadFile").value = "";
                       setIsSubmited(true);
                   }}
                >
                {formik => (
                     <Form id="form">
                        <div className="page-body">
                            <TextField label="Client Name"  classname1="form-group w-100" type="text" classname2="pt-2 pl-4" name="name" placeholder='Enter Your Username ... '/>
                            <div className="form-group w-100">
                                    <label className="form-label"> Client Picture </label>
                                    <input className="form-control pt-2 pl-4" type="file" name='photo' id="uploadFile"   placeholder="Drop your file here" onChange={handleChangeImage}></input>
                            </div>
                        <RenderPhoto />

                        </div>
                        <div className="form-group button-submit w-100">
                                <button type="submit" className="submit-add-client"> submit </button>
                        </div>
                     </Form>
                )}
                </Formik>
            </div>
        </div>
        </>
    )
}


