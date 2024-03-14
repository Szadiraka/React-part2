import React,{useContext} from 'react';
import { useRef, useState } from 'react';
import {UserContext} from '../components/context/UserContext';

import { getUserByPassword } from '../apiCalls/apiUser';

import '../styles/registration.css';

const Authorization = ({showAuthorization}) => {
    const [isSendFalse, setSendFalse] = useState(false);
    const {updateUser} = useContext(UserContext);
    const mailRef = useRef();
    const passwordRef = useRef();
  
    const clickButton=()=>{
    
      let password = passwordRef.current.value.trim();  
      let mail = mailRef.current.value.trim();

      if(password.length<5 || !validateMail(mail)){
          alert("вы ввели некоректні дані");
          passwordRef.current.value="";
          mailRef.current.value="";
          return;
      }      
         
      function validateMail(mail){
          if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail))){
            
              return false;
          }
          return true;
      }  

      getUserByPassword(mail, password)   

      .then(({original})=>{
        if(original.error){
            setSendFalse(true);
            setInterval(() => {
              setSendFalse(false);
            },2000);

        }
        else{
        
           let user = original;
           
           user['roleName'] = original.role.name;
           console.log(user);
            updateUser(user);
            showAuthorization();
        }      
                
      });   
                   
    }
  

  return (
    <>
           <dialog  className="header-dialog" open>
                <div className='dialogBox-container'>
                   
                    <button  onClick={showAuthorization} className='form-button btn1' >Закрити</button>
                    <h3 className='dialog-p'>Вхід для зареєстрованного користувача</h3>
                     {isSendFalse && <p className="message-p red-color">Користувача не знайдено</p>}
                     <div className="header-input-container">
                            <input ref={mailRef} type='text' placeholder="Email" className='header-input'></input>                  
                            <input ref={passwordRef} type='password' placeholder="Пароль" className='header-input'></input>
                             <button className='form-button bt2' onClick={clickButton}>Вхід</button>                            
                           
                     </div>                    
                    
                </div>                
                
             </dialog>
        
    </>
  )
};

export default Authorization;
