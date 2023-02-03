const express = require('express');
const {
  getAllBundles,
  createBundleKit,
  getBundleById,
  // getBundleByPurchaserId,
  updateBundle,
  getBundleByOrderId,
} = require('../db');

const { requireUser } = require('./utils');
const bundlesRouter = express.Router();

// GET /api/bundles
bundlesRouter.get('/', async (req, res, next) => {
  try {
    const bundles = await getAllBundles();
    res.send(bundles);
  } catch (error) {
    next(error);
  }
});

// servicesRouter.get('/:userId', requireUser, async (req, res, next) => {
//   let id = req.params;
//   try {
//     if ((id = req.user.id)) {
//       let getServicesForMe = await getServicesByUser(id);
//       // console.log('this is get services for me', getServicesForMe);
//       res.send(getServicesForMe);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

bundlesRouter.get('/:orderId/order', requireUser, async (req, res, next) => {
  let id = req.params.orderId;
  console.log('this is req.params', req.params);
  try {
    if (req.user) {
      let getBundlesByOrder = await getBundleByOrderId(id);
      // console.log('this is get services for me', getServicesForMe);
      res.send(getBundlesByOrder);
    }
  } catch (error) {
    next(error);
  }
});

bundlesRouter.get('/:bundlekitId', requireUser, async (req, res, next) => {
  let id = req.params.bundlekitId;
  console.log('this is req.params for get by bundle id', req.params);
  try {
    if (req.user) {
      const getBundlesById = await getBundleById(id);
      // console.log('this is get services for me', getServicesForMe);
      res.send(getBundlesById);
    }
  } catch (error) {
    next(error);
  }
});

bundlesRouter.post('/', requireUser, async (req, res, next) => {
  const { bundlename, quantity, bundlecost } = req.body;

  try {
    const newBundle = await createBundleKit(req.body);
    res.send(newBundle);
  } catch (error) {
    next(error);
  }
});

//PATCH /api/bundles/:bundlekitId
bundlesRouter.patch('/:bundlekitId', requireUser, async (req, res, next) => {
  const { bundlename, quantity, bundlecost } = req.body;

  const id = req.params.bundlekitId;

  try {
    const ogBundle = await getBundleById(id);

    if (!ogBundle) {
      next({
        error: 'error',
        name: 'NoBundleFoundError',
        message: `Bundle ${id} not found`,
      });
    } else {
      const updatedBundle = await updateBundle(id, {
        bundlename,
        quantity,
        bundlecost,
      });

      res.send(updatedBundle);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = bundlesRouter;
