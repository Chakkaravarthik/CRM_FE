import React, { useState } from 'react';
import { customercreation, updatecustomer } from '../../../apis/auth';
import { useNavigate } from 'react-router-dom';

const CustomerForm = ({customerdata, setShowEditModel,}) => {
  console.log(customerdata)
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(customerdata || {
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
    },
    textile_preferences: {
      fabrics: '',
      colors: '',
      designs: '',
    },
    contact_preferences: {
      email: false,
      sms: false,
      mail: false,
    },
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, parent) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [parent]: {
        ...prevData[parent],
        [name]: value,
      },
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      contact_preferences: {
        ...prevData.contact_preferences,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(customerData.id){
      console.log(customerData);
      const data1= await updatecustomer({editedCustomer:customerData,type:"edit"});
      if(data1.code==1){
        setShowEditModel(false)
      }
    }else{
      const data = await customercreation(customerData);
      if(data.code ==1){
        navigate('/customerlist')
      }
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-4" style={{ color: 'orange' }}>Customer Information</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Enter name"
          value={customerData.name}
          onChange={handleChange}
          required
          style={{ borderColor: 'grey' }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="Enter email"
          value={customerData.email}
          onChange={handleChange}
          required
          style={{ borderColor: 'grey' }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          placeholder="Enter phone number"
          value={customerData.phone}
          onChange={handleChange}
          style={{ borderColor: 'grey' }}
        />
      </div>
      <h3 className="mt-4" style={{ color: 'orange' }}>Address</h3>
      <div className="form-group">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          className="form-control"
          id="street"
          name="street"
          placeholder="Enter street"
          value={customerData.address.street}
          onChange={(e) => handleNestedChange(e, 'address')}
          style={{ borderColor: 'grey' }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          placeholder="Enter city"
          value={customerData.address.city}
          onChange={(e) => handleNestedChange(e, 'address')}
          style={{ borderColor: 'grey' }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="state">State</label>
        <input
          type="text"
          className="form-control"
          id="state"
          name="state"
          placeholder="Enter state"
          value={customerData.address.state}
          onChange={(e) => handleNestedChange(e, 'address')}
          style={{ borderColor: 'grey' }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="postal_code">Postal Code</label>
        <input
          type="text"
          className="form-control"
          id="postal_code"
          name="postal_code"
          placeholder="Enter postal code"
          value={customerData.address.postal_code}
          onChange={(e) => handleNestedChange(e, 'address')}
          style={{ borderColor: 'grey' }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          className="form-control"
          id="country"
          name="country"
          placeholder="Enter country"
          value={customerData.address.country}
          onChange={(e) => handleNestedChange(e, 'address')}
          style={{ borderColor: 'grey' }}
        />
      </div>
      <h3 className="mt-4" style={{ color: 'orange' }}>Textile Preferences</h3>
      <div className="form-group">
        <label htmlFor="fabrics">Fabrics</label>
        <input
          type="text"
          className="form-control"
          id="fabrics"
          name="fabrics"
          placeholder="Enter fabrics"
          value={customerData.textile_preferences.fabrics}
          onChange={(e) => handleNestedChange(e, 'textile_preferences')}
          style={{ borderColor: 'grey' }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="colors">Colors</label>
        <input
          type="text"
          className="form-control"
          id="colors"
          name="colors"
          placeholder="Enter colors"
          value={customerData.textile_preferences.colors}
          onChange={(e) => handleNestedChange(e, 'textile_preferences')}
          style={{ borderColor: 'grey' }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="designs">Designs</label>
        <input
          type="text"
          className="form-control"
          id="designs"
          name="designs"
          placeholder="Enter designs"
          value={customerData.textile_preferences.designs}
          onChange={(e) => handleNestedChange(e, 'textile_preferences')}
          style={{ borderColor: 'grey' }}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-4" style={{ backgroundColor: 'orange', borderColor: 'grey' }}>Save Customer</button>
    </form>
  );
};

export default CustomerForm;
