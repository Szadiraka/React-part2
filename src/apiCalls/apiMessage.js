const getMessages = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/message`);
    if(!response.ok)
        return [];
    const data = await response.json();
    return data;
};

const getMessagesByUserId = async ($id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/message/user/${$id}`);
    if(!response.ok){
        alert("данні відсутні");
        return [];
    }
   
    const data = await response.json();
    return data;
} 


const addMessage = async (message) => {
    try{
            const response = await fetch(`http://127.0.0.1:8000/api/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                body: JSON.stringify(message)
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
const upMessage = async (message) => {
    try{ 
        
        const response= await fetch(`http://127.0.0.1:8000/api/message/${message['id']}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(message)
        
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

const deleteMessage=async(id)=>{
    const response = await fetch(`http://127.0.0.1:8000/api/message/${id}`, {
        method: 'DELETE',        
    })
    if(!response.ok){
        alert('не вдалося видалити повідомлення');
        return false;
    }
    return true;
  
}

export {addMessage, getMessages,getMessagesByUserId,upMessage,deleteMessage};