import react from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginForm from './pages/commonpages/login';
import RegisterForm from './pages/commonpages/register';
import Sidebar from './pages/home_page/sidebar';
import ForgotPassword from './pages/commonpages/forgetpassword/forgetpassword';
import ResetPassword from './pages/commonpages/resetpassword/resetpassword';
import CustomerForm from './pages/modules/customer/customercreation';

const APP = ()=>{
  return(
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/home' element={<Sidebar/>}/>
          <Route path='/forgetpassword' element={<ForgotPassword/>}/>
          <Route path='/resetpassword' element={<ResetPassword/>}/>
          <Route path='/customerform' element={<CustomerForm/>}/>
        </Routes>
    </BrowserRouter>
    
  )
}

export default APP;

<h1>App page</h1>