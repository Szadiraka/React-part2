const getManufactures = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/manufacture`);
    if(!response.ok)
        return [];
    const data = await response.json();
    return data;
};

const addManufacture = async (manufacture) => {
    try{
            const response = await fetch(`http://127.0.0.1:8000/api/manufacture`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                body: JSON.stringify(manufacture)
            });
            if(!response.ok){
                
                throw new Error(`HTTP error! Status: ${response.status}`);
                
            }
            const data = await response.json();
            return data;
        }catch(error){
            alert(error);
        }
}

const upManufacture = async (manufacture) => {
    try{ 
        
        const response= await fetch(`http://127.0.0.1:8000/api/manufacture/${manufacture['id']}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(manufacture)
        
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

const deleteManufacture=async(id)=>{
    const response = await fetch(`http://127.0.0.1:8000/api/manufacture/${id}`, {
        method: 'DELETE',        
    })
    if(!response.ok){
        return false;
    }
    return true;
  
}

export {addManufacture, getManufactures, upManufacture,deleteManufacture};