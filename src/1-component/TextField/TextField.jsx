import { ErrorMessage, useField } from 'formik';
// export const TextField = ({className1, className2,  label, ...props }) => {
//     const [field, meta] = useField(props);
    
//     return (
//       <div className={className1}>
//         <label htmlFor={field.name}>{label}</label>
//         <input className={className2} name={props.name} {...field} {...props} autoComplete="off" />
//         <ErrorMessage component="div" name={field.name} className="error text-danger" />
//       </div>
//     )
    
//   }

const TextField = ({ classname1 , classname2 , label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className={classname1}>
        <label htmlFor={field.name}>{label}</label>
        <input
          className={`form-control  ${meta.touched && meta.error && 'is-invalid'} ${classname2}`}
          {...field} {...props}
          autoComplete="off"
        />
        <ErrorMessage component="div" name={field.name} className="text-danger error" />
      </div>
    )
  }

export default TextField ; 
  