import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { updateOrder } from '../api/orders';
import { useAuth } from '../custom-hooks';
import { useState } from 'react';
// const { CLIENT_ID_PP } = process.env;

const PayPalCheckout = ({ myOrders }) => {
  const user = useAuth();
  const [payPalId, setPayPalId] = useState('');
  const bundTotal = localStorage.getItem('bundleCost');
  const serviceTotal = localStorage.getItem('serviceCost');

  const amount = parseInt(bundTotal) + parseInt(serviceTotal);

  console.log('TOTAL AMOUNT pasrse ', amount);
  const currency = 'USD';
  return (
    <div id='paypalcontainerthing'>
      <p>
        <span className='total-cost'>
          Total Cost: ${amount ? amount : 0}.00
        </span>
      </p>
      <PayPalScriptProvider
        options={{
          'client-id':
            'AZTb7Df7o6Lr5vzPeN8i8XCH2Gxi-AeayRcm87xp9LhBD2_Vk-uDXHroFHyD-7GmNGjCq_pLyodahvim',
        }}
      >
        <PayPalButtons
          setPayPalId={setPayPalId}
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
                setPayPalId(orderId);
                // localStorage.setItem("paypalId", orderId)
                console.log('this is ORDER ID from paypal', orderId);
                console.log('THIS IS THE PAY PAL ID', payPalId);
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
      <div>
        <button
          onClick={() => {
            console.log('paypal state', payPalId);
            myOrders &&
              myOrders.map(async (order) => {
                if (order.iscomplete === false && order.incart === true) {
                  const updatedOrder = await updateOrder(
                    user.token,
                    order.id,
                    '2-6-23',
                    order.purchaserId,
                    order.iscomplete,
                    false,
                    order.serviceId,
                    order.bundlekitId,
                    payPalId
                  );

                  console.log('updated orders::', updatedOrder);
                  return updatedOrder;
                }
              });
            localStorage.removeItem('serviceCost', 'bundleCost');
          }}
        >
          Finalize
        </button>
      </div>
    </div>
  );
};

export default PayPalCheckout;
