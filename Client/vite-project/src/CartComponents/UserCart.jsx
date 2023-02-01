import React from 'react';
import { useEffect, useState } from 'react';
import {
  getAllTheOrdersByComplete,
  getAllTheOrdersByUser,
} from '../api/orders';
// import { getOrderByPurchaserId } from '../api/orders';
import { useAuth } from '../custom-hooks';

const UserCart = ({ orders }) => {
  const user = useAuth();
  const [myOrders, setMyOrders] = useState([]);

  let username = user.user.username;
  const singleOrder = orders[0];
  console.log('this is single ORDER', singleOrder);

  useEffect(() => {
    const getAllMyOrders = async () => {
      const allMyOrders = await getAllTheOrdersByUser(user.token, username);
      setMyOrders(allMyOrders, ...myOrders);
      console.log('these are my orders', allMyOrders);
    };
    if (user.user.id && orders[0].incart === true) {
      getAllMyOrders();
    }
    console.log('87138941730487393487', myOrders);
  }, [user.user.username]);

  return (
    <div id='myorders-container'>
      <h2 id='myorders-header'>My Orders</h2>
      <div id='orders-map-container'>
        {myOrders &&
          myOrders.map((order) => {
            if (order.iscomplete === false)
              return (
                <div key={order.id} className='myorders'>
                  <h3>Orders:</h3>
                  <p>Order Date: {order.orderdate}</p>
                  <p>Fullfilled?: {order.iscomplete}</p>
                  <p>ServiceID: {order.serviceId}</p>
                  {/* <p>BK ID: {order.bundlekitId}</p> */}
                </div>
              );
          })}
      </div>
    </div>
  );
};

export default UserCart;
