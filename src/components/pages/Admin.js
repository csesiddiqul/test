import {Routes,Route} from 'react-router-dom'
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from '../../test/Dashboard';
import ProjectPyments from "../../components/pages/ProjectPyments";
import ProjectPyments2 from "../../components/pages/ProjectPyments2";
import Master from "../../components/backend/Master";
import UserList from "./users/UserList";
import UserCreate from "./users/UserCreate";
import UserEdit from "./users/UserEdit";
import Profile from './profile/Profile';

import BranchList from './company/BranchList.js';

import IndexPage from './test/IndexPage.js';
import EditPage from './test/EditPage.js';

// ROLE
import Index from './roles/Index.js';
import Create from './roles/Create.js';
import Edit from './roles/Edit.js';


//Componey
import BranchCreate from './company/BranchCreate.js';
import Branchedit from './company/BranchEdit.js'

//Account
import AccountList from './accounts/AccountList.js';
import AccountCreate from './accounts/AccountCreate.js';
import AccountEdit from './accounts/AccountEdit.js';
import LedgerCreate from './accounts/LedgerCreate.js';

//financialYear

import FinancialYearCreate from './accounts/financialYear/Create.js';

import JournalEntry from './accounts/journal/JournalEntry.js';


import VerificationOtp from '../backend/Auth/VerificationOtp.js';
import AuthUser from '../backend/Auth/AuthUser.js';
import React, { useState, useEffect } from 'react';
import AccountLedgerShow from './accounts/AccountLedgerShow.js';

function Admin() {

  const  {user,http}  = AuthUser();
  const [emailCheck,SetEmailCheck] = useState();


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

  const fetchData = async () => {

    if(user.email_verified_at === null){
      try {
        
        const response = await http.get(`/send-email/${user.email}`);
        if (response.data.status === 'success') {
          
          Swal.fire({
            title: 'Please check your mail we have sent the OTP',
            icon: 'success',
            timer: 4000,
            showConfirmButton: true,
            
          }).then(() => {
            // navigate('/role-list');
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
        if (error.response) {
          const errorData = error.response.data.errors;
          // setFormErrors(errorData);
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

  // console.log('email'+emailCheck);

  if(emailCheck === null){
    
    return (
      <VerificationOtp/>
    );
  

   
  }else{
    return (
      <>
  
      
        <Master>
          <Routes>
            <Route path='/' element={ <Dashboard/>} />
            <Route path='/dashboard' element={ <Dashboard/>} />
            <Route path='/profile' element={ <Profile/>} />
            <Route path='/users-list' element={<UserList/>}/>
            <Route path='/user-create' element={<UserCreate/>}/>
  
            <Route path='/user-edit/:id' element={<UserEdit/>}/>
           
            <Route path='/projectPyments' element={ <ProjectPyments/>} />
            <Route path='/projectPyments2' element={ <ProjectPyments2/>} />
  
  
            {/* Roles */}
  
            <Route path='/role-list' element={ <Index/>} />
            <Route path='/role-create' element={<Create/>}/>
            <Route path='/role-edit/:id' element={<Edit/>}/>
  
           {/* companye  */}

            <Route path='/branch-create' element={<BranchCreate/>}/>
            <Route path='/branch-list' element={<BranchList/>}/>
            <Route path='/branch-edit/:id' element={<Branchedit/>}/>
  
            {/* Demo */}
            <Route path="/index_demo" element={<IndexPage />} />
            <Route path="/edit/:id" element={<EditPage />} />


            {/* Accounts */}

            <Route path='/account-list'  element={<AccountList/>}/>
            <Route path='/account-create'  element={<AccountCreate/>}/>
            <Route path='/ledger-create'  element={<LedgerCreate/>}/>
            <Route path='/account-edit/:id'  element={<AccountEdit/>}/>
            <Route path='/account-ledger-show/:id'  element={<AccountLedgerShow/>}/>

            {/* Accounts financialYear*/}

            <Route path='/financial-year-create'  element={<FinancialYearCreate/>}/>

            <Route path='/financial-year-list'  element={<AccountList/>}/>
      
            <Route path='/financial-year-create'  element={<LedgerCreate/>}/>
            <Route path='/financial-year-edit/:id'  element={<AccountEdit/>}/>


            <Route path='/journal-entry' element={<JournalEntry/>}/>


           
           
          </Routes>
         </Master>
      </>
    );
  }
 
  
}

export default Admin;
