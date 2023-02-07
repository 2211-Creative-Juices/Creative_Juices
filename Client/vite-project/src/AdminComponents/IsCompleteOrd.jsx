import React, { useState, useEffect } from 'react';
import { useAuth } from '../custom-hooks';
import './Admin-style.css';

const IsCompleteOrd = ({ orders }) => {
  const user = useAuth();
  console.log('these are admin all orders', orders);
  return (
    <div id='completed-orders-container'>
      <h2 id='completed-orders-header'>Completed Orders</h2>
      <div id='completed-orders-map-container'>
        {orders &&
          orders.map((order) => {
            if (order.iscomplete === true) {
              return (
                <div
                  key={order.id}
                  className='completed-order'
                >
                  <p>
                    <span className='liltitle'>Order Date: </span>
                    {order.orderdate}
                  </p>
                  <p>
                    <span className='liltitle'>Purchaser ID: </span>
                    {order.purchaserId}
                  </p>
                  <p>
                    <span className='liltitle'>Service ID: </span>
                    {order.serviceId}
                  </p>
                  <p>
                    <span className='liltitle'>Bundle Kit ID: </span>
                    {order.bundlekitId}
                  </p>
                  <p>
                    {order.iscomplete ? (
                      <span className='complete'>Order Is Complete!</span>
                    ) : (
                      'Not Complete'
                    )}
                  </p>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default IsCompleteOrd;
