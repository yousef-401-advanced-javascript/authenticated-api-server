'use strict';
const express = require('express');
const bearerMiddleware = require('./middleware/bearer');
const permissions = require('./middleware/authorize');


const router = express.Router();


router.get('/secret', bearerMiddleware, (req, res) => {
  res.json(req.user);
});

router.get('/read', bearerMiddleware, permissions('read'), (req, res)=>{
  res.send('Route /read worked');
});
router.post('/add', bearerMiddleware, permissions('create'), (req, res)=>{
  res.send('Route /add worked');

});
router.put('/change', bearerMiddleware, permissions('update'), (req, res)=>{
  res.send('Route /change worked');

});
router.delete('/remove', bearerMiddleware, permissions('delete'), (req, res)=>{
  res.send('Route /remove worked');  
});
module.exports = router;