import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AuthUser from '../../backend/Auth/AuthUser';
import { useNavigate, Link, useParams } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate();
  const { http, authUser } = AuthUser();
  const {id} = useParams();
  const [groupedPermissions, setGroupedPermissions] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [checkedPermissions, setCheckedPermissions] = useState({});

  const fetchData = async () => {
    try {
      const response = await http.get('/permission_get');
      const responseData = response.data;

      const groupedPermissionsArray = Object.entries(responseData.groupedPermissions || {}).map(([group, permissions]) => ({
        group,
        permissions,
      }));

      setGroupedPermissions(groupedPermissionsArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const fetchDataById = async () => {
    http.get(`/roles/${id}/edit`)
    .then(response => {
  
      const roleNameFromApi = response.data.role.name;

  // console.log(roleNameFromApi);

      setRoleName(roleNameFromApi);

      const rolePermissions = response.data.rolePermissions || {};
      const defaultCheckedPermissions = Object.keys(rolePermissions).reduce(
        (acc, permissionId) => ({
          ...acc,
          [permissionId]: true,
        }),
        {}
      );



      setCheckedPermissions(defaultCheckedPermissions);

    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  };
 

 

  useEffect(() => {
    fetchData();
    fetchDataById();
  }, []);

  const handleGroupCheckboxChange = (groupName, checked) => {
    const updatedCheckedPermissions = { ...checkedPermissions };

    groupedPermissions
      .find((group) => group.group === groupName)
      .permissions.forEach((permission) => {
        updatedCheckedPermissions[permission.id] = checked;
      });

    setCheckedPermissions(updatedCheckedPermissions);
  };

  const handlePermissionCheckboxChange = (permissionId, checked) => {
    setCheckedPermissions((prev) => ({
      ...prev,
      [permissionId]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const selectedPermissions = Object.keys(checkedPermissions).filter(
      (permissionId) => checkedPermissions[permissionId]
    );

    const formData = {
      userId: authUser.user.id,
      name: roleName,
      permission: selectedPermissions,
    };

    e.preventDefault();
    try {
      const response = await http.put(`/roles/${id}`, {
        ...formData,
    
      });
      if (response.data.status === 'success') {
        Swal.fire({
          title: 'Update Successfully',
          icon: 'success',
          timer: 900,
          showConfirmButton: true,
        }).then(() => {
          navigate('/role-list');
        });
      }
      if (response.data.status === 'error') {
        Swal.fire({
          title: 'Not Update ',
          icon: 'error',
          timer: 900,
          showConfirmButton: true,
        }).then(() => {
          navigate('/role-list');
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

    
  };

  return (
    <div>
      <section className="section">
        <div className="card card-primary">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12 margin-tb mb-4">
                <div className="pull-left">
                  <h5>Edit Role</h5>
                </div>
                <div className="pull-right">
                  <Link to="/role-list" className="btn btn-primary">
                    Back
                  </Link>
                </div>
              </div>
            </div>

            <form className="roleLoad" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 mt-3 mb-4">
                  <div className="form-group">
                    <label>&nbsp;Role Name</label>
                    <input
                      type="text"
                      name="roleName"
                      value={roleName}
                      placeholder="Role Name"
                      className="form-control"
                      onChange={(e) => setRoleName(e.target.value)}
                      required
                    />
                    <div className="text-danger mt-2 name-err"></div>
                  </div>
                </div>
                {groupedPermissions.map((group, index) => (
                  <div key={index} className="col-lg-3 col-md-4 col-sm-4 mb-4">
                    <strong className="mb-3 font-15" id={`un_${group.group}`}>
                      <label className="">
                        <input
                          type="checkbox"
                          style={{ color: '#6563ef' }}
                          className="group-checkbox"
                          data-group={group.group}
                          onChange={(e) =>
                            handleGroupCheckboxChange(group.group, e.target.checked)
                          }
                          checked={
                          
                            group.permissions.some(
                              (permission) => checkedPermissions[permission.id]
                            )
                          }
                        />
                        <span style={{ color: '#6563ef' }}>{group.group}</span>
                      </label>
                    </strong>
                    <br />
                    {group.permissions.map((permission) => (
                      <label key={permission.id}>
                        <input
                          type="checkbox"
                          className="permission-checkbox"
                          data-group={group.group}
                          value={permission.id}
                          onChange={(e) =>
                            handlePermissionCheckboxChange(permission.id, e.target.checked)
                          }
                          checked={checkedPermissions[permission.id]}
                        />
                        {permission.name}
                      </label>
                    ))}
                  </div>
                ))}
                <div className="col-xs-12 col-sm-12 col-md-12 text-left mb-3">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Edit;
