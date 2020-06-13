'use strict';

const express = require('express');
const bcrypt = require('bcryptjs');

const basicAuth = require('./middleware/basic');
const Models = require('./models/users-model');
const oauthMiddleware = require('./middleware/oauth.js');
// const bearerMiddleware = require('./middleware/bearer');

// const hash = require('./models/users-model').schema.hash;

// console.log(Models);

//create router
const router = express.Router();

//routes
console.log('router');

router.post('/signup',postSignUpHandler);
router.post('/signin',basicAuth,postSignInHandler);
router.get('/users',basicAuth,getAllHandler);
router.get('/oauth',oauthMiddleware,signIn);




//handlurs
async function postSignUpHandler(req, res, next) {
  // console.log(req.body);
  req.body.password = await Models.hash(req.body.password);
  Models.get(req.body.username).then(data=>{
    // console.log(data);
    if(!data[0]){
      Models.create(req.body)
        .then(data=>{
          const token =Models.token(data);
          // console.log(token);
          res.json({token:token, user:data});
        });
    }
    else res.send('exist');
  }).catch(next);
  
}
function postSignInHandler(req, res, next){
  // await console.log(req.token);
  res.json({token: req.token});
  // res.json({status:'200 you are in'});

}

function getAllHandler(req, res, next){
  Models.get().then(data=>res.json({data}));
}
function signIn(req, res, next){
  res.json({
    token: req.token ,
    id:req.id,
    bio:req.bio,
    username:req.login,
  });
}

// router.get('/secret', bearerMiddleware, (req, res) => {
//   res.json(req.user);
// });
module.exports = router;