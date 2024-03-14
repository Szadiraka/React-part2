import React,{useRef, useState,useEffect} from 'react';
import {getProductRepairs,addProductRepair,deleteProductRepair,upProductRepair} from '../apiCalls/apiProductRepair';

const ProductRepair = () => {
 const[productRepairs,setProductRepairs] = useState([]);
 const newNameRef = useRef(); 
  useEffect(() => {          
      getProductRepairs()
      .then((data) => setProductRepairs(data));
      
  },[]);


  const deleteItem=(id)=>{
     deleteProductRepair(id).then((data)=>{
      setProductRepairs(productRepairs.filter(productRepair=>productRepair.id!==id));
    })
  }
  const backItem=(productRepair)=>{
    document.getElementById('name-'+productRepair.id).value=productRepair.name;
   
  }
  const updateItem = (productRepair)=>{
  
     let name = document.getElementById('name-'+productRepair.id).value.trim();
         if(productRepair.name===name){    
          return;
         }
        let id= productRepair.id;
        let updateproductRepair={id:id, name: name};      
        upProductRepair(updateproductRepair)
        .then((result)=>{
                  if(result){
                    alert('назва  змінена');                
                  }
                  else{
                    alert('назва  не змінена');
                  }
        });

  }

  const createItem=()=>{
    let name = newNameRef.current.value.trim(); 


      addProductRepair({
        id:0,
        name: name,      
      }).then((data)=>{
        if(data){
          alert('категорія ремонту додана');
          setProductRepairs([...productRepairs,data]);
          newNameRef.current.value='';
         
        }
        else{
          alert('категорія ремонту не додана');
        }
      })
  }


  return (
    <div className='admin-content'>
              <h3 className='admin-h'>Панель менеджера</h3>  
                       
              <p className='admin-p'>
              <b> Перелік категорій ремонтів:</b>
              </p>

              <table class="admin-table">
              <thead class="admin-theader">
                        <tr>
                         
                          <th>Назва</th>                                             
                          <th colSpan="3">Редагувати</th>                        
                        </tr>
                    </thead>
                  <tbody class="admin-tbody">
                    {productRepairs.length>0 && productRepairs.map((productRepair)=>(
                        <tr key={productRepair.id}>
                          <td>
                            <input id={`name-${productRepair.id}`}  type='text' className='admin-input ls' defaultValue={productRepair.name} />
                          </td>
                         
                          <td> <input type='button' className='admin-input ll gc' defaultValue='Повернути' onClick={()=>{backItem(productRepair)}}/></td>
                          <td> <input type='button' className='admin-input ll bc' defaultValue='Змінити' onClick={()=>{updateItem(productRepair)}}/></td>
                          <td><input type='button' className='admin-input ll rc' defaultValue='Видалити' onClick={()=>{deleteItem(productRepair.id)}}/></td>
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

export default ProductRepair;


