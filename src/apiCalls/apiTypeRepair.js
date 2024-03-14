const getTypeRepairs = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/type_repair`);
    if(!response.ok)
        return [];
    const data = await response.json();
    return data;
};

const getTypeRepairsWithChild = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/type_repairwithchilds`);
   
        if(!response.ok){
            alert("данні не отримано");
            return [];
        }
            
        const data = await response.json();
        return data;
    }

const addTypeRepair = async (typeRepair) => {
    try{
            const response = await fetch(`http://127.0.0.1:8000/api/type_repair`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset= utf-8'
                },
                body: JSON.stringify(typeRepair)
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
const upTypeRepair = async (model) => {
    try{ 
        
        const response= await fetch(`http://127.0.0.1:8000/api/type_repair/${model['id']}`, {
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

const deleteTypeRepair=async(id)=>{
    const response = await fetch(`http://127.0.0.1:8000/api/type_repair/${id}`, {
        method: 'DELETE',        
    })
    if(!response.ok){
        alert('не вдалося видалити тип ремонту');
        return false;
    }
    return true;
  
}
export {addTypeRepair, getTypeRepairs, upTypeRepair, deleteTypeRepair, getTypeRepairsWithChild};