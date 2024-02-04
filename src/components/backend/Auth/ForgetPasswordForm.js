import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from './AuthUser';

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const {http , setToken} = AuthUser();
  const handleSubmit = async () => {
    const data = { email };
    setButtonDisabled(true);
    try {

      const response = await http.post('/forget-password', {data});
      const rspones = response.data;
      if (rspones) {
        setButtonDisabled(false);
        const responseData = rspones;
        Swal.fire({
          title: responseData.msg,
          icon: 'success',
          timer: 3000,
          showConfirmButton: true,
        }).then(() => {
        });
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (

    <div >
      <section className="section">
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
              <div className="card card-primary">
                <div className="card-header">
                  <h4>Forget Password Form</h4>
                </div>
                <div className="card-body">
                
                  <>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    
                    <div className="form-group">
                      <button type="button" onClick={handleSubmit}  disabled={isButtonDisabled} className="btn btn-primary btn-lg btn-block" tabIndex="4">
                       {isButtonDisabled ? 'Loading...' : 'Reset Password'}
                      </button>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgetPasswordForm;
