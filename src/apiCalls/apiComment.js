const getComments = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/comment`);
    if(!response.ok)
        return [];
    const data = await response.json();
    return data;
};

const getCommentsWithUsers = async () => { 
    const response = await fetch(`http://127.0.0.1:8000/api/commentuser`);
    if(!response.ok)
        return [];
    const data = await response.json();
    return data;
};

const addComment = async (comment) => {
    try{
            const response = await fetch(`http://127.0.0.1:8000/api/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                body: JSON.stringify(comment)
            });
            if(!response.ok){
                
                throw new Error(`HTTP error! Status: ${response.status}`);
                
            }
            const data = await response.json();
            return data;
        }catch(error){
            console.log(error);
        }
}
const upComment = async (comment) => {
    try{ 
        
        const response= await fetch(`http://127.0.0.1:8000/api/comment/${comment['id']}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(comment)
        
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if(data){
        return true;
    }
    else return false;
    
    }catch(error){
        alert(error);
        return false;
    }
}

const deleteComment=async(id)=>{
    const response = await fetch(`http://127.0.0.1:8000/api/comment/${id}`, {
        method: 'DELETE',        
    })
    if(!response.ok){
        return false;
    }
    return true;
  
}
export {addComment, getComments, upComment, deleteComment, getCommentsWithUsers};