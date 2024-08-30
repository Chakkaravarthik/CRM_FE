import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/commonpages/login';
import RegisterForm from './pages/commonpages/register';
import Sidebar from './pages/home_page/sidebar';
import ForgotPassword from './pages/commonpages/forgetpassword/forgetpassword';
import ResetPassword from './pages/commonpages/resetpassword/resetpassword';
import CustomerForm from './pages/modules/customer/customercreation';
import { Purchaseform, PurchaseList } from './pages/modules/sales/purchase';
import Feedback from './pages/modules/sales/purchasefeedback';
import Customerlist from './pages/modules/customer/customerlist';
import CustomerDashboard from './pages/dashboard/customerdashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("IsAuthenticated")));

  // Update authentication status if it changes in localStorage
  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(Boolean(localStorage.getItem("IsAuthenticated")));
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <BrowserRouter>
      {isAuthenticated && <Sidebar />}  
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* Protected routes */}
        {isAuthenticated ? (
          <>
            <Route path="/customerform" element={<CustomerForm />} />
            <Route path="/purchaseform" element={<Purchaseform />} />
            <Route path="/purchaselist" element={<PurchaseList />} />
            <Route path="/purchasefeedback" element={<Feedback />} />
            <Route path="/customerlist" element={<Customerlist />} />
            <Route path="/" element={<CustomerDashboard/>} /> 
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />  
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
