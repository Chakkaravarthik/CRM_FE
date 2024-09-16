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
import { jwtDecode } from 'jwt-decode';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('IsAuthenticated')));
  const [isAdmin, setIsAdmin] = useState(false);

  // Update authentication status if it changes in localStorage
  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(Boolean(localStorage.getItem('IsAuthenticated')));
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Set admin status based on token
  useEffect(() => {
    const userToken = localStorage.getItem('UserToken');
    if (userToken) {
      const userDetails = jwtDecode(userToken);
      if (userDetails.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('IsAuthenticated');
    localStorage.removeItem('UserToken');
    setIsAuthenticated(false); // Clear authentication
    setIsAdmin(false); // Clear admin status
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes that don't require authentication */}
        <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/purchasefeedbackcustomer" element={<Feedback />} />

        {/* Authenticated routes */}
        {isAuthenticated ? (
          <Route
            path="*"
            element={
              <div style={{ display: 'flex' }}>
                <Sidebar handleLogout={handleLogout} />
                <div style={{ flex: 1 }}>
                  <Routes>
                    <Route path="clientdash" element={<CustomerDashboard />} />
                    {isAdmin ? (
                      <>
                        <Route path="customerform" element={<CustomerForm />} />
                        <Route path="purchaseform" element={<Purchaseform />} />
                        <Route path="purchaselist" element={<PurchaseList />} />
                        <Route path="purchasefeedback" element={<Feedbacklist />} />
                        <Route path="customerlist" element={<Customerlist />} />
                        <Route path="emailsender" element={<EmailSender />} />
                        <Route path="dash" element={<Dashboard />} />
                      </>
                    ) : (
                      <Route path="*" element={<Navigate to="/clientdash" />} />
                    )}
                  </Routes>
                </div>
              </div>
            }
          />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
