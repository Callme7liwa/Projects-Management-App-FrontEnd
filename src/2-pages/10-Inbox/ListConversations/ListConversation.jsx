import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeMessageStatus, setInformationOther } from "../../../4-actions/2-auth";
import profileDefault from "../../../assets/profileDefault.jpg";


export const ListConverstion = ({getInfoOther  , setCurrentConversation}) => {

    const {conversations} = useSelector(state=>state.auth);

    const {user} = useSelector(state=>state.auth);

    const dispatch = useDispatch();
    

    const sliceString = (value , max) => {
        if(value.length>max)
        return value.slice(0,max)+"....."
        else
        return value ; 
    }

    const sliceDate = (value , max) => {
        return value.slice(0,max);
    }

    const handleClick = (conversation) => {
        if(conversation.messages.length>0)
        {
            if(conversation.messages[conversation.messages.length-1].senderId !== user.id && conversation.messages[conversation.messages.length-1].messageStatus==="NOT_VISITED" )
                {
                    dispatch(changeMessageStatus(conversation.id,user.id))
                }
        }
        setCurrentConversation(conversation)
    }


    return (
        <>
        {
            conversations?.map(conversation=>{
                var info = getInfoOther(conversation);
                return (
                    <div className="message-container" onClick={()=>handleClick(conversation)}>
                        <div className="message-left">
                            <div className="image-container">
                                {
                                    info?.photo !== "" && info?.photo !== null && info?.info !==undefined
                                    ?
                                    (
                                        <img src={"http://localhost:8080/journalistes/files/"+info?.photo} alt="" srcset="" />
                                    )
                                    :
                                    (
                                        <img src={profileDefault} alt="" srcset="" />
                                    )
                                }
                            </div>
                        </div>
                        <div className="message-right" >
                            <div className="name"> {info?.firstName} {info?.secondName} </div>
                            <div className="topic">
                                <span className="topic-name task-name"> {conversation.tachName} </span>
                                <span> // </span>
                                <span className="topic-name project-name"> {conversation.project.name} </span>
                            </div>
                            <div className="body">
                                {
                                    conversation?.messages?.length>0
                                    ?
                                    ( 
                                        <>
                                        {
                                            conversation.messages[conversation.messages.length-1].senderId === user?.id 
                                            ?
                                            "you : "
                                            :
                                            (<>{info?.userName+" : "}</>)
                                        }
                                        {sliceString(   
                                            conversation.messages[conversation.messages.length-1].body,
                                            15
                                        )}
                                       </>
                                    )
                                    :
                                    (<> Say Hello  to start the conversation !</>)
                                }
                            </div>
                            <div className="footer">
                                <div className="date">
                                    {sliceDate(conversation.lastDateMessage,9)}
                                </div>
                                <div className="status">
                                    {
                                        conversation?.messages?.length>0
                                        ?
                                        (
                                        conversation.messages[conversation.messages.length-1].messageStatus === "VISITED" 
                                        ?
                                        (<span>  <i className="fa fa-check-circle-o mr-1"></i>  Seen </span>)
                                        :
                                        (<span className="text-danger">  <i className="fa fa-times-circle-o mr-1 "></i> Not Seen </span>)
                                        )
                                        :
                                        (<span>  <i className="fa fa-long-arrow-right"></i>  Not Started  </span>)   
                                    }
                                    
                                </div>
                            </div>
                        </div> 
                    </div>
                )
            })
        }
        </>
          
    )
}