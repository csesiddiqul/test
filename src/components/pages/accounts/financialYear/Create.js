import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../../backend/Auth/AuthUser';
import AccountBar from '../../bar/AccountsBar';
import DataTable from 'react-data-table-component';
import { customHashids } from '../../../Hashids';


const FinancialYearCreate = () => {
  const { http, authUser } = AuthUser();
  const [activeFiYear, setActiveFiYear] = useState();
  const [resFiYears, setResFiYears] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [records, setRecords] = useState([]);

  const handleEdit = async (id) => {
    const encodedShortId = customHashids(id, 'sha256', 15);
  
    try {
      const response = await http.get(`/financial-year/${encodedShortId}/edit`);
  
      console.log(response);
  
      const editResponse = response.data.editResponseData;
  
      // Now, 'editResponse' contains the data you fetched from the server
  
      setFormData(prevFormData => ({
        ...prevFormData,
        id: editResponse.id,
        name: editResponse.name,
        main_company_id: editResponse.main_company_id,
        mainOrBranch: editResponse.mainOrBranch,
        startOfFinancialYear: editResponse.startOfFinancialYear,
        endOfFinancialYear: editResponse.endOfFinancialYear,
        currencySymbol: editResponse.currencySymbol,
        status: editResponse.status,
        activeFiYear: editResponse.previousFYear
      }));
  
      // Rest of your code...
  
    } catch (error) {
      console.error('Error fetching financial year data:', error);
    }
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
          // fetchData();
          Swal.fire('Deleted!', 'The user has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting user:', error);
          // fetchData();
          Swal.fire('Error!', 'An error occurred while deleting the user.', 'error');
        }
      }
    });
  };

  const fetchData = () => {
    http.get(`/active-financial-year/`)
      .then(response => {
        setActiveFiYear(response.data.activeFiYear.id);
        setResFiYears(response.data.financialYearsRes);
        setFormData(prevFormData => ({
          ...prevFormData,
          activeFiYear: response.data.activeFiYear.id
        }));

       
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const combinedData = resFiYears.map((resdata, index) => ({
      ...resdata,
      ...records[index] // Assuming records has objects with similar structure
    }));
    setFilteredData(combinedData);
  }, [resFiYears, records]);

  const columstb = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: row => row.startOfFinancialYear,
      sortable: true,
    },
    {
      name: 'End Date',
      selector: row => row.endOfFinancialYear,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status, // Updated to use a selector function
      cell: (row) => (
        <span className={`badge ${row.status === 1 ? 'badge-success' : 'badge-danger'}`}>
          {row.status === 1 ? 'Active' : 'De-Active'}
        </span>
      ),
      sortable: true,
    },
    
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex">
          <button className="btn btn-warning mr-2" onClick={() => handleEdit(row.id)}>
            <i className="fa fa-pencil text-white"></i>
          </button>
          <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>
            <i className="fa fa-trash text-white"></i>
          </button>
        </div>
      ),
      sortable: false,
    }
  ];

  const handleFilter = (filterCriteria) => {
    // Implement your filtering logic here
    const filteredResult = resFiYears.filter((resdata) =>
      resdata.name.toLowerCase().includes(filterCriteria.toLowerCase())
      ||resdata.startOfFinancialYear.toLowerCase().includes(filterCriteria.toLowerCase())
      ||resdata.endOfFinancialYear.toLowerCase().includes(filterCriteria.toLowerCase())
    );
    console.log('filteredData:', filteredData);

    // Update the state with the filtered result
    setFilteredData(filteredResult);
  };

  const [formData, setFormData] = useState({
    id:'',
    name: '',
    main_company_id: authUser.user.id,
    mainOrBranch: authUser.user.mainOrBranch,
    startOfFinancialYear: '',
    endOfFinancialYear: '',
    currencySymbol: '',
    status: '',
    activeFiYear:''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    startOfFinancialYear: '',
    endOfFinancialYear: '',
    currencySymbol: '',
    status: '',
    activeFiYear: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {

      
   

      // setLoading(true);
  
      // Check if there is an 'id' in formData to determine if it's an update or create
      const isUpdate = formData.id !== '';


      // console.log(isUpdate);
  
      // Determine the endpoint based on whether it's an update or create
      const endpoint = isUpdate ? `/financial-year/${formData.id}/update` : '/financial-year-create';
  
      console.log(endpoint);

      const response = await http.post(endpoint, formData);
  
      if (response.data.status === 'success') {
        setFormData({
          name: '',
          main_company_id: authUser.user.id,
          mainOrBranch: authUser.user.mainOrBranch,
          startOfFinancialYear: '',
          endOfFinancialYear: '',
          currencySymbol: '',
          status: '',
          activeFiYear: ''
        });
  
        setFormErrors({
          name: '',
          startOfFinancialYear: '',
          endOfFinancialYear: '',
          currencySymbol: '',
          status: '',
          activeFiYear: ''
        });
  
        fetchData();
  
        Swal.fire({
          title: isUpdate ? 'Update Successfully' : 'Create Successfully',
          icon: 'success',
          timer: 900,
          showConfirmButton: true,
        }).then(() => {
          navigate(isUpdate ? '/financial-year-create' : '/financial-year-create');
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
    
    console.log(formData)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="section">
      <AccountBar />
      <div className="card card-primary">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12 margin-tb mb-4">
              <div className="pull-left">
                {/* <h5>Financial Year Create</h5> */}
              </div>
              <div className="pull-right">
                <Link className="btn btn-primary" to="/account-list">
                  Back
                </Link>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-5'>
              <div className='card card-primary'>
                <div class="card-header">
                  <h4 >Financial Year Create</h4>
                  <div class="card-header-form">
                  </div>
                </div>
                <div className='card-body'>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="myDropdown" className="form-label">
                        Name
                      </label>
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

                    <div className='row'>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="form-label">Start of Financial Year</label>
                          <input
                            type="date"
                            name="startOfFinancialYear"
                            className="form-control"
                            value={formData.startOfFinancialYear}
                            onChange={handleInputChange}
                          />
                          <div className="text-danger mt-2">{formErrors.startOfFinancialYear}</div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="form-label">End of Financial Year</label>
                          <input
                            type="date"
                            name="endOfFinancialYear"
                            className="form-control"
                            value={formData.endOfFinancialYear}
                            onChange={handleInputChange}
                          />
                          <div className="text-danger mt-2">{formErrors.endOfFinancialYear}</div>
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label htmlFor="currencySymbol" className="form-label">
                            Currency Symbol
                          </label>
                          <input
                            type="text"
                            name="currencySymbol"
                            className="form-control"
                            placeholder="Currency Symbol"
                            value={formData.currencySymbol}
                            onChange={handleInputChange}
                          />
                          <div className="text-danger mt-2">{formErrors.currencySymbol}</div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label htmlFor="status" className="form-label">
                            Status
                          </label>
                          <select
                            name="status"
                            className="form-control"
                            value={formData.status}
                            onChange={handleInputChange}
                          >
                            <option value="" selected>
                              Choose
                            </option>
                            <option value="1">Active</option>
                            <option value="0">De-active</option>
                          </select>
                          <div className="text-danger mt-2">{formErrors.status}</div>
                        </div>
                      </div>
                    </div>

                    <input type="hidden" name="activeFiYear" value={formData.activeFiYear} onChange={handleInputChange} />
                    <input type="hidden" name="main_company_id" value={authUser.user.id} onChange={handleInputChange} />
                    <input type="hidden" name="mainOrBranch" value={0} onChange={handleInputChange} />

                    <div className="text-left">
                      <button type="submit" className="btn btn-primary">
                        {loading ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className='col-md-7'>
              <div className='card card-primary'>
                <div class="card-header">
                  <h4>Financial Year List</h4>
                  <div class="card-header-form">
                    <form>
                      <div class="input-group">
                        <input type="text" class="form-control" onChange={(e) => handleFilter(e.target.value)} placeholder="Search" />
                        <div class="input-group-btn">
                          <button class="btn btn-primary"><i class="fas fa-search"></i></button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className='card-body'>
                {filteredData.length === 0 ? (
                  <p>No data available.</p>
                ) : (
                  <DataTable
                    columns={columstb}
                    data={filteredData}
                    fixedHeader
                    pagination
                  />
                )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialYearCreate;
