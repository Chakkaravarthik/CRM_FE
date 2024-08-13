import React, { useState, useEffect } from 'react';
import '../home_page/sidebar.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import Customerlist from '../modules/customer/customerlist';
import {PurchaseList} from '../modules/sales/purchase';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/login');
  };

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

    return () => {
      sidebar.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = () => setIsExpanded(true);
  const handleMouseLeave = () => setIsExpanded(false);

  const handleClickComponent = (component) => (e) => {
    e.preventDefault();
    setActiveComponent(component);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'customerList':
        return <Customerlist />;
      case 'purchase':
        return <PurchaseList />;
      default:
        return null;
    }
  };

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
        <a
          href="/"
          onClick={handleClickComponent('customerList')}
          className="d-flex align-items-center"
        >
          <span className="icon">
            <i className="bi bi-house"></i>
          </span>
          <span className="text">Customer</span>
        </a>
        <a
          href="/"
          onClick={handleClickComponent('purchase')}
          className="d-flex align-items-center"
        >
          <span className="icon">
            <i className="bi bi-info-circle"></i>
          </span>
          <span className="text">Purchase</span>
        </a>
        <a href="/" className="d-flex align-items-center">
          <span className="icon">
            <i className="bi bi-envelope-paper-fill" style={{ width: '5px', height: '5px' }}></i>
          </span>
          <span className="text">Feedback</span>
        </a>
        <a href="/" className="d-flex align-items-center">
          <span className="icon">
            <i className="bi bi-envelope"></i>
          </span>
          <span className="text">Marketing</span>
        </a>
        <a href="/" className="d-flex align-items-center">
          <span className="icon">
            <i className="bi bi-person-circle"></i>
          </span>
          <span className="text">Admin</span>
        </a>

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO9xMAd-PgVcWAQTQLxBcSUexZYm_q5-foLUpUuVjEWcWDzdKf3RJisrhiZ6il0kZz1ps&usqp=CAU"
          alt="Logo"
          onClick={logout}
          className="logo"
          style={{ width: '30px', height: '30px' }}
        />
      </div>
      <div>
        {renderActiveComponent()}
      </div>
    </>
  );
};

export default Sidebar;
