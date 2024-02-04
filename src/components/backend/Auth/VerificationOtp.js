import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from './AuthUser';


const VerificationOtp = () => {
    const {http , setToken , user} = AuthUser();
    const [emailCheck,SetEmailCheck] = useState();
    const [errors, SetErrors] = useState();

    const fetchData = async () => {

      // console.log(emailCheck);

      if (emailCheck === null) {
         setButtonDisabled(true); 
          try {
            const response = await http.get(`/send-email/${user.email}`);
            if (response.data.status === 'success') {
              Swal.fire({
                title: 'Please check your Eail we have sent an OTP',
                icon: 'success',
                timer: 4000,
                showConfirmButton: true,
              }).then(() => {
              });
            }
            if (response.data.status === 'error') {
              Swal.fire({
                title: 'Wrong OTP',
                icon: 'error',
                timer: 900,
                showConfirmButton: true,
              }).then(() => {
                // navigate('/role-list');
              });
            }
          } catch (error) {
            if (error.response) {
              const errorData = error.response.data.errors;
              // setFormErrors(errorData);
            } else {
              console.error('An error occurred:', error.message);
            }
          }
          finally {
            // Enable the button after the operation completes
            setButtonDisabled(false);
          }
        }
      };

      const fetchUser = async () => {

        if(user != null){
          try {
            const response = await http.get(`/get-user-email/${user.email}`)
            if (response.data.status === 'success') {
              SetEmailCheck(response.data.user.email_verified_at)
            }
            if (response.data.status === 'error') {
             
            }
          } catch (error) {
            if (error.response) {
             
            } else {
              console.error('An error occurred:', error.message);
            }
          }
    
        }
    
      };
    
      useEffect(() => {
        fetchUser();
        fetchData();
      }, []);
    
      const handleResendOTP = async () => {
        // Call the fetchData function to resend OTP
        await fetchData();
    
        // console.log('Resend OTP clicked');
      };

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isButtonDisabled2, setButtonDisabled2] = useState(false);
 
  const handleSubmit = async () => {


     setButtonDisabled2(true); 
     try {
        const formData = {
            email: user.email,
            otp :otp
        };
        const response = await   http.post('/otp_verify', formData);

            if (response.data.status === 'success') {
                console.log(response.data);
              Swal.fire({
                title: 'Login Success',
                icon: 'success',
                timer: 4000,
                showConfirmButton: true,
              }).then(() => {
                window.location.reload();
              });
            }
        

            if (response.data.status === 'error') {
              Swal.fire({
                title: 'Something With Wrong',
                icon: 'error',
                timer: 900,
                showConfirmButton: true,
              }).then(() => {
                // navigate('/role-list');
              });
            }
   
     } catch (error) {
      //  console.error('Errorsss:', error);

      console.log(error.response.data.message);

      SetErrors(error.response.data.message);
     
     } finally {

   
       setButtonDisabled2(false);
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
                  <h4>OTP Verification</h4>
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
                        value={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">OTP</label>
                      <input
                        type="text"
                        id="opt"
                        className="form-control"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                      <div className='text-danger mt-2'>{errors}</div>
                    </div>

                    
                    <div className="form-group">
                      <button type="button" onClick={handleSubmit}  disabled={isButtonDisabled} className="btn btn-primary btn-lg btn-block" tabIndex="4">
                       {isButtonDisabled2 ? 'Loading...' : 'Submit'}
                      </button>
                    </div>

                    <div className="form-group">
                        <button
                        type="button"
                        onClick={handleResendOTP}
                        className="btn btn-secondary btn-lg btn-block"
                        tabIndex="5" // Increment the tabIndex to make it focusable after the submit button
                        >
                        {isButtonDisabled ? 'Loading...' : 'Resend OTP'}
                      
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

export default VerificationOtp;
