import React, { useState, useEffect } from 'react';
import { useAuth } from '../custom-hooks';
import { updateOrder } from '../api/orders';

const NotCompleteOrd = ({ orders }) => {
  const user = useAuth();
  console.log('these are admin all orders', orders);

  const [isOrderId, setIsOrderId] = useState(0);

  return (
    <div id='orders-container'>
      <h2 id='orders-header'>Incomplete Orders</h2>
      <div id='orders-map-container'>
        {orders &&
          orders.map((order) => {
            if (!order.iscomplete) {
              
              return (
                <div key={order.id} className='order'>
                  <h3>Incomplete Orders:</h3>
                  <p>Order Date: {order.orderdate}</p>
                  <p>Purchaser ID: {order.purchaserId}</p>
                  <p>Service ID: {order.serviceId}</p>
                  <p>Bundle Kit ID: {order.bundlekitId}</p>
                  <p>{order.iscomplete ? 'Complete!' : 'Not Complete'}</p>
                  <button onClick={async () => {
                  
                    const ordComplete = order.iscomplete;
                    console.log("ORDERIDIDIDIDODERDOEIRDO:", order.id);
                    const updatedOrder= await updateOrder(user.token, order.id, order.orderdate, order.purchaserId, !ordComplete, order.incart, order.serviceId, order.bundlekitId);
                    console.log("order statussssssssss: ", updatedOrder);
                    console.log("isorder!!!!!compleeeete:", !ordComplete);
                    console.log("IDIIDIDIDcompleeeete:", isOrderId);
                  }

                  } type={'submit'}>
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
