import React from 'react';
import { useEffect, useState } from 'react';
import { getAllTheOrderByUser } from '../api/orders';
// import { getOrderByPurchaserId } from '../api/orders';
import { useAuth } from '../custom-hooks';

const UserCart = ({ orders }) => {
  const user = useAuth();
  // const [myOrders, setMyOrders] = useState([]);
  console.log('HIUSER', user);
  // let userToken = user.token;
  // let username = user.username;

  // if (user.token) {
  //   const singleOrder = orders[0];
  //   console.log('this is single ORDER', singleOrder);
  // }
  //   useEffect(() => {
  //     const getAllMyOrders = async () => {
  //       const allMyOrders = await getAllTheOrderByUser(userToken, username);
  //       setMyOrders(allMyOrders);
  //       console.log('these are my orders', allMyOrders);
  //     };

  //     if (user.id === orders[0].purchaserId && orders[0].incart === true) {
  //       getAllMyOrders();
  //     }
  //   }, [user.username]);
  // }

  return (
    <div>
      {' '}
      This will be Order by Purchaser Id
      <div>
        {/* {orders.map((order) => {
          return (
            <div id='ordersmapped' key={order.id}>
              <p> Date: {order.orderdate}</p>
              <p>service id: {order.serviceId}</p>
              <p>bundlekitId: {order.bundlekitId}</p>
            </div>
          );
        })} */}
      </div>
      {/* <div id='order-info'>
          {myOrders &&
            myOrders.map((order) => {
              return (
                <div
                  id='individual-myorder'
                  key={order.id}
                >
                  <p>Date: {order.orderdate} </p>
                  <p>Filled?: {order.iscomplete} </p>
                  <p> Total Cost: {order.totalamount}</p>
                </div>
              );
            })}
        </div> */}
    </div>
  );
  // } else {
  //   return <div>Please Log in</div>;
  // }
};

export default UserCart;
