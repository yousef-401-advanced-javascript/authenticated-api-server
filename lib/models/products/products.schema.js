'use strict';
const mongoose = require('mongoose');


const products = mongoose.Schema({
  category:{type:String, required:true},
  name: {type:String, required:true},
  display_name: {type:String, required:true},
  description:{type:String, required:true},
});
// console.log(mongoose.model('products', products));
module.exports = mongoose.model('products', products);