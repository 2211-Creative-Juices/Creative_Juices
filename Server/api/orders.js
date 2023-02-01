const express = require('express');
const apiRouter = express.Router();
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { createOrder, getAllOrders, getOrderById } = require('../db/orders');
const ordersRouter = express.Router();
const { requireUser } = require('./utils');

ordersRouter.get('/', async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    console.error('Error getting ordersRouter', error);
    next(error);
  }
});

ordersRouter.get('/:orderId', requireUser, async (req, res, next) => {
  const id = req.params.orderId;
  console.log('this is req.params in ORDERS', req.params);
  try {
    if (req.user) {
      const orderbyId = await getOrderById(id);
      res.send(orderbyId);
    }
  } catch (error) {
    console.error('error getting orderby ID', error);
    next(error);
  }
});

// ordersRouter.get('/:purchaserId', requireUser, async (req, res, next) => {
//   let id = req.params.purchaserId;
//   console.log('Req Params', req.params);

//   try {
//     if ((id = req.user.id)) {
//       let username = req.user.username;
//       let getOrderForMe = await getAllOrdersByUser(username);
//       console.log('this is getorderforme', getOrderForMe);
//       res.send(getOrderForMe);
//     }
//   } catch (error) {
//     console.error('getOrdersForMe', error);
//     next(error);
//   }
// });

ordersRouter.post('/', requireUser, async (req, res, next) => {
  console.log('this is req.body', req.body);
  const { orderdate, purchaserId, iscomplete, incart, serviceId, bundlekitId } =
    req.body;
  if (req.user);
  {
    try {
      const newOrder = await createOrder({
        orderdate,
        purchaserId,
        iscomplete,
        incart,
        serviceId,
        bundlekitId,
      });
      console.log('This is newOrder:', newOrder);
      res.send(newOrder);
    } catch (error) {
      console.error('this is new order error:', error);
      next(error);
    }
  }
});

module.exports = ordersRouter;
