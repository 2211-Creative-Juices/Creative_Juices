const express = require('express');
const {
  getAllServices,
  createService,
  getServiceById,
  updateService,
  // getServiceByPurchaserId,
  getServicesByUser,
  getServicesByOrderId,
} = require('../db');
const { requireUser } = require('./utils');
const servicesRouter = express.Router();

// GET /api/services

servicesRouter.get('/', async (req, res, next) => {
  try {
    const services = await getAllServices();
    res.send(services);
  } catch (error) {
    next(error);
  }
});

servicesRouter.get('/:serviceId', requireUser, async (req, res, next) => {
  let id = req.params.serviceId;
  try {
    if (req.user) {
      const serviceById = await getServiceById(id);
      res.send(serviceById);
    }
  } catch (error) {
    next(error);
  }
});

//// this route is not working

servicesRouter.get('/:userId/service', requireUser, async (req, res, next) => {
  let id = req.params.userId;
  console.log('These are the params', req.params.userId);
  try {
    if (req.user) {
      const userServices = await getServicesByUser(id);
      res.send(userServices);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

servicesRouter.get('/:orderId/order', requireUser, async (req, res, next) => {
  let id = req.params.orderId;
  console.log('this is req.params', req.params.orderId);
  try {
    if (req.user) {
      let getServicesByOrder = await getServicesByOrderId(id);
      // console.log('this is get services for me', getServicesForMe);
      res.send(getServicesByOrder);
    }
  } catch (error) {
    next(error);
  }
});

// servicesRouter.get(
//   '/:userId/usersservice',
//   requireUser,
//   async (req, res, next) => {
//     let id = req.params.userId;
//     console.log('These are the params', req.params);
//     try {
//       if (req.user) {
//         let userServices = await getServicesByUser(id);
//         res.send(userServices);
//       }
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// );

// POST /api/services

servicesRouter.post('/', requireUser, async (req, res, next) => {
  // console.log('this is req.body', req.body);
  // console.log('server api/services/create is where I am');
  const { type, isremote, guests, cost, location, date, notes } = req.body;
  if (req.user);
  {
    try {
      // console.log('this our reqbod:', req.body);
      const newService = await createService({
        type,
        isremote,
        guests,
        cost,
        location,
        date,
        notes,
      });
      // console.log('heyyyyyyyy newservice:', newService);
      res.send(newService);
    } catch (error) {
      // console.error('this is new services error: ', error);
      next(error);
    }
  }
});

//PATCH /api/services/:serviceId
servicesRouter.patch('/:serviceId', requireUser, async (req, res, next) => {
  const {
    name,
    type,
    isremote,
    guests,
    cost,
    location,
    date,
    notes,
    isactive,
  } = req.body;

  const id = req.params.serviceId;

  try {
    const ogService = await getServiceById(id);

    if (!ogService) {
      next({
        error: 'error',
        name: 'NoServiceFoundError',
        message: `Service ${id} not found`,
      });
    } else {
      const updatedService = await updateService(id, {
        name,
        type,
        isremote,
        guests,
        cost,
        location,
        date,
        notes,
        isactive,
      });

      res.send(updatedService);
    }
  } catch (error) {
    next(error);
  }
});

//DELETE /api/services/:serviceId

// servicesRouter.delete('/:serviceId', requireUser, async (req, res, next) => {
//   const id = req.params.serviceId;

//   try {
//     const ogService = await getServiceById(id);
//     console.log('service to be deleted', ogService);

//     if (!ogService) {
//       next({
//         error: 'error',
//         name: 'NoServiceFoundError',
//         message: `Service ${id} not found, cannot update`,
//       });
//     } else {
//       const deletedService = await destroyService(id);
//       console.log('this is the deleted service', deletedService);

//       res.send(deletedService);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = servicesRouter;
