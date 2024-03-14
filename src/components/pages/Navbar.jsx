import React from 'react'
import '../../styles/navbar.css'

import NavbarHeader from '../../elements/NavbarHeader';
import NavbarMenu from '../../elements/NavbarMenu';
import AddMessage from '../../elements/AddMessage';
import Authorization from '../../elements/Authorization';
import Registration from '../../elements/Registration';
import AddCall from '../../elements/AddCall';

import { useState } from 'react';
const Navbar = () => {
      const [isDialogOpen, setDialogOpen] = useState(false);
      const [isCallOpen, setCallOpen] = useState(false);
      const [isAuthorizationOpen, setAuthorizationOpen] = useState(false);
      const [isRegistrationOpen, setRegistrationOpen] = useState(false);
      const showDialog = () => { setDialogOpen(!isDialogOpen);};
      const showCall = () => { setCallOpen(!isCallOpen);};
      const showAuthorization = () => {setAuthorizationOpen(!isAuthorizationOpen);};
      const showRegistration = () => {setRegistrationOpen(!isRegistrationOpen);}
     
  return (
    <div className="navbar">

         {isDialogOpen && <AddMessage showDialog={showDialog} />}   
         {isCallOpen && <AddCall showCall={showCall} />} 
         {isAuthorizationOpen && <Authorization showAuthorization={showAuthorization} />}  
         {isRegistrationOpen && <Registration showRegistration={showRegistration} />}   
         <NavbarHeader showAuthorization={showAuthorization} showDialog={showDialog} showCall={showCall} showRegistration={showRegistration}
                        />
         <NavbarMenu/>   
           
    </div>
  )
};

export default Navbar;
