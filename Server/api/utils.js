const express = require('express');

function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: 'MissingUserError',
      message: 'You must be logged in first',
    });
  }

  next();
}

module.exports = {
  requireUser,
};
