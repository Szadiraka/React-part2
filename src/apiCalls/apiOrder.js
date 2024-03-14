const getOrders = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/order`);
    if(!response.ok)
        return [];
    const data = await response.json();
    return data;
};

const getOrdersbyUserIdAll = async ($id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/orderuser/${$id}`);
    if(!response.ok){       
        alert("данні відсутні");
        return false;
    }     
       
    const data = await response.json();
    return data;
}

const getOrdersWithChild= async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/orderwithchilds`);
    if(!response.ok){
        alert("данні не отримано");
        return [];
    }
        
    const data = await response.json();
    return data;
}

const addOrder = async (order) => {
    try{
            const response = await fetch(`http://127.0.0.1:8000/api/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                body: JSON.stringify(order)
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

const deleteOrder= async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/order/${id}`, {
        method: 'DELETE'
    })
    if(!response.ok){
        console.log(response);
        return false;
    }
    else{
        console.log(response);
        return true;
    }
   
}

const removePriceDetailFromOrder= async (order_id,pricedetail_id) => {
    const response= await fetch(`http://127.0.0.1:8000/api/order/${order_id}/remove_pricedetail/${pricedetail_id}`, {        
    
    method: 'DELETE'
    })
    if(!response.ok){
        return false;
    }
    return true;
}
const removeTypeRepairFromOrder= async (order_id,typerepair_id) => {
    const response= await fetch(`http://127.0.0.1:8000/api/order/${order_id}/remove_typerepair/${typerepair_id}`, {        
    
    method: 'DELETE'
    })
    if(!response.ok){
        return false;
    }
    return true;
}
const addPriceDetailToOrder= async (order_id, pricedetail_id) => {
    try{ 
        const response= await fetch(`http://127.0.0.1:8000/api/order/add_pricedetail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ order_id:order_id, price_detail_id:pricedetail_id})
        })
        const data = await response.json();
        if(response.ok){
            console.log('Success:', data);

            return data;
        }
        else{
            console.error('Error:',data);
        
        }
    }catch(error){
        console.error('Fetch error:', error);
    
        }       
    
  
}

const addTypeRepairToOrder= async (order_id,typerepair_id) => {
    try{ 
        const response= await fetch(`http://127.0.0.1:8000/api/order/add_typerepair`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({order_id:order_id,type_repair_id:typerepair_id})
        })

        const data = await response.json();
        if(response.ok){
            console.log('Success:', data);
        
            return data;
        }
        else{
            console.error('Error:',data);
            
        }
    }catch(error){
        console.error('Fetch error:', error);
    
        }       

}



export {addOrder, getOrders,getOrdersbyUserIdAll,getOrdersWithChild,deleteOrder,removePriceDetailFromOrder,removeTypeRepairFromOrder,addPriceDetailToOrder,addTypeRepairToOrder};