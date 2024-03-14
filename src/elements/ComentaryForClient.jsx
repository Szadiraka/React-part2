import React,{useRef, useState,useEffect,useContext} from 'react';
import {getCommentsWithUsers,addComment} from '../apiCalls/apiComment';
import AddComment from './AddComment';
import {UserContext} from '../components/context/UserContext';
import '../styles/order.css';


const Comment = () => {
 const {user} = useContext(UserContext);
 const[comments,setComments] = useState([]);
 const[isDialogComment, setDialogComment] = useState(false);

  useEffect(() => {          
    getCommentsWithUsers()
    .then((data) => setComments(data));
      console.log(comments);
  },[]);

  const addNewComment= (newComment)=>{
    addComment(newComment)   
    .then((data)=>{
        data['user'] = user;
    console.log(data);
    setComments([...comments,data]);      
  });
 };

  return (
    <div className='order-content'>
    {isDialogComment && <AddComment closeDialogMessage={() => setDialogComment(false)} addNewComment={addNewComment}/>}
      <div className='order-div maxwidth'>
              <h3 className='order-h'>Панель клиєнта: ({user.name}/ {user.email})</h3>  
                       
              <p className='order-p'>
              <b> Перелік відгуків:</b>
              </p>            
                <div className='order-div '>
                <table key={1} class="order-table">
                    <thead class="order-theader">
                      <tr>
                        <th>Користувач</th>
                        <th >Відгук</th>                       
                      
                      </tr>
                    </thead>
                    {comments.length>0 && comments.map((comment)=>(
                    <tbody key={comment.id} class="order-tbody">
                        <tr>
                            <td>{comment.user.name}</td>
                            <td>
                              <textarea id={`name-${comment.id}`}  className='admin-input-textarea' defaultValue={comment.text} readOnly></textarea>
                            </td>                                                                                                       
                        </tr>                
                       

                    </tbody>
                    ))}

              </table>
              </div>
            
       </div>
              <div className='order-div'>
               
                <table key="0" class="order-table">
                  <thead class="order-theader">
                      <tr>
                        <th></th>
                        <th></th>
                        <th><button className='order-button bc' onClick={()=>setDialogComment(true)}>Додати відгук</button></th>
                        <th></th>
                        <th></th>
                      </tr>
                  </thead>               
                </table>
             </div>         
          
     </div>       
        
  )
};

export default Comment;
