const express = require('express');
const apiRouter = express.Router();
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const {
  createOrder,
  getAllOrdersByUser,
  getAllOrders,
} = require('../db/orders');
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

ordersRouter.get('/:purchaserId', requireUser, async (req, res, next) => {
  let id = req.params.purchaserId;
  console.log('Req Params', req.params);

  try {
    if ((id = req.user.id)) {
      let username = req.user.username;
      let getOrderForMe = getAllOrdersByUser(username);
      console.log('this is getorderforme', getOrderForMe);
      res.send(getOrderForMe);
    }
  } catch (error) {
    console.error('getOrdersForMe', error);
    next(error);
  }
});

ordersRouter.post('/', requireUser, async (req, res, next) => {
  console.log('this is req.body', req.body);
  const { orderdate, purchaserId, iscomplete, incart, totalamount } = req.body;
  if (req.user);
  {
    try {
      const newOrder = await createOrder({
        orderdate,
        purchaserId,
        iscomplete,
        incart,
        totalamount,
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
