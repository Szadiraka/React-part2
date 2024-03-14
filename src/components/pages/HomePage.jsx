import React,{useContext} from 'react';
import HomePageForGuest from '../../elements/HomePageForGuest';
import HomePageForAdmin from '../../elements/HomepageForAdmin';
import HomePageForManager from '../../elements/HomePageForManager';
import bgImage from '../../images/123.jpg';
import '../../styles/home.css';
import {UserContext} from '../context/UserContext';
const Homepage = () => {
  const {user} = useContext(UserContext);
  return (
    <div  className="home-main">      
    <img src={bgImage} alt="backgroundImage" className='home-background-image'/>
    <div className='home-content-overlay'>
        {(user.roleName === 'guest' || user.roleName === 'client') && <HomePageForGuest/> }         
        {user.roleName==='admin' && <HomePageForAdmin/> }  
        {user.roleName==='manager' && <HomePageForManager/> }           
            
    </div>
  </div>
  )
};

export default Homepage;
