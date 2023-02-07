import React, { useState } from 'react';
import { useAuth } from '../custom-hooks';
import ShippingAddresses from './ShippingAddress';

const Checkout = () => {
  const user = useAuth();
  const [shippingAddress, setShippingAddress] = useState({});

  const redirCart = () => {
    window.location.href = '/usercart';
  };

  if (user.token) {
    return (
      <div>
        <form
          onSubmit={async (event) => {
            try {
              event.preventDefault();
              localStorage.setItem('shipping-Address', shippingAddress);
              redirCart();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <div>
            <input
              id='set-my-ship'
              onChange={(e) => setShippingAddress(e.target.value)}
              type='text'
              name='address'
              placeholder='Full Address Here:'
            />
            <button>Set Shipping Address</button>
          </div>
        </form>
        <ShippingAddresses />
      </div>
    );
  }
};

export default Checkout;
