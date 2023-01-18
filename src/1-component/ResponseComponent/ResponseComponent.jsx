import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { clearMessage } from "../../4-actions/message";

const ResponseComponent = ({ classStyle , isSubmited , setIsSubmited , dispatch}) => {

    const {message} = useSelector(state=>state.message);
    const [show , setShow] = useState(true);
    const [isFirst , setIsFirst] = useState(true);

    console.log("the messae" , message);

    useEffect(() => {
        var timeId ; 
        setShow(true);
        if(message !== ""  )
        {
        timeId = setTimeout(() => {
                 setShow(false)
                 }, 2500)
        }
             
        return () => {
            clearTimeout(timeId)     
            setIsSubmited(false);       
        }
    }, [message]);

    if(show===false && message !=="")
        dispatch(clearMessage());


    const Card = ({message}) => {
        return  <div className={`request-result ${classStyle} animate__animated animate__backInRight`}>
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
                        message.includes("ERROR")
                        ?
                        (<i className="fa fa-times-circle-o"></i>)
                        :
                        (<i className="fa fa-refresh"></i>)                                
                       }
            </div>
            <div className="body-message"> 
                <span>
                    {
                        message.includes("SUCCESS") || message.includes("ERROR")
                        ?
                        (<>{message}</>)
                        :
                        (<span> Youre request is laoding  </span>) 
                    }
                    </span>
            </div>
            <div className="body-footer">
            </div>
        </div>
        </div>
    }

   
    return (
        show === true && message !== ""
        ?
        <Card message={message} />
        :
        message === "" && isSubmited===true
        ?
        <Card message="" />
        :
        (null)
    )
}

export default ResponseComponent ;