import React, { useState } from 'react';
import bgImage from '../images/bgImage.jpg';
import User from '../elements/User';
import Role from '../elements/Role';
import Message from '../elements/Message';
import Commentary from '../elements/Commentary';
import Manufacture from '../elements/Manufacture';
import Category from '../elements/Category';
import Model from '../elements/Model';
import ProductRepair from '../elements/ProductRepair';
import Brand from '../elements/Brand';
import TypeRepair from '../elements/TypeRepair';
import PriceDetail from '../elements/PriceDetail';
import Order from '../elements/Order';
import '../styles/homepageformanager.css';


const HomePageForManager = () => {
 const[headerStates,setHeaderStates] = useState({
  isShowUsers:false,
  isShowRoles:false,
  isShowMessages:false,
  isShowComments:false,
  isShowManufactures:false,
  isShowCategories:false,
  isShowModels:false,
  isShowProductRepairs:false,
  isShowBrands:false,
  isShowtypeRepairs:false,
  isShowPriceDetails:false,
  isShowOrder:false,
 });


const Click=(headerKey)=>{
  const newHeaderStates = Object.fromEntries(
    Object.keys(headerStates).map((key) => [key,key === headerKey && !headerStates[key]]));
  setHeaderStates(newHeaderStates);
 
};
   

    return (
        <div  className="manager-main">      
          <img src={bgImage} alt="backgroundImage" className='background-image'/>
          <div className='manager-content-overlay'>
            <div className="manager-left_panel">
                <div className="manager-header-l " onClick={()=>Click('isShowUsers')}>Користувачі</div> 
                <div className="manager-header-l " onClick={()=>Click('isShowRoles')}>Ролі</div> 
                <div className="manager-header-l " onClick={()=>Click('isShowMessages')}>Повідомлення</div> 
                <div className="manager-header-l " onClick={()=>Click('isShowComments')}>Коментарії</div> 
                <div className="manager-header-l " onClick={()=>Click('isShowManufactures')}>Виробники</div> 
                <div className="manager-header-l " onClick={()=>Click('isShowCategories')}>Категорія</div>   
                <div className="manager-header-l " onClick={()=>Click('isShowModels')}>Моделі товарів</div>    
                <div className="manager-header-l " onClick={()=>Click('isShowBrands')}>Бренди товарів</div> 
                <div className="manager-header-l " onClick={()=>Click('isShowProductRepairs')}>Категоії ремонтів</div> 
                <div className="manager-header-l " onClick={()=>Click('isShowtypeRepairs')}>Типи ремонтів</div>
                <div className="manager-header-l " onClick={()=>Click('isShowPriceDetails')}>Аксесуари</div> 
                <div className="manager-header-l " onClick={()=>Click('isShowOrder')}>Ордери</div>       
                            
            </div>
    
            <div className='manager-right_panel'>
                {headerStates['isShowUsers'] && <User />}
                {headerStates['isShowRoles']  && <Role/>}
                {headerStates['isShowMessages'] && <Message/>}
                {headerStates['isShowComments'] && <Commentary />}
                {headerStates['isShowManufactures'] && <Manufacture />}
                {headerStates['isShowCategories'] && <Category />}
                {headerStates['isShowModels'] && <Model />}
                {headerStates['isShowBrands'] && <Brand />}
                {headerStates['isShowProductRepairs'] && <ProductRepair />}
                {headerStates['isShowtypeRepairs'] && <TypeRepair />}
                {headerStates['isShowPriceDetails'] && <PriceDetail />}
                {headerStates['isShowOrder'] && <Order />}      
             
            </div> 
          </div>
        </div>
      )
    };
    
    export default HomePageForManager;
    
    
