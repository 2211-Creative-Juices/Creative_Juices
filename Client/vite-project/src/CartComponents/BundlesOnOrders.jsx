import React from 'react';
import { useAuth } from '../custom-hooks';
import { getBundlesById } from '../api/bundles';
import { useState } from 'react';

const BundleOrder = ({ myOrders }) => {
  const user = useAuth();
  const [newKitArray, setNewKitArray] = useState([]);
  console.log('this is orders in bundles on orders', myOrders);

  if (myOrders) {
    async function getKits() {
      //   let newKitArray = [];
      for (const order of myOrders)
        if (order.bundlekitId !== null && user.user.id === order.purchaserId) {
          const orderKits = await getBundlesById(user.token, order.bundlekitId);
          console.log('thisis orderkits!!!!!!', orderKits);
          newKitArray.push(orderKits);
          console.log('THIS IS NEWKITARRAY', newKitArray);
          if ((order[i] = myOrders[i].length - 1)) {
            break;
          }
        }
    }
    getKits();
  }
  return (
    <div>
      <h2>My Orders</h2>
      {/* <div>{newKitArray && newKitArray.map((kit) => {})}</div> */}
    </div>
  );
};

export default BundleOrder;
