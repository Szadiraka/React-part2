import React,{useContext} from 'react';
import {UserContext} from '../components/context/UserContext';
import logo from '../images/logo.svg';
const NavbarHeader = ({showDialog, showRegistration, showCall,  showAuthorization}) => {
  const{user} = useContext(UserContext);

  return (
    <>
         <div className="navbar-header">
               <div className ="header-logo">
                    <img className="img" src={logo} alt="logo"></img>
                </div>
            <div className="navbar-header-block">
              
                <div className="header-block">
                    <p className="header-p ">Телефон гарячої лінії</p>
                    <p className="header-p bg_txt"><b>0 800 303 000</b></p>
                    <p className="header-p">Пн.-Нд. с 9:00 до 18:00</p>
                </div>
                <div className="header-block">
                    <p className="header-p"><b>Адреса сервісу:</b></p>
                    <p className="header-p">Україна, м.Київ, 03062:</p>
                    <p className="header-p">пр-т Перемоги 67,</p>
                    <p className="header-p">корпус D,</p>
                    <p className="header-p">Сервісний цент "Гарант"</p>
                </div>
                <div className="header-block">
                    <p className="header-p "><b>Графік роботи:</b></p>
                    <p className="header-p">Пн.-Нд. с 9:00 до 18:00</p>
                    <p className="header-p">Сб.Вихідний</p>
                    <p className="header-p">Нд.Вихідний</p>
                </div>

                {user.roleName==="guest" && <button className="button" onClick={showDialog}>Задати питання</button>}
                {user.roleName==="guest" && <button className="button" onClick={showCall}>Предзвонити</button>}
                {user.roleName==="guest" && <button className="button" onClick={showRegistration}>Реєстрація</button>}
                <button className="button" onClick={showAuthorization}>Авторизація</button>
            </div>      

        </div>
    </>
  )
};

export default NavbarHeader;
