import React,{useState,useEffect,useContext, useRef} from 'react';
import { UserContext } from '../components/context/UserContext';
import{getPriceDetailsWithChilds} from '../apiCalls/apiPriceDetails';
import { getProductRepairs } from '../apiCalls/apiProductRepair';
import { getProductBrends } from '../apiCalls/apiProductBrend';
import { getCategories } from '../apiCalls/apiCategory';
import {getManufactures} from '../apiCalls/apiManufacture';
import '../styles/order.css';


const PriceDetailForClient = () => {
 const {user} = useContext(UserContext);
 const[priceDetails,setPriceDetails] = useState([]);
 const[filPriceDetails,setFilPriceDetails] = useState([]);
 const[productRepairs,setProductRepairs] = useState([]);
 const[productBrends,setProductBrends] = useState([]);
 const[categories,setCategories] = useState([]);
 const[manufacturers,setManufacturers] = useState([]);

 const nameRef = useRef();
 const productRepairRef = useRef();
 const categoryRef = useRef();
 const priceRef = useRef();
 const productBrendRef = useRef();
 const manufactureRef = useRef();


  useEffect(() => {        
    getPriceDetailsWithChilds()
    .then((data) => setPriceDetails(data));
    getProductRepairs()
    .then((data) => setProductRepairs(data));
    getProductBrends()
    .then((data) => setProductBrends(data));
    getCategories()
    .then((data) => setCategories(data));
    getManufactures()
    .then((data) => setManufacturers(data));
  },[]);  
  
  const WithFilter = () => {
    if(nameRef.current.value==="" && productRepairRef.current.value==="0" && priceRef.current.value==="0"
    && categoryRef.current.value==="0" && productBrendRef.current.value==="0" && manufactureRef.current.value==="0"){
      
    
      alert('trhhh');  
      return;
    }
     let filtredPriceDetails=priceDetails;

        if(nameRef.current.value!="")
          filtredPriceDetails=filtredPriceDetails.filter(x=>x.name.includes(nameRef.current.value));

        if(productRepairRef.current.value!="0")
         filtredPriceDetails= filtredPriceDetails.filter(x=>x.model.productRepair_id===Number(productRepairRef.current.value));

        if(categoryRef.current.value!="0")
         filtredPriceDetails= filtredPriceDetails.filter(x=>x.category.id===Number(categoryRef.current.value));
        
        if(priceRef.current.value!="0")
        filtredPriceDetails=filtredPriceDetails.filter(x=>x.price<=Number(priceRef.current.value));
        
        if(productBrendRef.current.value!="0")
        filtredPriceDetails=filtredPriceDetails.filter(x=>x.model.productBrend_id===Number(productBrendRef.current.value));

         if(manufactureRef.current.value!="0")
         filtredPriceDetails=filtredPriceDetails.filter(x=>x.manufacture.id===Number(manufactureRef.current.value));

         setFilPriceDetails([]);
         setFilPriceDetails(filtredPriceDetails);
     
  }

  const WithOutFilter = () => {
    setFilPriceDetails([]);
    setFilPriceDetails(priceDetails);
    nameRef.current.value="";
    productRepairRef.current.value="0";
    categoryRef.current.value="0";
    priceRef.current.value="0";
    productBrendRef.current.value="0";
    manufactureRef.current.value="0";

  }
  return (
    <div className='order-content'>
      <div className='order-div maxwidth'>
              <h3 className='order-h'>Панель користувача ({user.name}/ {user.email})</h3>  

              <p className='order-p'>
              <b> Фільтр пошуку:</b>
              </p>
              <table key='0' className="order-table">
                    <thead className="order-theader">
                      <tr>
                        <th>По назві деталі</th>
                        <th>По типу пристрою</th>
                        <th>По категоріі</th>
                        <th>За Ціною</th>  
                        <th>По бренду</th>
                        <th>По виробнику</th>
                        <th colSpan={2}>Застосувати фільтр пошуку</th> 
                          
                      </tr>
                    </thead>                   
                    <tbody  className="order-tbody"> 
                      <tr>
                        <td>
                          <input ref={nameRef} type="text" className="order-input" placeholder='введіть назву деталі' defaultValue=''/>
                        </td>
                        <td>
                          <select ref={productRepairRef} className='order-input'>
                            <option  value="0">виберіть тип </option>
                            {productRepairs.length>0 && productRepairs.map((productRepair)=>(
                              <option value={productRepair.id}>{productRepair.name}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select ref={categoryRef} className='order-input'>
                            <option  value="0">виберіть категорію </option>
                            {categories.length>0 && categories.map((category)=>(
                              <option value={category.id}>{category.name}</option>
                            ))}
                          </select>
                        </td>

                        <td>
                          <input ref={priceRef} type="number" className="order-input"  defaultValue={0} min={0} max={10000} step={100}/>
                        </td>
                        <td>
                          <select ref={productBrendRef} className='order-input'>
                            <option  value="0">виберіть бренд </option>
                            {productBrends.length>0 && productBrends.map((productBrend)=>(
                              <option value={productBrend.id}>{productBrend.name}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select ref={manufactureRef} className='order-input'>
                            <option  value="0">виберіть виробника </option>
                            {manufacturers.length>0 && manufacturers.map((manufacture)=>(
                              <option value={manufacture.id}>{manufacture.name}</option>
                            ))}
                          </select>
                        </td>

                         <td>
                          <button className="order-button gc" onClick={()=>WithFilter()}>Застосувати фільтр</button>
                         </td>  
                         <td>
                          <button className="order-button bc" onClick={()=>WithOutFilter()}>Без фільтру</button>
                         </td>                                                                    
                      </tr>                                        
                      
                    </tbody>
                   
              </table>

                       
              <p className='order-p'>
              <b> Перелік аксесуарів:</b>
              </p>                           
                <table key='1' className="order-table">
                    <thead className="order-theader">
                      <tr>
                        <th>Назва</th>
                        <th>Тип пристрою</th>  
                        <th>Модель</th>                      
                        <th>Категорія</th>
                        <th>Ціна</th>
                        <th>Бренд</th>
                        <th>Виробник</th>
                      </tr>
                    </thead>
                    <tbody className="order-tbody">     
                    {filPriceDetails.length>0 && filPriceDetails.map((priceDetail)=>(
                              
                        <tr key={priceDetail.id}>
                            <td>{priceDetail.name}</td>
                            <td>{productRepairs.find((x)=>x.id===priceDetail.model.productRepair_id)?.name}</td>
                            <td>{priceDetail.model.name}</td>
                            <td>{priceDetail.category.name} </td>
                            <td>{priceDetail.price} грн</td>    
                            <td>{productBrends.find((x)=>x.id===priceDetail.model.productBrend_id)?.name}</td>    
                            <td>{priceDetail.manufacture.name}</td>                                                 
                        </tr>                                       
                    ))}
                    </tbody>
              </table>
              </div>
             
       </div>
                 
        
  )
};

export default PriceDetailForClient;
