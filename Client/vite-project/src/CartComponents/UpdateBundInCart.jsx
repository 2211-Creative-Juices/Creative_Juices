import React, { useState } from 'react';
import { Item } from 'semantic-ui-react';
import { getAllBundles, updateBundle } from '../api/bundles';
import { useAuth } from '../custom-hooks';

const UpdateBunds = ({ bundlesQuant, bundleId }) => {
  const user = useAuth();
  const [quantity, setQuantity] = useState(0);
  const cost = quantity * 20;
  const name = 'Paint Kits';

  const redirCart = () => {
    window.location.href = '/usercart';
  };

  return (
    <div>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            console.log('this is routineActivityId', bundleId);
            await updateBundle(user.token, bundleId, name, quantity, cost);
            localStorage.removeItem('bundleCost');
            localStorage.setItem('bundleCost', cost);
            redirCart();
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <div>
          <input
            id='quantityupdate'
            value={bundlesQuant}
            type='number'
            placeholder={bundlesQuant}
            onChange={(event) => setQuantity(event.target.value)}
          ></input>
          <button id='quantitySubmit' type='submit'>
            Update Paint Kit Quantity
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBunds;
