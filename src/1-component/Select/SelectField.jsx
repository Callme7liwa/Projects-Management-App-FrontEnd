import { ErrorMessage, Field } from "formik";

const  SelectField = (props) =>
{
    const {label , name , options , ...rest} = props ; 

    return (
        <div className="form-group field-add">
            <label htmlFor={name}>{label}</label>
            <Field as='select' className="form-control" id={name} name={name} {...rest}>
                {
                    options
                        .map(option=>{
                            return(
                                <option key={option.value} value={option.value}>{option.key}</option>
                            )
                        })
                }
            </Field>
            <ErrorMessage component="div" name={name} className="text-danger error" />
        </div>
    )
}

export default SelectField;
