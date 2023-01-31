import React from 'react';
import { useEffect, useState } from 'react';
import { getOrderByPurchaserId } from '../api/orders';
import { useAuth } from '../custom-hooks';

const UserCart = ({ orders }) => {
  const user = useAuth();
  const [myOrders, setMyOrders] = useState([]);
  console.log('thisis orders in UserCart', orders);
  const singleOrder = orders[0];
  console.log("THIS is purchaserID: ", singleOrder);
  console.log("THIS is user.token: ", user.token);
  useEffect(() => {
    const getAllMyOrders = async () => {
      const allMyOrders = await getOrderByPurchaserId(user.token, singleOrder);
      setMyOrders(allMyOrders);
      console.log("these are my orders", allMyOrders);
    };
    
    if (user.id === orders.purchaserId && orders.incart === true) {
      getAllMyOrders();
    }
  }, [orders.purchaserId]);

  return (
    <div>
      {' '}
      This will be Order by Purchaser Id
      <div id='order-info'>
        {myOrders && myOrders.map((order) => {
          return (
            <div id='individual-myorder' key={order.id}>
              <p>Date: {order.orderdate} </p>
              <p>Filled?: {order.iscomplete} </p>
              <p> Total Cost: {order.totalamount}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserCart;
