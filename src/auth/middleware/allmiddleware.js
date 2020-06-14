'use strict';
const users = require('../models/users-model');
const base64 = require('base-64');
let user;
let pass;

module.exports = (capabilities)=>{
  return(req, res, next)=>{
    let [theMiddleWare, inputType] = req.headers.authorization.split(' ');
    // console.log(req.headers.authorization);//header bearer jadlkfjaskfjsmkdmf324
    try{
      switch (theMiddleWare) {
      case 'Bearer':
        users
          .authenticateToken(inputType)
          .then(validUser=>{
            users.can(capabilities, {capabilities:validUser.role}).then(booleanVal=>{
              if(booleanVal){
                req.user = validUser;
                next();
              }else{next('access denied');}
            });
          });
        break;

      case 'Basic':
        [user, pass] = base64.decode(inputType).split(':');
        // console.log(user, pass);
        users.valid(user, pass)
          .then((validUser) => {
            // console.log(validUser);//user obj id, name, 
            if(validUser){
              users.can(capabilities, {capabilities:validUser.role})
                .then(booleanVal=>{
                  if(booleanVal){
                    console.log(booleanVal);
                    let token = users.token(validUser);
                    res.cookie('token',token,{maxAge:900000});
                    req.token = token;
                    next();
                  }else{next('access denied');}
  
                }).catch(err=>{next(err.message);});
            }else{next('you should to signup');}
          }).catch(err=>{next(err.message);});
        break;
      default:
        next('not authorized');
        break;
      }
    }catch(err){next('some errors');}
  };
};