import React from 'react';
import { useAuth } from '../custom-hooks';
import { getBundlesById } from '../api/bundles';
import { useState, useEffect } from 'react';
import { getAllTheOrdersByUserWithBundKit } from '../api/orders';
import { updateOrder } from '../api/orders';
import MyFilledOrders from './MyFilledOrders';

const BundleOrder = ({ myOrders }) => {
  const user = useAuth();
  const [bundOrders, setBundOrders] = useState([]);

  let username = user.user.username;

  useEffect(() => {
    const getAllMyOrdersWithBunds = async () => {
      const orderAndMyBunds = await getAllTheOrdersByUserWithBundKit(
        user.token,
        username
      );
      setBundOrders(orderAndMyBunds, ...myOrders);
    };
    if (user.user.id) {
      getAllMyOrdersWithBunds();
    }
  }, [user.user.username]);

  return (
    <div id='myorders-container'>
      <h2 id='myorders-header'>My Orders</h2>
      <div id='orders-map-container'>
        {bundOrders &&
          bundOrders.map((order) => {
            if (
              order.iscomplete === false &&
              order.incart === true &&
              order.serviceId === null
            )
              return (
                <div key={order.id} className='myorders'>
                  <h3>Orders:</h3>
                  <p>Order Date: {order.orderdate}</p>
                  <p>Fullfilled?: {order.iscomplete}</p>
                  <p>BundleKitID: {order.bundlekitId}</p>
                  <div> BUNDLE HERE:</div>

                  {/* <p>BK ID: {order.bundlekitId}</p> */}

                  {order.bundles.map((bundle) => {
                    return (
                      <div key={bundle.id} className='myservices'>
                        <h4>Bundles:</h4>
                        <p>quantity: {bundle.quantity}</p>
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
      <MyFilledOrders bundOrders={bundOrders} myOrders={myOrders} />
    </div>
  );
};

export default BundleOrder;
