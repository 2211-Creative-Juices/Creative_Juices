import React from 'react';
import { useEffect, useState } from 'react';
import OrderHistory from './OrderHistory';
import { getAllTheOrdersByUser, updateOrder } from '../api/orders';
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
    if (user.user.id) {
      getAllMyOrders();
    }
  }, [user.user.username]);
  console.log('87138941730487393487', myOrders);

  return (
    <div id='myorders-container'>
      <h2 id='myorders-header'>My Orders</h2>
      <div id='orders-map-container'>
        {myOrders &&
          myOrders.map((order) => {
            if (order.iscomplete === false && order.incart === true)
              return (
                <div key={order.id} className='myorders'>
                  <h3>Orders:</h3>
                  <p>Order Date: {order.orderdate}</p>
                  <p>Fullfilled?: {order.iscomplete}</p>
                  <p>ServiceID: {order.serviceId}</p>
                  {/* <p>BK ID: {order.bundlekitId}</p> */}

                  {order.services.map((service) => {
                    return (
                      <div key={service.id} className='myservices'>
                        <h4>Services:</h4>
                        <p>Type: {service.type}</p>
                        <p>isremote: {service.isremote}</p>
                        <p>Guests: {service.guests}</p>
                        <p>Cost: {service.cost}</p>
                        <p>Location: {service.location}</p>
                        <p>Date: {service.date}</p>
                        <p>Notes: {service.notes}</p>
                        <button
                          onClick={async () => {
                            const ordInCart = order.incart;
                            const updatedOrdInCart = await updateOrder(
                              user.token,
                              order.id,
                              order.orderdate,
                              order.purchaserId,
                              order.iscomplete,
                              !ordInCart,
                              order.serviceId,
                              order.bundlekitId
                            );
                            console.log(
                              'this is updatedOrdIN cart!!!!',
                              updatedOrdInCart
                            );
                          }}
                        >
                          Remove From Cart
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
          })}
      </div>
      <div>
        <OrderHistory myOrders={myOrders} />
      </div>
    </div>
  );
};

export default UserCart;
