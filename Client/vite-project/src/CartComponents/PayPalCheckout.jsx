import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
// const { CLIENT_ID_PP } = process.env;

const PayPalCheckout = () => {
  const amount = '2';
  const currency = 'USD';
  return (
    <div id='paypalcontainerthing'>
      <p>
        <span className='total-cost'>$20.00</span>
      </p>
      <PayPalScriptProvider
        options={{
          'client-id':
            'AZTb7Df7o6Lr5vzPeN8i8XCH2Gxi-AeayRcm87xp9LhBD2_Vk-uDXHroFHyD-7GmNGjCq_pLyodahvim',
        }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(function (details) {
              // This function shows a transaction success message to your buyer.
              alert(
                'Transaction completed by ' + details.payer.name.given_name
              );
            });
          }}
        />
      </PayPalScriptProvider>
      <form>
        <button></button>
      </form>
    </div>
  );
};

export default PayPalCheckout;
