import './styles/App.css';
import Navbar from './components/pages/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import CategoryPage from './components/pages/CategoryPage';
import ContactsPage from './components/pages/ContactsPage';
import CompanyPage from './components/pages/CompanyPage';
import VarantyPage from './components/pages/VarantyPage';
import CommentPage from './components/pages/CommentPage';
import ServicePage from './components/pages/ServicePage';
import AccessoryPage from './components/pages/AccessoryPage';
import CabinetPage from './components/pages/CabinetPage';
import {UserProvider} from './components/context/UserContext';
function App() { 

  return (
    <div className="App">
       <BrowserRouter>
          <UserProvider>
            <Navbar/>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/company' element={<CompanyPage/>}/>
              <Route path='/service' element={<ServicePage/>}/>
              <Route path='/accessory' element={<AccessoryPage/>}/>
              <Route path='/varanty' element={<VarantyPage/>}/>
              <Route path='/category' element={<CategoryPage/>}/>
              <Route path='/contact' element={<ContactsPage/>}/>
              <Route path='/comment' element={<CommentPage/>}/>
              <Route path='/cabinet' element={<CabinetPage/>}/>
            </Routes>
            </UserProvider>
       </BrowserRouter>
    </div>

        

  );

}

export default App;
