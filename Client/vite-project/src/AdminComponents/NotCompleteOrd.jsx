import React, { useState, useEffect } from 'react';
import { useAuth } from '../custom-hooks';
import { updateOrder } from '../api/orders';
import './Admin-style.css';

const NotCompleteOrd = ({ orders }) => {
  const user = useAuth();
  console.log('these are admin all orders', orders);

  const [isOrderId, setIsOrderId] = useState(0);

  return (
    <div id='incomplete-orders-container'>
      <h2 id='incomplete-orders-header'>Incomplete Orders</h2>
      <div id='incomplete-orders-map-container'>
        {orders &&
          orders.map((order) => {
            if (!order.iscomplete) {
              return (
                <div
                  key={order.id}
                  className='incomplete-orders'
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
                      'Order Is Complete!'
                    ) : (
                      <span className='bigtitle'>Order Incomplete</span>
                    )}
                  </p>
                  <button
                    onClick={async () => {
                      const ordComplete = order.iscomplete;
                      const updatedOrder = await updateOrder(
                        user.token,
                        order.id,
                        order.orderdate,
                        order.purchaserId,
                        !ordComplete,
                        order.incart,
                        order.serviceId,
                        order.bundlekitId
                      );

                      const reload = () => {
                        window.location.href = '/incompleteorders';
                      };
                      reload();
                    }}
                    type={'submit'}
                  >
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
