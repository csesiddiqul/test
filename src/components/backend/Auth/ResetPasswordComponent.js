import React, { useEffect ,useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import AuthUser from './AuthUser';

const ResetPasswordComponent = () => {
  const navigate = useNavigate();
  const [user,setUsers] = useState('');
  const [loading, setLoading] = useState(false);
  const {http} = AuthUser();


  const [formData, setFormData] = useState({
    id:'',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [formErrors, setFormErrors] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const fetchData = async () => {
      if (token) {
        try {

          const response = await http.get(`/reset-password?token=${token}`);

          if (response) {
            
            // console.log(response.data);

            const responseData = await response.data;
            
            
            // console.log(responseData);

            setUsers(responseData.user);

            setFormData((prevData) => ({
              ...prevData,
              id: responseData.user.id,
              email: responseData.user.email,
            }));

          } else {
            console.error('Error:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      }
    };
    fetchData();
  }, []);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(formData)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      setButtonDisabled(true);

      const response = await http.post('/reset-password',  JSON.stringify(formData));

      if(response.data.success) {

        setButtonDisabled(false);

        Swal.fire({
          title: 'Password updated successfully plase Login',
          icon: 'success',
          timer: 3000,
          showConfirmButton: true,
        }).then(() => {
          navigate('/login');
        });
      }
    } 
    catch (error) {
      if (error.response) {

        // console.log(error.response.data.message);
        setButtonDisabled(false);
        const errorData = error.response.data.message;
        setFormErrors(errorData);
      } else {
        console.error('An error occurred:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
          <div className="card card-primary">
            <div className="card-header">
              <h4>Reset Password</h4>
            </div>
            <div className="card-body">
          
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    name="email"
                    tabIndex="1"
                    value={formData.email}
                    required
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control pwstrength"
                    data-indicator="pwindicator"
                    name="password"
                    onChange={handleInputChange}
                    tabIndex="2"
                    required
                  />
                  <div id="pwindicator" className="pwindicator">
                    <div className="bar"></div>
                    <div className="text-danger mt-2">{formErrors}</div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password-confirm">Confirm Password</label>
                  <input
                    id="password-confirm"
                    type="password"
                    className="form-control"
                    name="password_confirmation"
                    tabIndex="2"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <input
              id="id"
              name="id"
              type="hidden"
              className="form-control"
              tabIndex="1"
              value={formData.id}
              onChange={handleInputChange}
              required
              autoFocus
            />


                <div className="form-group">
                  <button type="submit" disabled={isButtonDisabled} className="btn btn-primary btn-lg btn-block" tabIndex="4">
                    {isButtonDisabled ? 'Loading...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default ResetPasswordComponent;
