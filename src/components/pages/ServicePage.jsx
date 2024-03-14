import {useState,useEffect} from 'react';
import {getProductRepairs} from '../../apiCalls/apiProductRepair';
import {getTypeRepairs} from '../../apiCalls/apiTypeRepair';
import {getProductBrends} from '../../apiCalls/apiProductBrend';
import bgImage from '../../images/bgImage.jpg';
import '../../styles/service.css';
const ServicePage = () => {
  const [productRepairId, setProductRepairId] = useState(0);
  const[productRepairs, setProductRepairs] = useState([]);
  const[typeRepairs, setTypeRepairs] = useState([]);
  const[isShowBrends, setShowBrends] = useState(false);
  const[isShowProductRepairs, setShowProductRepairs] = useState(true);
  const[productBrends, setProductBrends] = useState([]);
       
    useEffect(() => {
      getTypeRepairs()
      .then(data => setTypeRepairs(data));
      getProductRepairs()
      .then(data => setProductRepairs(data));
     
      getProductBrends()
      .then(data => setProductBrends(data));
},[]);

  const showContent=(productRepairId)=>{
    setProductRepairId(productRepairId);     
    }

    const showBrends = () => {
      if(isShowBrends){
        setShowBrends(false);
      }else{
        setShowBrends(true);
      };
    };
      const showProductRepairs = () => {
        if(isShowProductRepairs){
          setShowProductRepairs(false);
          setProductRepairId(0);
        }else{
          setShowProductRepairs(true);
        };
  };
  return (
    <div  className="service-main">      
      <img src={bgImage} alt="backgroundImage" className='background-image'/>
      <div className='service-content-overlay'>
        <div className="left_panel">
            <div className="typerepair-header-l cl" onClick={()=>showBrends()}><i>Список брендів </i></div>
            {isShowBrends && productBrends.length>0 && productBrends.map((productBrend)=>(
              <div className="productrepair">{productBrend.name}</div>
            ))}
            <div className="typerepair-header-l cl" onClick={()=>showProductRepairs()} ><i>Список категорій ремонтів </i></div>
            <ul>
              {isShowProductRepairs && productRepairs.length>0 && productRepairs.map((productRepair)=>( 
                <li key={productRepair.id} className="productrepair" onClick={()=>showContent(productRepair.id)}>
                  {productRepair.name}
                </li>
              ))}            
            </ul>
        </div>
        <div className='right_panel'>
        <div className='typerepair-header-r'>
          <p className="typerepair-content cn">Тип ремонту</p>
          <p className="typerepair-content cn">Ціна</p>
          <p className="typerepair-content cn">Час ремонту</p>
        </div>
              {typeRepairs.length>0 && typeRepairs.filter(typeRepair=>typeRepair.productRepair_id===productRepairId)
              .map((typeRepair)=>(                 
                <div key={typeRepair.id} id={`content ${typeRepair.id}`} className="typerepair-body" > 
                  <p className="typerepair-content">{typeRepair.name}</p>
                  <p className="typerepair-content cn">{typeRepair.price}</p>
                  <p className="typerepair-content cn"> {typeRepair.repairTime}</p>
                </div>
              
            ))}
                    
        </div>
      </div>
    </div>
  )
};

export default ServicePage;
