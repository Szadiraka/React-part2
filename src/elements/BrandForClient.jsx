import React,{useRef, useState,useEffect} from 'react';
import {getProductBrends} from '../apiCalls/apiProductBrend';

const Brand = () => {
 const[brends,setBrends] = useState([]);
  useEffect(() => {          
      getProductBrends()
      .then((data) => setBrends(data));
      
  },[]);


  return (
    <div className='order-content'>
              <h3 className='order-h'></h3>  
                       
              <p className='order-p'>
              <b> Перелік брендів:</b>
              </p>

              <table class="order-table">
                    <thead class="order-theader">
                        <tr>                         
                          <th>Назва</th>                                                                   
                        </tr>
                    </thead>
                      <tbody className="order-tbody">
                            {brends.length>0 && brends.map((brend)=>(
                                <tr key={brend.id}>
                                <td>
                                    <input id={`name-${brend.id}`}  type='text' className='admin-input' defaultValue={brend.name} readOnly/>
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

export default Brand;
