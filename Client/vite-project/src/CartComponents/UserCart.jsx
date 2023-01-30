import React from 'react';
import { useEffect, useState } from 'react';
import { getOrderByPurchaserId } from '../api/orders';
import { useAuth } from '../custom-hooks';

const UserCart = ({ orders }) => {
  const user = useAuth();
  const [myOrders, setMyOrders] = useState([]);
  console.log('thisis orders in UserCart', orders);
  let purchaserId = orders.purchaserId;
  useEffect(() => {
    const getAllMyOrders = async () => {
      const allMyOrders = await getOrderByPurchaserId(user.token, purchaserId);
      setMyOrders(allMyOrders);
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
        {myOrders.map((order) => {
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
