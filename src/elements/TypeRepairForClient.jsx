import React,{useState,useEffect,useContext, useRef} from 'react';
import { UserContext } from '../components/context/UserContext';
import { getTypeRepairsWithChild } from '../apiCalls/apiTypeRepair';
import { getProductRepairs } from '../apiCalls/apiProductRepair';
import '../styles/order.css';


const TypeRepair = () => {
 const {user} = useContext(UserContext);
 const[typeRepairs,setTypeRepairs] = useState([]);
 const[filTypeRepairs,setFilTypeRepairs] = useState([]);
 const[productRepairs,setProductRepairs] = useState([]);

  const nameRef = useRef();
  const productRepairRef = useRef();
  const priceRef = useRef();
  useEffect(() => {        
    getTypeRepairsWithChild()
    .then((data) => setTypeRepairs(data))
    getProductRepairs()
    .then((data)=>setProductRepairs(data))
  },[]);  
  
  const WithFilter = () => {
    if(nameRef.current.value==="" && productRepairRef.current.value==="0" && priceRef.current.value==="0"){ 
      alert('trhhh');  
      return;
    }
     let filtredTypeRepairs=typeRepairs;

     if(nameRef.current.value!="")
        filtredTypeRepairs=filtredTypeRepairs.filter(x=>x.name.includes(nameRef.current.value));

        if(productRepairRef.current.value!="0")
        filtredTypeRepairs=filtredTypeRepairs.filter(x=>x.product_repair.id===Number(productRepairRef.current.value));
        
        if(priceRef.current.value!="0")
        filtredTypeRepairs=filtredTypeRepairs.filter(x=>x.price<=Number(priceRef.current.value));
        setFilTypeRepairs([]);
        setFilTypeRepairs(filtredTypeRepairs);
     
  }

  const WithOutFilter = () => {
    setFilTypeRepairs([]);
    setFilTypeRepairs(typeRepairs);
    nameRef.current.value="";
    productRepairRef.current.value="0";
    priceRef.current.value="0";

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
                        <th>По назві</th>
                        <th>По типу пристрою</th>
                        <th>За Ціною</th>  
                        <th colSpan={2}>Застосувати фільтр пошуку</th> 
                          
                      </tr>
                    </thead>                   
                    <tbody  className="order-tbody"> 
                      <tr>
                        <td>
                          <input ref={nameRef} type="text" className="order-input" placeholder='введіть назву ремонту' defaultValue=''/>
                        </td>
                        <td>
                          <select ref={productRepairRef} className='order-input'>
                            <option  value="0">виберіть тип пристрою</option>
                            {productRepairs.length>0 && productRepairs.map((productRepair)=>(
                              <option value={productRepair.id}>{productRepair.name}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input ref={priceRef} type="number" className="order-input"  defaultValue={0} min={0} max={10000} step={100}/>
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
              <b> Перелік категорій ремонтів:</b>
              </p>
                           
                <table key='1' className="order-table">
                    <thead className="order-theader">
                      <tr>
                        <th>Тип Ремонту</th>
                        <th>Ремонтуємі пристрої</th>
                        <th>Ціна</th>  
                        <th>Час ремонту</th>   
                      </tr>
                    </thead>                   
                    <tbody  className="order-tbody"> 
                       {filTypeRepairs.length>0 && filTypeRepairs.map((typeRepair)=>(
                        <tr key={typeRepair.id}>
                            <td>{typeRepair.name}</td>
                            <td>{typeRepair.product_repair.name}</td>
                            <td>{typeRepair.price}</td>
                            <td>{typeRepair.repairTime}</td>                                                                       
                        </tr>                                        
                        ))}
                    </tbody>
                   
              </table>
              </div>
             
       </div>
                 
        
  )
};

export default TypeRepair;
