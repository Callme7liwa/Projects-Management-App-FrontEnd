import { useState } from "react";
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { downloadFile } from "../../../4-actions/2-auth";
import docx from "./../../../assets/docx.png"
import pdf from "./../../../assets/pdf.png"
import profileDefault from "../../../assets/profileDefault.jpg";


export const ListMessages = ({conversation ,getInfoOther}) => {
    const dispatch = useDispatch();
    const [infoOther , setInfoOther] = useState();
    useEffect(()=>{
        if(conversation !=null)
         setInfoOther(getInfoOther(conversation)) 
            
    },[conversation]) ; 

    const handleDownloadFile = (documentName) => {
        dispatch(downloadFile(documentName))
    }

    
    const getTypeOfFile = (fileName) => {
        var firstPosition  ; 
        for(var i=0  ; i<fileName.length ; i++)
          {  
            if(fileName[i]===".")
            {
                firstPosition = i ; 
                break ; 
            }
          }
          const typeFile =  fileName.slice(firstPosition+1,fileName.length) ; 
          console.log(fileName);
          switch(typeFile)
          {
            case "docx" : 
                return <img className="image" src={docx} /> ; 
            case "pdf" : 
                return <img className="image" src={pdf} /> ; 
            case "jpg":
                return <img className="img" src={"http://localhost:8080/server/images/"+fileName}></img>
            case "png":
                return <img className="img" src={"http://localhost:8080/server/images/"+fileName}></img>
            default :
                return  <img  className="image" src={docx} /> ; 
          }
    }

    return (
        <> 
        {
            conversation !== null 
            ?
            (
                <>
                <div className="inbox-right-header">
                    <div className="image-container">
                    {
                        infoOther?.photo !== "" && infoOther?.photo !== null && infoOther?.photo !==undefined
                        ?
                        (
                            <img src={"http://localhost:8080/journalistes/files/"+infoOther?.photo} alt="" srcset="" />
                        )
                        :
                        (
                            <img src={profileDefault} alt="" srcset="" />
                        )
                    }  
                    </div>
                    <div className="user-name">
                        <span>{infoOther?.firstName} {infoOther?.secondName} </span>
                        <span> {conversation?.messages?.length +1 } </span>
                    </div>
                </div>
                <div className="webkit inbox-right-body">
                    {
                        conversation
                        ?.messages
                        ?.map(message => {
                            return (
                                <div className={`message-container ${message.senderId === infoOther?.id ? " other" : "" }`}>
                                <div className="message-content">
                                    {
                                        message.senderId === infoOther?.id
                                        ?
                                        ( 
                                            <div className="message-content-image">
                                                {
                                                infoOther?.photo !== "" && infoOther?.photo !== null && infoOther?.photo !==undefined
                                                ?
                                                (
                                                    <img src={"http://localhost:8080/journalistes/files/"+infoOther?.photo} alt="" srcset="" />
                                                )
                                                :
                                                (
                                                    <img src={profileDefault} alt="" srcset="" />
                                                )
                                                }                                            
                                            </div>
                                        )
                                        :
                                        (null)
                                    }                               
                                    <div className="message-body">
                                        {
                                            message.body !== "" 
                                            ? 
                                            (<p>{message.body}</p>)
                                            :
                                            (
                                            <div className="file-container">
                                                {getTypeOfFile(message.fileName)}
                                                <a href={"http://localhost:8080/server/files/"+message.fileName} >{message.fileName}</a>
                                            </div>
                                            )
                                        }
                                    </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                </>
            )
            :
            (null)
        }
        </>
        // {/* <div className="inbox-right-header">
        //             <div className="image-container">
        //                 <img src={ayoub} alt="" srcset="" />
        //             </div>
        //             <div className="user-name">
        //                 <span>{infoOther.firstName} {infoOther.secondName} </span>
        //                 <span> {conversation.messages.length +1 } </span>
        //             </div>
        // </div>
        //  <div className="webkit inbox-right-body">
        //     {
        //         conversation
        //         .messages
        //         .map(message => {
        //             return (
        //                 <div className={`message-container ${message.senderId != infoOther.id}`}>
        //                 <div className="message-content">
        //                     {
        //                         message.senderId != infoOther.id
        //                         ?
        //                         ( 
        //                             <div className="message-content-image">
        //                                 <img src={"http://localhost:8080/journalistes/"+infoOther.photo}></img>
        //                             </div>
        //                         )
        //                         :
        //                         (null)
        //                     }                               
        //                     <div className="message-body">
        //                         Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        //                         Tempora et deserunt modi suscipit temporibus laborum delectus! 
        //                         Sequi rerum hic facilis? Ipsum fugiat cumque, velit odit labore 
        //                         atque architecto in ipsam provident suscipit, perspiciatis debitis
        //                         quo nesciunt, laborum placeat. Harum dolorem veniam quaerat commodi.
        //                         Fugiat sunt consequatur corrupti repellat quasi quod.
        //                     </div>
        //                     </div>
        //                 </div>
        //             )
        //         })
        //     } */}
        //             {/* <div className="message-container">
        //                 <div className="message-content">
        //                     <div className="message-body">
        //                         Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        //                         Tempora et deserunt modi suscipit temporibus laborum delectus! 
        //                         Sequi rerum hic facilis? Ipsum fugiat cumque, velit odit labore 
        //                         atque architecto in ipsam provident suscipit, perspiciatis debitis
        //                         quo nesciunt, laborum placeat. Harum dolorem veniam quaerat commodi.
        //                         Fugiat sunt consequatur corrupti repellat quasi quod.
        //                     </div>
        //                 </div>
        //                 </div>
        //             <div className="message-container other">
        //                 <div className="message-content">
        //                     <div className="message-content-image">
        //                         <img src={ayoub}></img>
        //                     </div>
        //                     <div className="message-body">
        //                         Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        //                         Tempora et deserunt modi suscipit temporibus laborum delectus! 
        //                         Sequi rerum hic facilis? Ipsum fugiat cumque, velit odit labore 
        //                         atque architecto in ipsam provident suscipit, perspiciatis debitis
        //                         quo nesciunt, laborum placeat. Harum dolorem veniam quaerat commodi.
        //                         Fugiat sunt consequatur corrupti repellat quasi quod.
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="message-container">
        //                 <div className="message-content">
        //                     <div className="message-body">
        //                         Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        //                         Tempora et deserunt modi suscipit temporibus laborum delectus! 
        //                         Sequi rerum hic facilis? Ipsum fugiat cumque, velit odit labore 
        //                         atque architecto in ipsam provident suscipit, perspiciatis debitis
        //                         quo nesciunt, laborum placeat. Harum dolorem veniam quaerat commodi.
        //                         Fugiat sunt consequatur corrupti repellat quasi quod.
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="message-container other">
        //                 <div className="message-content">
        //                     <div className="message-content-image">
        //                         <img src={ayoub}></img>
        //                     </div>
        //                     <div className="message-body">
        //                         Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        //                         Tempora et deserunt modi suscipit temporibus laborum delectus! 
        //                         Sequi rerum hic facilis? Ipsum fugiat cumque, velit odit labore 
        //                         atque architecto in ipsam provident suscipit, perspiciatis debitis
        //                         quo nesciunt, laborum placeat. Harum dolorem veniam quaerat commodi.
        //                         Fugiat sunt consequatur corrupti repellat quasi quod.
        //                     </div>
        //                 </div>
        //             </div> */
        // //             }
        // //         </div>
      
    )
}