import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../backend/Auth/AuthUser';

const BranchCreate = () => {
  const {http,user} = AuthUser();
  const [formData, setFormData] = useState({
    name: '',
    mainComponyId:user.id,
    company_type: '',
    since: '',
    nature: '',
    trade: '',
    issuedate: '',
    expiredate: '',
    tinnumber: '',
    binnumber: '',
    tradefile: '',
    tinfile: '',
    binfile: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    description: '',
    account_name: '',
    bank_name: '',
    account_type: '',
    account_number: '',
    account_branch: '',
    bank_address: '',
    associate_name: '',
    membership_number: '',
    membership_file: '',
  });


const [formErrors, setFormErrors] = useState({
  name: '',
  mainComponyId:'',
  company_type: '',
  since: '',
  nature: '',
  trade: '',
  issuedate: '',
  expiredate: '',
  tinnumber: '',
  binnumber: '',
  tradefile: '',
  tinfile: '',
  binfile: '',
  phone: '',
  email: '',
  website: '',
  address: '',
  description: '',
  account_name: '',
  bank_name: '',
  account_type: '',
  account_number: '',
  account_branch: '',
  bank_address: '',
  associate_name: '',
  membership_number: '',
  membership_file: '',
});


  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    // console.log(formData);
    e.preventDefault();




    try {
      setLoading(true);
      const response = await http.post('/company',formData)
      
      .then((res)=>{
        if (res.data.status === 'success') {
          Swal.fire({
            title: 'Create Successfully',
            icon: 'success',
            timer: 900,
            showConfirmButton: true,
          }).then(() => {
            navigate('/branch-list');
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


  return (
    <section className="section">
      <div className="card card-primary">
        <div className="card-body py-3">

          <div className="row">
            <div className="col-lg-12 margin-tb mb-3">
              <div className="pull-left">
                <h5 className="mt-1 mb-0">Company Create  </h5>
              </div>
              <div className="pull-right">
                <Link className="btn btn-primary" to="/branch-list">
                 {/* <i className="fas fa-angle-double-left"></i> */}
                  Back
                </Link>
              </div>
            </div>
          </div>

          <div className='mx-3 mb-1' >
          <form onSubmit={handleSubmit}>
            <div className="row">

              <div className="col-lg-12 margin-tb mt-3 mb-4 bg-light rounded p-3 ">
                  <div className="pull-left">
                    <h6 class="mb-0 mt-0">Contact Information <span class="text-danger"> (Required)</span> </h6>
                  </div>
                </div>


                 <input type="hidden" name="mainComponyId"  value={user.id} onChange={handleInputChange}/>
                

                <div className="col-lg-4 margin-tb">
                    <label className="col-form-label">Company Name</label>
                    <div className="form-group">
                        <input type="text" name="name" className="form-control" placeholder="Company Name" value={formData.name} onChange={handleInputChange}/>
                        <div className="text-danger mt-2">{formErrors.name}</div>
                    </div>
                </div>

                <div className="col-lg-4 margin-tb">
                  <label className="col-form-label">Type Of Company</label>
                  <div className="form-group">
                    <select name="company_type" className="form-control" value={formData.company_type} onChange={handleInputChange}>
                      <option value="1">Corporation</option>
                      <option value="2">Partnership</option>
                      <option value="3">Limited</option>
                      <option value="4">Proprietorship</option>
                    </select>
                    <div className="text-danger mt-2">{formErrors.company_type}</div>
                  </div>
                </div>

                <div className="col-lg-4 margin-tb">
                    <label className="col-form-label">Company Since Date </label>
                    <div className="form-group">
                        <input type="date" name="since" className="form-control"  value={formData.since} onChange={handleInputChange}/>
                        <div className="text-danger mt-2">{formErrors.since}</div>
                    </div>
                </div>

                <div className="col-lg-4 margin-tb">
                    <label className="col-form-label">Nature of Business</label>
                    <div className="form-group">
                        <input type="text" name="nature" className="form-control" placeholder="Nature of Business" value={formData.nature} onChange={handleInputChange} />
                        <div className="text-danger mt-2">{formErrors.nature}</div>
                    </div>
                </div>

                <div className="col-lg-4 margin-tb">
                    <label className="col-form-label"> Trade License Number</label>
                    <div className="form-group">
                        <input type="number" name="trade" className="form-control" placeholder="Trade License Number" value={formData.trade} onChange={handleInputChange}/>
                        <div className="text-danger mt-2">{formErrors.trade}</div>
                    </div>
                </div>

                <div className="col-lg-4 margin-tb">
                    <label className="col-form-label">Date of Issue</label>
                    <div className="form-group">
                        <input type="date" name="issuedate" className="form-control"  value={formData.issuedate} onChange={handleInputChange}/>
                        <div className="text-danger mt-2">{formErrors.issuedate}</div>
                    </div>
                </div>

                <div className="col-lg-4 margin-tb">
                    <label className="col-form-label">Expire Date</label>
                    <div className="form-group">
                        <input type="date" name="expiredate" className="form-control" placeholder="Eperience On" value={formData.expiredate} onChange={handleInputChange}/>
                        <div className="text-danger mt-2">{formErrors.expiredate}</div>
                    </div>
                </div>
             
                <div className="col-lg-4 margin-tb">
                    <label className="col-form-label"> TIN Number</label>
                    <div className="form-group">
                        <input type="number" name="tinnumber" className="form-control" placeholder="TIN Number" value={formData.tinnumber} onChange={handleInputChange}/>
                        <div className="text-danger mt-2">{formErrors.tinnumber}</div>
                    </div>
                </div>

                <div className="col-lg-4 margin-tb">
                    <label className="col-form-label"> BIN / VAT Number</label>
                    <div className="form-group">
                        <input type="number" name="binnumber" className="form-control" placeholder="BIN / VAT Number" value={formData.binnumber} onChange={handleInputChange}/>
                        <div className="text-danger mt-2">{formErrors.binnumber}</div>
                    </div>
                </div>
                
                <div className="col-lg-4 margin-tb">
                    <label className="col-form-label">Trade License File</label>
                    <div className="form-group">
                        <input type="file" name="tradefile" className="form-control" value={formData.tradefile} onChange={handleInputChange}/>
                        <div className="text-danger mt-2">{formErrors.tradefile}</div>
                    </div>
                </div>

                <div className="col-lg-4 margin-tb">
                    <label className="col-form-label">TIN Certificate File</label>
                    <div className="form-group">
                        <input type="file" name="tinfile" className="form-control"  value={formData.tinfile} onChange={handleInputChange}/>
                        <div className="text-danger mt-2">{formErrors.tinfile}</div>
                    </div>
                </div>

                <div className="col-lg-4 margin-tb">
                    <label className="col-form-label">BIN / VAT Certificate File</label>
                    <div className="form-group">
                        <input type="file" name="binfile" className="form-control"  value={formData.binfile} onChange={handleInputChange}/>
                        <div className="text-danger mt-2">{formErrors.binfile}</div>
                    </div>
                </div>
            </div>

             
            <div className="row">

              <div className="col-lg-12 margin-tb mt-3 mb-4 bg-light rounded p-3">
                <div className="pull-left">
                  <h6 class="mb-0 mt-0">Contact Information <span class="text-danger"> (Required)</span> </h6>
                </div>
              </div>

            
           

              <div className="col-lg-4 margin-tb">
                  <label className="col-form-label">Business E-mail</label>
                  <div className="form-group">
                      <input type="email" name="email" className="form-control" placeholder="E-mail Address" value={formData.email} onChange={handleInputChange}/>
                      <div className="text-danger mt-2">{formErrors.email}</div>
                  </div>
              </div>

            


            <div className="col-lg-4 margin-tb">
              <label className="col-form-label">Password</label>
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

            <div className="col-lg-4 margin-tb">
             <label className="col-form-label">Confirm Password</label>
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


              <div className="col-lg-6 margin-tb">
                  <label className="col-form-label">Business Phone Number</label>
                  <div className="form-group">
                      <input type="number" name="phone" className="form-control" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange}/>
                      <div className="text-danger mt-2">{formErrors.phone}</div>
                  </div>
              </div>

              <div className="col-lg-6 margin-tb">
                  <label className="col-form-label">Website URL</label>
                  <div className="form-group">
                      <input type="url" name="website" className="form-control" placeholder="Website URL" value={formData.website} onChange={handleInputChange}/>
                      <div className="text-danger mt-2">{formErrors.website}</div>
                  </div>
              </div>

              <div className="col-lg-12 margin-tb">
                  <label className="col-form-label">Business Address</label>
                  <div className="form-group">
                      <input type="url" name="address" className="form-control" placeholder="Office Address" value={formData.address} onChange={handleInputChange}/>
                      <div className="text-danger mt-2">{formErrors.address}</div>
                  </div>
              </div>


              <div className="col-lg-12 margin-tb">
                  <label className="col-form-label">Description</label>
                  <div className="form-group">
                      <textarea name="description" className="form-control" placeholder="Description" value={formData.description} onChange={handleInputChange}> </textarea>
                      <div className="text-danger mt-2">{formErrors.description}</div>
                  </div>
              </div>  
            </div> 



            {/* <div className="clone">
              <div className="row">
                <div className="col-lg-12 margin-tb mt-3 mb-4 bg-light rounded p-3">
                  <div className="pull-left">
                    <h6 className="mb-0 mt-1"> Bank Information <span className="text-danger"> (Optional)</span> </h6>
                  </div>
                  <div className="pull-right">
                    <button className="btn btn-sm btn-danger text-white">
                      <i className="fas fa-times"></i> Remove
                    </button>
                  </div>  
                                  
                  <div className="pull-right mr-2">
                    <button className="btn btn-sm btn-primary">
                      <i className="fas fa-plus"></i> Add More
                    </button>
                  </div>
                  
                </div>

                <div className="col-lg-4 margin-tb">
                  <label className="col-form-label">Name Of Account</label>
                  <div className="form-group">
                    <input
                      type="text"
                      name="account_name"
                      className="form-control"
                      placeholder="Name Of Account"
                      value={formData.account_name}
                      onChange={handleInputChange}
                    />
                    <div className="text-danger mt-2">{formErrors.account_name}</div>
                  </div>
                </div>

                <div className="col-lg-4 margin-tb">
                  <label className="col-form-label">Name Of Bank</label>
                  <div className="form-group">
                    <input
                      type="text"
                      name="bank_name"
                      className="form-control"
                      placeholder="Name Of Bank"
                      value={formData.bank_name}
                      onChange={handleInputChange}
                    />
                    <div className="text-danger mt-2">{formErrors.bank_name}</div>
                  </div>
                </div>

                <div className="col-lg-4 margin-tb">
                  <label className="col-form-label">Type Of Account</label>
                  <div className="form-group">
                    <select
                      name="account_type"
                      className="form-control"
                      value={formData.account_type}
                      onChange={handleInputChange}
                    >
                    <option value="1">Personal Account</option>
                    <option value="2">Savings Account</option>
                    </select>
                    <div className="text-danger mt-2">{formErrors.account_type}</div>
                  </div>
                </div>

                <div className="col-lg-4 margin-tb">
                <label className="col-form-label">Account Number</label>
                <div className="form-group">
                  <input 
                    type="number" 
                    name="account_number"
                    className="form-control"
                    placeholder="Account Number"
                    value={formData.account_number}
                    onChange={handleInputChange}
                  />
                  <div className="text-danger mt-2">{formErrors.account_number}</div>
                </div>
                </div>

                <div className="col-lg-4 margin-tb">
                  <label className="col-form-label">Name Of Branch</label>
                  <div className="form-group">
                    <input
                      type="text"
                      name="account_branch"
                      className="form-control"
                      placeholder="Name Of Branch"
                      value={formData.account_branch}
                      onChange={handleInputChange}
                    />
                    <div className="text-danger mt-2">{formErrors.account_branch}</div>
                  </div>
                </div>

                <div className="col-lg-4 margin-tb">
                  <label className="col-form-label">Address</label>
                  <div className="form-group">
                    <input
                      type="url"
                      name="bank_address"
                      className="form-control"
                      placeholder="Address"
                      value={formData.bank_address}
                      onChange={handleInputChange}
                    />
                    <div className="text-danger mt-2">{formErrors.bank_address}</div>
                  </div>
                </div>                             
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 margin-tb mt-3 mb-4 bg-light rounded p-3">
                <div className="pull-left">
                  <h6 className="mb-0 mt-1"> Business Member of Associate Membership <span class="text-danger"> (Optional)</span> </h6>
                </div>

                <div className="pull-right">
                  <Link className="btn btn-sm text-white btn-danger" to="">
                  <i className="fas fa-times"></i> Remove
                  </Link>
                </div>
                <div className="pull-right mr-2">
                  <Link className="btn btn-sm btn-primary" to="">
                  <i className="fas fa-plus"></i> Add More
                  </Link>
                </div>
              </div>
          
              <div className="col-lg-4 margin-tb">
                  <label className="col-form-label">Name of Association</label>
                  <div className="form-group">
                      <input type="text" name="associate_name" className="form-control" placeholder="Name Of Account" value={formData.associate_name} onChange={handleInputChange}/>
                      <div className="text-danger mt-2">{formErrors.associate_name}</div>
                  </div>
              </div>

      
              <div className="col-lg-4 margin-tb">
                  <label className="col-form-label">Membership Number</label>
                  <div className="form-group">
                      <input type="number" name="membership_number" className="form-control" placeholder="Account Number" value={formData.membership_number} onChange={handleInputChange}/>
                      <div className="text-danger mt-2">{formErrors.membership_number}</div>
                  </div>
              </div>

              <div className="col-lg-4 margin-tb">
                  <label className="col-form-label">Membership Certificate File</label>
                  <div className="form-group">
                      <input type="file" name="membership_file" className="form-control" value={formData.membership_file} onChange={handleInputChange}/>
                      <div className="text-danger mt-2">{formErrors.membership_file}</div>
                  </div>
              </div>
            </div>  */}


            <div className="text-left">
              <button type="submit" className="btn btn-lg my-3 btn-middle btn-primary">
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchCreate;
