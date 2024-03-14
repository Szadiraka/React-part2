import React,{useRef, useState,useEffect,useContext} from 'react';
import {getMessagesByUserId,addMessage} from '../apiCalls/apiMessage';
import {getUsers,getRole} from '../apiCalls/apiUser';
import {UserContext} from '../components/context/UserContext';

const Message = () => {
  const{user} =  useContext(UserContext);
 const[messages,setMessages] = useState([]);
 const[users,setUsers] = useState([]); 
 const[role,setRole] = useState(null);
 const newNameRef = useRef(); 
 const newUserRef = useRef();
  useEffect(() => {  
    getUsers().
    then(({original}) => setUsers(original));       
    getMessagesByUserId(user.id)
    .then((data) => setMessages(data));
    getRole('manager').then((data) => setRole(data));
   
    
  },[]);
   
  
   

  const createItem=()=>{
    let text = newNameRef.current.value.trim(); 
    if(text.length===0){
      alert('текст повідомлення не введено');
      return;
    }
    let receiver_id =Number(newUserRef.current.value);
    let sender_id = user.id;
     
      addMessage({
        id:0,
        sender_id:sender_id,
        receiver_id:receiver_id,
        text: text,      
      }).then((data)=>{
        if(data){
          alert('повідомлення  додано');
          setMessages([...messages,data]);
          newNameRef.current.value='';
         
        }
        else{
          alert('повідомлення не додано');
        }
      })
  }


  return (
    <div className='order-content'>
     <div className='order-div maxwidth'>
              <h3 className='order-h'>Панель користувача ({user.name}/ {user.email})</h3>  
                       
              <p className='order-p'>
              <b> Перелік повідомлень:</b>
              </p>

              <table class="order-table">
                <thead class="order-theader">
                            <tr>                         
                            <th>Відправник</th> 
                            <th >Отримувач</th>  
                            <th > Повідомлення</th>                                        
                                
                            </tr>
                </thead>
                <tbody class="order-tbody">
                        {messages.length>0 && messages.map((message)=>(
                            <tr key={message.id}>
                            
                            <td>{`${users.find(x => x.id === message.sender_id)?.name|| 'guest' }`} 
                                                
                            </td>  
                            <td>{`${users.find(x => x.id === message.receiver_id)?.name|| 'noname' }`}
                            
                            </td>                 
                            <td>
                                {/* <input id={`name-${message.id}`}  type='text' className='admin-input ls' defaultValue={message.text} />   */}
                                <textarea className='order-input-textarea' id={`name-${message.id}`}  type='text'  defaultValue={message.text} />                       
                            </td>

                            </tr>
                        ))}
                     
                </tbody>                           
              </table>
    </div>
    <div className='order-div '>
        <p className='order-p'>Додати нове повідомлення:</p>
                <table key="0" class="order-table">
                  <thead class="order-theader">
                      <tr>
                      <th></th>
                        <th>Отримувач</th>
                        <th>Повідомлення</th>  
                        <th></th>
                      </tr>
                  </thead>
                  <tbody class="order-tbody">
                  <tr>
                        <td> </td>
                        <td>                        
                            <select ref={newUserRef} className='order-input'>
                                {role && users.filter(x=>x.role_id===role.id).length>0 && users.filter(x=>x.role_id===role.id).map((user)=>(
                                    <option key={user.id} value={user.id }>{user.name}:{user.email}</option>
                                 ))}
                            </select>                                                    
                         </td>
                         <td>                         
                            <textarea ref={newNameRef} type='text' className='order-input-textarea' placeholder='Текст повідомлення'/>  
                         </td>                   
                         <td> <input type='button' className='admin-input ll gc' defaultValue='Cтворити' onClick={()=>{createItem()}}/></td>
                        <td></td>                           
                        
                    </tr>
                  </tbody>
                </table>
    </div>
            
    </div>
  )
};

export default Message;
