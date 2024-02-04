import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Select from 'react-select';
import AuthUser from '../../backend/Auth/AuthUser';

const UserCreate = () => {
  const {http,authUser} = AuthUser();
  const [formData, setFormData] = useState({
    name: '',
    main_company_id:authUser.user.id,
    mainOrBranch:0,
    email: '',
    password: '',
    confirmPassword: '',
    roles: '',
    status: '1',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    roles: '',
    status: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)
    try {
      setLoading(true);
      // const response = await axios.post('http://127.0.0.1:8000/api/reset-password', 
      // formData, {
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      // },
      // });

      const response = await http.post('/users',formData)
      .then((res)=>{
        if (res.data.status === 'success') {
          Swal.fire({
            title: 'Create Successfully',
            icon: 'success',
            timer: 900,
            showConfirmButton: true,
          }).then(() => {
            navigate('/users-list');
          });
        }
      })
     
    } 
    catch (error) {
      if (error.response) {
        const errorData = error.response.data.errors;
        setFormErrors(errorData);
      } else {
        console.error('An error occurred:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(formData)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [roles, setRole] = useState([]);

  useEffect(() => {
   
    http.get(`/roles/${authUser.user.id}`)
      .then(response => {
        // console.log(response.data.roles);
        setRole(response.data.roles);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  // const options = [
  //   ...Object.entries(roles).map(([value, label]) => ({ value, label })),
  //   // ... other options
  // ];

  const options = roles.map(role => ({ value: role.id, label: role.name }));
  

  const handleRolesChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      roles: selectedOptions.map((option) => option.value),
    }));
  };

  return (
    <section className="section">
      <div className="card card-primary">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12 margin-tb mb-4">
              <div className="pull-left">
                <h5>User Create</h5>
              </div>
              <div className="pull-right">
                <Link className="btn btn-primary" to="/users-list">
                  Back
                </Link>
              </div>
            </div>
          </div>

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

            <input type="hidden" name="main_company_id"  value={authUser.user.id} onChange={handleInputChange}/>
            <input type="hidden" name="mainOrBranch"  value={0} onChange={handleInputChange}/>

            <div className="form-group">
              <Select
                name="roles"
                options={options}
                onChange={handleRolesChange}
                value={options.filter((option) => formData.roles.includes(option.value))}
                isMulti
              />
              <div className="text-danger mt-2">{formErrors.roles}</div>
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

        

            <div className="form-group">
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

            <div className="form-group">
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

        

            <div className="form-group">
              <select
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </select>
              <div className="text-danger mt-2">{formErrors.status}</div>
            </div>

            <div className="text-left">
              <button type="submit" className="btn btn-primary">
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserCreate;
