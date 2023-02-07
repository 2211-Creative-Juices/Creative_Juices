import React from 'react';
import { useAuth } from '../custom-hooks';
import { getBundlesById } from '../api/bundles';
import { useState, useEffect } from 'react';
import { getAllTheOrdersByUserWithBundKit } from '../api/orders';
import { updateOrder } from '../api/orders';
import MyFilledOrders from './MyFilledOrders';
import bundlekit from '../assets/images/bundlekit.jpeg';
import { Route, Link, Routes, NavLink } from 'react-router-dom';

const BundleOrder = ({ myOrders }) => {
  const user = useAuth();
  const [bundOrders, setBundOrders] = useState([]);

  let username = user.user.username;

  const redirCart = () => {
    window.location.href = '/usercart';
  };

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
    <div id='myorders-bunds-container'>
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
                  <p>Purchase Date: {order.orderdate}</p>
                  <p>ID {order.bundlekitId}</p>
                  <div id='bundleimg'>
                    <img id='bundpic' src={bundlekit}></img>
                  </div>

                  {/* <p>BK ID: {order.bundlekitId}</p> */}

                  {order.bundles.map((bundle) => {
                    return (
                      <div key={bundle.id} className='mybunds'>
                        <p>Qty {bundle.quantity}</p>
                        <p>Cost:{bundle.bundlecost}</p>
                        <p>
                          {localStorage.setItem(
                            'bundleCost',
                            bundle.bundlecost
                          )}
                        </p>
                        <h4>Kits pair well with a virtual paint n sip!</h4>
                        <button
                          id='bund-delete'
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
                            localStorage.removeItem('bundleCost');
                            redirCart();
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
      <div className='prior-orders-linked'>
        <div></div>
        <div id='historylink'>
          {/* <NavLink
            className='orderhistorylink'
            to='/priororders'
          >
            Click to view My Order History
          </NavLink> */}
        </div>
      </div>
      <Routes>
        <Route
          path='/priororders'
          element={
            <MyFilledOrders myOrders={myOrders} bundOrders={bundOrders} />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default BundleOrder;
