import React,{useRef, useState,useEffect} from 'react';
import {getManufactures,addManufacture,deleteManufacture,upManufacture} from '../apiCalls/apiManufacture';

const Manufacture = () => {
 const[manufactures,setManufactures] = useState([]);
 const newNameRef = useRef(); 
  useEffect(() => {          
      getManufactures()
      .then((data) => setManufactures(data));
      
  },[]);


  const deleteItem=(id)=>{
     deleteManufacture(id).then((data)=>{
      setManufactures(manufactures.filter(manufacture=>manufacture.id!==id));
    })
  }
  const backItem=(manufacture)=>{
    document.getElementById('name-'+manufacture.id).value=manufacture.name;
   
  }
  const updateItem = (manufacture)=>{
  
     let name = document.getElementById('name-'+manufacture.id).value.trim();
         if(manufacture.name===name){    
          return;
         }
        let id= Number(manufacture.id);
        let updateManufacture={id:id, name: name};      
        upManufacture(updateManufacture)
        .then((result)=>{
          console.log(result);
                  if(result){
                    alert('назва виробника змінена');                
                  }
                  else{
                    alert('назва виробника не змінена');
                  }
        });

  }

  const createItem=()=>{
    let name = newNameRef.current.value.trim(); 


      addManufacture({
        id:0,
        name: name,      
      }).then((data)=>{
        if(data){
          alert('виробник доданий');
          setManufactures([...manufactures,data]);
          newNameRef.current.value='';
         
        }
        else{
          alert('виробник не доданий');
        }
      })
  }


  return (
    <div className='admin-content'>
              <h3 className='admin-h'>Панель менеджера</h3>  
          
              
              <p className='admin-p'>
              <b> Перелік виробників:</b>
              </p>

              <table class="admin-table">
              <thead class="admin-theader">
                        <tr>
                         
                          <th>Назва</th>                                             
                          <th colSpan="3">Редагувати</th>                        
                        </tr>
                    </thead>
                  <tbody class="admin-tbody">
                    {manufactures.length>0 && manufactures.map((manufacture)=>(
                        <tr key={manufacture.id}>
                          <td>
                            <input id={`name-${manufacture.id}`}  type='text' className='admin-input ls' defaultValue={manufacture.name} />
                          </td>
                         
                          <td> <input type='button' className='admin-input ll gc' defaultValue='Повернути' onClick={()=>{backItem(manufacture)}}/></td>
                          <td> <input type='button' className='admin-input ll bc' defaultValue='Змінити' onClick={()=>{updateItem(manufacture)}}/></td>
                          <td><input type='button' className='admin-input ll rc' defaultValue='Видалити' onClick={()=>{deleteItem(manufacture.id)}}/></td>
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

export default Manufacture;
