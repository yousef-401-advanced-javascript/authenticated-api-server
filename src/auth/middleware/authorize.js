
'use strict';
const user = require('../models/users-model');
module.exports = (capability)=>{
  return (req, res, next)=>{
    try{

      // console.log(req.user);
      user.can(capability, req.user)
        .then(booleanValue=>{
          // console.log(booleanValue);
          if (booleanValue){
            next();
          }
          else{next('Access Denied OR the token expired');}

        });
    }
    catch(err){next(err.message);}
  };
};