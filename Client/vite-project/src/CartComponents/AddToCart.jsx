import React from 'react';
import { createNewOrder } from '../api/orders';

const AddToCartButton = () => {
  const user = useAuth();
  const purchaserId = user.user.id;

  const sendToCart = async (e) => {
    try {
      const newOrder = await createNewOrder(
        user.token,
        purchaserId,
        serviceId,
        bundlekitId
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {' '}
      Add To Cart
      <button onClick={sendToCart}>Add To Cart</button>
    </div>
  );
};

export default AddToCartButton;
