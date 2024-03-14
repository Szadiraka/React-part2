import React from 'react'
import bgImage from '../../images/bgImage.jpg';
import loc from '../../images/location.png';
import phone from '../../images/phone.png';
import mess from '../../images/envelope.png';
import clock from '../../images/clock.png';

import '../../styles/contact.css';
const ContactsPage = () => {
  return (
    <div  className="contact-main">      
    <img src={bgImage} alt="backgroundImage" className='background-image'/>
    <div className='contact-content-overlay'>
        <div className='contact-content'>
              <h2 className='contact-h'><i><b>Наші контакти</b></i></h2>  
              <div className='contact-div'>
                  <div className='div-container'>
                      <div className='circle'>
                        <img className='contact-img' src={loc} alt='contactimage'></img>
                      </div>
                      <div class="contact-cnt">
                          <p className='contact-p'>Адреса</p>
                            <p className='contact-p small'>Україна, Київ, 03062,</p>
                            <p className='contact-p small'>пр-т перемоги 67,</p>
                            <p className='contact-p small'>корпус D,</p>
                      </div>
                  </div>
                  <div className='div-container'>
                      <div className='circle'>
                        <img className='contact-img' src={phone} alt='phoneimage'></img>
                      </div>
                      <div class="contact-cnt">
                          <p className='contact-p'>Телефон</p>
                            <p className='contact-p small'>0 800 303 000</p>
                            <p className='contact-p small'>067 539 00 00</p>
                            
                      </div>                   
                  </div>
                  <div className='div-container'>
                      <div className='circle'>
                        <img className='contact-img' src={mess} alt='emailimage'></img>
                      </div>
                      <div class="contact-cnt">
                          <p className='contact-p'>E-mail</p>
                            <p className='contact-p small'>info@garant.kiev.ua</p>                        
                      </div>                   
                  </div>

                  <div className='div-container'>
                      <div className='circle'>
                        <img className='contact-img' src={clock} alt='clockimage'></img>
                      </div>
                      <div class="contact-cnt">
                          <p className='contact-p'>Графік роботи</p>
                            <p className='contact-p small'>Пн.-Пт.: с 9:00 до 18:00</p>  
                            <p className='contact-p small'>Сб.: вихідний</p>
                            <p className='contact-p small'>Нд.: вихідний</p>                    
                      </div>                   
                  </div>

              </div>
             
           
        </div>
         
    </div>
    </div>
  )
};

export default ContactsPage;
