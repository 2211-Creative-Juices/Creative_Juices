import React, { useState } from 'react';
import { useAuth } from '../custom-hooks';
import ShippingAddresses from './ShippingAddress';

const Checkout = () => {
  const user = useAuth();
  const [shippingAddress, setShippingAddress] = useState({});

  if (user.token) {
    return (
      <div>
        <form
          onSubmit={async (event) => {
            try {
              event.preventDefault();
              localStorage.setItem('shipping-Address', shippingAddress);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <div>
            <input
              onChange={(e) => setShippingAddress(e.target.value)}
              type='text'
              name='address'
              placeholder='Full Address Here: Name, Street, City, State, zipcode'
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
