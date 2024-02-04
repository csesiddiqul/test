import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Select from 'react-select';
import AuthUser from '../../backend/Auth/AuthUser';

const UserEdit = () => {
  const { http } = AuthUser();
  const { id } = useParams();
  const [userInRole, setInRole] = useState();
  const [selectedRoles, setSelectedRoles] = useState([]);
  // const [editId, setEditId] = useState(id);
  const [formData, setFormData] = useState({
    name: '',
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

  useEffect(() => {
    http.get(`/company/${id}/edit`)
      .then(response => {

        // console.log(response);

        const userData = response.data.user;
        const userRole = response.data.roles;

        setFormData(userData);
        setInRole(userRole);
        setSelectedRoles(userData.roles.map(role => ({ value: role.name, label: role.name })));
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleRolesChange = (selectedOptions) => {
    setSelectedRoles(selectedOptions);
    setFormData((prevData) => ({
      ...prevData,
      roles: selectedOptions.map((option) => option.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const rolesToSubmit = selectedRoles.length > 0 ? selectedRoles.map(role => role.value) : ['guest'];
      const response = await http.put(`/users/${id}`, {
        ...formData,
        roles: rolesToSubmit,
      });
      if (response.data.status === 'success') {
        Swal.fire({
          title: 'Update Successfully',
          icon: 'success',
          timer: 900,
          showConfirmButton: true,
        }).then(() => {
          navigate('/users-list');
        });
      }
      if (response.data.status === 'error') {
        Swal.fire({
          title: 'Not Update ',
          icon: 'error',
          timer: 900,
          showConfirmButton: true,
        }).then(() => {
          navigate('/users-list');
        });
      }
    } catch (error) {
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [roles, setRole] = useState([]);

  useEffect(() => {
    http.get('/roles_single')
      .then(response => {
        // console.log(response.data.roles);
        setRole(response.data.roles);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const options = [
    ...Object.entries(roles).map(([value, label]) => ({ value, label })),
  ];

  return (
    <section className="section">
      <div className="card card-primary">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12 margin-tb mb-4">
              <div className="pull-left">
                <h5>Company Edit</h5>
              </div>
              <div className="pull-right">

                <Link className="btn btn-primary" to="/branch-list">
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



            <div className="form-group">
              <Select
                name="roles"
                options={options}
                onChange={handleRolesChange}
                value={selectedRoles}
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

            {/* <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="New Password (Leave blank to keep current)"
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
                placeholder="Confirm New Password"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <div className="text-danger mt-2">{formErrors.confirmPassword}</div>
            </div> */}

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
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserEdit;
