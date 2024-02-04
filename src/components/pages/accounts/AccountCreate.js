import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Select from 'react-select';
import AuthUser from '../../backend/Auth/AuthUser';
import AccountBar from '../bar/AccountsBar';

const AccountCreate = () => {


  const [selectedOption, setSelectedOption] = useState('');
  const [dataRes, setData] = useState([]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
  
    // Assuming selectedOption directly corresponds to groupID
    setFormData(prevFormData => ({
      ...prevFormData,
      groupID: selectedValue,
    }));
  
    setSelectedOption(selectedValue);
  };
  

  
  const {http,authUser} = AuthUser();
  const [formData, setFormData] = useState({
    name: '',
    groupID:'',
    main_company_id:authUser.user.id,
    mainOrBranch:authUser.user.mainOrBranch,
  
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    groupID: '',
  
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)

    try {
      setLoading(true);
      const response = await http.post('/createAc-group',formData)
      .then((res)=>{
        if (res.data.status === 'success') {
          Swal.fire({
            title: 'Create Successfully',
            icon: 'success',
            timer: 900,
            showConfirmButton: true,
          }).then(() => {
            navigate('/account-list');
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




  const fetchData = async () => {
    try {
      const response = await http.get('/accountCr-type');
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

  useEffect(() => {
    fetchData();
  }, []); 

  const renderAccountTypeNames = (accountTypes, depth = 0) => {
    const symbols = ['▶', '➔', '➤', '⮞', '⮞'];
    const symbol = symbols[depth % symbols.length];
    return accountTypes.map((item) => (
      <React.Fragment key={item.id}>
        <option value={item.id}>
          {Array(depth).fill(symbol).join('')}{item.account_type_name}
        </option>
  
        {item._y_level_account_types && item._y_level_account_types.length > 0 &&
          renderAccountTypeNames(item._y_level_account_types, depth + 1)
        }
      </React.Fragment>
    ));
  };
  
  
  

  return (
    <section className="section">
      <AccountBar/>
      <div className="card card-primary">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12 margin-tb mb-4">
              <div className="pull-left">
                <h5>Add Account Group</h5>
              </div>
              <div className="pull-right">
                <Link className="btn btn-primary" to="/account-list">
                  Back
                </Link>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="myDropdown" className="form-label">Accounts Name</label>

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
              <label htmlFor="myDropdown" className="form-label">
                Select a Group
              </label>
              <select id="myDropdown" className="form-control" name='groupID' value={selectedOption} onChange={handleSelectChange}>
                <option value="" disabled>
                  -- Select --
                </option>
                <option value={0}>Parent Group</option>

                {/* Use the recursive function to render hierarchical account types */}
                {renderAccountTypeNames(dataRes)}

              </select>
              <div className="text-danger mt-2">{formErrors.groupID}</div>
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

export default AccountCreate;
