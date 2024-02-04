import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';
import Swal from 'sweetalert2';

const RegisterComponent = () => {

  const navigate = useNavigate();
  const {http } = AuthUser();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const handleInputChange = (e) => {
    // console.log(formData);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await http.post('/register', { formData });
      if (response.data.errors) {
      
      } else {
        Swal.fire({
          title: 'Registration Successfully Please Login ',
          icon: 'success',
          timer: 2500, 
          showConfirmButton: true, 
        }).then(() => {
          navigate('/login');
        });
      }
    } catch (error) {
      // console.error('Error:', error.response); // Log the response error
      const apiErrors = error.response.data.errors;
      console.log(error.response.data);
      setFormErrors({
        name: apiErrors['formData.name'] ? apiErrors['formData.name'][0] : '',
        email: apiErrors['formData.email'] ? apiErrors['formData.email'][0] : '',
        password: apiErrors['formData.password'] ? apiErrors['formData.password'][0] : '',
        confirmPassword: apiErrors['formData.confirmPassword'] ? apiErrors['formData.confirmPassword'][0] : '',
      });
    }
  };

 
  return (
    <div className="custom-dblock">
      <div id="app">
        <section className="section">
          <div className="container mt-5">
            <div className="row">
              <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
                <div className="card card-primary">
                  <div className="card-header">
                    <h4>Register</h4>
                  </div>
                  <div className="card-body">
                  <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                        
                        <div className="text-danger mt-2">{formErrors.name}</div>
                      </div>

                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        <div className="text-danger mt-2">{formErrors.email}</div>
                      </div>

                      <div className='row'>
                      <div className="form-group col-md-6">
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          className="form-control"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                        <div className="text-danger mt-2">{formErrors.password}</div>
                      </div>

                      <div className="form-group col-md-6">
                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          className="form-control"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                        <div className="text-danger mt-2">{formErrors.confirmPassword}</div>
                      </div>
                      </div>

                  
                      <div className="text-left">
                      <button type="submit" className="btn btn-primary btn-lg btn-block" tabIndex="4">
                          {loading ? 'Submitting...' : 'Submit'}
                        </button>
                       
                      </div>
                    </form>
                  </div>
                  <div className="mb-4 text-muted text-center">
                    Already Registered? <Link to="/login">Login</Link>
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

export default RegisterComponent;
