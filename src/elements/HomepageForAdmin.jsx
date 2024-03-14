import React,{useContext, useState,useEffect} from 'react';
import { useRef } from 'react';
import {UserContext} from '../components/context/UserContext';
import {getUsersByRole,validateDate, upUser,deleteUser, addUser} from '../apiCalls/apiUser';

import '../styles/admin.css';
const HomepageForAdmin = () => {
    const {user} = useContext(UserContext);
    const {updateUser} = useContext(UserContext);
    const[users,setUsers] = useState([]);
    const nameRef = useRef();  const mailRef = useRef();  const phoneRef = useRef();  const passwordRef = useRef();  
    const newNameRef= useRef();  const newMailRef = useRef();  const newPhoneRef = useRef();  const newPasswordRef = useRef();
    useEffect(() => {          
        getUsersByRole('manager')
        .then((data) => setUsers(data));
        
    },[]);
    const BackInfoAboutAdmin=()=>{
      nameRef.current.value=user.name;
      mailRef.current.value=user.email;
      phoneRef.current.value=user.phone;
      passwordRef.current.value=user.password;
    }
    const ChangeInfoAboutAdmin=() => {
        if(passwordRef.current.value === user.password && nameRef.current.value === user.name && mailRef.current.value === user.email && phoneRef.current.value === user.phone){
          alert('нічого не змінено');
          return;
        }
         let newName=nameRef.current.value;
        if(!validateDate(passwordRef.current.value, passwordRef.current.value, newName, phoneRef.current.value, mailRef.current.value)){
          return;
        }
        
          //обновляем в бд
          let id=parseInt(user.id);
          let Name=nameRef.current.value;
          let mail=mailRef.current.value;
          let phone=phoneRef.current.value;
          let password=passwordRef.current.value;
          let role_id = parseInt(user.role_id);
          let newUser={id: id, name: Name, email: mail, phone: phone, password: password, role_id: role_id};      
          upUser(newUser)
          .then((result)=>{
            if (result){
              newUser['roleName']=user.roleName;
              // alert(newUser['roleName']+' '+newUser['name']+' '+newUser['email']+' '+newUser['phone']+' '+newUser['password']+' '+newUser['role_id']);
              //обновляем в контексте
              updateUser(newUser);
            }
            
          });         

    };

    const deleteManager=(id)=>{
      deleteUser(id).then(()=>{
        setUsers(users.filter(user=>user.id!==id));
      })
    }
    const backManager=(user)=>{
      document.getElementById('name-'+user.id).value=user.name;
      document.getElementById('password-'+user.id).value=user.password;
      document.getElementById('email-'+user.id).value=user.email;
      document.getElementById('phone-'+user.id).value=user.phone;
    }
    const updateManager = (userid, roleId)=>{
    
       let name = document.getElementById('name-'+userid).value.trim();
      
      let password = document.getElementById('password-'+userid).value.trim();
      let phone = document.getElementById('phone-'+userid).value.trim().replace(/[\s-]/g, '');
        // if(phone.startsWith('380')){
        //   phone=`+${phone}`;
        //   }else if(phone.startsWith('0')){
        //       phone=`+38${phone}`;
        //   }else{
        //       phone=`+380${phone}`;
        //   }  
      let mail = document.getElementById('email-'+userid).value.trim();

          let id=parseInt(userid);        
          let role_id = parseInt(roleId);
          let updateUser={id: id, name: name, email: mail, phone: phone, password: password, role_id: role_id};      
          upUser(updateUser)
          .then((result)=>{
                    if(result){
                  
                  
                    }
          });

    }

    const createManager=()=>{
      let name = newNameRef.current.value.trim();
      let password = newPasswordRef.current.value.trim();
      let phone = newPhoneRef.current.value.trim().replace(/[\s-]/g, '');
      let mail = newMailRef.current.value.trim();

      if(!validateDate(password,password,name,phone,mail)){
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
          email: mail,
          phone: phone,
          password: password,
          roleName:'manager'
        }).then((data)=>{
          if(data){
            alert('менеджер доданий');
            setUsers([...users,data]);
            newNameRef.current.value='';
            newMailRef.current.value='';
            newPhoneRef.current.value='';
            newPasswordRef.current.value='';
          }
          else{
            alert('менеджер не доданий');
          }
        })
    }

  return (         
    
    <div className='admin-content-overlay'>
        <div className='admin-content'>
              <h3 className='admin-h'>Панель Менеджера</h3>  
                <table class="admin-table">
                    <thead class="admin-theader">
                        <tr>
                        <th>Ім'я</th>
                        <th>Електронна пошта</th>
                        <th>Пароль</th>
                        <th>Телефон</th>
                        <th>Роль</th>
                        <th colSpan={2}>Редагувати</th>
                        
                        </tr>
                    </thead>
                    <tbody class="admin-tbody">
                        <tr>
                            <td>
                                <input ref={nameRef} type='text' className='admin-input ls' defaultValue={user.name}/>
                            </td>
                            <td>
                                <input ref={mailRef} type='text' className='admin-input' defaultValue={user.email}/>
                            </td>
                            <td>
                                 <input ref={passwordRef} type='text' className='admin-input ls' defaultValue={user.password}/>
                            </td>
                            <td>
                               <input ref={phoneRef} type='text' className='admin-input ls' defaultValue={user.phone}/>
                            </td>
                            <td>
                                <input type='text' readOnly className='admin-input ls' defaultValue={user.roleName}/>
                            </td>
                            <td>
                                <input type='button' onClick={BackInfoAboutAdmin} className='admin-input ll gc' value='Повернути'/>
                            </td>
                            <td>
                                <input type='button' onClick={ChangeInfoAboutAdmin} className='admin-input ll bc' value='Змінити'/>
                            </td>

                        </tr>
                        <tr></tr>
                    </tbody>

                 </table>
              
              <p className='admin-p'>
              <b> Перелік менеджерів:</b>
              </p>

              <table class="admin-table">
              <thead class="admin-theader">
                        <tr>
                        <th>Ім'я</th>
                        <th>Електронна пошта</th>
                        <th>Пароль</th>
                        <th>Телефон</th>                        
                        <th colSpan="3">Редагувати</th>
                        
                        </tr>
                    </thead>
                  <tbody class="admin-tbody">
                    {users.length>0 && users.map((user)=>(
                        <tr key={user.id}>
                          <td>
                            <input id={`name-${user.id}`}  type='text' className='admin-input ls' defaultValue={user.name} />
                          </td>
                          <td>
                            <input id={`email-${user.id}`}  type='text' className='admin-input' defaultValue={user.email}/>
                          </td>
                          <td>
                            <input id={`password-${user.id}`}  type='text' className='admin-input ls' defaultValue={user.password}/>
                          </td>
                          <td>
                          <input id={`phone-${user.id}`}  type='text' className='admin-input ls' defaultValue={user.phone}/>
                          </td>
                          <td> <input type='button' className='admin-input ll gc' defaultValue='Повернути' onClick={()=>{backManager(user)}}/></td>
                          <td> <input type='button' className='admin-input ll bc' defaultValue='Змінити' onClick={()=>{updateManager(user.id,user.role_id)}}/></td>
                          <td><input type='button' className='admin-input ll rc' defaultValue='Видалити' onClick={()=>{deleteManager(user.id)}}/></td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                          <input ref={newNameRef} type='text' className='admin-input ls' placeholder='Імя'/>
                        </td>
                        <td>
                          <input ref={newMailRef}  type='text' className='admin-input' placeholder='електронна пошта'/>
                        </td>
                        <td>
                           <input ref={newPasswordRef}  type='text' className='admin-input ls' placeholder='Пароль' />
                        </td>
                        <td>
                        <input ref={newPhoneRef}  type='text' className='admin-input ls'  placeholder='Телефон'/>
                        </td>
                        <td> <input type='button' className='admin-input ll gc' defaultValue='Cтворити' onClick={()=>{createManager()}}/></td>
                        <td></td>
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
                    <td></td>
                    <td></td>
                    
                  </tr>      
                  </tfoot>            
              </table>
          
            
        </div>
         
    </div>
  
  )
};

export default HomepageForAdmin;
