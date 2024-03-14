import React,{useRef, useState,useEffect} from 'react';
import {getPriceDetails,addPriceDetail,deletePriceDetail,upPriceDetail} from '../apiCalls/apiPriceDetails';
import {getManufactures} from '../apiCalls/apiManufacture';
import {getCategories} from '../apiCalls/apiCategory';
import {getModels} from '../apiCalls/apiModel';


const PriceDetail = () => {
 const[priceDetails,setPriceDetails] = useState([]);
 const[manufactures,setManufactures]=useState([]);
 const[categories,setCategories]=useState([]);
 const[models,setModels]=useState([]);
 const newNameRef = useRef(); 
 const newModelRef = useRef();
 const newCategoryRef = useRef();
 const newManufactureRef = useRef();
 const newPriceRef = useRef();

  useEffect(() => {          
    getPriceDetails()
    .then((data) => setPriceDetails(data));
    getManufactures().
    then((data) => setManufactures(data));
    getCategories().
    then((data) => setCategories(data));
    getModels().
    then((data) => setModels(data));
    
  },[]);
   
 
   
  const deleteItem=(id)=>{
    
     deletePriceDetail(id).then((data)=>{
      if(data) 
       setPriceDetails(priceDetails.filter(el=>el.id!==id));
    })
  }

  const updateItem = (priceDetail)=>{
  
     let name = document.getElementById('name-'+priceDetail.id).value.trim();
     let model_id = Number(document.getElementById('model-'+priceDetail.id).value);
     let category_id = Number(document.getElementById('category-'+priceDetail.id).value);
     let manufacture_id = Number(document.getElementById('manufacture-'+priceDetail.id).value);
     let price = Number(document.getElementById('price-'+priceDetail.id).value);
         if((priceDetail.name===name && priceDetail.model_id=== model_id && priceDetail.price===price && priceDetail.category_id=== category_id 
          && priceDetail.manufacture_id=== manufacture_id)|| price===0  || name==='')          
              return;
         
        let id= priceDetail.id;
        
        let updateModel={id:id, name: name, model_id: model_id, price: price, category_id: category_id, manufacture_id: manufacture_id};      
        upPriceDetail(updateModel)
        .then((result)=>{
                  if(result){
                    alert('аксесуар змінено');  
                    let newPriceDetail =priceDetails.find(model=>model.id===id);
                    newPriceDetail.name=name; newPriceDetail.model_id=model_id; newPriceDetail.price=price;
                    newPriceDetail.category_id=category_id; newPriceDetail.manufacture_id=manufacture_id; 
                    setPriceDetails([...priceDetails.filter(model=>model.id!==id),newPriceDetail]);            
                  }
                  else{
                    alert('аксесуар не змінено');
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
    let model_id = Number(newModelRef.current.value);
    if(model_id===0){
      alert("модель не вибрана");
      return;
    }
    let category_id = Number(newCategoryRef.current.value);
    if(category_id===0){
      alert("категорія не вибрана");
    }
    let manufacture_id = Number(newManufactureRef.current.value);
    if(manufacture_id===0){
      alert("виробник не вибран");
    }
     
      addPriceDetail({
        id:0,
        model_id:model_id,
        manufacture_id:manufacture_id,
        category_id:category_id,
        price: price,
        name: name,
              
      }).then((data)=>{
        if(data){
          alert('аксесуар  додано');
          setPriceDetails([...priceDetails,data]);
          newNameRef.current.value='';
          newPriceRef.current.value=0;
        }
        else{
          alert('аксесуар не додано');
        }
      })
  }


  return (
    <div className='admin-content'>
              <h3 className='admin-h'>Панель менеджера</h3>  
                       
              <p className='admin-p'>
              <b> Перелік аксесуарів:</b>
              </p>

              <table class="admin-table">
              
                  <tbody  class="admin-tbody new"> 
                    <thead class="admin-theader">
                          <tr>
                          
                            <th>Назва</th> 
                            <th >Вартість</th>  
                            <th > Модель</th> 
                            <th >Категорія</th> 
                            <th >Виробник</th>                                        
                            <th colSpan="2">Редагувати</th>                        
                          </tr>
                      </thead>
                    {priceDetails.length>0 && priceDetails.map((model)=>(
                        <tr key={model.id}>
                          <td>
                             <input id={`name-${model.id}`}  type='text' className='admin-input ls' defaultValue={model.name} />                         
                          </td> 
                          <td>
                              <input id={`price-${model.id}`} defaultValue={model.price}  type='number' className='admin-input ls'  /> 
                           
                          </td> 
                          <td>
                             <input id={`models-${model.id}`} defaultValue={`${models.find(x => x.id === model.model_id)?.name|| '' }`}  type='text' className='admin-input ls'  /> 
                             <select id={`model-${model.id}`} className='admin-input ls ma gg'>                                
                                {models.length>0 && models.map((model)=>(
                                  <option key={model.id} value={model.id}>{model.name}</option>
                                ))}
                             </select>                       
                          </td>  
                          <td>
                             <input id={`categories-${model.id}`} defaultValue={`${categories.find(x => x.id === model.category_id)?.name|| '' }`}  type='text' className='admin-input ls'  /> 
                             <select id={`category-${model.id}`} className='admin-input ls ma gg'>                                
                                {categories.length>0 && categories.map((model)=>(
                                  <option key={model.id} value={model.id}>{model.name}</option>
                                ))}
                             </select>                       
                          </td> 
                          <td>
                             <input id={`manufactures-${model.id}`} defaultValue={`${manufactures.find(x => x.id === model.manufacture_id)?.name|| '' }`}  type='text' className='admin-input ls'  /> 
                             <select id={`manufacture-${model.id}`} className='admin-input ls ma gg'>                                
                                {manufactures.length>0 && manufactures.map((model)=>(
                                  <option key={model.id} value={model.id}>{model.name}</option>
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
                             <input ref={newPriceRef} type='number' className='admin-input ls' placeholder='Вартість' min={0} max={10000}/>  
                           
                        </td> 
                        <td>                           
                          <select ref={newModelRef} className='admin-input ls ma'>
                              {models.length>0 && models.map((model)=>(
                                <option key={model.id} value={model.id}>{model.name}</option>
                              ))}
                           </select>                                                
                        </td>
                        <td>                           
                          <select ref={newCategoryRef} className='admin-input ls ma'>
                              {categories.length>0 && categories.map((model)=>(
                                <option key={model.id} value={model.id}>{model.name}</option>
                              ))}
                           </select>                                                
                        </td>
                        <td>                           
                          <select ref={newManufactureRef} className='admin-input ls ma'>
                              {manufactures.length>0 && manufactures.map((model)=>(
                                <option key={model.id} value={model.id}>{model.name}</option>
                              ))}
                           </select>                                                
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
                    <td></td>
                  </tr>      
                  </tfoot>            
                  </tbody>
                  
              </table>
          
            
        </div>
  )
};

export default PriceDetail;
