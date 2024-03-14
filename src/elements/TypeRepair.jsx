import React,{useRef, useState,useEffect} from 'react';
import {getTypeRepairs,addTypeRepair,deleteTypeRepair,upTypeRepair} from '../apiCalls/apiTypeRepair';
import {getProductRepairs} from '../apiCalls/apiProductRepair';

const TypeRepair = () => {
 const[typeRepairs,setTypeRepairs] = useState([]);
 const[productRepairs,setProductRepairs]=useState([]);
 const newNameRef = useRef(); 
 const newProductRepairRef = useRef();
 const newPriceRef = useRef();
 const newRepairTimeRef = useRef();
  useEffect(() => {          
    getProductRepairs()
    .then((data) => setProductRepairs(data));
    getTypeRepairs().
    then((data) => setTypeRepairs(data));
    
  },[]);
   
 
   
  const deleteItem=(id)=>{
    
     deleteTypeRepair(id).then((data)=>{
      if(data) 
       setTypeRepairs(typeRepairs.filter(typerepair=>typerepair.id!==id));
    })
  }

  const updateItem = (typerepair)=>{
  
     let name = document.getElementById('name-'+typerepair.id).value.trim();
     let productrepair_id = Number(document.getElementById('productrepair-'+typerepair.id).value);
     let price = Number(document.getElementById('price-'+typerepair.id).value.trim());
     let repairTime = document.getElementById('repairtime-'+typerepair.id).value;
         if((typerepair.name===name && typerepair.productRepair_id=== productrepair_id && typerepair.price===price && typerepair.repairTime=== repairTime)||
             price===0 || repairTime==='' || name==='')          
              return;
         
        let id= typerepair.id;
        
        let updateModel={id:id, name: name, productRepair_id: productrepair_id, price: price, repairTime: repairTime};      
        upTypeRepair(updateModel)
        .then((result)=>{
                  if(result){
                    alert('тип ремонту змінено');  
                    let newTypeRepair =typeRepairs.find(model=>model.id===id);
                    newTypeRepair.name=name; newTypeRepair.productRepair_id=productrepair_id; newTypeRepair.price=price;  newTypeRepair.repairTime=repairTime;  
                    setTypeRepairs([...typeRepairs.filter(model=>model.id!==id),newTypeRepair]);            
                  }
                  else{
                    alert('тип ремонту не змінено');
                  }
        });

  }

  const createItem=()=>{
    let name = newNameRef.current.value.trim(); 
    if(name.length===0){
      alert('немає назви');
      return;
    }
    let price= Number(newPriceRef.current.value);
    if(price<1){
      alert("немає ціни");
      return;
    }
    let repairTime = newRepairTimeRef.current.value.trim();
    if(repairTime.length===0){
      alert("немає часу ремонту");
      return;
    }
    let productRepair_id =Number(newProductRepairRef.current.value);
     
      addTypeRepair({
        id:0,
        productRepair_id:productRepair_id,
        price: price,
        name: name,
        repairTime: repairTime      
      }).then((data)=>{
        if(data){
          alert('тип ремонту  додано');
          setTypeRepairs([...typeRepairs,data]);
          newNameRef.current.value='';
          newRepairTimeRef.current.value='';
          newPriceRef.current.value=0;
        }
        else{
          alert('тип ремонту не додано');
        }
      })
  }


  return (
    <div className='admin-content'>
              <h3 className='admin-h'>Панель менеджера</h3>  
                       
              <p className='admin-p'>
              <b> Перелік типів ремонту:</b>
              </p>

              <table class="admin-table">
              
                  <tbody  class="admin-tbody new"> 
                    <thead class="admin-theader">
                          <tr>
                          
                            <th>Назва</th> 
                            <th >Категорії ремонтів</th>  
                            <th > Вартість</th> 
                            <th >Час ремонту</th>                                         
                            <th colSpan="2">Редагувати</th>                        
                          </tr>
                      </thead>
                    {typeRepairs.length>0 && typeRepairs.map((model)=>(
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
                              <input id={`price-${model.id}`} defaultValue={model.price}  type='number' className='admin-input ls'  /> 
                           
                          </td> 
                          <td>
                             <input id={`repairtime-${model.id}`}  type='text' className='admin-input ls' defaultValue={model.repairTime} />                         
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
                             <input ref={newPriceRef} type='number' className='admin-input ls' placeholder='Вартість' min={0} max={10000}/>  
                            {/* <select ref={newProductBrendRef} className='admin-input ls ma'>
                              {productBrends.length>0 && productBrends.map((productbrend)=>(
                                <option key={productbrend.id} value={productbrend.id}>{productbrend.name}</option>
                              ))}
                            </select> */}
                        </td> 
                        <td>
                           <input ref={newRepairTimeRef} type='text' className='admin-input ls' placeholder='Час ремонту'/> 
                                              
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

export default TypeRepair;
