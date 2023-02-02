import React from 'react';

const OrderHistory = ({ myOrders }) => {
  return (
    <div id='mypreviousorders-container'>
      <h2 id='mypreviousorders-header'>Previous Orders</h2>
      <div id='oldorders-map-container'>
        {myOrders &&
          myOrders.map((order) => {
            if (order.iscomplete === true && order.incart === true)
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

export default OrderHistory;
