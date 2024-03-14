const getRoles = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/role`);
    if(!response.ok)
        return [];
    const data = await response.json();
    return data;
};

const addRole = async (role) => {
    try{
            const response = await fetch(`http://127.0.0.1:8000/api/role`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                body: JSON.stringify(role)
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
const upRole = async (role) => {
    try{ 
        
        const response= await fetch(`http://127.0.0.1:8000/api/role/${role['id']}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(role)
        
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

const deleteRole=async(id)=>{
    const response = await fetch(`http://127.0.0.1:8000/api/role/${id}`, {
        method: 'DELETE',        
    })
    if(!response.ok){
        return false;
    }
    return true;
  
}
export {addRole, getRoles, upRole, deleteRole};