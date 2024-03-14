import React,{useRef, useState,useEffect,useContext} from 'react';
import {getComments,addComment,deleteComment,upComment} from '../apiCalls/apiComment';
import {UserContext} from '../components/context/UserContext';

const Commentary = () => {
  const {user} = useContext(UserContext);
 const[comments,setComments] = useState([]);
 const newNameRef = useRef(); 
  useEffect(() => {          
      getComments()
      .then((data) => setComments(data));
      
  },[]);


  const deleteItem=(id)=>{
     deleteComment(id).then((data)=>{
      setComments(comments.filter(comment=>comment.id!==id));
    })
  }

  const updateItem = (comment)=>{
  
     let text = document.getElementById('name-'+comment.id).value.trim();
         if(comment.text===text){    
          return;
         }
        let id= comment.id;
        let user_id= comment.user_id;
        let updateComment={id:id, text: text, user_id: user_id};      
        upComment(updateComment)
        .then((result)=>{
                  if(result){
                    alert('коментар змінено');                
                  }
                  else{
                    alert('коментар не змінено');
                  }
        });

  }

  const createItem=()=>{
    let text = newNameRef.current.value.trim(); 


      addComment({
        id:0,
        user_id: user.id,
        text: text,      
      }).then((data)=>{
        if(data){
          alert('коментар додано');
          setComments([...comments,data]);
          newNameRef.current.value='';
         
        }
        else{
          alert('коментар не доданий');
        }
      })
  }


  return (
    <div className='admin-content'>
              <h3 className='admin-h'>Панель менеджера</h3>  
                       
              <p className='admin-p'>
              <b> Перелік коментарів:</b>
              </p>

              <table class="admin-table">
              <thead class="admin-theader">
                        <tr>
                         
                          <th>Назва</th>                                             
                          <th colSpan="2">Редагувати</th>                        
                        </tr>
                    </thead>
                  <tbody class="admin-tbody">
                    {comments.length>0 && comments.map((comment)=>(
                        <tr key={comment.id}>
                          <td>
                            {/* <input id={`name-${comment.id}`}  type='text' className='admin-input ls' defaultValue={comment.text} /> */}
                            <textarea id={`name-${comment.id}`}  className='admin-input-textarea' defaultValue={comment.text}></textarea>
                          </td>                         
                         
                          <td> <input type='button' className='admin-input ll bc' defaultValue='Змінити' onClick={()=>{updateItem(comment)}}/></td>
                          <td><input type='button' className='admin-input ll rc' defaultValue='Видалити' onClick={()=>{deleteItem(comment.id)}}/></td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                          {/* <input ref={newNameRef} type='text' className='admin-input ls' placeholder='Назва'/> */}
                          <textarea ref={newNameRef}  className='admin-input-textarea' placeholder='Коментар'></textarea>
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
                                
                    
                  </tr>      
                  </tfoot>            
              </table>
          
            
        </div>
  )
};

export default Commentary;
