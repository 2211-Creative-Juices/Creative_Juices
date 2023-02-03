import React, { useState } from 'react';

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState({});
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor='name'>Full Name:</label>
          <input type='text' name='fullname' />
          <label htmlFor='address'>Street Address</label>
          <input type='text' name='streetaddress' />
          <label htmlFor='city'>city</label>
          <input type='text' name='city' />
          <label htmlFor='state'>State</label>
          <input type='text' name='state' />
          <label htmlFor='zip'>Zip Code</label>
          <input type='text' name='zipcode' />
          <button>Change</button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
