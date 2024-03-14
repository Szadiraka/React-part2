const getProductRepairs = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/product_repair`);
    if(!response.ok)
        return [];
    const data = await response.json();
    return data;
};

const addProductRepair = async (productRepair) => {
    try{
            const response = await fetch(`http://127.0.0.1:8000/api/product_repair`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                body: JSON.stringify(productRepair)
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

const upProductRepair = async (productrepair) => {
    try{ 
        
        const response= await fetch(`http://127.0.0.1:8000/api/product_repair/${productrepair['id']}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(productrepair)
        
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

const deleteProductRepair=async(id)=>{
    const response = await fetch(`http://127.0.0.1:8000/api/product_repair/${id}`, {
        method: 'DELETE',        
    })
    if(!response.ok){
        return false;
    }
    return true;
  
}

export {addProductRepair, getProductRepairs, upProductRepair, deleteProductRepair};