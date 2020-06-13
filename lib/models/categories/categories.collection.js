'use strict';
const categoriesSchema = require('./categories.schema.js');
const Model = require('../model.js');

/**
 * categories Class collection
 * 
 * @class
 * @classdesc extend from main class to use the models
 */

class Products extends Model{
    
  constructor(){
    super(categoriesSchema);
  }
}

module.exports = new Products();