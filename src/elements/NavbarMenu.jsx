import React,{ useContext } from 'react';
import { UserContext } from '../components/context/UserContext'; 
import { NavLink } from 'react-router-dom';
const NavbarMenu = () => {
  const { user } = useContext(UserContext);
  return (
    <>
         <div className="navbar-menu">
          <div className="navbar-menu-block">
                
                    <NavLink id="nav1" className="nav"  to="/">
                         <button className="button">Головна</button>
                    </NavLink>               
                
                    <NavLink id="nav2" className="nav" to="/company">
                        <button className="button">Про Компанію </button>
                    </NavLink>               
                
                    <NavLink id="nav3" className="nav" to="/varanty">
                         <button className="button">Гарантійні умови</button>
                    </NavLink>                
                
                    {user.roleName === "guest" &&<NavLink id="nav4" className="nav" to="/service">
                        <button className="button">Послуги </button>
                    </NavLink>}             
                    {<NavLink id="nav5" className="nav" to="/accessory">
                        <button className="button">Комплектуючі</button>
                    </NavLink>}
                    {user.roleName === "guest" &&<NavLink id="nav6" className="nav" to="/comment">
                         <button className="button">Відгуки </button>
                    </NavLink>}              
               
                    <NavLink id="nav7" className="nav" to="/contact">
                        <button class="button">Контакти</button>
                    </NavLink>
                    {user.roleName === "client" && <NavLink id="nav8" className="nav" to="/cabinet">
                        <button class="button">Особистий кабінет</button> 
                    </NavLink>}
                    
          </div>
           
        </div>
    </>
  )
};

export default NavbarMenu;
