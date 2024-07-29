import react from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginForm from './pages/commonpages/login';
import RegisterForm from './pages/commonpages/register';
import Sidebar from './pages/home_page/sidebar';

const APP = ()=>{
  return(
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/home' element={<Sidebar/>}/>
        </Routes>
    </BrowserRouter>
    
  )
}

export default APP;

<h1>App page</h1>