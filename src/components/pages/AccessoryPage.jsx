import {useState,useEffect, useRef} from 'react';
import {getProductRepairs} from '../../apiCalls/apiProductRepair';
import {getProductBrends} from '../../apiCalls/apiProductBrend';
import {getModels} from '../../apiCalls/apiModel';
import {getPriceDetails} from '../../apiCalls/apiPriceDetails';
import {getCategories} from '../../apiCalls/apiCategory';
import {getManufactures} from '../../apiCalls/apiManufacture';
import bgImage from '../../images/bgImage.jpg';
import '../../styles/acsessory.css';
const AccessoryPage = () => {

  const[productRepairs, setProductRepairs] = useState([]);
  const[productBrends, setProductBrends] = useState([]);
  const[models, setModels] = useState([]);
  const[priceDetails, setPriceDetails] = useState([]);
  const[categories, setCategories] = useState([]);
  const[manufacturers, setManufacturers] = useState([]);
  const[prices, setPrices] = useState([]); 

  const [isInput1, setInput1] = useState(false); // поля для ввода названия товар
  const [isInput2, setInput2] = useState(false); // поля для ввода названия продукта
  const [isInput3, setInput3] = useState(false); // поля для ввода назви виробника
  const [isInput4, setInput4] = useState(false); // поле для ввода цены
  const [isInput5, setInput5] = useState(false); // поле для ввода  бренду
  const [isInput6, setInput6] = useState(false); // поле для ввода категории
  const [isInput7, setInput7] = useState(false); // поле для ввода модели
  const nameRef = useRef();
  const productRef = useRef();
  const manufactureRef = useRef();
  const priceRef = useRef();
  const brendRef = useRef();
  const categoryRef = useRef();
  const modelRef = useRef();


      useEffect(() => {
        getProductRepairs()
        .then(data => setProductRepairs(data));          
        getProductBrends()
        .then(data => setProductBrends(data));
        getCategories()
        .then(data => setCategories(data));
        getManufactures()
        .then(data => setManufacturers(data));
        getPriceDetails()
        .then(data => setPriceDetails(data));
        getModels()
        .then(data => setModels(data));
      },[]);

        function fullProductInformations(productRepair){
            // выделить в отдельный метод
            let products= productRepair.map(item=>{
              let modelModel= (models.find(model => model.id === item.model_id));
              let modelName= modelModel? modelModel.name : "";
              let productRepairName="";
              let productBrendName="";
              if(modelModel !== null){
                 let productRepairModel= productRepairs.find(productRepair => productRepair.id === modelModel.productRepair_id);
                 productRepairName= productRepairModel? productRepairModel.name : "";
                 let productBrendModel= productBrends.find(productBrend => productBrend.id === modelModel.productBrend_id);
                 productBrendName= productBrendModel? productBrendModel.name : "";
                }
               
              let categoryModel = categories.find(category => category.id === item.category_id);
              let categoryName= categoryModel? categoryModel.name : "";
              let modelManufacture = manufacturers.find(manufacture => manufacture.id === item.manufacture_id);
              let manufactureName= modelManufacture? modelManufacture.name : "";

              return {
                id: item.id,
                name: item.name,
                model_id: item.model_id,
                model: modelName,
                category_id: item.category_id,
                category: categoryName,
                manufacture_id: item.manufacture_id,
                manufacture: manufactureName,
                price: item.price,
                productRepair_id: modelModel.productRepair_id,
                product: productRepairName,
                productBrend_id: modelModel.productBrend_id,
                brend: productBrendName
              }

            }); 
           
            // отфильтруем данные
            if(isInput1){ products=products.filter(item=>item.name.toLowerCase().includes(nameRef.current.value.toLowerCase())); }
            if(isInput2){ products=products.filter(item=>item.productRepair_id === Number(productRef.current.value)); }
            if(isInput3){ products=products.filter(item=>item.manufacture_id === Number(manufactureRef.current.value)); }
            if(isInput4){ products=products.filter(item=>item.price <= Number(priceRef.current.value)); }
            if(isInput5){ products=products.filter(item=>item.productBrend_id === Number(brendRef.current.value)); }
            if(isInput6){ products=products.filter(item=>item.category_id === Number(categoryRef.current.value)); }
            if(isInput7){ products=products.filter(item=>item.model_id === Number(modelRef.current.value)); }
            console.log(products);
             setPrices(products);
       }

       

     const handleCheckboxChange1=()=>{setInput1(!isInput1);};
     const handleCheckboxChange2=()=>{setInput2(!isInput2);};
     const handleCheckboxChange3=()=>{setInput3(!isInput3);};
     const handleCheckboxChange4=()=>{setInput4(!isInput4);};
     const handleCheckboxChange5=()=>{setInput5(!isInput5);};
     const handleCheckboxChange6=()=>{setInput6(!isInput6);};
     const handleCheckboxChange7=()=>{setInput7(!isInput7);};
  return (
    <div  className="service-main">      
      <img src={bgImage} alt="backgroundImage" className='background-image'/>
      <div className='service-content-overlay'>
        <div className="left_panel">
           
            <div className="typerepair-header-l " ><i>Фільр пошуку: </i></div>            
         
              
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
                 <button className="button" onClick={()=>fullProductInformations(priceDetails)}>Пошук</button>
                 </div>
                 
              </div>
              
            
        </div>

        <div className='right_panel'>
        <div className='typerepair-header-r'>
          <p className="typerepair-content cn">Назва</p>
          <p className="typerepair-content cn">Продукт</p>
          <p className="typerepair-content cn">Модель</p>
          <p className="typerepair-content cn">Категорія</p>
          <p className="typerepair-content cn">Ціна</p>
          <p className="typerepair-content cn">Бренд</p>
          <p className="typerepair-content cn">Виробник</p>
        </div>
              {(priceDetails.length===0 && <p className="typerepair-content">Данні відсутні</p>)}
              {(priceDetails.length>0 && prices.length===0 && <p className="typerepair-content">За вашим запитом нічого не знайдено</p>)}
              {priceDetails.length>0 && prices.length>0  && prices.map((priceDetail)=>(                 
                            
                        <div key={priceDetail.id} id={`content ${priceDetail.id}`} className="typerepair-body" > 
                        
                          <p className="typerepair-content">{priceDetail.name}</p>
                          <p className="typerepair-content cn">{priceDetail.product}</p>
                          <p className="typerepair-content cn"> {priceDetail.model}</p>
                          <p className="typerepair-content cn"> {priceDetail.category}</p>
                          <p className="typerepair-content cn"> {priceDetail.price}</p>
                          <p className="typerepair-content cn"> {priceDetail.brend}</p>
                          <p className="typerepair-content cn"> {priceDetail.manufacture}</p>

                        </div> 
                      
                    ))
                    
              } 
        </div> 
      </div>
    </div>
  )
};

export default AccessoryPage;

