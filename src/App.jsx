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
import EmailSender from './pages/offsers/emailsending';
import Feedbacklist from './pages/modules/feedback/feedbacklist';
import Dashboard from './pages/dashboard/generaldashboard';
import {jwtDecode} from "jwt-decode"; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("IsAuthenticated")));
  const [IsAdmin, setIsAdmin]= useState(false);

  // Update authentication status if it changes in localStorage
  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(Boolean(localStorage.getItem("IsAuthenticated")));
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  useEffect(() => {
    const usertoken = localStorage.getItem("UserToken");
    if (usertoken) {
      const userdetails = jwtDecode(usertoken);
      if (userdetails.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      {isAuthenticated && <Sidebar />}
      <Routes>
        
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/purchasefeedbackcustomer" element={<Feedback />} />
        
      
        {isAuthenticated ? (
          <>
          <Route path="/clientdash" element={<CustomerDashboard />} />
            {IsAdmin ? (
              <>
                <Route path="/customerform" element={<CustomerForm />} />
                <Route path="/purchaseform" element={<Purchaseform />} />
                <Route path="/purchaselist" element={<PurchaseList />} />
                <Route path="/purchasefeedback" element={<Feedbacklist />} />
                <Route path="/customerlist" element={<Customerlist />} />
                <Route path="/emailsender" element={<EmailSender />} />
                <Route path="/dash" element={<Dashboard />} />
                
                
              </>
            ) : (
              // Redirect non-admins to client dashboard
              <Route path="*" element={<Navigate to="/clientdash" />} />
            )}
          </>
        ) : (
          // Redirect unauthenticated users to login
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
