import React, { useState, useEffect } from 'react';
import { useAuth } from '../custom-hooks';

const NotCompleteOrd = ({ orders }) => {
  const user = useAuth();
  console.log('these are admin all orders', orders);
  return (
    <div id='orders-container'>
      <h2 id='orders-header'>Incomplete Orders</h2>
      <div id='orders-map-container'>
        {orders &&
          orders.map((order) => {
            if (order.iscomplete === false) {
              return (
                <div
                  key={order.id}
                  className='order'
                >
                  <h3>Order:</h3>
                  <p>Order Date: {order.orderdate}</p>
                  <p>Purchaser ID: {order.purchaserId}</p>
                  <p>Service ID: {order.serviceId}</p>
                  <p>Bundle Kit ID: {order.bundlekitId}</p>
                  <p>{order.iscomplete ? 'Complete!' : 'Not Complete'}</p>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default NotCompleteOrd;
