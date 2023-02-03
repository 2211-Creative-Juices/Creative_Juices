import React from 'react';

const OrderHistoryBundles = ({ bundOrders }) => {
  return (
    <div id='oldorders-container'>
      <h2 id='myoldbunds-header'>Bund Previous Orders</h2>
      <div id='oldbundorders-map-container'>
        {bundOrders &&
          bundOrders.map((order) => {
            console.log('this is orders with bundles and such', order);
            if (
              order.iscomplete === true &&
              order.incart === true &&
              order.serviceId === null
            )
              return (
                <div key={order.id} className='myoldbundorders'>
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

export default OrderHistoryBundles;
