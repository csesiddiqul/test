import {Routes,Route} from 'react-router-dom'
import Master from './backend/Master';
import LoginComponent from './backend/Auth/LoginComponent';
import ResetPasswordComponent from './backend/Auth/ResetPasswordComponent';
import RegisterComponent from './backend/Auth/RegisterComponent';
import ForgetPasswordForm from './backend/Auth/ForgetPasswordForm';



function Guest() {
  return (
    <>
        <Routes>
        <Route path='/' element={ <LoginComponent/>} />
        <Route path='/login' element={ <LoginComponent/>} />
        <Route path='/forgetPasswordForm' element={ <ForgetPasswordForm/>} />
        <Route path='/reset-password' element={ <ResetPasswordComponent/>} />
        
        
        <Route path='/register' element={ <RegisterComponent/>} />
        </Routes>
    </>
  );
}

export default Guest;
