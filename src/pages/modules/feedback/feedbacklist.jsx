import React, { useEffect, useState } from 'react';
import { feedbackget } from '../../../apis/auth';
import '../customer/customerlist.css'
import { useNavigate } from 'react-router-dom';



const Feedbacklist = () => {
  const [feedback, setfeedback] = useState([]);
  const Navigate = useNavigate();

  useEffect(()=>{
    
    
    const getfeedback = async () =>{ //need to create  function
    const data = await feedbackget();
    setfeedback(data);}


    getfeedback();// execute get customer
  },[])

  const handleEditClick = (customerId) => {
    // Implement edit functionality here
    alert(`Edit customer with ID: ${customerId}`);
  };

  const handlecustomerform = ()=> (e) =>{
    
    Navigate('/cutsomerform')
  }

  return (
    <div className="container-fluid" style={{padding:"0 0 0 8rem"}}>
  <div className='headbtn'>
    <div><h1 style={{ color: 'orange' }}>Customer List</h1></div>-
  </div>
  <CustomerLista feedback={feedback} onEdit={handleEditClick} />
  </div>

  );
};

const CustomerLista = ({ feedback, onEdit }) => {
  return (
    <table className="table  table-hover" >
      <thead className="thead-dark">
        <tr>
          <th>Purchase No</th>
          <th>Customer Name</th>
          <th>Feedback</th>
        </tr>
      </thead>
      <tbody>
        {feedback.map(f => (
          <Customer key={f.id} f={f} onEdit={onEdit} />
        ))}
      </tbody>
    </table>
  );
};

const Customer = ({ f, onEdit }) => {

  console.log(f)
  return (
    <tr key={f.id}>
      <td>{f.purchase_id}</td>
      <td>{f.Customer_name}</td>
      <td>{f.Feedback}</td>
      <td>
        <button className="btn btn-warning" onClick={() => onEdit(f.id)}>Edit</button>
      </td>
    </tr>
  );
};

export default Feedbacklist;
