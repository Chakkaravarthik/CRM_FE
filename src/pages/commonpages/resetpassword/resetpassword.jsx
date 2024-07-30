import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../resetpassword/resetpassword.css'; // Link to custom CSS
import { resetpassword, verifypassword } from '../../../apis/auth';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const Navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const data = await verifypassword({ token });
          if (data.code === 1) {
            setIsValidToken(true);
          } else {
            setMessage('Invalid or expired token.');
          }
        } catch (error) {
          setMessage('An error occurred while verifying the token.');
        }
      } else {
        setMessage('Invalid request: Missing token.');
      }
    };
    verifyToken();
  }, [token]);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password) {
      try {
        const data = await resetpassword({ token, password });
        if (data.code == 1) {
          setMessage('Password changed successfully.');
          Navigate('/login')
        } else {
          setMessage('Failed to change password.');
        }
      } catch (error) {
        setMessage('An error occurred while changing the password.');
      }
    } else {
      setMessage('Please enter a new password.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center" style={{ backgroundColor: 'orange', color: 'white' }}>
              Reset Password
            </div>
            <div className="card-body">
              {isValidToken ? (
                <>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'orange', borderColor: 'orange' }}>Submit</button>
                  </form>
                </>
              ) : (
                <p>{message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
