import React, { useEffect, useContext } from 'react';
import Comment from '../../elements/Comment';
import AddComment from '../../elements/AddComment';
import {useState} from 'react';
import {UserContext} from '../../components/context/UserContext';
import {getComments, addComment} from '../../apiCalls/apiComment';
import {getUsers} from '../../apiCalls/apiUser';
import bgImage from '../../images/bgImage.jpg';

import '../../styles/comment.css';
const CommentPage = () => {
   const[comment, setComment] = useState([]);
   const [users, setUsers] = useState([]);
   const [isDialogMessage, setDialogMessage] = useState(false);
   const {user} = useContext(UserContext);
   useEffect(() => {
         getComments()
         .then(data => setComment(data));
         getUsers()
         .then(({original}) =>{
          setUsers(original);
         });
          
   },[]);
      
   const openDialogMessage = () => {
    setDialogMessage(true);
   };
   const closeDialogMessage=()=>{
    setDialogMessage(false);
   };

   const addNewComment= (newComment)=>{
       addComment(newComment)   
       .then((data)=>{
       setComment([...comment,data]);      
     });
    };

  return (

    <div  className="review-main">      
      <img src={bgImage} alt="backgroundImage" className='background-image'/>
      <div className='review-content-overlay'>
           {isDialogMessage && <AddComment closeDialogMessage={closeDialogMessage} addNewComment={addNewComment}/>}

          <div className='review-content'>
                <h2 className='review-h'>Відгуки клієнтів</h2>  
                <div class="review-container">
                    <p className='review-p'>Ми прагнемо надавати якісні послуги з високим рівнем сервісу.
                       Ми вдячні нашим клієнтам за надану довіру і позитивні відгуки про спільну роботу.</p>
                   {user.roleName==='client' && <button class="review-button" onClick={openDialogMessage}>Залишити відгук</button>}
                </div>

                  {comment.length===0 && <p>Немає відгуків</p>}
                  {comment.length>0 && comment.map((comm) => <Comment comment={comm} users={users}/>)}            
           </div>           
      </div>
    </div>
  )
}

export default CommentPage;
