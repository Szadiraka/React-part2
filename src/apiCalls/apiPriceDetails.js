const getPriceDetails = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/price_detail`);
    if(!response.ok)
        return [];
    const data = await response.json();
    return data;
};

const getPriceDetailsWithChilds = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/price_detailwithchilds`);
   
        if(!response.ok){
            alert("данні не отримано");
            return [];
        }
            
        const data = await response.json();
        return data;
    }


const addPriceDetail = async (priceDetail) => {
    try{
            const response = await fetch(`http://127.0.0.1:8000/api/price_detail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                body: JSON.stringify(priceDetail)
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
const upPriceDetail = async (model) => {
    try{ 
        
        const response= await fetch(`http://127.0.0.1:8000/api/price_detail/${model['id']}`, {
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

const deletePriceDetail=async(id)=>{
    const response = await fetch(`http://127.0.0.1:8000/api/price_detail/${id}`, {
        method: 'DELETE',        
    })
    if(!response.ok){
        alert('не вдалося видалити');
        return false;
    }
    return true;
  
}
export {addPriceDetail, getPriceDetails, upPriceDetail, deletePriceDetail, getPriceDetailsWithChilds};