import { SideBare } from "../../1-component/SideBare/SideBare";
import "./Inbox.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ListConverstion } from "./ListConversations/ListConversation";
import { ListMessages } from "./ListMessage/ListMessages";
import { addMessageToConversation, addMessageToConversationWithFile, addMessageToConversationWithoutFile, getAffectation, getMessages, setInformationOther } from "../../4-actions/2-auth";
import { AddConversation } from "./PopUpConversation/AddConversation";
const   Inbox = ({navIsClicked}) => {

    const [infoOther , setInfoOther] = useState(null)
    const [body , setBody] = useState(null);
    const [addConvesation , setAddConversation] = useState(false);
    const [searched , setSearched] = useState(false) ; 
    const [addFile , setAddFile] = useState(false);
    const [selectedFile , setSelectedFile] = useState(null);

    const {affectations} = useSelector(state=>state.auth);


    const {user} = useSelector((state)=>state.auth);
    const [currentConversation , setCurrentConversation] = useState(null);
    const {conversations} = useSelector(state=>state.auth);

    const dispatch = useDispatch();

    if(searched === false && (conversations === undefined || conversations ===null || conversations.length <=0 || affectations === null || affectations?.length <= 0) )
    {
        dispatch(getAffectation(user?.id));
        dispatch(getMessages(user?.id));
        setSearched(true);
    }

    const refreshMessage = () => {
        dispatch(getMessages(user?.id));
    }
    
    let info  ; 
    const getInfoOther = (conversation) => {
        if(conversation?.user1?.id != user?.id)
          { 
            info = conversation.user1 ; 
            setInfoOther(conversation.user1)
            return  info ; 
            }
        else
           { 
            info = conversation.user2 ; 
            setInfoOther(conversation?.user2);
            return info ;
            }
    }


    const handleAddMessage = () => {
        if(body.length >0 )
            dispatch(addMessageToConversationWithoutFile(currentConversation?.id , body  , user?.id ,getInfoOther(currentConversation).id));
        setBody("");
    }

    const handleSendMessage = () => {
        if(selectedFile != null )

            { 
                dispatch(addMessageToConversationWithFile(currentConversation?.id , selectedFile , user?.id , getInfoOther(currentConversation).id))
            }
        
        setSelectedFile(null)
        setAddConversation(AddFile(false));
    }
    
    const AddFile = () => {
        
        return (
            <div className="pop-up-add-file-container ">
            <div className="pop-up-add-file">
                <i className="fa fa-times close-pop-up" onClick={()=>setAddFile(!addFile)}></i>
                <div className="content-header">
                    <h2>  Upload your file  ! </h2>
                    <h5>  Your Progress Here   </h5>
                    <span className="badg"> </span>
                </div>
                <div className="content-body">
                <div className="text-success"> {selectedFile?.name}</div>
                    <div className="form-group f-12">
                    <label for="upload-file" className='label-upload-file-conversation '>
                            Select a file 
                    </label>
                    <input id="upload-file" type="file" onChange={(e)=>setSelectedFile(e.target.files[0])}></input>
                    </div>
                    <div className="form-group">
                        {
                            selectedFile !== null
                            ?
                            (
                                <span className="submit" onClick={handleSendMessage}>
                                     <i className="fa fa-check-circle-o" ></i> Send 
                                </span>
                            )
                            :
                            (
                                <span className="unsubmit submit bg-danger">
                                     <i className="fa fa-times-circle-o"></i> can't Send 
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
        )
    }

    
   
    return (
    
        <div className='page-container '>
        <SideBare navIsClicked={navIsClicked}/>
        <div className='inbox'>
            <div className="inbox-left-container">

                <section className="inbox-left-header">
                   <div className="div div-1"> 
                        <span className="point"> </span> 
                        <span className="title">Inbox</span></div> 
                        <span className="add refresh" onClick={refreshMessage}></span>
                        <span className="add" onClick={()=>setAddConversation(true)}></span>

                   <div> 
                        <span> Received </span>
                        <span> Sent </span>
                   </div>
                </section> 
                <section className="webkit messages-container">
                    <ListConverstion getInfoOther={getInfoOther}  setCurrentConversation = {setCurrentConversation} />
                </section> 
            </div>
            <div className="inbox-right-container">
               <ListMessages infoOther={infoOther} getInfoOther={getInfoOther} conversation={currentConversation}  />
                <div className="inbox-right-bottom">
                    <span className="add-file" onClick={()=>setAddFile(!addFile)}></span>
                    <div className="input-message">
                        <input type="text" value={body}  name="body" onChange={(e)=>setBody(e.target.value)} className="form-control" placeholder="your message here .... "></input>
                    </div>
                    <span className="send-message">
                        <span onClick={handleAddMessage}><i className="fa fa-send ml-2"></i> send </span> 
                    </span>
                </div>
            </div>
        </div>

        {
            addConvesation === true  
            ?
            <AddConversation setAddConversation={setAddConversation} /> 
            :
            (null)
        }

        
        {
            addFile === true  
            ?
            <AddFile  /> 
            :
            (null)
        }
           
        </div>
    )

}

export default Inbox ; 