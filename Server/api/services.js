const express = require('express');
const {
  getAllServices,
  createService,
  getServiceById,
  updateService,
  getServiceByPurchaserId,
  getServiceByUser,
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

servicesRouter.get('/:purchaserId', requireUser, async (req, res, next) => {
  let id = req.params.purchaserId;
  try {
    if ((id = req.user.id)) {
      let getServicesForMe = await getServiceByPurchaserId(id);
      console.log('this is get services for me', getServicesForMe);
      res.send(getServicesForMe);
    }
  } catch (error) {
    next(error);
  }
});

servicesRouter.get('/:username', requireUser, async (req, res, next) => {
  let username = req.user.username;
  try {
    let getServicesByMe = await getServiceByUser(username);
    console.log('&&&&&&&&&&this is services be me', getServicesByMe);
    res.send(getServicesByMe);
  } catch (error) {
    next(error);
  }
});

// POST /api/services

servicesRouter.post('/', requireUser, async (req, res, next) => {
  // console.log('this is req.body', req.body);
  console.log('server api/services/create is where I am');
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
      console.log('heyyyyyyyy newservice:', newService);
      res.send(newService);
    } catch (error) {
      console.error('this is new services error: ', error);
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
