import {useState,useRef} from 'react';
import PriceDetailForClient from '../../elements/PriceDetailForClient';
import ProductRepair from '../../elements/ProductRepairForClient';
import TypeRepair from '../../elements/TypeRepairForClient';
import Comment from '../../elements/ComentaryForClient';
import Message from '../../elements/MessageForClient';
import Brand from '../../elements/BrandForClient';
import Order from '../../elements/OrderForClient';
import bgImage from '../../images/bgImage.jpg';
const CabinetPage = () => {
  const[headerStates,setHeaderStates] = useState({
    isShowMessages:false,
    isShowComments:false,
    isShowBrands:false,
    isShowTypeRepairs:false,
    isShowPriceDetails:false,
    isShowOrders:false,
    isShowProductRepairs:false
   });


  const[productRepairs, setProductRepairs] = useState([]);
  
  const[productBrends, setProductBrends] = useState([]);
 
  const nameRef = useRef();
  const productRef = useRef();
  const manufactureRef = useRef();
  const priceRef = useRef();
  const brendRef = useRef();
  const categoryRef = useRef();
  const modelRef = useRef();



    const Click=(headerKey)=>{
      const newHeaderStates = Object.fromEntries(
        Object.keys(headerStates).map((key) => [key,key === headerKey && !headerStates[key]]));
      setHeaderStates(newHeaderStates);
     
    };

return (
  <div  className="manager-main">      
     <img src={bgImage} alt="backgroundImage" className='background-image'/>
  
      <div className='manager-content-overlay'>
        <div className='manager-left_panel'>
          <div className="manager-header-l" onClick={()=>Click('isShowBrands')}>Список брендів </div> 
          <div className="manager-header-l" onClick={()=>Click('isShowProductRepairs')}>Список ремонтуємих пристроїв </div>       
          <div className="manager-header-l" onClick={()=>Click('isShowTypeRepairs')} >Список категорій ремонтів </div>
          <div className="manager-header-l" onClick={()=>Click('isShowPriceDetails')} >Список комплектуючих</div>
         
          {/* {false &&
              <div>

                    <div className="filter">                    
                        <input type='checkbox' onChange={handleCheckboxChange1} />
                        <label className="label">По назві</label>
                        <br></br>
                        <input ref={nameRef} className="input-text" type="text"  disabled={!isInput1} placeholder='Введіть назву'></input>               
                    </div>


                    <div className="filter">                    
                        <input  type='checkbox' onChange={handleCheckboxChange2}/>
                        <label className="label">По продукту</label>
                        <br></br>
                        <select ref={productRef} className='select' disabled={!isInput2}>
                          {productRepairs.length>0 && productRepairs.map((productRepair)=>(
                            <option value={productRepair.id} >{productRepair.name}</option>
                          ))}
                        </select>               
                    </div>

                    <div className="filter" >                    
                        <input  type='checkbox' onChange={handleCheckboxChange3}/>
                        <label className="label">По виробнику</label>
                        <br></br>
                        <select ref={manufactureRef} className='select' disabled={!isInput3} >
                        {manufacturers.length>0 && manufacturers.map((manufacture)=>(
                          <option value={manufacture.id} >{manufacture.name}</option>
                          ))}
                        </select>               
                    </div>


                    <div className="filter">                    
                        <input type='checkbox' onChange={handleCheckboxChange4}/>
                        <label className="label">По ціні</label>
                        <br></br>
                        <input ref={priceRef} className="input-text" type="number"  disabled={!isInput4} placeholder='Введіть ціну' min={0} ></input>               
                    </div>


                    <div className="filter">                    
                        <input  type='checkbox' onChange={handleCheckboxChange5}/>
                        <label className="label">По бренду</label>
                        <br></br>
                        <select ref={brendRef} className='select' disabled ={!isInput5}>
                          {productBrends.length>0 && productBrends.map((productBrend)=>(
                            <option value={productBrend.id} >{productBrend.name}</option>
                            ))}
                        </select>               
                      </div>


                      <div className="filter">                    
                        <input  type='checkbox' onChange={handleCheckboxChange6}/>
                        <label className="label">По категорії</label>
                        <br></br>
                        <select ref={categoryRef} className='select' disabled ={!isInput6} >
                            {categories.length>0 && categories.map((category)=>(
                              <option value={category.id} >{category.name}</option>
                            ))}
                        </select>               
                      </div>
                      <div className="filter">                    
                        <input  type='checkbox' onChange={handleCheckboxChange7}/>
                        <label className="label">По моделі</label>
                        <br></br>
                        <select ref={modelRef} className='select' disabled ={!isInput7} >
                          {models.length>0 && models.map((model)=>(
                                <option value={model.id} >{model.name}</option>
                              ))}
                        </select>               
                      </div>
                      
                    <div className=" cnt">
                    <button className="button" onClick={()=>fullProductInformations(priceDetails,true)}>Пошук</button>
                    </div>
                 
              </div>
          } */}
        
          <div className='manager-header-l' onClick={()=>Click('isShowComments')}>Відгуки</div>                  
          <div className='manager-header-l' onClick={()=>Click('isShowMessages')}>Повідомлення</div>                
          <div className='manager-header-l' onClick={()=>Click('isShowOrders')}>Замовлення</div>        
        </div> 
     

          <div className='manager-right_panel'>
              {headerStates['isShowBrands'] && <Brand/> } 
              {headerStates['isShowProductRepairs'] && <ProductRepair/> }             
              {headerStates['isShowTypeRepairs']  && <TypeRepair/>}               
              {headerStates['isShowComments'] &&  <Comment/> }
              {headerStates['isShowMessages'] && <Message/>}
              {headerStates['isShowOrders'] && <Order/>}
              {headerStates['isShowPriceDetails'] && <PriceDetailForClient/>}             
          </div>
      </div>

  </div>

)
};


export default CabinetPage;
