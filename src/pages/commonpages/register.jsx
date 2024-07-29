import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usersignup } from '../../apis/auth.js';


const RegisterForm = () => {

const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
      });

    const [registerationsuccess , setregisterationsuccess] = useState(false)
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        const res = await usersignup(formData);
        if(res.code==1){
            setregisterationsuccess(true);
            setTimeout(() => {
                navigate('/login');
        },4000)
        };
      };




  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card" style={{ width: '24rem', borderColor: 'orange', borderWidth: '2px' }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4" style={{ color: 'orange' }}>Register</h5>
          { registerationsuccess ? (
            <div className="alert alert-success" role="alert">
              Registration successful!
            </div>
            ) :(
                <form onChange={handleChange}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input name='name'type="text" className="form-control" id="name" placeholder="Enter your name" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input name='email'type="email" className="form-control" id="email" placeholder="Enter your email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input name='password'type="password" className="form-control" id="password" placeholder="Create a password" />
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary w-100 mb-3" style={{ backgroundColor: 'orange', borderColor: 'orange' }}>
              Register
            </button>
            <button type="button" className="btn btn-link w-100" style={{ backgroundColor: 'grey', color: 'white' }}>
              <Link style={{color: 'white' }} to='/login'>Login</Link>
            </button>
          </form>
          )
        }
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
