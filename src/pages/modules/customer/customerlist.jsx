import React, { useEffect, useState } from 'react';
import { customerget, offerzonedata } from '../../../apis/auth';
import '../customer/customerlist.css';
import { useNavigate } from 'react-router-dom';

const Customerlist = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState(new Set());
  const [zoneName, setZoneName] = useState('');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const getCustomer = async () => {
      const data = await customerget();
      setCustomers(data);
    };
    getCustomer(); // execute get customer
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleEditClick = (customerId) => {
    alert(`Edit customer with ID: ${customerId}`);
  };

  const handleCustomerForm = () => {
    navigate('/customerform');
  };

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomers(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(customerId)) {
        newSelected.delete(customerId);
      } else {
        newSelected.add(customerId);
      }
      return newSelected;
    });
  };

  const handleZoneNameChange = (e) => {
    setZoneName(e.target.value);
  };

  const handleSendBulkEmail = async () => {
    const selectedCustomerData = customers.filter(customer => selectedCustomers.has(customer.id));
    const customerDataToSend = selectedCustomerData.map(customer => ({
      id: customer.id
    }));

    try {
      const response = await offerzonedata({ zone: zoneName, customers: customerDataToSend });
      console.log({ zone: zoneName, customers: customerDataToSend })
      if(response.code==1){
        setZoneName('');
      setSelectedCustomers(new Set());
      }
    } catch (error) {
      console.error('Error moving customers to zone:', error);
    }
  };

  return (
    <div className="container-fluid" style={{ padding: "0 0 0 8rem" }}>
      <div className='headbtn'>
        <div>
          <h1 style={{ color: 'orange' }}>Customer List</h1>
          <input type="text" placeholder="Search by name" onChange={handleSearch} />
          <button onClick={handleSort}>{`Sort ${sortOrder === 'asc' ? 'A-Z' : 'Z-A'}`}</button>
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Customer Group Name" 
            value={zoneName}
            onChange={handleZoneNameChange}
          />
          <button 
            style={{ border: 'none', background: 'green', padding: '10px 20px', marginLeft: '10px' }} 
            onClick={handleSendBulkEmail}
            disabled={selectedCustomers.size === 0 || !zoneName}
          >
            Move to Offser Zone
          </button>
          <button 
            style={{ border: 'none', background: 'orange', padding: '10px 20px' }} 
            onClick={handleCustomerForm}
          >
            Create Customer
          </button>
        </div>
      </div>
      <CustomerLista 
        customers={customers} 
        onEdit={handleEditClick} 
        searchTerm={searchTerm} 
        sortOrder={sortOrder} 
        onSelect={handleSelectCustomer}
        selectedCustomers={selectedCustomers}
      />
    </div>
  );
};

const CustomerLista = ({ customers, onEdit, searchTerm, sortOrder, onSelect, selectedCustomers }) => {
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCustomers = filteredCustomers.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <table className="table table-hover">
      <thead className="thead-dark">
        <tr>
          <th>Select</th>
          <th>Name</th>
          <th>Email</th>
          <th>Purchase Count</th>
          <th>Purchase Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedCustomers.map(customer => (
          <Customer 
            key={customer.id} 
            customer={customer} 
            onEdit={onEdit} 
            isSelected={selectedCustomers.has(customer.id)} 
            onSelect={onSelect}
          />
        ))}
      </tbody>
    </table>
  );
};

const Customer = ({ customer, onEdit, isSelected, onSelect }) => {
  const totalPurchaseValue = (customerId) => {
    if (customerId === customer.id) {
      return customer.purchase_history.reduce((total, pur) => total + pur.total_amount, 0);
    }
    return 0;
  }

  return (
    <tr key={customer.id}>
      <td>
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={() => onSelect(customer.id)} 
        />
      </td>
      <td>{customer.name}</td>
      <td>{customer.email}</td>
      <td>{customer.purchase_history.length}</td>
      <td>{totalPurchaseValue(customer.id).toFixed(2)}</td>
      <td>
        <button className="btn btn-warning" onClick={() => onEdit(customer.id)}>Edit</button>
      </td>
    </tr>
  );
};

export default Customerlist;
