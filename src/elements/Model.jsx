import React,{useRef, useState,useEffect} from 'react';
import {getModels,addModel,deleteModel,upModel} from '../apiCalls/apiModel';
import {getProductRepairs} from '../apiCalls/apiProductRepair';
import {getProductBrends} from '../apiCalls/apiProductBrend';

const Model = () => {
 const[models,setModels] = useState([]);
 const[productRepairs,setProductRepairs]=useState([]);
 const[productBrends,setProductBrends]=useState([]);
 const newNameRef = useRef(); 
 const newProductRepairRef = useRef();
 const newProductBrendRef = useRef();
  useEffect(() => {          
    getModels()
    .then((data) => setModels(data));
    getProductRepairs().
    then((data) => setProductRepairs(data));
    getProductBrends().
    then((data) => setProductBrends(data)); 
  },[]);
   
 
   
  const deleteItem=(id)=>{
    
     deleteModel(id).then((data)=>{
      if(data) 
       setModels(models.filter(model=>model.id!==id));
    })
  }

  const updateItem = (model)=>{
  
     let name = document.getElementById('name-'+model.id).value.trim();
     let productrepair_id = Number(document.getElementById('productrepair-'+model.id).value);
     let productbrend_id = Number(document.getElementById('productbrend-'+model.id).value);
         if(model.name===name && model.productRepair_id=== productrepair_id && model.productBrend_id=== productbrend_id){          
            
          return;
         }
        let id= model.id;
        
        let updateModel={id:id, name: name, productRepair_id: productrepair_id, productBrend_id: productbrend_id};      
        upModel(updateModel)
        .then((result)=>{
                  if(result){
                    alert('модель змінено');  
                    let newModel =models.find(model=>model.id===id);
                    newModel.name=name; newModel.productRepair_id=productrepair_id; newModel.productBrend_id=productbrend_id;  
                    setModels([...models.filter(model=>model.id!==id),newModel]);            
                  }
                  else{
                    alert('модель не змінено');
                  }
        });

  }

  const createItem=()=>{
    let name = newNameRef.current.value.trim(); 
    if(name.length===0){
      alert('немає назви');
      return;
    }
    let productRepair_id =Number(newProductRepairRef.current.value);
    let productBrend_id =Number(newProductBrendRef.current.value);
     
      addModel({
        id:0,
        productRepair_id:productRepair_id,
        productBrend_id:productBrend_id,
        name: name,      
      }).then((data)=>{
        if(data){
          alert('модель  додано');
          setModels([...models,data]);
          newNameRef.current.value='';
         
        }
        else{
          alert('модель не додано');
        }
      })
  }


  return (
    <div className='admin-content'>
              <h3 className='admin-h'>Панель менеджера</h3>  
                       
              <p className='admin-p'>
              <b> Перелік моделей:</b>
              </p>

              <table class="admin-table">
              <thead class="admin-theader">
                        <tr>
                         
                          <th>Назва</th> 
                          <th >Категорії ремонтів</th>  
                          <th > Бренди</th>                                          
                          <th colSpan="2">Редагувати</th>                        
                        </tr>
                    </thead>
                  <tbody class="admin-tbody">
                    {models.length>0 && models.map((model)=>(
                        <tr key={model.id}>
                          <td>
                             <input id={`name-${model.id}`}  type='text' className='admin-input ls' defaultValue={model.name} />                         
                          </td> 
                          <td>
                             <input id={`productrepairs-${model.id}`} defaultValue={`${productRepairs.find(x => x.id === model.productRepair_id)?.name|| '' }`}  type='text' className='admin-input ls'  /> 
                             <select id={`productrepair-${model.id}`} className='admin-input ls ma gg'>
                                
                                {productRepairs.length>0 && productRepairs.map((productrepair)=>(
                                  <option key={productrepair.id} value={productrepair.id}>{productrepair.name}</option>
                                ))}
                             </select>                       
                          </td>  
                          <td>
                              <input id={`productbrends-${model.id}`} defaultValue={`${productBrends.find(x => x.id === model.productBrend_id)?.name|| '' }`}  type='text' className='admin-input ls'  /> 
                             <select  id={`productbrend-${model.id}`} className='admin-input ls ma gg'>
                                 
                                {productBrends.length>0 && productBrends.map((productbrend)=>(
                                  <option key={productbrend.id} value={productbrend.id}>{productbrend.name}</option>
                                ))}
                             </select>

                          </td>                 
                         
                          <td> <input type='button' className='admin-input ll bc' defaultValue='Змінити' onClick={()=>{updateItem(model)}}/></td>
                          <td><input type='button' className='admin-input ll rc' defaultValue='Видалити' onClick={()=>{deleteItem(model.id)}}/></td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                           <input ref={newNameRef} type='text' className='admin-input ls' placeholder='Назва'/> 
                                              
                        </td>
                        <td>
                           
                           {/* <input ref={newProductRepairRef} type='text' className='admin-input ls' placeholder='Категорія ремонтів'/> */}
                           <select ref={newProductRepairRef} className='admin-input ls ma'>
                              {productRepairs.length>0 && productRepairs.map((productrepair)=>(
                                <option key={productrepair.id} value={productrepair.id}>{productrepair.name}</option>
                              ))}
                           </select>
                                                
                        </td>
                        <td>
                            {/* <input ref={newProductBrendRef} type='text' className='admin-input ls' placeholder='Бренд'/>  */}
                            <select ref={newProductBrendRef} className='admin-input ls ma'>
                              {productBrends.length>0 && productBrends.map((productbrend)=>(
                                <option key={productbrend.id} value={productbrend.id}>{productbrend.name}</option>
                              ))}
                            </select>
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

export default Model;