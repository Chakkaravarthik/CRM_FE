import React, { useState } from 'react';
import '../forgetpassword/forgetpassword.css'
import { forgetpassword } from '../../../apis/auth';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
  const [email, setEmail] = useState({email:''});
  const [message, setMessage] = useState('');
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await forgetpassword(email);
    if (res.code==1) {
      setMessage('Password reset email sent successfully.');
      setTimeout(()=>{
        Navigate('/login')
      },2000)
    } else {
      setMessage('Please enter a valid email address.');
    }
  };


  const handlechange = (e)=>{
    const {name, value} = e.target;
    setEmail({
        ...email,
        [name]: value,
    })
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center" style={{ backgroundColor: 'orange', color: 'white' }}>
              Forgot Password
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    name = 'email'
                    className="form-control"
                    id="email"
                    value={email.email}
                    onChange={handlechange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: 'orange', borderColor: 'orange' }}>
                  Submit
                </button>
              </form>
              {message && <div className="mt-3 alert alert-info">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
