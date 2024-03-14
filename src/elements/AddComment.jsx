import React, {useContext} from 'react';
import {UserContext} from '../components/context/UserContext';
import { useRef, useState } from 'react';
const AddComment = ({closeDialogMessage, addNewComment}) => {
  const [isSend, setSend] = useState(false);
  const {user} = useContext(UserContext);
  const textRef = useRef();
  const clickButton=()=>{
    const user_id = user.id;
    const text = textRef.current.value;
    if(!user_id || !text || text.length>1024){
        textRef.current.value="";
        return;
    }

    const newComment = {
      id:0,
      user_id: user_id,
      text: text};

        addNewComment(newComment);
        setSend(true);
        textRef.current.value="";
        setTimeout(()=>{
            setSend(false);  
            closeDialogMessage();          
        },1000);
        
  }

  return (
    <>
            <dialog id="dialogBox" className="header-dialog" open>
                <div className='dialogBox-container'>
                   
                    <button  onClick={closeDialogMessage} className='form-button btn1' >Закрити</button>
                    <h3 className='dialog-p'>Залишити відгук:</h3>                 
                       {isSend &&<p className="message-p">відгук відправлено</p>}          
                     <div class="header-input-container">                             
                             <textarea ref={textRef} type='text' placeholder="Текст відгуку:" className='header-textarea' required min="10" max="1024" ></textarea>
                             <button className='form-button bt2' onClick={clickButton}>Надіслати</button>
                     </div>                    
                    
                </div>                
                
             </dialog>
        
    </>
  )
};

export default AddComment;
