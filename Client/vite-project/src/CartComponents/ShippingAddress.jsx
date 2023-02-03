import React, { useState } from 'react';
import { useAuth } from '../custom-hooks';

const ShippingAddresses = () => {
  const user = useAuth();
  const [isDeleteChecked, setIsDeleteChecked] = useState(false);
  const [addToSend, setAddToSend] = useState('');

  const ifExistsAdd = localStorage.getItem('shipping-Address');

  function displayAdd() {
    let sendToAdd = JSON.stringify(ifExistsAdd);
    setAddToSend(sendToAdd);
    return (
      <div>
        <h2>Your Order is being sent to this address:</h2>
        <div>{addToSend}</div>
      </div>
    );
  }

  const submitHandler = async (e) => {
    try {
      if (isDeleteChecked === true) {
        localStorage.removeItem('shipping-Address');
        const redirUserCart = () => {
          window.location.href = '/usercart';
        };
        redirUserCart();
      } else {
        displayAdd();
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (user.token && ifExistsAdd) {
    const readableAddress = JSON.stringify(ifExistsAdd);

    return (
      <div>
        <div>
          {' '}
          {addToSend === '' ? (
            <p>Your Order Will Be Shipped Here! {readableAddress}</p>
          ) : (
            <p>Please Select an Address To Ship to</p>
          )}
        </div>
        <form>
          <label>Click Here To remove A Saved Address {readableAddress}</label>
          <input
            id='deletedshippingadd'
            label='Delete Shipping Address:'
            type='checkbox'
            checked={isDeleteChecked}
            onChange={(e) => {
              setIsDeleteChecked(!isDeleteChecked);
            }}
          ></input>
          <button onClick={submitHandler}>Select</button>
        </form>

        <div></div>
      </div>
    );
  } else {
    return <div>No Saved Addresses Found</div>;
  }
};

export default ShippingAddresses;
