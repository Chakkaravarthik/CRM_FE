import React from 'react'
import { useState ,} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { userlogin } from '../../apis/auth.js';


const LoginForm = () => {

 

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
    const Navigate = useNavigate();
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await userlogin(formData);
        if(data.code===1){
            Navigate('/home')
        }
      
      };


  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card" style={{ width: '24rem', borderColor: 'orange', borderWidth: '2px' }}>
        <div className="card-body">
          <div className="text-center mb-4">
            {/* Image area */}
            <div style={{ width: '100px', height: '100px', backgroundColor: 'white', margin: '0 auto' }}>
              {<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO9xMAd-PgVcWAQTQLxBcSUexZYm_q5-foLUpUuVjEWcWDzdKf3RJisrhiZ6il0kZz1ps&usqp=CAU" alt="Image Description" style={{ width: '100px', height: '100px' }} />
            }
            </div>
          </div>
          <form onChange={handleChange}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input name='email'type="email" className="form-control" id="email" placeholder="Enter email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input name='password'type="password" className="form-control" id="password" placeholder="Password" />
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary w-100 mb-3" style={{ backgroundColor: 'orange', borderColor: 'orange' }}>
              Login
            </button>
            <button type="button" className="btn btn-link w-100" style={{  backgroundColor: 'grey' }}>
              <Link  to='/register'>Register</Link> <Link  to='/forgetpassword'>Forget Password</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
