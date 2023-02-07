import React, { useState } from 'react';
import OrderHistoryBundles from './OrderHistoryBundles';
import OrderHistoryServices from './OrderHistoryServices';

const MyFilledOrders = ({ myOrders, bundOrders }) => {
  const [open, setOpen] = useState(false);
  console.log('*********************im in my filled orders');

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button id='prior-orders-drop' onClick={handleOpen}>
        My Order History
      </button>
      {open ? (
        <div>
          <OrderHistoryBundles bundOrders={bundOrders} />
          <OrderHistoryServices myOrders={myOrders} />
        </div>
      ) : (
        <div> No Previous Orders</div>
      )}
    </div>
  );
};

export default MyFilledOrders;
