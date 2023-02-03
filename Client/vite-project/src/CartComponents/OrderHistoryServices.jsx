import React from 'react';

const OrderHistoryServices = ({ myOrders }) => {
  return (
    <div id='mypreviousorders-container'>
      <h2 id='mypreviousorders-header'>Previous Orders</h2>
      <div id='oldservice-map-container'>
        {myOrders &&
          myOrders.map((order) => {
            if (
              order.iscomplete === true &&
              order.incart === true &&
              order.bundlekitId === null
            )
              return (
                <div key={order.id} className='myoldserviceorders'>
                  <h3>Orders:</h3>
                  <p>Order Date: {order.orderdate}</p>
                  <p>Fullfilled?: {order.iscomplete}</p>
                  <p>ServiceID: {order.serviceId}</p>
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
    </div>
  );
};

export default OrderHistoryServices;
