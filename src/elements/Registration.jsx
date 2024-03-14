import React from 'react';
import { useRef, useState } from 'react';
import { addUser,validateDate } from '../apiCalls/apiUser';
import '../styles/registration.css';

const Registration = ({showRegistration}) => {
    const [isSendTrue, setSendTrue] = useState(false);
    const [isSendFalse, setSendFalse] = useState(false);
    const nameRef = useRef();
    const mailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();
    const clickButton=()=>{
      let name = nameRef.current.value.trim();
      let password = passwordRef.current.value.trim();
      let password2 = password2Ref.current.value.trim();
      let phone = phoneRef.current.value.trim().replace(/[\s-]/g, '');
      let mail = mailRef.current.value.trim();

      // if(password !== password2){
      //     alert("паролі не співпадають");
      //     passwordRef.current.value="";
      //     password2Ref.current.value="";
      //     return;
      // }
      // if (!validateName(name)){
      //   return;
      // }
      // if(!validatePhone(phone)){
      //   return;
      // }
      if(!validateDate(password,password2,name,phone,mail)){
         return;
      }
      else{
        if(phone.startsWith('380')){
            phone=`+${phone}`;
        }else if(phone.startsWith('0')){
            phone=`+38${phone}`;
        }else{
            phone=`+380${phone}`;
        }         
      };
     
      // if(!validateMail(mail)){
      //   mailRef.current.value="";
      //   return;
      // }
      // if(!validatePassword(password)){
      //   passwordRef.current.value="";
      //   password2Ref.current.value="";
      //   return;
      // }

      // function validateName(name){
      //   if(name.length<3){        
      //       alert("дуже коротке ім'я");          
      //       return false;
      //   }
      //   if((/\d/).test(name)){
      //       nameRef.current.value="";
      //       alert("тільки літери");         
      //       return false;
      //   }
      //    return true;
      // }
      // function validatePhone(phone){
      //   if((/[a-zA-Zа-яА-Я]/).test(phone)){
      //       phoneRef.current.value="";
      //       alert("номер не повинен містити літерали");         
      //       return false;
      //   }
      //     if(phone.length<7){
      //       alert("дуже короткий номер телефону");
      //       return false;
      //     }
      //     return true;
      // } 
      // function validateMail(mail){
      //     if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail))){
      //         alert("невірна пошта");
      //         return false;
      //     }
      //     else return true;
      // }

      // function validatePassword(password){
      //   if(password.length<5){
      //       alert("дуже короткий пароль");
      //       return false;
      //   }
      //   else return true;
      // }
   
       
          addUser({id:0,
            name: name, 
            email: mail,
            password: password,
            phone: phone,
            roleName:'client' })
          .then((data)=>{
            if(data){setSendTrue(true); }
            else{setSendFalse(true);}           
              setTimeout(()=>{
                setSendTrue(false);  
                setSendFalse(false);
                showRegistration();          
               },2000);
          });        
          
          
    }
  

  return (
    <>
           <dialog  className="header-dialog" open>
                <div className='dialogBox-container'>
                   
                    <button  onClick={showRegistration} className='form-button btn1' >Закрити</button>
                    <h3 className='dialog-p'>Реєстрація нового користувача</h3>
                  
                     {isSendTrue && <p className="message-p green-color">Ви зареєструвались</p>}
                     {isSendFalse && <p className="message-p red-color">Помилка. Реєстрація не вдалась</p>}
                     <div className="header-input-container">
                            
                            <input ref={nameRef} type='text' placeholder="Ваше ім'я" className='header-input'></input>
                            <input ref={phoneRef} type='text' placeholder="Телефон" className='header-input'></input>
                            <input ref={mailRef} type='text' placeholder="Email" className='header-input'></input>                  
                            <input ref={passwordRef} type='password' placeholder="Пароль" className='header-input'></input>
                            <input ref={password2Ref} type='password' placeholder="Підтвердіть пароль" className='header-input'></input>
                            <button className='form-button bt2' onClick={clickButton}>Зареєструватися</button>                            
                           
                     </div>                    
                    
                </div>                
                
             </dialog>
        
    </>
  )
};

export default Registration;
