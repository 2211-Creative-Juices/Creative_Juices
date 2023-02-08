import React from 'react';

const PurchasedIncomplete = ({ myOrders, bundOrders }) => {
  console.log('MYORDERS', myOrders);
  return (
    <div id='myprevorders-container'>
      <h2 id='myprevorders-header'>Pending Orders</h2>
      <div id='old-map-container'>
        {myOrders &&
          myOrders.map((order) => {
            if (
              order.incart === false &&
              order.bundlekitId === null &&
              order.iscomplete === false &&
              order.paypalid !== null
            )
              return (
                <div key={order.id} className='myoldorders'>
                  <h3>Orders:</h3>
                  <p>Order Date: {order.orderdate}</p>
                  <p>Fullfilled? False</p>
                  <p>ServiceID: {order.serviceId}</p>
                  <p>PayPal Id: {order.paypalid}</p>
                  {/* <p>BK ID: {order.bundlekitId}</p> */}
                  {order.services.map((service) => {
                    return (
                      <div key={service.id} className='myoldservices'>
                        <h4>Services:</h4>
                        <p>Type: {service.type}</p>
                        <p>isremote: {service.isremote}</p>
                        <p>Guests: {service.guests}</p>
                        <p>Cost: {service.cost}</p>
                        <p>Location: {service.location}</p>
                        <p>Date: {service.date}</p>
                        <p>Notes: {service.notes}</p>
                      </div>
                    );
                  })}
                </div>
              );
          })}
      </div>
      <div id='bought-orders-map-container'>
        {bundOrders &&
          bundOrders.map((order) => {
            if (
              order.incart === false &&
              (order.serviceId === nullorder.iscomplete) === false &&
              order.paypalId !== null
            )
              return (
                <div key={order.id} className='bought-bundorders'>
                  <h3>Orders:</h3>
                  <p>Order Date: {order.orderdate}</p>
                  <p>Fullfilled?: {order.iscomplete}</p>
                  <p>BundleKitID: {order.bundlekitId}</p>
                  <div> BUNDLE HERE:</div>

                  {/* <p>BK ID: {order.bundlekitId}</p> */}

                  {order.bundles.map((bundle) => {
                    return (
                      <div key={bundle.id} className='myoldbunds'>
                        <h4>Bundles:</h4>
                        <p>quantity: {bundle.quantity}</p>
                      </div>
                    );
                  })}
                </div>
              );
          })}
      </div>
    </div>
  );
};

export default PurchasedIncomplete;
