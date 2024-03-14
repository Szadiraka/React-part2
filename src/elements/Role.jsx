import React,{useRef, useState,useEffect} from 'react';
import {getRoles,addRole,deleteRole,upRole} from '../apiCalls/apiRole';

const Role = () => {
 const[roles,setRoles] = useState([]);
 const newNameRef = useRef(); 
  useEffect(() => {          
      getRoles()
      .then((data) => setRoles(data));
      
  },[]);


  const deleteItem=(id)=>{
     deleteRole(id).then((data)=>{
      setRoles(roles.filter(role=>role.id!==id));
    })
  }
  const backItem=(role)=>{
    document.getElementById('name-'+role.id).value=role.name;
   
  }
  const updateItem = (role)=>{
  
     let name = document.getElementById('name-'+role.id).value.trim();
         if(role.name===name){    
          return;
         }
        let id= role.id;
        let updateRole={id:id, name: name};      
        upRole(updateRole)
        .then((result)=>{
                  if(result){
                    alert('назва ролі змінена');                
                  }
                  else{
                    alert('назва ролі не змінена');
                  }
        });

  }

  const createItem=()=>{
    let name = newNameRef.current.value.trim(); 


      addRole({
        id:0,
        name: name,      
      }).then((data)=>{
        if(data){
          alert('роль додана');
          setRoles([...roles,data]);
          newNameRef.current.value='';
         
        }
        else{
          alert('роль не доданий');
        }
      })
  }


  return (
    <div className='admin-content'>
              <h3 className='admin-h'>Панель менеджера</h3>  
                       
              <p className='admin-p'>
              <b> Перелік ролей:</b>
              </p>

              <table class="admin-table">
              <thead class="admin-theader">
                        <tr>
                         
                          <th>Назва</th>                                             
                          <th colSpan="3">Редагувати</th>                        
                        </tr>
                    </thead>
                  <tbody class="admin-tbody">
                    {roles.length>0 && roles.map((role)=>(
                        <tr key={role.id}>
                          <td>
                            <input id={`name-${role.id}`}  type='text' className='admin-input ls' defaultValue={role.name} />
                          </td>
                         
                          <td> <input type='button' className='admin-input ll gc' defaultValue='Повернути' onClick={()=>{backItem(role)}}/></td>
                          <td> <input type='button' className='admin-input ll bc' defaultValue='Змінити' onClick={()=>{updateItem(role)}}/></td>
                          <td><input type='button' className='admin-input ll rc' defaultValue='Видалити' onClick={()=>{deleteItem(role.id)}}/></td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                          <input ref={newNameRef} type='text' className='admin-input ls' placeholder='Назва'/>
                        </td>                      
                        <td> <input type='button' className='admin-input ll gc' defaultValue='Cтворити' onClick={()=>{createItem()}}/></td>
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
                    
                  </tr>      
                  </tfoot>            
              </table>
          
            
        </div>
  )
};

export default Role;

