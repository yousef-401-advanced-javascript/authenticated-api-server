'use strict';
const base64 = require('base-64');
const users = require('../models/users-model');





module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('invalid header');
  }
  else {
    const basic = req.headers.authorization.split(' ').pop();
    const [user, pass] = base64.decode(basic).split(':');
    users.valid(user, pass).then((validUser) => {
      // console.log(validUser);
      let token = users.token(validUser);
      res.cookie('token',token,{maxAge:900000});
      // .send('you are there :)');
      req.token = token;
      next();
    })
      .catch((err) => next(err.message));
  }
};