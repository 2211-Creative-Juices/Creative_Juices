const express = require('express');
const {
  getAllBundles,
  createBundle,
  getBundleById,
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

// POST /api/bundles

bundlesRouter.post('/', requireUser, async (req, res, next) => {
  const { bundlename, quantity, bundlecost } = req.body;

  try {
    const newBundle = await createBundle(req.body);
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
