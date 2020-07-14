'use strict';
const mongoose = require('mongoose');


const personalData = mongoose.Schema({
  username:{type:String, require:true},
  password:{type:String, require:true},
  role:{type:String,lowercase: true, enum :['admin', 'editor', 'writer', 'user'],default: 'user'},
});


module.exports = mongoose.model('Data', personalData);
