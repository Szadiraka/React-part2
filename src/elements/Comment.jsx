import React from 'react';
import avatar from '../images/avatar.png';
import '../styles/comment.css';

const Comment = ({comment,users}) => {

  const user = users.find((user) => user.id === comment.user_id);
  return (
    <>
      <div className='review-message-container'>
            <div className="review-message">
                <img src={avatar} alt="avatar" className='background-image2'/>
                <div className='review-message-text'>
                    <h3 id="review-message-h">{user ? user.name : 'Unknown User'}</h3>
                    <p className="review-message-p"> {comment.text}</p>
                </div>                    
            </div>
       </div> 
    </>
  )
};

export default Comment;
