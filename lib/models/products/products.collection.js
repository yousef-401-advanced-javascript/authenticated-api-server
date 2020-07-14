'use strict';

const productsSchema = require('./products.schema.js');
const Model = require('../model.js');

/**
 * products Class collection
 * 
 * @class
 * @classdesc extend from main class to use the models
 */
class Products extends Model{
    
  constructor(){
    //   console.log(productsSchema);
    super(productsSchema);
  }
}

module.exports = new Products();