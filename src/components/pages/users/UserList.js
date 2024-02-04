import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { customHashids,customHashidsGet } from '../../Hashids';
import AuthUser from '../../backend/Auth/AuthUser';

const JournalEntry = () => {
  const [users, setUsers] = useState([]);
  const { http, authUser } = AuthUser();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const hasAllPermissions = (requiredPermissions) =>
  requiredPermissions.every((permission) => authUser.permissions.includes(permission));

  const hasAnyPermission = (requiredPermissions) =>
    requiredPermissions.some((permission) => authUser.permissions.includes(permission));

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      
      const response = await http.get(`/company-users/${authUser.user.id}`);
      setUsers(response.data.users);
    } catch (error) {
      if (error.response && error.response.data.message === 'Unauthenticated.') {
        sessionStorage.clear();
        navigate('/');
      } else {
        console.error('Error fetching user data:', error);
      }
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit item with ID ${id}`);
    const encodedShortId = customHashids(id, 'sha256', 15);
    navigate(`/user-edit/${encodedShortId}`);
  };

  const handleDelete = async (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await http.delete(`/users/${userId}`);
          fetchData();
          Swal.fire('Deleted!', 'The user has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting user:', error);
          fetchData();
          Swal.fire('Error!', 'An error occurred while deleting the user.', 'error');
        }
      }
    });
  };

  const data = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150,
        searchable: true,
      },

      {
        label: 'Company Name',
        field: 'CompanyName',
        sort: 'asc',
        width: 150,
        searchable: true,
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Roles',
        field: 'roles',
        sort: 'asc',
        width: 150,
      },

      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 150,
      },
    ],

    rows: users.map((item, index) => ({
      id: index + 1,
      name: (
        <div className="text-capitalize text-left">
          <img
            alt="ss"
            src={
              item.image
                ? `http://127.0.0.1:8000/backend/userprofile/${item.image}`
                : 'http://127.0.0.1:8000/backend/assets/img/no-profile.png'
            }
            className="rounded-circle"
            width="35"
            data-toggle="tooltip"
            title={item.name}
          />
          <span className="p-3">{item.name}</span>
        </div>
      ),
      CompanyName:(
        item.owner.name
      ),
      email: item.email ,
      roles: (
        <>
          {item.roles.map((role, index) => (
            <span key={index} className="badge badge-primary mr-1">
              {role.name}
            </span>
          ))}
        </>
      ),
      status: (
        <span className={`badge ${item.status === 1 ? 'badge-success' : 'badge-danger'}`}>
          {item.status === 1 ? 'Active' : 'De-Active'}
        </span>
      ),
      action: (
        <div className="d-flex">
          <button className="btn btn-warning mr-2" onClick={() => handleEdit(item.id)}>
            <i className="fa fa-pencil text-white"></i>
          </button>
          <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
            <i className="fa fa-trash text-white"></i>
          </button>
        </div>
      ),
    })),
  };

  const customSearch = (rows) => {
    return rows.filter((row) => {
      return ['id','name', 'email', 'CompanyName'].some(
        (field) =>
          row[field] &&
          row[field].toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };
  
  return hasAnyPermission(['users-list']) ? (
    <section className="section">
      <div className="section-body">
        <div className="row">
          <div className="col-12">
            <div className="card card-primary">

              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12 margin-tb mb-4">
                    <div className="pull-left">
                      <h5>Journal List</h5>
                    </div>
                    <div className="pull-right">
                      {hasAnyPermission(['user-create']) && (
                        <Link className="btn btn-primary" to="/user-create">
                          Add New
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                      <input
                        className='d-none'
                        type="text"
                        placeholder="Search :"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />

                      <MDBDataTable
                        searching={true}
                        searchLabel="Search:"
                        onSearch={(value) => {
                          console.log(`Searching for: ${value}`);
                          setSearchTerm(value);
                        }}
                        striped
                        bordered
                        large
                        data={{
                          ...data,
                          rows: customSearch(data.rows),
                        }}
                      />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className="section">
      <div className="section-body">
        <div className="row">
          <div className="col-12">
            <div className="card card-danger">
              <div className="card-body">
                <h5 className="text-danger">Access Denied</h5>
                <p>You do not have the required permissions to view this page.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalEntry;
