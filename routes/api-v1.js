'use strict';
const express = require('express');
const getModel = require('../middleware/router-model.js');
const authMiddleWare = require('../src/auth/middleware/allmiddleware');
// const routerAuth = require('../src/auth/router');

//Auth middleware
// const 

const router = express.Router();

router.param('model', getModel);

// routerAuth.post('/signup',postSignUpHandler);
// routerAuth.post('/signin',basicAuth,postSignInHandler);

router.get('/:model',authMiddleWare('read'), getAllHandler);
router.get('/:model/:id',authMiddleWare('read'), getOneHandler);
router.post('/:model',authMiddleWare('create'), postAllHandler);
router.put('/:model/:id',authMiddleWare('update'), updateAllHandler);
router.delete('/:model/:id',authMiddleWare('delete'), deleteAllHandler);

/**
 * / Get All Handler (All Routes)
 * @param req
 * @param res
 * @param next
 */
//////////////////get  \\\\\\\\\\\\\\\\
function getAllHandler(req, res, next){
  let id = req.params.id;
  req.model.get(id).then(data=>{
    const count = data.length;
    const results = data;
    res.json({count, results});
  }).catch((err) => next(err.message));
  
}
/**
 * / Get One Handler (All Routes)
 * @param req
 * @param res
 * @param next
 */
/////////////get by id\\\\\\\\\\\\\
function getOneHandler(req, res, next){
  let id = req.params.id;
  req.model.get(id).then(data=>{
    const count = data.length;
    const results = data;
    res.json({count, results});
  }).catch((err) => next(err.message));
    
}

/**
 * / Post All Handler (All Routes)
 * @param req
 * @param res
 * @param next
 */

/////////////////post   create\\\\\\\\\\\\
function postAllHandler(req, res, next){
  req.model.create(req.body)
    .then(data=>{
      res.json(data);
    })
    .catch((err) => next(err.message));
}
/**
 * / Update All Handler (All Routes)
 * @param req
 * @param res
 * @param next
 */
////////////////update\\\\\\\\\\\
function updateAllHandler(req, res, next){
  const id = req.params.id;
  const updateing = req.body;
  req.model.update(id, updateing).then(data=>{    
    res.json(data);
  }).catch((err) => next(err.message));
}

/**
 * / Delete Handler (All Routes)
 * @param req
 * @param res
 * @param next
 */
////////////delete\\\\\\\\\\\\\\\
function deleteAllHandler(req, res, next){
  const id = req.params.id;
  req.model.delete(id).then(data=>{    
    res.json(data);
  }).catch((err) => next(err.message));
}

module.exports = router;