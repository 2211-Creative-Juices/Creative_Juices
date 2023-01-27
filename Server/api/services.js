const express = require('express');
const {
  getAllServices,
  createService,
  getServiceById,
  updateService,
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

servicesRouter.post('/create', requireUser, async (req, res, next) => {
  console.log('this is req.body', req.body);
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
  if (req.user);
  {
    try {
      // console.log('this our reqbod:', req.body);
      const newService = await createService({
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
