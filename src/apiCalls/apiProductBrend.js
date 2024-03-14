const getProductBrends = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/product_brend`);
    if(!response.ok)
        return [];
    const data = await response.json();
    return data;
};

const addProductBrend = async (productBrend) => {
    try{
            const response = await fetch(`http://127.0.0.1:8000/api/product_brend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                body: JSON.stringify(productBrend)
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
const upProductBrend = async (productbrend) => {
    try{ 
        
        const response= await fetch(`http://127.0.0.1:8000/api/product_brend/${productbrend['id']}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(productbrend)
        
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

const deleteProductBrend=async(id)=>{
    const response = await fetch(`http://127.0.0.1:8000/api/product_brend/${id}`, {
        method: 'DELETE',        
    })
    if(!response.ok){
        return false;
    }
    return true;
  
}
export {addProductBrend, getProductBrends, upProductBrend, deleteProductBrend};