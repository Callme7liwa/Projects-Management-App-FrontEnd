import { ErrorMessage, useField } from 'formik';


const TextFieldPassword = ({  label, ...props }) => {
    const [field, meta] = useField(props);
    return (

    <div className='form-groupp'>
        <label htmlFor={field.name}>{label}</label>
        <input  type="password" placeholder="Old Password ..."  
        className={`${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
        ></input>
       <ErrorMessage  component="div" name={field.name} className="text-danger error" />
    </div>
    )
  }

export default TextFieldPassword ; 