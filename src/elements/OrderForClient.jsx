import React,{useRef, useState,useEffect,useContext} from 'react';
import {getOrdersWithChild,addOrder,addPriceDetailToOrder,addTypeRepairToOrder,removePriceDetailFromOrder,removeTypeRepairFromOrder} from '../apiCalls/apiOrder';
import {UserContext} from '../components/context/UserContext';
// import{getUsersByRole} from '../apiCalls/apiUser';
import{getPriceDetails} from '../apiCalls/apiPriceDetails';
import {getTypeRepairs} from '../apiCalls/apiTypeRepair';
import '../styles/order.css';


const Order = () => {
const {user} = useContext(UserContext);
//  const[users,setUsers] = useState([]);
 const[priceDetails,setPriceDetails] = useState([]);
 const[typeRepairs,setTypeRepairs] = useState([]);
 const[orders,setOrders] = useState([]);


 const newPricedetailRef = useRef(); 
 const newTypeRepairRef = useRef();
//  const newUserRef= useRef();
 

  useEffect(() => {          
    // getUsersByRole('client')
    // .then((data) => setUsers(data));
    getOrdersWithChild()
    .then((data) => setOrders(data));
    getPriceDetails()
    .then((data) => setPriceDetails(data));
    getTypeRepairs()
    .then((data) => setTypeRepairs(data));
  },[]);
   
  console.log(orders);
   
//   const deleteItem=(id)=>{
  
//      deleteOrder(id).
//      then((data)=>{
//       if(data) 
//        setOrders(orders.filter(el=>el.id!==id));
//       else{
//         alert('помилка видалення');
//       }
//     });
//   }



  const createItem = async () => {
    
    let priceDetail_id= Number(newPricedetailRef.current.value);   
    let typeRepair_id = Number(newTypeRepairRef.current.value); 
    if (priceDetail_id===0 && typeRepair_id===0){
      alert('деталі та/або тип ремонту');
      return;
    } 
   
      let newOrder = await addOrder({id:0,user_id: user.id});

        if(newOrder){
            newOrder['price_details']=[];
            newOrder['type_repairs']=[];
           
            if(typeRepair_id!==0){             
                       
              const typeRepairData= await addTypeRepairToOrder(newOrder.id,typeRepair_id) 
                if(typeRepairData){
                  newOrder['type_repairs']=[...newOrder['type_repairs'],typeRepairData['type_repair']];
                }
                else{
                  alert('деталі не додано');
                }
              }    

           if(priceDetail_id!==0){             
                       
            const priceDetailData= await addPriceDetailToOrder(newOrder.id,priceDetail_id) 
              if(priceDetailData){
                newOrder['price_details']=[...newOrder['price_details'],priceDetailData['price_detail']];
              }
              else{
                alert('деталі не додано');
              }
            }
           
          setOrders([...orders,newOrder]);
        //   newUserRef.current.value='0';
          newPricedetailRef.current.value='0';
          newTypeRepairRef.current.value='';
        }
        else{
          alert('ордер не додано');
        }

   }

//    const addTypeRepair= async(order)=>{
//     let typerepair_id = Number(document.getElementById('typerepair-'+order.id).value);    

//     if(typerepair_id===0){  
//       alert('ви не  обрали тип ремонту');
//       return;
//     } 
//     if (order['type_repairs'].find(x=>x.id===typerepair_id)){
//       alert('тип ремонту вже додано до ордера');
//       return;
//     }          
                       
//       const typeRepairData= await addTypeRepairToOrder(order.id,typerepair_id);
//         if(typeRepairData){
//           order['type_repairs']=[...order['type_repairs'],typeRepairData['type_repair']];
//           setOrders([...orders.filter(x=>x.id!==order.id),order]);
//         }
//         else{
//           alert('деталі не додано');
//         }
      
 
//    }

//    const addPriceDetail=async(order)=>{
//     let pricedetail_id = Number(document.getElementById('pricedetail-'+order.id).value);
//     if(pricedetail_id===0){
//       alert('ви не обрали деталь');
//       return;
//     }
//     if (order['price_details'].find(x=>x.id===pricedetail_id)){
//       alert('деталь вже додана до ордера');
//       return;
//     }

//     const priceDetailData = await addPriceDetailToOrder(order.id,pricedetail_id);
//     if(priceDetailData){
//       order['price_details']=[...order['price_details'],priceDetailData['price_detail']];
//       setOrders([...orders.filter(x=>x.id!==order.id),order]);
//     }
//     else{
//       alert('деталі не додано');
//     }

//    }

//  const deletePriceDetail=(order_id,pricedetail_id)=>{
    
//       removePriceDetailFromOrder(Number(order_id),Number(pricedetail_id)).
//       then((data)=>{
//         if(data){
//            let updateOrder= orders.find(x=>x.id===order_id);
//            updateOrder.price_details=updateOrder.price_details.filter(x=>x.id!==pricedetail_id);
//            setOrders([...orders.filter(x=>x.id!==order_id),updateOrder]);
//         }
//       })
//   }


//   const deleteTypeRepair=(order_id,typerepair_id)=>{
//       removeTypeRepairFromOrder(order_id,typerepair_id)
//       .then((data)=>{
//         if(data){
//            let updateOrder= orders.find(x=>x.id===order_id);
//            updateOrder.type_repairs=updateOrder.type_repairs.filter(x=>x.id!==typerepair_id);
//            setOrders([...orders.filter(x=>x.id!==order_id),updateOrder]);
//         }
//       })
//   }

  const calculateTotalPriceDetails = (priceDetails) => {
    return priceDetails.reduce((total, detail) => total + Number(detail.price), 0).toFixed(2);
  };
  
  const calculateTotalTypeRepairs = (typeRepairs) => {
    return typeRepairs.reduce((total, typeRepair) => total + Number(typeRepair.price), 0).toFixed(2);
  };

  const calculateTotalCost = (order) => {
    return (parseFloat(calculateTotalPriceDetails(order.price_details)) + parseFloat(calculateTotalTypeRepairs(order.type_repairs))).toFixed(2);
  }


  return (
    <div className='order-content'>
      <div className='order-div maxwidth'>
              <h3 className='order-h'>Панель користувача ({user.name}/ {user.email})</h3>  
                       
              <p className='order-p'>
              <b> Перелік ордерів:</b>
              </p>
              {orders.length>0 && orders.map((order)=>(
                <div className='order-div '>
                <p className='order-p'><pre>{`  ID: ${order.id}      Кієнт: ${user.name}      Email: ${user.email}`}</pre></p>
                <table key={order.id} class="order-table">
                    <thead class="order-theader">
                      <tr>
                        <th colspan="2">Аксесуар</th>
                        <th colspan="2">Тип ремонту</th>                        
                        <th>
                          {/* <button className='order-button rc' onClick={()=>deleteItem(order.id)}>Видалити ордер</button> */}
                        </th>
                      </tr>
                    </thead>
                    <tbody class="order-tbody">
                      {order.type_repairs.length>0 && order.type_repairs.map((type_repair)=>(
                        <tr>
                        <td></td>
                        <td></td>
                          <td>{type_repair.name}</td>
                          <td>{type_repair.price} грн</td>
                          <td>
                              {/* <button className='order-button gc' onClick={()=>deleteTypeRepair(order.id,type_repair.id)}>Видалити тип ремонту</button>                               */}
                          </td>                                                         
                        </tr>
                      ))}
                   
                      {order.price_details.length>0 && order.price_details.map((price_detail)=>(
                        <tr>
                         
                          <td>{price_detail.name}</td>
                          <td>{price_detail.price} грн</td>
                          <td></td>  
                          <td></td>                        
                          <td>
                              {/* <button className='order-button gc' onClick={()=>deletePriceDetail(order.id,price_detail.id)}>Видалити аксесуар</button> */}
                          </td> 
                        </tr>
                      ))}
                      <tr>
                        <td><b>Загальна вартість:</b></td>
                        <td>{calculateTotalPriceDetails(order.price_details)} грн</td>
                        <td></td>
                        <td>{calculateTotalTypeRepairs(order.type_repairs)} грн</td>
                        <td><b>{calculateTotalCost(order)} грн</b></td>
                      </tr>                  
                    </tbody>
                
              </table>
              </div>
              ))}
       </div>
              <div className='order-div'>
                <p className='order-p'>Додати новий ордер:</p>
                <table key="0" class="order-table">
                  <thead class="order-theader">
                      <tr>
                        {/* <th>Клиєнт</th> */}
                        <th>Аксесуар</th>
                        <th>Тип ремонту</th>
                        <th>Додати</th>
                      </tr>
                  </thead>
                  <tbody class="order-tbody">
                    <tr>
                    
                      {/* <td>
                            <select ref={newUserRef} className='order-input '>                           
                                  <option key='0' value={0}>виберіть клієнта</option>
                                     {users.length>0 && users.map((model)=>(
                                  <option key={model.id} value={model.id}>{model.name}</option>
                                  ))}
                            </select>      
                      </td> */}
                      <td>
                           <select ref={newPricedetailRef} className='order-input'>
                              <option key='0' value={0}>виберіть аксесуар</option>
                                {priceDetails.length>0 && priceDetails.map((model)=>(
                              <option key={model.id} value={model.id}>{model.name}</option>
                              ))}
                           </select>    
                      </td>
                      <td>
                           <select ref={newTypeRepairRef} className='order-input'>
                             <option key='0' value={0}>виберіть тип ремонту</option>
                               {typeRepairs.length>0 && typeRepairs.map((model)=>(
                              <option key={model.id} value={model.id}>{model.name}</option>
                              ))}
                           </select>     
                      </td>
                      <td>
                        <button className='order-button bc' onClick={createItem}>Додати ордер</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
             </div>            
          
     </div>       
        
  )
};

export default Order;
