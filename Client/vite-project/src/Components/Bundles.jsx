import React from 'react';
import { useState } from 'react';
import { useAuth } from '../custom-hooks';
import { createABundle } from '../api/bundles';
import { createNewOrder } from '../api/orders';

const AllBundles = ({ bundles, todaysDate }) => {
  const [quantity, setQuantity] = useState(0);
  const user = useAuth();

  const redirHome = () => {
    window.location.href = '/';
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      let cost = quantity * 20;

      let newBundle = await createABundle(
        user.token,
        bundles.bundlename,
        quantity,
        cost
      );
      console.log('this is my newBUndles', newBundle);

      let bundlekitId = newBundle.id;
      console.log('NEW BUNDLEKITID', bundlekitId);
      let todaysOrderDate = todaysDate;
      console.log('NEW dateeeeee', todaysOrderDate);
      let purchaserId = user.user.id;
      console.log('NEW users.users.id', user.user.id);
      let servicekitId = null;

      const newOrder = await createNewOrder(
        user.token,
        todaysOrderDate,
        purchaserId,
        servicekitId,
        bundlekitId
      );
      redirHome();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id='bundles-container'>
      <p>BUNDLES DESCRIPTION</p>
      <form onSubmit={(e) => submitHandler(e)}>
        <div id='bundles-map-container'>
          <label>
            Number of Kits
            <input
              type='number'
              value={quantity}
              id='input'
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            ></input>
          </label>
          <button onClick={submitHandler} type={'submit'}>
            Add Paint Kit to Cart
          </button>
        </div>
      </form>
    </div>
  );
};

export default AllBundles;
