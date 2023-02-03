const express = require('express');
const apiRouter = express.Router();
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { attachBundleToOrder } = require('../db/bundleKits');
const {
  createOrder,
  getAllOrders,
  getOrderById,
  getAllOrdersByUser,
  getAllOrdersByUserWithBunds,
  updateOrder,
  // getOrdersByIsNotComplete,
} = require('../db/orders');
const { attachServicesToOrder } = require('../db/services');
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

ordersRouter.get('/:username/orders', requireUser, async (req, res, next) => {
  const myOwnUsername = req.params.username;
  console.log('These are the params', req.params);
  try {
    if (req.user) {
      const userOrders = await getAllOrdersByUser(myOwnUsername);
      // const attachedServicesOrders = await attachServicesToOrder(userOrders);
      res.send(userOrders);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

ordersRouter.get(
  '/:username/orders/bundles',
  requireUser,
  async (req, res, next) => {
    const myOwnUsername = req.params.username;
    console.log('These are the params', req.params);
    try {
      if (req.user) {
        const userOrders = await getAllOrdersByUserWithBunds(myOwnUsername);
        // const attachedServicesOrders = await attachServicesToOrder(userOrders);
        res.send(userOrders);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

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

//PATCH /api/orders/:orderId
ordersRouter.patch('/:orderId', requireUser, async (req, res, next) => {
  const { orderdate, purchaserId, iscomplete, incart, serviceId, bundlekitId } =
    req.body;
  console.log('this is the req.body for update orders', req.body);

  const id = req.params.orderId;
  console.log('these are the params for update order', req.params);

  try {
    const ogOrder = await getOrderById(id);

    if (!ogOrder) {
      next({
        error: 'error',
        name: 'NoOrderFoundError',
        message: `Order ${id} not found`,
      });
    } else {
      const updatedOrder = await updateOrder(id, {
        orderdate,
        purchaserId,
        iscomplete,
        incart,
        serviceId,
        bundlekitId,
      });

      res.send(updatedOrder);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
