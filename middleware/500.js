'use strict';
/**
 * A module that response 500 erroe
 * 
 * @module 500
 * @param req
 * @param res
 * @param next
 */
/**500 Error. */
module.exports = (err, req, res, next) => {
  res.status(500);
  res.statusMessage = 'Server Error';
  res.json({ error: err });
};