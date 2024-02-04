import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import AuthUser from '../../backend/Auth/AuthUser';
import { customHashids } from '../../Hashids';
import AccountBar from '../bar/AccountsBar';

const AccountEdit = () => {
  const [dataRes, setData] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});
  const { http, authUser } = AuthUser();
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
      const response = await http.get('/account-type');
      // console.log(response.data);

      setData(response.data);
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
    // console.log(`Edit item with ID ${id}`);
    const encodedShortId = customHashids(id, 'sha256', 15);
    navigate(`/account-edit/${encodedShortId}`);
    // Implement your logic for handling the edit action, such as opening a modal or navigating to an edit page
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
          await http.delete(`/account-type/${userId}`);
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


  const toggleGroup = (groupId) => {
    setExpandedGroups((prevExpandedGroups) => ({
      ...prevExpandedGroups,
      [groupId]: !prevExpandedGroups[groupId],
    }));
  };

 
  const renderAccountTypeNames = (accountTypes, itemId) => {

    return accountTypes.map((accountType) => (
      <div key={accountType.id} className={`accountTypeRow text-capitalize text-left ${accountType.ledger === 1 ? 'ledgerAccountType' : ''}`}>
        <div className="accountTypeContent">
          {accountType.ledger === 1 ? (
            <Link
              to={`/account-ledger-show/${customHashids(accountType.id, 'sha256', 15)}`}
              className={`p-3 font-14 mr-4 font-weight-bold blueText`}
              style={{ fontSize: '12px', color: '#6777ef' }}
            >
              {accountType.account_type_name}
            </Link>
          ) : (
            <span
              className="p-3 font-16 mr-4 font-weight-bold"   style={{ color: '#666' }}
            >
              {accountType.account_type_name}
            </span>
          )}
  
          {accountType.ledger === 1 ? (
          <></>
          ) : (
            <span
            className="border shadow-sm p-1 m-3"
            onClick={() => toggleGroup(accountType.id)}
            style={{ cursor: 'pointer' }}
          >
            {expandedGroups[accountType.id] ? 'Hide' : 'Show'}

            {/* {expandedGroups[accountType.id] ? <i class="fas fa-eye-slash"></i>  : <i class="fas fa-eye"></i>} */}
          </span>

          )}

          {hasAnyPermission(['account-edit']) && (
            <i className="fa fa-pencil p-3 text-blck font-15 mr-1 "  style={{ cursor: 'pointer' }} onClick={() => handleEdit(accountType.id)}></i>
          )}
          {hasAnyPermission(['account-delete']) && (
            <i className="fa fa-trash p-3 text-blck font-15 "  style={{ cursor: 'pointer' }} onClick={() => handleDelete(accountType.id)}></i>
          )}
        </div>
  
        {expandedGroups[accountType.id] && accountType._n_level_account_types.length > 0 && (
          <div className="ml-3">
            {renderAccountTypeNames(accountType._n_level_account_types, itemId)}
          </div>
        )}
      </div>
    ));
  };
  


  const data = {
    columns: [
      {
        label: '#',
        field: 'ids',
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
    
     
    ],
    rows: dataRes.map((item, index) => ({
      ids: <span className='font-18'>
        {index + 1}
      </span>,
      name: (
        <div className="text-capitalize text-left">
          
          <span className="p-3">{renderAccountTypeNames([item], item.id)}</span>
          
        </div>
      ),
     

      status: (
        <span className={`badge ${item.status == 1 ? 'badge-success' : 'badge-danger'}`}>
          {item.status == 1 ? 'Active' : 'De-Active'}
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


  return hasAnyPermission(['account-list']) ? (
    <section className="section">

      <AccountBar/>

      <div className="section-body">
        <div className="row">
          <div className="col-12">
            <div className="card card-primary">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12 margin-tb mb-4">
                    <div className="pull-left">
                      <h5>Account List</h5>
                    </div>

                    <div className="pull-right">
                      {hasAnyPermission(['account-create']) && (
                        <Link className="btn btn-primary" to="/account-create">
                          Add  Group
                        </Link>
                      )}

                      &nbsp;
                      &nbsp;

                      {hasAnyPermission(['ledger-create']) && (
                          <Link className="btn btn-primary" to="/ledger-create">
                            Add  Ledger
                          </Link>
                      )}
                        
                    </div>

                    

                   

                    
                  </div>
                </div>
                {/* <MDBDataTable striped bordered large data={data} /> */}

                <MDBDataTable
                  searching={true}
                  searchLabel="Search:"

                  onSearch={(value) => {
                    // Handle search logic here using the 'value' parameter
                    // console.log(`Searching for: ${value}`);
                    // Update your component state or perform actions based on the search value
                  }}
                  // Other props such as striped, bordered, large, and data
                  striped
                  bordered
                  large
                  data={data}
                />
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

export default AccountEdit;
