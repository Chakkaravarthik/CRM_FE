import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../home_page/sidebar.css'; // Import the CSS file for styling

const Sidebar = ({ handleLogout }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // To track current path for sidebar active state

  useEffect(() => {
    // Automatically check and redirect to login if not authenticated
    if (!Boolean(localStorage.getItem('IsAuthenticated'))) {
      navigate('/login');
    }
  }, [navigate]);

  const handleMouseEnter = () => setIsExpanded(true);
  const handleMouseLeave = () => setIsExpanded(false);

  const handleNavigation = (path) => (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    navigate(path);
  };

  return (
    <>
      <div
        className={`sidebar ${isExpanded ? 'expanded' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO9xMAd-PgVcWAQTQLxBcSUexZYm_q5-foLUpUuVjEWcWDzdKf3RJisrhiZ6il0kZz1ps&usqp=CAU"
          alt="Logo"
          className="logo"
          style={{ width: '50px', height: '50px' }}
        />

        {/* Navigation links */}
        <a
          onClick={handleNavigation('/clientdash')}
          className={`d-flex align-items-center ${location.pathname === '/customerlist' ? 'active' : ''}`}
        >
          <span className="icon">
            <i className="bi bi-house"></i>
          </span>
          <span className="text">Customer Detail</span>
        </a>

        <a
          onClick={handleNavigation('/customerlist')}
          className={`d-flex align-items-center ${location.pathname === '/customerlist' ? 'active' : ''}`}
        >
          <span className="icon">
            <i className="bi bi-house"></i>
          </span>
          <span className="text">Customer List</span>
        </a>

        <a
          onClick={handleNavigation('/purchaselist')}
          className={`d-flex align-items-center ${location.pathname === '/purchaselist' ? 'active' : ''}`}
        >
          <span className="icon">
            <i className="bi bi-info-circle"></i>
          </span>
          <span className="text">Purchase</span>
        </a>

        <a
          onClick={handleNavigation('/purchasefeedback')}
          className={`d-flex align-items-center ${location.pathname === '/purchasefeedback' ? 'active' : ''}`}
        >
          <span className="icon">
            <i className="bi bi-envelope-paper-fill"></i>
          </span>
          <span className="text">Feedback</span>
        </a>

        <a
          onClick={handleNavigation('/emailsender')}
          className={`d-flex align-items-center ${location.pathname === '/emailsender' ? 'active' : ''}`}
        >
          <span className="icon">
            <i className="bi bi-envelope"></i>
          </span>
          <span className="text">Offer Zone</span>
        </a>

        {/* Logout button */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO9xMAd-PgVcWAQTQLxBcSUexZYm_q5-foLUpUuVjEWcWDzdKf3RJisrhiZ6il0kZz1ps&usqp=CAU"
          alt="Logout"
          onClick={handleLogout}
          className="logo"
          style={{ width: '40px', height: '40px', cursor: 'pointer' }}
        />
      </div>
    </>
  );
};

export default Sidebar;
