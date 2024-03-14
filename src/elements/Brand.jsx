import React,{useRef, useState,useEffect} from 'react';
import {getProductBrends,addProductBrend,deleteProductBrend,upProductBrend} from '../apiCalls/apiProductBrend';

const Brand = () => {
 const[brends,setBrends] = useState([]);
 const newNameRef = useRef(); 
  useEffect(() => {          
      getProductBrends()
      .then((data) => setBrends(data));
      
  },[]);


  const deleteItem=(id)=>{
     deleteProductBrend(id).then((data)=>{
      setBrends(brends.filter(brend=>brend.id!==id));
    })
  }
  const backItem=(brend)=>{
    document.getElementById('name-'+brend.id).value=brend.name;
   
  }
  const updateItem = (brend)=>{
  
     let name = document.getElementById('name-'+brend.id).value.trim();
         if(brend.name===name){    
          return;
         }
        let id= brend.id;
        let updateBrend={id:id, name: name};      
        upProductBrend(updateBrend)
        .then((result)=>{
                  if(result){
                    alert('назва бренду змінена');                
                  }
                  else{
                    alert('назва бренду не змінена');
                  }
        });

  }

  const createItem=()=>{
    let name = newNameRef.current.value.trim(); 


      addProductBrend({
        id:0,
        name: name,      
      }).then((data)=>{
        if(data){
          alert('бренд додана');
          setBrends([...brends,data]);
          newNameRef.current.value='';
         
        }
        else{
          alert('бренд не доданий');
        }
      })
  }


  return (
    <div className='admin-content'>
              <h3 className='admin-h'>Панель менеджера</h3>  
                       
              <p className='admin-p'>
              <b> Перелік брендів:</b>
              </p>

              <table class="admin-table">
              <thead class="admin-theader">
                        <tr>
                         
                          <th>Назва</th>                                             
                          <th colSpan="3">Редагувати</th>                        
                        </tr>
                    </thead>
                  <tbody class="admin-tbody">
                    {brends.length>0 && brends.map((brend)=>(
                        <tr key={brend.id}>
                          <td>
                            <input id={`name-${brend.id}`}  type='text' className='admin-input ls' defaultValue={brend.name} />
                          </td>
                         
                          <td> <input type='button' className='admin-input ll gc' defaultValue='Повернути' onClick={()=>{backItem(brend)}}/></td>
                          <td> <input type='button' className='admin-input ll bc' defaultValue='Змінити' onClick={()=>{updateItem(brend)}}/></td>
                          <td><input type='button' className='admin-input ll rc' defaultValue='Видалити' onClick={()=>{deleteItem(brend.id)}}/></td>
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

export default Brand;


