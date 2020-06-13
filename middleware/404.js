'use strict';
/**
 * A module that response 404 erroe
 * 
 * @module 404
 * @param req
 * @param res
 * @param next
 */
/**404 Error. */
module.exports = (req, res, next)=>{
  res.status(404);
  res.statusMassage = 'Resource Not Found';
  res.json({error:'Not Found'});
};