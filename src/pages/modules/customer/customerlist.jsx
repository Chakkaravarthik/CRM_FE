import React, { useEffect, useState } from 'react';
import { customerget } from '../../../apis/auth';
import '../customer/customerlist.css'
import { useNavigate } from 'react-router-dom';



const Customerlist = () => {
  const [customers, setCustomers] = useState([]);
  const Navigate = useNavigate();

  useEffect(()=>{
    
    
    const getcustomer = async () =>{
    const data = await customerget();
    setCustomers(data);
    console.log(customers)}


    getcustomer();// execute get customer
  },[])

  const handleEditClick = (customerId) => {
    // Implement edit functionality here
    // alert(`Edit customer with ID: ${customerId}`);
  };

  const handlecustomerform = ()=> (e) =>{
    
    Navigate('/cutsomerform')
  }

  return (
    <div className="container-fluid" style={{padding:"0 0 0 8rem"}}>
  <div className='headbtn'>
    <div><h1 style={{ color: 'orange' }}>Customer List</h1></div>
    <div><button style={{ border: 'none', background: 'orange', padding: '10px 20px' }} onClick={handlecustomerform()}>Create Customer</button></div>
  </div>
  <CustomerLista customers={customers} onEdit={handleEditClick} />
  </div>

  );
};

const CustomerLista = ({ customers, onEdit }) => {
  return (
    <table className="table  table-hover" >
      <thead className="thead-dark">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customer => (
          <Customer key={customer.id} customer={customer} onEdit={onEdit} />
        ))}
      </tbody>
    </table>
  );
};

const Customer = ({ customer, onEdit }) => {
  return (
    <tr key={customer.id}>
      <td>{customer.name}</td>
      <td>{customer.email}</td>
      <td>{customer.address.state}</td>
      <td>{customer.phone}</td>
      <td>
        <button className="btn btn-warning" onClick={() => onEdit(customer.id)}>Edit</button>
      </td>
    </tr>
  );
};

export default Customerlist;
