import React from 'react';
import { useRef, useState } from 'react';
import { addMessage } from '../apiCalls/apiMessage';
const AddCall = ({showCall}) => {
    const [isSend, setSend] = useState(false);
    const userRef = useRef();
    const phoneRef = useRef();
    const clickButton=()=>{
      const user = userRef.current.value;
      const phone = phoneRef.current.value;
      if(!user ||  !phone ){
         userRef.current.value="";
         phoneRef.current.value="";
          return;
      }
  
      const newMessage = {
        id:0,
        user_id: '',
        text: `user: ${user}  phone: ${phone}`,
        manager_id: '',};
  
       
          addMessage(newMessage)
          //.then((data))
          setSend(true);
          userRef.current.value="";
          phoneRef.current.value="";
          setTimeout(()=>{
              setSend(false);  
              showCall();          
          },1000);
          
    }  
  
  
    return (
      <>
        <dialog  className="header-dialog" open>
                  <div className='dialogBox-container'>
                     
                      <button  onClick={showCall} className='form-button btn1' >Закрити</button>
                      <h3 className='dialog-p'>Зворотній дзвінок</h3>
                       <p>Вітаємо вас!</p>
                       <p>Вкажіть Ваш особистий номер телефона - і ми обов`язково з Вами зв'яжемося.
                       </p>
                       {isSend &&<p className="message-p">Вашу заявку відправлено</p>}
                       <div class="header-input-container">
                               <input ref={userRef} type='text' placeholder="Iм'я" className='header-input' required></input>
                               <input ref={phoneRef} type='text' placeholder="Телефон" className='header-input' required></input>
                               <button className='form-button bt2' onClick={clickButton}>Надіслати</button>
                       </div>                    
                      
                  </div>                
                  
               </dialog>
      </>
    )
  };
  
  export default AddCall;
  