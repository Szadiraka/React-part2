import React,{useRef, useState,useEffect} from 'react';
import {getCategories,addCategory,deleteCategory,upCategory} from '../apiCalls/apiCategory';

const Category = () => {
 const[categories,setCategories] = useState([]);
 const newNameRef = useRef(); 
  useEffect(() => {          
      getCategories()
      .then((data) => setCategories(data));
      
  },[]);


  const deleteItem=(id)=>{
     deleteCategory(id).then((data)=>{
      setCategories(categories.filter(category=>category.id!==id));
    })
  }
  const backItem=(category)=>{
    document.getElementById('name-'+category.id).value=category.name;
   
  }
  const updateItem = (category)=>{
  
     let name = document.getElementById('name-'+category.id).value.trim();
         if(category.name===name){    
          return;
         }
        let id= category.id;
        let updateCategory={id:id, name: name};      
        upCategory(updateCategory)
        .then((result)=>{
                  if(result){
                    alert('назва категорії змінена');                
                  }
                  else{
                    alert('назва категорії не змінена');
                  }
        });

  }

  const createItem=()=>{
    let name = newNameRef.current.value.trim(); 


      addCategory({
        id:0,
        name: name,      
      }).then((data)=>{
        if(data){
          alert('категорія додана');
          setCategories([...categories,data]);
          newNameRef.current.value='';
         
        }
        else{
          alert('категорія не доданий');
        }
      })
  }


  return (
    <div className='admin-content'>
              <h3 className='admin-h'>Панель менеджера</h3>  
                       
              <p className='admin-p'>
              <b> Перелік категорій:</b>
              </p>

              <table class="admin-table">
              <thead class="admin-theader">
                        <tr>
                         
                          <th>Назва</th>                                             
                          <th colSpan="3">Редагувати</th>                        
                        </tr>
                    </thead>
                  <tbody class="admin-tbody">
                    {categories.length>0 && categories.map((category)=>(
                        <tr key={category.id}>
                          <td>
                            <input id={`name-${category.id}`}  type='text' className='admin-input ls' defaultValue={category.name} />
                          </td>
                         
                          <td> <input type='button' className='admin-input ll gc' defaultValue='Повернути' onClick={()=>{backItem(category)}}/></td>
                          <td> <input type='button' className='admin-input ll bc' defaultValue='Змінити' onClick={()=>{updateItem(category)}}/></td>
                          <td><input type='button' className='admin-input ll rc' defaultValue='Видалити' onClick={()=>{deleteItem(category.id)}}/></td>
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

export default Category;

