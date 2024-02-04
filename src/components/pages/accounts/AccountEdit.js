import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../backend/Auth/AuthUser';
import AccountBar from '../bar/AccountsBar';
const AccountEdit = () => {
  const { http, authUser } = AuthUser();
  const { id } = useParams();


  const [formData, setFormData] = useState({
    name: '',
    groupID: '',
    main_company_id: authUser.user.id,
    mainOrBranch: 0,
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    groupID: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    http.get(`/account-type/${id}/edit`)
      .then(response => {
        const acType = response.data.acType;
     

        setFormData(prevFormData => ({
          ...prevFormData,
          name: acType.account_type_name || '',
          groupID: acType.parentId,
        }));

        const defaultOption = { value: acType.parentId, label: acType.parentName };
        setSelectedOption(acType.parentId); // Set the default option
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const [dataRes, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const fetchData = async () => {
    try {
      const response = await http.get('/account-type');
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

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
  
    // Assuming selectedOption directly corresponds to groupID
    setFormData(prevFormData => ({
      ...prevFormData,
      groupID: selectedValue,
    }));
  
    setSelectedOption(selectedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);
    try {
      setLoading(true);
      const response = await http.put(`/account-type/${id}`, {
        ...formData,
      });
      if (response.data.status === 'success') {
        Swal.fire({
          title: 'Update Successfully',
          icon: 'success',
          timer: 900,
          showConfirmButton: true,
        }).then(() => {
          navigate('/account-list');
        });
      }
      if (response.data.status === 'error') {
        Swal.fire({
          title: 'Not Update ',
          icon: 'error',
          timer: 900,
          showConfirmButton: true,
        }).then(() => {
          navigate('/account-list');
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
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderAccountTypeNames = (accountTypes, depth = 0) => {
    const symbols = ['▶', '➔', '➤', '⮞', '⮞'];
    const symbol = symbols[depth % symbols.length];
    return accountTypes.map((item) => (
      <React.Fragment key={item.id}>
        <option value={item.id}>
          {Array(depth).fill(symbol).join('')}{item.account_type_name}
        </option>

        {item._n_level_account_types && item._n_level_account_types.length > 0 &&
          renderAccountTypeNames(item._n_level_account_types, depth + 1)
        }
      </React.Fragment>
    ));
  };

  return (
    <section className="section">
      <AccountBar  id={id}/>
      <div className="card card-primary">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12 margin-tb mb-4">
              <div className="pull-left">
                <h5>User Edit</h5>
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
              <label htmlFor="myDropdown" className="form-label">
                Select a Group
              </label>
              <select id="myDropdown" className="form-control" name='groupID' value={selectedOption} onChange={(e) => handleSelectChange(e)}>
                <option value="" disabled>
                  -- Select --
                </option>
                <option value={0}>Parent Group</option>
                {renderAccountTypeNames(dataRes)}
              </select>
              <div className="text-danger mt-2">{formErrors.roles}</div>
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

export default AccountEdit;
