import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import UserCart from './UserCart';
import { useAuth } from '../custom-hooks';

const CartImage = ({ orders }) => {
  const user = useAuth();

  if (orders.length) {
    let countOrders = 0;
    orders.map((order) => {
      if (
        order.incart === true &&
        order.iscomplete === false &&
        order.purchaserId === user.user.id
      ) {
        countOrders++;
        console.log('TIS IS COUNT ORDERS', countOrders);
      }
    });
    return (
      <div>
        <FontAwesomeIcon icon={faCartShopping} />
        <div>{countOrders}</div>
        <div></div>
      </div>
    );
  }
};

export default CartImage;
