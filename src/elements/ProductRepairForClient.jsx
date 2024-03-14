import React,{useRef, useState,useEffect} from 'react';
import {getProductRepairs} from '../apiCalls/apiProductRepair';

const ProductRepair = () => {
 const[productRepairs,setProductRepairs] = useState([]);
  useEffect(() => {          
      getProductRepairs()
      .then((data) => setProductRepairs(data));
      
  },[]);


  return (
    <div className='order-content'>
              <h3 className='order-h'></h3>  
                       
              <p className='order-p'>
              <b> Перелік ремонтуємих пристроїв:</b>
              </p>

              <table class="order-table">
                    <thead class="order-theader">
                        <tr>                         
                          <th>Назва</th>                                                                   
                        </tr>
                    </thead>
                      <tbody className="order-tbody">
                            {productRepairs.length>0 && productRepairs.map((productRepair)=>(
                                <tr key={productRepair.id}>
                                <td>
                                    <input id={`name-${productRepair.id}`}  type='text' className='admin-input' defaultValue={productRepair.name} readOnly/>
                                </td>                         
                                
                                </tr>
                            ))}
             
                     </tbody>
                    <tfoot class="order-tfoot">
                    <tr>
                        <td></td>                
                    </tr>      
                    </tfoot>            
              </table>
          
            
        </div>
  )
};

export default ProductRepair;
