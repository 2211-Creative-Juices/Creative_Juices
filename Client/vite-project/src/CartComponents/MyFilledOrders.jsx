import React, { useState } from 'react';
import OrderHistoryBundles from './OrderHistoryBundles';
import OrderHistoryServices from './OrderHistoryServices';
import PurchasedIncomplete from './PurchasedIncomplete';

const MyFilledOrders = ({ myOrders, bundOrders }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className='fulfilled-drop'>
      <button id='prior-orders-drop' onClick={handleOpen}>
        My Order History
      </button>
      {open ? (
        <div>
          <PurchasedIncomplete bundOrders={bundOrders} myOrders={myOrders} />
          <OrderHistoryBundles bundOrders={bundOrders} />
          <OrderHistoryServices myOrders={myOrders} />
        </div>
      ) : (
        <div> Click To Open!</div>
      )}
    </div>
  );
};

export default MyFilledOrders;
