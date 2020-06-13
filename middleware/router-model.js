'use strict';
// const express = require('express');
const products = require('../lib/models/products/products.collection.js');
const categories = require('../lib/models/categories/categories.collection.js');
// const router = express.Router();

// router.param('model', getModel);
/**
 * Function that specifying the Model
 * 
 * @function
 * @param req
 * @param res
 * @param next
 */
/**404 Error. */

function getModel(req, res, next){
  const model = req.params.model;
  switch (model) {
  case 'products':
    req.model = products;
    next();
    break;
  case 'categories':
    req.model = categories;
    next();
    break;
    
  default:
    next('invalid model');
    break;
  }
}
module.exports = getModel;