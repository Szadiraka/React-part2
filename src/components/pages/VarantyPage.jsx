import React from 'react'
import bgImage from '../../images/bgImage.jpg';
import '../../styles/varanty.css';
const VarantyPage = () => {
  return (
    <div  className="varanty-main">      
    <img src={bgImage} alt="backgroundImage" className='background-image'/>
    <div className='varanty-content-overlay'>
        <div className='varanty-content'>
              <h2 className='varanty-h'>"Гарантійні  умови для техніки"</h2>  
              <p className='varanty-p'>Умови та положення гарантії</p>
              <p className='varanty-p'>
              <b>Гарантійне обслуговування</b> - безоплатне для споживача усунення заводських недоліків, що проявилися протягом 
                   гарантійного терміну, за умови відсутності порушень умов експлуатації, транспортування і зберігання техніки.
              </p>
              <p className='varanty-p'>
              <b> Безкоштовне сервісне обслуговування</b> - додаткове зобов'язання виробника щодо усунення заводських недоліків 
                   техніки, яка включає проведення безкоштовного ремонту з безкоштовною заміною необхідних запасних частин.
              </p>
              <p className='varanty-p'>
              <b> Періоди гарантійного та безкоштовного сервісного обслуговування:</b>
              </p>

              <table class="varanty-table">
                  <thead class="varanty-theader">
                    <tr>
                      <th>Категорія техніки*</th>
                      <th>Гарантійний період**</th>
                      <th>Безкоштовнe сервісне обслуговування**</th>
                    </tr>
                  </thead>
                  <tbody class="varanty-tbody">
                    <tr>
                      <td>Системні блоки</td>
                      <td>12 місяців</td>
                      <td>2 роки</td>
                    </tr>
                    <tr>
                      <td>Копіювальна техніка</td>
                      <td>12 місяців</td>
                      <td>2 роки</td>
                    </tr>
                    <tr>
                      <td>Монітори</td>
                      <td>12 місяців</td>
                      <td>2 роки</td>
                    </tr>
                    <tr>
                      <td>Мобільні телефони</td>
                      <td>12 місяців</td>
                      <td>2 роки</td>
                    </tr>
                    <tr>
                      <td>Комп'ютерні миши</td>
                      <td>12 місяців</td>
                      <td>2 роки</td>
                    </tr>
                  </tbody>
                  <tfoot class="varanty-tfoot">
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>      
                  </tfoot>            
              </table>
              <p className='varanty-p'>
                     <i>* У разі виявлення протягом встановленого гарантійного строку недоліків споживач, в порядку та у строки,
                      що встановлені законодавством, має право вимагати: доставку великогабаритних товарів і товарів вагою понад 
                      п'ять кілограмів продавцю, виробнику (підприємству, що задовольняє вимоги споживача) та їх повернення 
                      споживачеві здійснюються за рахунок продавця або виробника.</i>
              </p>
              <p className='varanty-p'>
              <i>** З дати покупки техніки, терміни гарантії і безкоштовного сервісного обслуговування не підсумовуються.</i>
              </p>  
            
        </div>
         
    </div>
  </div>
  )
};

export default VarantyPage;
