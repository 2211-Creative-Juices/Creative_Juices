const express = require('express');
const {
  getAllBundles,
  createBundleKit,
  getBundleById,
  getBundleByPurchaserId,
  updateBundle,
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

bundlesRouter.get('/:purchaserId', requireUser, async (req, res, next) => {
  let id = req.params.purchaserId;
  try {
    if ((id = req.user.id)) {
      let getBundlesForMe = await getBundleByPurchaserId(id);
      console.log('this is get bundles for me', getBundlesForMe);
      res.send(getBundlesForMe);
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/bundles

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
