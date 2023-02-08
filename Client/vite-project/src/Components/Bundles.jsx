import React from 'react';
import { useState } from 'react';
import bundlekit from '../assets/images/bundlekit.jpeg';
import { useAuth } from '../custom-hooks';
import { createABundle } from '../api/bundles';
import { createNewOrder } from '../api/orders';
import ServiceForm from './ServiceForm';

const AllBundles = ({ bundles, todaysDate, services }) => {
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
      <div className='flex-bunds'>
        <div>
          <ServiceForm services={services} todaysDate={todaysDate} />
        </div>
        <img id='bundkitimg' src={bundlekit}></img>
        <form id='bundle-form-main' onSubmit={(e) => submitHandler(e)}>
          <h3> Add a Paint Kit!</h3>
          <div id='bundles-map-container'>
            <label>
              Number of Kits
              <input
                type='number'
                value={quantity}
                id='input-bundles'
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              ></input>
            </label>
            <p id='includes'>
              {' '}
              An individual kit includes two paintbrushes (small and large), a
              set of watercolor cards with envelopes, watercolor paints, and
              water container.
            </p>
            <button id='bund-cart-butt' onClick={submitHandler} type={'submit'}>
              Add Paint Kit to Cart
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllBundles;
