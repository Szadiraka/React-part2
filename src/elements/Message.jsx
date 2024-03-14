import React,{useRef, useState,useEffect,useContext} from 'react';
import {getMessages,addMessage,deleteMessage,upMessage} from '../apiCalls/apiMessage';
import {getUsers} from '../apiCalls/apiUser';
import {UserContext} from '../components/context/UserContext';

const Message = () => {
  const{user} = useContext(UserContext);
 const[messages,setMessages] = useState([]);
 const[users,setUsers] = useState([]); 

 const newNameRef = useRef(); 
 const newUserRef = useRef();
  useEffect(() => {   
    getUsers().
    then(({original}) => setUsers(original));       
    getMessages()
    .then((data) => setMessages(data));
    
  },[]);
   
  console.log(messages);
   
  const deleteItem=(id)=>{
    
     deleteMessage(id).then((data)=>{
      if(data) 
       setMessages(messages.filter(message=>message.id!==id));
    })
  }

  const updateItem = (message)=>{
  
     let text = document.getElementById('name-'+message.id).value.trim();
     let sender_id = Number(document.getElementById('sender-'+message.id).value);
     let receiver_id = Number(document.getElementById('receiver-'+message.id).value);
         if(message.text===text){          
            
          return;
         }
        let id= message.id;
        
        let updateMessage={id:id, text: text, sender_id: sender_id, receiver_id: receiver_id};      
        upMessage(updateMessage)
        .then((result)=>{
                  if(result){
                    alert('повідомлення змінено');  
                           
                  }
                  else{
                    alert('повідомлення не змінено');
                  }
        });

  }

  const createItem=()=>{
    let text = newNameRef.current.value.trim(); 
    if(text.length===0){
      alert('немає назви');
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
          alert('повыдомлення  додано');
          setMessages([...messages,data]);
          newNameRef.current.value='';
         
        }
        else{
          alert('повідомлення не додано');
        }
      })
  }


  return (
    <div className='admin-content'>
              <h3 className='admin-h'>Панель менеджера</h3>  
                       
              <p className='admin-p'>
              <b> Перелік повідомлень:</b>
              </p>

              <table class="admin-table">
              <thead class="admin-theader">
                        <tr>                         
                          <th>Відправник</th> 
                          <th >Отримувач</th>  
                          <th > Повідомлення</th>                                          
                          <th colSpan="2">Редагувати</th>                        
                        </tr>
                    </thead>
                  <tbody class="admin-tbody">
                    {messages.length>0 && messages.map((message)=>(
                        <tr key={message.id}>
                          
                          <td>
                             <input id={`sender-${message.id}`} defaultValue={`${users.find(x => x.id === message.sender_id)?.name|| 'guest' }`}  type='text' className='admin-input ls'  /> 
                             {/* <select id={`productrepair-${model.id}`} className='admin-input ls ma gc'>
                                
                                {productRepairs.length>0 && productRepairs.map((productrepair)=>(
                                  <option key={productrepair.id} value={productrepair.id}>{productrepair.name}</option>
                                ))}
                             </select>                        */}
                          </td>  
                          <td>
                              <input id={`receiver-${message.id}`} defaultValue={`${users.find(x => x.id === message.receiver_id)?.name|| 'guest' }`}  type='text' className='admin-input ls'  /> 
                             {/* <select  id={`productbrend-${model.id}`} className='admin-input ls ma gc'>
                                 
                                {productBrends.length>0 && productBrends.map((productbrend)=>(
                                  <option key={productbrend.id} value={productbrend.id}>{productbrend.name}</option>
                                ))}
                             </select> */}

                          </td>                 
                          <td>
                             {/* <input id={`name-${message.id}`}  type='text' className='admin-input ls' defaultValue={message.text} />   */}
                             <textarea className='admin-input-textarea' id={`name-${message.id}`}  type='text'  defaultValue={message.text} />                       
                          </td>

                          <td> <input type='button' className='admin-input ll bc' defaultValue='Змінити' onClick={()=>{updateItem(message)}}/></td>
                          <td><input type='button' className='admin-input ll rc' defaultValue='Видалити' onClick={()=>{deleteItem(message.id)}}/></td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                           {/* <input ref={newNameRef} type='text' className='admin-input ls' placeholder='Текст повідомлення'/>  */}
                                           
                        </td>
                        <td>
                           
                           {/* <input ref={newProductRepairRef} type='text' className='admin-input ls' placeholder='Категорія ремонтів'/> */}
                           <select ref={newUserRef} className='admin-input ls ma'>
                              {users.length>0 && users.map((user)=>(
                                <option key={user.id} value={user.id }>{user.name}:{user.email}</option>
                              ))}
                           </select>
                                                
                        </td>
                        <td>
                            {/* <input ref={newProductBrendRef} type='text' className='admin-input ls' placeholder='Бренд'/> 
                            <select ref={newProductBrendRef} className='admin-input ls ma'>
                              {productBrends.length>0 && productBrends.map((productbrend)=>(
                                <option key={productbrend.id} value={productbrend.id}>{productbrend.name}</option>
                              ))}
                            </select> */}
                            <textarea ref={newNameRef} type='text' className='admin-input-textarea' placeholder='Текст повідомлення'/>  
                        </td>                   
                        <td> <input type='button' className='admin-input ll gc' defaultValue='Cтворити' onClick={()=>{createItem()}}/></td>
                        <td></td>
                        
                    
                        </tr>
                  </tbody>
                  <tfoot class="admin-tfoot">
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>                
                    <td></td>
                    <td></td>
                  </tr>      
                  </tfoot>            
              </table>
          
            
        </div>
  )
};

export default Message;
