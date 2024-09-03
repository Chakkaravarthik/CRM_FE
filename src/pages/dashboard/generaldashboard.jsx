import React, { useEffect, useState } from 'react';
import Customerlist from '../modules/customer/customerlist';
import { customerget } from '../../apis/auth';

const DashboardCard = ({ title, today, last30Days, overall }) => {
  return (
    <>
        <div className="card mb-4" style={{ backgroundColor: '#f8f9fa', borderColor: '#f89c1c' }}>
      <div className="card-body">
        <h5 className="card-title" style={{ color: '#f89c1c' }}>Total Revenue</h5>
        <hr />
        <div className="row">
          <div className="col">
            <h6>Today</h6>
            <p style={{ color: '#6c757d' }}>{today}</p>
          </div>
          <div className="col">
            <h6>Last 30 Days</h6>
            <p style={{ color: '#6c757d' }}>{last30Days}</p>
          </div>
          <div className="col">
            <h6>Overall</h6>
            <p style={{ color: '#6c757d' }}>{overall}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="card mb-4" style={{ backgroundColor: '#f8f9fa', borderColor: '#f89c1c' }}>
      <div className="card-body">
        <h5 className="card-title" style={{ color: '#f89c1c' }}>Total Purchase</h5>
        <hr />
        <div className="row">
          <div className="col">
            <h6>Today</h6>
            <p style={{ color: '#6c757d' }}>{today}</p>
          </div>
          <div className="col">
            <h6>Last 30 Days</h6>
            <p style={{ color: '#6c757d' }}>{last30Days}</p>
          </div>
          <div className="col">
            <h6>Overall</h6>
            <p style={{ color: '#6c757d' }}>{overall}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};


const Dashboard = () => {
    const [customerData, setCustomerData] = useState([]);
    const [todayRev, setTodayRev] = useState(0);
    const [monthRev, setmonthRev] = useState(0);
    const [overallRev, setoverallRev] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            const data = await customerget(); 
            setCustomerData(data);
            console.log(data)
            calculateTotalPurchase(data);
        };

        const calculateTotalPurchase = (data) => {
            let amount = 0;
            data.forEach((instance) => {
                instance.purchase_history.forEach((purchase) => {
                    amount += purchase.total_amount;
                });
            });
            setoverallRev(amount);
        };

        const calculateTodayPurchase = (data) => {
            let amount = 0;
            data.forEach((instance) => {
                instance.purchase_history.forEach((purchase) => {
                    amount += purchase.total_amount;
                });
            });
            setTodayRev(amount);
        };

        const calculatemonthPurchase = (data) => {
            let amount = 0;
            data.forEach((instance) => {
                instance.purchase_history.forEach((purchase) => {
                    if(purchase.data!==Date.now()){
                        amount += purchase.total_amount;
                    }
                });
            });
            setmonthRev(amount);
        };

        fetchData();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <DashboardCard 
                        today={`${todayRev}`} 
                        last30Days="..." 
                        overall={`${todayRev}`} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

