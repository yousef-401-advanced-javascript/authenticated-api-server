'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');


const apiRouter = require('../routes/api-v1.js');


const authRouter = require( '../src/auth/router' );
const router2 = require('../src/auth/extra-routes');



const error404 = require('../middleware/404.js');
const error500 = require('../middleware/500.js');




// console.log(app);
app.use('/docs', express.static('./docs'));
/////global middleware
app.use(cors());
app.use(express.json());//middleware to add body to the request in post and put
app.use(morgan('dev'));//to show the time and the status
// app.use(timeStamp);//middleware for every routs for date of the day
// app.use(logger);//middleware implement after the timeStmp to show you some info
app.use(authRouter);
app.use(router2);
app.use(apiRouter);




// app.use('/api/v1',productsRouter);
// app.use('/api/v1',categoriesRouter);



app.use('*', error404);
app.use(error500);

module.exports.server = app;
module.exports.start = port=>{
  const PORT = port || 3000;
  app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));
};




