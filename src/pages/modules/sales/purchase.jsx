import React, { useEffect, useState } from 'react';
import { addpurchasedata, customerget, getitems, getpurchase } from '../../../apis/auth';
import {useNavigate} from 'react-router-dom';


const PurchaseList = () => {
  const [purchases, setpurchases]= useState([]);
  const Navigate = useNavigate();


useEffect(()=>{
 const dataload =async ()=>{
  const data = await getpurchase();
  setpurchases(data);
 }

 dataload();
},[])


const handlepurchaseform =()=>(e)=>{
  Navigate('/purchaseform')
}

  return (
    <div className="container mt-5" style={{ maxWidth: '900px' }}>
      <div className="card p-4" style={{ backgroundColor: '#f7f7f7', border: 'none' }}>
        <h3 className="mb-4" style={{ color: '#ff7f00' }}>Purchase List</h3>
        <button style={{ border: 'none', background: 'orange', padding: '10px 20px' }} onClick={handlepurchaseform()}>Click here to add Purchase data</button>
        <table className="table table-hover">
          <thead style={{ backgroundColor: '#ff7f00', color: '#fff' }}>
            <tr>
              <th scope="col">Purchase Id</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Date</th>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={purchase.purchase_id} style={{ color: '#333' }}>
                <td >{purchase.purchase_id}</td>
                <td>{purchase.CustomerName}</td>
                <td>{new Date(purchase.date).toLocaleDateString()}</td>
                <td>{purchase.items.name}</td>
                <td>{purchase.items.quantity}</td>
                <td>${purchase.items.price.toFixed(2)}</td>
                <td>${purchase.total_amount.toFixed(2)}</td>
                <td>{purchase.payment_method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};




const Purchaseform = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [paymentType, setPaymentType] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [formdata, setFormData] = useState({});
  const Navigate = useNavigate();

  useEffect(() => {
    const getitem = async () => {
      const items = await getitems();
      setItems(items);
    };

    const getcustomer = async () => {
      const customers = await customerget();
      setCustomers(customers);
    };

    getitem();
    getcustomer();
  }, []);

  const handleItemChange = (e) => {
    const itemId = e.target.value;  // Extract the selected item's ID from the event
    const item = items.find((item) => item.id === itemId);  // Find the item based on the ID

    setSelectedItem(item);  // Set the selected item in state
    calculateTotal(item, quantity);  // Recalculate the total amount
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value);  // Ensure the quantity is treated as a number
    setQuantity(qty);
    calculateTotal(selectedItem, qty);
  };

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  const calculateTotal = (item, quantity) => {
    if (item && quantity) {
      setTotalAmount(item.price * quantity);
    } else {
      setTotalAmount(0);
    }
  };

  const formPurchase = async (e) => {
    e.preventDefault();

    // Update formdata with the latest state values
    const data = {
      selectedItem,
      totalAmount,
      paymentType,
      selectedCustomer,
      quantity,
    };
    

    // Make the API call to submit the form
    try {
      const res = await addpurchasedata(data);
      console.log(res)
      if(res.code==1){
       Navigate('/purchaselist')
      }
      console.log('Purchase data submitted:', data);
    } catch (error) {
      console.error('Error submitting purchase data:', error);
    }
  };

  const isFormValid = selectedItem && selectedCustomer && quantity > 0 && paymentType;

  return (
    <div className="container mt-4" style={{ maxWidth: '600px', color: '#333' }}>
      <div className="card p-4" style={{ backgroundColor: '#f7f7f7', border: 'none' }}>
        <h3 className="mb-4" style={{ color: '#ff7f00' }}>Purchase</h3>
        <form onSubmit={formPurchase}>
          <div className="form-group mb-3">
            <label htmlFor="customerSelect" style={{ color: '#ff7f00' }}>Select Customer</label>
            <select
              className="form-control"
              id="customerSelect"
              value={selectedCustomer}
              onChange={handleCustomerChange}
              style={{ borderColor: '#ff7f00' }}
            >
              <option value="" disabled>Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="itemSelect" style={{ color: '#ff7f00' }}>Select Item</label>
            <select
              className="form-control"
              value={selectedItem?.id || ''}
              onChange={handleItemChange}
              style={{ borderColor: '#ff7f00' }}
            >
              <option value="" disabled>Select Item</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="quantity" style={{ color: '#ff7f00' }}>Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              style={{ borderColor: '#ff7f00' }}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="paymentType" style={{ color: '#ff7f00' }}>Payment Type</label>
            <select
              className="form-control"
              id="paymentType"
              value={paymentType}
              onChange={handlePaymentTypeChange}
              style={{ borderColor: '#ff7f00' }}
            >
              <option value="" disabled>Select Payment Type</option>
              <option value="creditCard">Credit Card</option>
              <option value="debitCard">Debit Card</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="totalAmount" style={{ color: '#ff7f00' }}>Total Amount</label>
            <input
              type="text"
              className="form-control"
              id="totalAmount"
              value={`$${totalAmount}`}
              readOnly
              style={{ borderColor: '#ff7f00', backgroundColor: '#e0e0e0' }}
            />
          </div>

          <button
            className="btn"
            style={{ backgroundColor: '#ff7f00', color: '#fff' }}
            disabled={!isFormValid}
            type="submit"
          >
            Submit Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export { PurchaseList, Purchaseform};
