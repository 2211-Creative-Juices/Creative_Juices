import React, { useState } from 'react';
import { useAuth } from '../custom-hooks';

const ShippingAddresses = () => {
  const user = useAuth();
  const [isDeleteChecked, setIsDeleteChecked] = useState(false);

  const redirCart = () => {
    window.location.href = '/usercart';
  };

  const submitHandler = async (e) => {
    try {
      if (isDeleteChecked) {
        localStorage.removeItem('shipping-Address');
        redirCart();
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (user.token) {
    const availableAddress = localStorage.getItem('shipping-Address');
    const readableAddress = JSON.stringify(availableAddress);

    return (
      <div>
        <div></div>
        <form>
          <p></p>
          <label>{readableAddress}</label>
          <input
            id='deletedshippingadd'
            label='Delete Shipping Address:'
            type='checkbox'
            checked={isDeleteChecked}
            onChange={(e) => {
              setIsDeleteChecked(!isDeleteChecked);
            }}
          ></input>

          <button onClick={submitHandler}>Remove Address</button>
        </form>
      </div>
    );
  } else {
    return <div>ERROR WITH ADDRESS</div>;
  }
};

export default ShippingAddresses;
