const express = require('express');
const {
  getAllServices,
  createService,
  getServiceById,
  updateService,
  destroyService,
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

// POST /api/services

servicesRouter.post('/', requireUser, async (req, res, next) => {
  const { name, type, isremote, guests, cost, location, date, notes } =
    req.body;

  try {
    const newService = await createService(req.body);
    res.send(newService);
  } catch (error) {
    next(error);
  }
});

//PATCH /api/services/:serviceId
servicesRouter.patch('/:serviceId', requireUser, async (req, res, next) => {
  const { name, type, isremote, guests, cost, location, date, notes } =
    req.body;

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
