const getModels = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/model`);
    if(!response.ok)
        return [];
    const data = await response.json();
    return data;
};
const getModelswithItems = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/modelAll`);
    if(!response.ok)
        return [];
    const data = await response.json();
    return data;
};

const addModel = async (model) => {
    try{
            const response = await fetch(`http://127.0.0.1:8000/api/model`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset= utf-8'
                },
                body: JSON.stringify(model)
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
const upModel = async (model) => {
    try{ 
        
        const response= await fetch(`http://127.0.0.1:8000/api/model/${model['id']}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(model)
        
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

const deleteModel=async(id)=>{
    const response = await fetch(`http://127.0.0.1:8000/api/model/${id}`, {
        method: 'DELETE',        
    })
    if(!response.ok){
        alert('не вдалося видалити модель');
        return false;
    }
    return true;
  
}

export {addModel, getModels, upModel, deleteModel, getModelswithItems};