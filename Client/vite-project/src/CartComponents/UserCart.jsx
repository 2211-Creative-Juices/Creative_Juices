import React from 'react';
import './Cart.css';
import { useEffect, useState } from 'react';
import OrderHistoryServices from './OrderHistoryServices';
import OrderHistoryBundles from './OrderHistoryBundles';
import { getBundlesById } from '../api/bundles';
import shelleycart from '../assets/images/shelleycart.jpeg';
import { getAllTheOrdersByUser, updateOrder } from '../api/orders';
import { useAuth } from '../custom-hooks';
import BundleOrder from './BundlesOnOrders';
import MyFilledOrders from './MyFilledOrders';
import Checkout from './Checkout';
import PayPalCheckout from './PayPalCheckout';

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
    // if (!user.token) {
    //   const redirLogin = () => {
    //     window.location.href = '/login';
    //   };
    //   redirLogin();
    // }
  }, [user.user.username]);
  console.log('87138941730487393487', myOrders);

  return (
    <div id='myorders-container'>
      <h2 id='myorders-header'>My Cart</h2>
      <div className='inner-orderdiv'>
        <div id='orders-map-container'>
          {myOrders &&
            myOrders.map((order) => {
              if (
                order.iscomplete === false &&
                order.incart === true &&
                order.bundlekitId === null
              )
                return (
                  <div
                    key={order.id}
                    className='myorders'
                  >
                    <div id='flexedorders'>
                      <div id='fleximage'>
                        <img
                          id='shelleycart'
                          src={shelleycart}
                        ></img>
                      </div>
                      <div id='orderinfo'>
                        <p>Date of Purchase: {order.orderdate}</p>
                        <p>ServiceID: {order.serviceId}</p>
                      </div>
                    </div>

                    {order.services.map((service) => {
                      return (
                        <div
                          key={service.id}
                          className='myservices'
                        >
                          <h4>Customized Paint and Sip:</h4>
                          <p>Age Group: {service.type}</p>
                          <p>In-person or remote: {service.isremote}</p>
                          <p>Number of Participants: {service.guests}</p>
                          <p>Event Cost: {service.cost}</p>
                          <p>Prefered Location: {service.location}</p>
                          <p>First Choice Date: {service.date}</p>
                          <p>Additional Notes: {service.notes}</p>

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
          <BundleOrder myOrders={myOrders} />
        </div>
      </div>
      <div>
        <div>
          <Checkout />
        </div>
        <div>
          <PayPalCheckout myOrders={myOrders} />
        </div>
      </div>
    </div>
  );
};

export default UserCart;
