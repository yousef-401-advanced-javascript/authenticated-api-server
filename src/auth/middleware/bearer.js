'use strict';
const users = require('../models/users-model');

module.exports = (req, res, next)=>{
//   console.log(req.headers);
  if(!req.headers.authorization){
    next('Invalid Header');
  }else{
    const [auth, token] =req.headers.authorization.split(' ');
    if(auth ==='Bearer'){
      users
        .authenticateToken(token)
        .then(validUser=>{
          req.user = validUser;
          // console.log(req.user.capabilities); //the user name
          next();
        }).catch(e=>next('Invalid login', e.message));
    }else{
      next('Invalid auth header');
    }
  }
};