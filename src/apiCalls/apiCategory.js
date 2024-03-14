const getCategories = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/category`);
    if(!response.ok)
        return [];
    const data = await response.json();
    return data;
};

const addCategory = async (category) => {
    try{
            const response = await fetch(`http://127.0.0.1:8000/api/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                body: JSON.stringify(category)
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
const upCategory = async (category) => {
    try{ 
        
        const response= await fetch(`http://127.0.0.1:8000/api/category/${category['id']}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(category)
        
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

const deleteCategory=async(id)=>{
    const response = await fetch(`http://127.0.0.1:8000/api/category/${id}`, {
        method: 'DELETE',        
    })
    if(!response.ok){
        return false;
    }
    return true;
  
}
export {addCategory, getCategories, deleteCategory, upCategory};