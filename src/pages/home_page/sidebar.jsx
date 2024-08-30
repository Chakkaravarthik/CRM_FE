import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../home_page/sidebar.css'; // Import the CSS file for styling
import Customerlist from '../modules/customer/customerlist';
import { PurchaseList } from '../modules/sales/purchase';
import Feedbacklist from '../modules/feedback/feedbacklist';
import EmailSender from '../offsers/emailsending';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // To track current path for sidebar active state

  useEffect(() => {
    const handleScroll = (event) => {
      if (event.currentTarget.scrollTop > 0) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    const sidebar = document.querySelector('.sidebar');
    sidebar.addEventListener('scroll', handleScroll);

    // Ensure the check runs every time the authentication status changes
    if (!Boolean(localStorage.getItem("IsAuthenticated"))) {
      navigate('/login');
    }

    return () => {
      sidebar.removeEventListener('scroll', handleScroll);
    };
  }, [navigate]);

  const handleMouseEnter = () => setIsExpanded(true);
  const handleMouseLeave = () => setIsExpanded(false);

  const handleNavigation = (path) => (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    navigate(path);
  };

  const renderActiveComponent = () => {
    switch (location.pathname) {
      case '/customerlist':
        return <Customerlist />;
      case '/purchaselist':
        return <PurchaseList />;
      case '/feedback':
        return <Feedbacklist />;
      case '/offerzone':
        return <EmailSender />;
      default:
        return null;
    }
  };

  const logout = ()=>{
    localStorage.removeItem("IsAuthenticated")
  }

  return (
    <>
      <div
        className={`sidebar ${isExpanded ? 'expanded' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo at the top of the sidebar */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO9xMAd-PgVcWAQTQLxBcSUexZYm_q5-foLUpUuVjEWcWDzdKf3RJisrhiZ6il0kZz1ps&usqp=CAU"
          alt="Logo"
          className="logo"
          style={{ width: '50px', height: '50px' }}
        />

        {/* Navigation links */}
        <a href="/customerlist"  className="d-flex align-items-center">
          <span className="icon">
            <i className="bi bi-house"></i>
          </span>
          <span className="text">Customer</span>
        </a>
        <a href="/purchaselist" onClick={handleNavigation('/purchaselist')} className="d-flex align-items-center">
          <span className="icon">
            <i className="bi bi-info-circle"></i>
          </span>
          <span className="text">Purchase</span>
        </a>
        <a href="/feedback" onClick={handleNavigation('/feedback')} className="d-flex align-items-center">
          <span className="icon">
            <i className="bi bi-envelope-paper-fill" style={{ width: '5px', height: '5px' }}></i>
          </span>
          <span className="text">Feedback</span>
        </a>
        <a href="/offerzone" onClick={handleNavigation('/offerzone')} className="d-flex align-items-center">
          <span className="icon">
            <i className="bi bi-envelope"></i>
          </span>
          <span className="text">Offer Zone</span>
        </a>
        <a href="/" className="d-flex align-items-center">
          <span className="icon">
            <i className="bi bi-person-circle"></i>
          </span>
          <span className="text">Admin</span>
        </a>

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO9xMAd-PgVcWAQTQLxBcSUexZYm_q5-foLUpUuVjEWcWDzdKf3RJisrhiZ6il0kZz1ps&usqp=CAU"
          alt="Logout"
          onClick={logout}
          className="logo"
          style={{ width: '30px', height: '30px' }}
        />
      </div>
      
    </>
  );
};

export default Sidebar;
