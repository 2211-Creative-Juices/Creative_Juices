import React, { useState, useEffect } from 'react';
import { useAuth } from '../custom-hooks';

const NotCompleteOrd = ({ orders }) => {
  const user = useAuth();
  console.log('these are admin all orders', orders);

  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (isOrderComplete === false) {
        setIsOrderComplete(e.target.value === true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id='orders-container'>
      <h2 id='orders-header'>Incomplete Orders</h2>
      <div id='orders-map-container'>
        {orders &&
          orders.map((order) => {
            if (!order.iscomplete === true) {
              return (
                <div key={order.id} className='order'>
                  <h3>Incomplete Orders:</h3>
                  <p>Order Date: {order.orderdate}</p>
                  <p>Purchaser ID: {order.purchaserId}</p>
                  <p>Service ID: {order.serviceId}</p>
                  <p>Bundle Kit ID: {order.bundlekitId}</p>
                  <p>{order.iscomplete ? 'Complete!' : 'Not Complete'}</p>
                  <button onClick={submitHandler} type={'submit'}>
                    Mark As Complete
                  </button>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default NotCompleteOrd;
