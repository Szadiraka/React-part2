import React, {useContext} from 'react';
import {UserContext} from '../components/context/UserContext';
import { useRef, useState } from 'react';
const AddMessageFromClient = ({closeDialogMessage, addNewMessage, managers}) => {
    console.log(managers);
  const [isSend, setSend] = useState(false);
  const[managerId, setManagerId] = useState(0);
  const {user} = useContext(UserContext);
  
  // const userRef = useRef();
  const textRef = useRef();
  const clickButton=()=>{
    const user_id = user.id;
    const text = textRef.current.value;
    alert(managerId+""+user_id);
    if(!user_id || !text || text.length>1024 || !managerId || managerId<1){
      //  userRef.current.value="";
        textRef.current.value="";
        return;
    }

    let newMessage = {
      id:0,
      sender_id: user_id,
      receiver_id: Number(managerId),
      text: text};
     console.log(newMessage);
        addNewMessage(newMessage);
        setSend(true);
        // userRef.current.value="";
        textRef.current.value="";
        setTimeout(()=>{
            setSend(false);  
            closeDialogMessage();          
        },2000);
        
  }

  return (
    <>
            <dialog id="dialogBox" className="header-dialog" open>
                <div className='dialogBox-container'>
                   
                    <button  onClick={closeDialogMessage} className='form-button btn1' >Закрити</button>
                    <h3 className='dialog-p'>Залишити повідомлення:</h3>                 
                       {isSend &&<p className="message-p">повідомлення відправлено</p>}          
                     <div class="header-input-container">
                             
                             {managers &&
                              <select onChange={(e) => setManagerId(e.target.value)}>
                                <option value="" >Виберіть менеджера</option>
                                {managers.map((manager) => <option key={manager.id} value={manager.id}>{manager.name}</option>)};
                              </select>}
                             <textarea ref={textRef} type='text' placeholder="Текст відгуку:" className='header-textarea' required min="10" max="1024" ></textarea>
                             <button className='form-button bt2' onClick={clickButton}>Надіслати</button>
                     </div>                    
                    
                </div>                
                
             </dialog>
        
    </>
  )
};

export default AddMessageFromClient;
