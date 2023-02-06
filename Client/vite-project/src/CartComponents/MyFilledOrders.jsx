import React from 'react';
import OrderHistoryBundles from './OrderHistoryBundles';
import OrderHistoryServices from './OrderHistoryServices';

const MyFilledOrders = ({ myOrders, bundOrders }) => {
  console.log('*********************im in my filled orders');
  return (
    <div>
      <OrderHistoryBundles bundOrders={bundOrders} />
      <OrderHistoryServices myOrders={myOrders} />
    </div>
  );
};

export default MyFilledOrders;
