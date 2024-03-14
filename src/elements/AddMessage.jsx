import React from 'react';
import { useRef, useState } from 'react';
import { addMessage } from '../apiCalls/apiMessage';
const AddMessage = ({showDialog}) => {
  const [isSend, setSend] = useState(false);
  const userRef = useRef();
  const mailRef = useRef();
  const phoneRef = useRef();
  const textRef = useRef();
  const clickButton=()=>{
    const user = userRef.current.value;
    const text = textRef.current.value;
    const phone = phoneRef.current.value;
    const mail = mailRef.current.value;
    if(!user || !text || !phone|| !mail){
       userRef.current.value="";
       textRef.current.value="";
       phoneRef.current.value="";
       mailRef.current.value="";
        return;
    }

    const newMessage = {
      id:0,
      user_id: '',
      text: `user: ${user}  phone: ${phone} mail: ${mail} text: ${text}`,
      manager_id: '',};

     
        addMessage(newMessage)
        //.then((data))
        setSend(true);
        userRef.current.value="";
        textRef.current.value="";
        phoneRef.current.value="";
        mailRef.current.value="";
        setTimeout(()=>{
            setSend(false);  
            showDialog();          
        },1000);
        
  }




  return (
    <>
      <dialog  className="header-dialog" open>
                <div className='dialogBox-container'>
                   
                    <button  onClick={showDialog} className='form-button btn1' >Закрити</button>
                    <h3 className='dialog-p'>Задати питання</h3>
                     <p>Вітаємо вас!</p>
                     <p>Якщо вам потрібно уточнення по ремонту продукції,
                        вкажіть, буль ласка, модель продукції в поле Модель.
                        Цю інформацію ви можете знайти на наклейці від виробника.
                        Наприклад: Модель/Model 43LM6300PLA.
                     </p>
                     {isSend &&<p className="message-p">Ваше повідомлення відправлено</p>}
                     <div className="header-input-container">
                            
                            <input ref={userRef} type='text' placeholder="Ваше ім'я" className='header-input' required></input>
                             <input ref={phoneRef} type='text' placeholder="Телефон" className='header-input' required></input>
                             <input ref={mailRef} type='text' placeholder="Email" className='header-input' required></input>                  
                             <textarea ref={textRef} type='text' placeholder="Текст повідомлення:" className='header-textarea' required ></textarea>
                             <button className='form-button bt2' onClick={clickButton}>Надіслати</button>                            
                           
                     </div>                    
                    
                </div>                
                
             </dialog>
    </>
  )
};

export default AddMessage;
