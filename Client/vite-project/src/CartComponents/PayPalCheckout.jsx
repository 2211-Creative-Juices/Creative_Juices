import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { updateOrder } from '../api/orders';
import { useAuth } from '../custom-hooks';
// const { CLIENT_ID_PP } = process.env;

const PayPalCheckout = ({ myOrders }) => {
  console.log('these are my accessible orders', myOrders);
  const user = useAuth();

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
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                return orderId;
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

// {
//   myOrders &&
//     myOrders.map((order) => {
//       if (order.iscomplete === false && order.incart === true) {
//         let updatedOrder = updateOrder(
//           user.token,
//           order.id,
//           order.date,
//           order.purchaserId,
//           order.iscomplete,
//           order.incart,
//           order.serviceId,
//           order.bundlekitId,
//           orderId
//         );
//         return updatedOrder;
//       }
//     });
// }

export default PayPalCheckout;
