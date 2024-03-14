import React,{useRef, useState,useEffect} from 'react';
import {getUsersByRole,addUser,deleteUser,upUser,validateDate} from '../apiCalls/apiUser';


const User = () => {
 const[users,setUsers] = useState([]);
 const newNameRef = useRef(); 
 const newMailRef = useRef();
 const newPasswordRef = useRef();
 const newRoleRef = useRef();
 const newPhoneRef = useRef();

  useEffect(() => {          
    getUsersByRole('client')
    .then((data) => setUsers(data));
    
  },[]);
   
 
   
  const deleteItem=(id)=>{
    
     deleteUser(id).then((data)=>{
      if(data) 
       setUsers(users.filter(el=>el.id!==id));
    })
  }

  const updateItem = (user)=>{
     let name = document.getElementById('name-'+user.id).value.trim();
     let email = document.getElementById('email-'+user.id).value.trim();
     let password = document.getElementById('password-'+user.id).value.trim();
     let phone = document.getElementById('phone-'+user.id).value.trim().replace(/[\s-]/g, '');
        //валидация данных

        if(!validateDate(password,password,name,phone,email)){
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
         
        let id= user.id;
        
        let updateUser={id:id, name: name, role_id: user.role_id, email: email, password: password, phone: phone};      
        upUser(updateUser)
        .then((result)=>{
                  if(result){
                    alert('дані користувача змінено');  
                    let newUser =users.find(model=>model.id===id);
                    newUser.name=name; newUser.email=email;
                    newUser.password=password; newUser.phone=phone;
                    setUsers([...users.filter(model=>model.id!==id),newUser]);            
                  }
                  else{
                    alert('дані користувача не змінено');
                  }
        });

  }

  const createItem=()=>{
    let name = newNameRef.current.value.trim();     
    let email= newMailRef.current.value.trim();   
    let password = newPasswordRef.current.value.trim();
    let phone = newPhoneRef.current.value.trim().replace(/[\s-]/g, '');
       //валидация данных  
       if(!validateDate(password,password,name,phone,email)){
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


      addUser({
        id:0,
        name: name,
        email: email,
        password: password,
        role_id: users[0].role_id,
        phone: phone     
      }).then((data)=>{
        if(data){
          alert('користувача додано');
          setUsers([...users,data]);
          newNameRef.current.value='';
          newMailRef.current.value='';
          newPasswordRef.current.value='';
          newPhoneRef.current.value='';
        }
        else{
          alert('користувача не додано');
        }
      })
  }


  return (
    <div className='admin-content'>
              <h3 className='admin-h'>Панель менеджера</h3>  
                       
              <p className='admin-p'>
              <b> Перелік клієнтів:</b>
              </p>

              <table class="admin-table">
              
                  <tbody  class="admin-tbody new"> 
                    <thead class="admin-theader">
                          <tr>
                          
                            <th>П.I.Б</th> 
                            <th >Ел.адреса</th>  
                            <th > Пароль</th> 
                            <th >Телефон</th>                                                             
                            <th colSpan="2">Редагувати</th>                        
                          </tr>
                      </thead>
                    {users.length>0 && users.map((user)=>(
                        <tr key={user.id}>
                          <td>
                             <input id={`name-${user.id}`}  type='text' className='admin-input ls' defaultValue={user.name} />                         
                          </td> 
                          <td>
                              <input id={`email-${user.id}`} defaultValue={user.email}  type='text' className='admin-input ls'  /> 
                           
                          </td> 
                          <td>
                              <input id={`password-${user.id}`} defaultValue={user.password}  type='text' className='admin-input ls'  /> 
                           
                          </td>
                          <td>
                              <input id={`phone-${user.id}`} defaultValue={user.phone}  type='text' className='admin-input ls'  /> 
                           
                          </td>
                         
                          <td> <input type='button' className='admin-input ll bc' defaultValue='Змінити' onClick={()=>{updateItem(user)}}/></td>
                          <td><input type='button' className='admin-input ll rc' defaultValue='Видалити' onClick={()=>{deleteItem(user.id)}}/></td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                           <input ref={newNameRef} type='text' className='admin-input ls' placeholder='П.I.Б'/> 
                                              
                        </td>
                        <td>
                             <input ref={newMailRef} type='text' className='admin-input ls' placeholder='Ел.адреса'/>  
                           
                        </td> 
                        <td>
                             <input ref={newPasswordRef} type='text' className='admin-input ls' placeholder='Пароль'/>  
                           
                        </td> 
                        <td>
                             <input ref={newPhoneRef} type='text' className='admin-input ls' placeholder='Телефон'/>  
                           
                        </td> 
                       

                        <td> <input type='button' className='admin-input ll gc' defaultValue='Cтворити' onClick={()=>{createItem()}}/></td>
                        <td></td>
                        
                    
                        </tr>

                        <tfoot class="admin-tfoot">
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>                
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>      
                  </tfoot>            
                  </tbody>
                  
              </table>
          
            
        </div>
  )
};

export default User;

