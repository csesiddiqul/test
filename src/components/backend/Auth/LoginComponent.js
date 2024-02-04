// LoginComponent.js
import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';
import Swal from 'sweetalert2';
const LoginComponent = () => {
  const navigate = useNavigate();
  const {http , setToken} = AuthUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorAut, setError] = useState('');
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await http.post('/login', { email, password });
      // console.log(response);

      setToken(response.data.user, response.data.access_token, response.data);
      Swal.fire({
        title: 'Login Successfully',
        icon: 'success',
        timer: 2500, 
        showConfirmButton: true, 
      }).then(() => {
        navigate('/dashboard');
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid credentials. Please check your email and password.');
        } else {
          console.error('API Error:', error);
        }
      } else {
        console.error('An error occurred:', error.message);
      }
    }
  };
  
  return (
    <div className="custom-dblock">
      <div >
        <section className="section">
          <div className="container mt-5">
            <div className="row">
              <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-2 col-xl-5 offset-xl-4">
                
                <div className="card card-primary">
                  <div className="card-header">
                    <h4>Login</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          type="email"
                          className="form-control"
                          name="email"
                          tabIndex="1"
                          required
                          autoFocus
                        />
                        <div className="invalid-feedback">
                          Please fill in your email
                        </div>
                        <div className="text-danger mt-2">{errorAut}</div>
                      </div>
                      <div className="form-group">
                        <div className="d-block">
                          <label htmlFor="password" className="control-label">Password</label>
                          <div className="float-right">
                            <Link to="/forgetPasswordForm" className="text-small">
                              Forgot Password?
                            </Link>
                          </div>
                        </div>
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          id="password"
                          type="password"
                          className="form-control"
                          name="password"
                          tabIndex="2"
                          required
                        />
                        <div className="invalid-feedback">
                          Please fill in your password
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="remember"
                            className="custom-control-input"
                            tabIndex="3"
                            id="remember-me"
                          />
                          <label className="custom-control-label" htmlFor="remember-me">Remember Me</label>
                        </div>
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg btn-block" tabIndex="4">
                          Login
                        </button>
                      </div>
                    </form>
                    <div className="text-center mt-4 mb-3">
                      <div className="mt-4 text-muted text-center">
                        Don't have an account? <Link to="/register">Create One</Link>
                      </div>
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginComponent;
