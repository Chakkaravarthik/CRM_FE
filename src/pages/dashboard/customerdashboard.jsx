import React, { useState, useEffect } from 'react';
import { customerget1, updatecustomer } from '../../apis/auth';


const CustomerDashboard = () => {
  const [customer, setCustomer] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({ ...customer });

  useEffect(() => {

    const token = localStorage.getItem("UserToken")
    
   const customerdata = async ()=>{
            const res = await customerget1({token:token});
            const data = res.singleCustomerObj
            setCustomer(data);
 } 
    

    customerdata();
  }, []);

  const handleEdit = async () => {
    console.log(editedCustomer)
    const dataupdate = await updatecustomer({editedCustomer,type:"edit"});
    if(dataupdate.code==1){
      setShowEditModal(false);
      setCustomer(dataupdate.customer)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    return (
        <div className="container mt-5">
          {customer && customer.name ? (
            <>
              <h1 className="mb-4" style={{ color: '#FF6F00' }}>Customer Dashboard</h1>
              <div className="card p-4 shadow-sm" style={{ backgroundColor: '#F5F5F5' }}>
                <h3 className="mb-4" style={{ color: '#333' }}>Basic Details</h3>
                <dl className="row">
                  <dt className="col-sm-3">Name</dt>
                  <dd className="col-sm-9">{customer.name}</dd>
                  <dt className="col-sm-3">Email</dt>
                  <dd className="col-sm-9">{customer.email}</dd>
                  <dt className="col-sm-3">Phone</dt>
                  <dd className="col-sm-9">{customer.phone}</dd>
                  <dt className="col-sm-3">Address</dt>
                  <dd className="col-sm-9">{customer.address.city}</dd> 
                </dl>
                <button
                  className="btn btn-warning"
                  onClick={() => {setShowEditModal(true)
                    setEditedCustomer(customer)
                  }}
                >
                  Edit
                </button>
          
                <h3 className="mt-5 mb-4" style={{ color: '#333' }}>Purchase History</h3>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Item</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(customer.purchase_history || []).map((purchase, index) => (
                      <tr key={index}>
                        <td>{purchase.date || ""}</td>
                        <td>{purchase.items.name || ""}</td>
                        <td>{purchase.total_amount || ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          
              {/* Edit Modal */}
              {showEditModal && (
                <div className="modal show" style={{ display: 'block' }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Edit Customer Details</h5>
                        <button
                          type="button"
                          className="close"
                          onClick={() => setShowEditModal(false)}
                        >
                          <span>&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              value={editedCustomer.name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              value={editedCustomer.email}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={editedCustomer.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              name="address"
                              value={editedCustomer.address.city}
                              onChange={handleInputChange}
                            />
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setShowEditModal(false)}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleEdit}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {showEditModal && <div className="modal-backdrop fade show"></div>}
            </>
          ) : (
            <h1>This User Is Not A Customer</h1>
          )}
        </div>
      );
      
};

export default CustomerDashboard;
