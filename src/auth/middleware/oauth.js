'use strict';
require('dotenv').config();
const superagent =require ('superagent');
const users = require('../models/users-model');


const tokenServerUrl = 'https://github.com/login/oauth/access_token';

const remoteAPI = 'https://api.github.com/user';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

module.exports = async (req, res, next)=>{
  console.log(req);
  try{
    const code = req.query.code;
    // console.log('gg');
    const remoteToken = await switchingCodeWithToken(code);
    const remoteUser = await getRemoteUserInfo(remoteToken);
    // console.log(remoteUser);
    const[user, token, id,login, bio]= await getUser(remoteUser);
    req.user = user;
    req.token = token;
    req.id = id;
    req.login = login;
    req.bio =bio ;

    next();
  }catch(err){
    next(err.message);
  }
};



async function switchingCodeWithToken(code){
  // console.log(code);
  const tokenResponse = await superagent.post(tokenServerUrl).send({
    code:code,
    client_id:CLIENT_ID,
    client_secret:CLIENT_SECRET,
    redirect_uri:'http://localhost:3000/oauth',
    grant_type:'authorization_code',
  });
  // console.log('tokenResponse');
  const access_token = tokenResponse.body.access_token;
  return access_token;
}

async function getRemoteUserInfo(token){
  const userResponse = await superagent
    .get(remoteAPI)
    .set('Authorization', `token ${token}`)
    .set('user-agent', 'express-app');
  const user = userResponse.body;
  return user;
}

async function getUser(remoteUser){
  const userRecord = {
    username:remoteUser.login,
    password:await users.hash('wooooow'),
  };
  const user = await users.create(userRecord);
  const token = users.token(user);
  return [user, token, remoteUser.id, remoteUser.login,remoteUser.bio];
}