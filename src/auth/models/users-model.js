'use strict';
const dbModel = require('./user-schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = process.env.SECRET || 'mysecret';

// console.log(dbModel);

class Models{
  constructor(){
    this.schema = dbModel;
    this.role ={
      'user':['read'],
      'writer':[ 'read', 'create'],
      'editor':[ 'read', 'create', 'update'],
      'admin':[ 'read', 'create', 'update', 'delete'],
    };
  }
  async hash(pass){
    pass = await bcrypt.hash(pass, 5);
    return pass;
  }
  token(record){
    // console.log('record',record);
    // , capabilities: record.role
    const userData = {username:record.username, capabilities:record.role};
    const token =jwt.sign(userData, SECRET, {expiresIn:'15min'});
    // console.log(token);
    return token;
  }
  async can(capability, role){
    console.log('capability', capability);
    console.log('role.capabilities',role);
    try {
      if(this.role[role.capabilities]){
        return this.role[role.capabilities].includes(capability);    
      }
      else false;

    }catch(err){err.message;}
    
    
  }

  async valid(user, pass){
    
    try {
      // console.log(user, pass);
      const result = await this.schema.findOne({ username: user });
      // console.log(result);
      if (result) {
        console.log(result);
        const isValid = await bcrypt.compare(pass, result.password);
        return isValid ? result : Promise.reject('you should to signup');
      }
      // console.log('here')
      // return Promise.reject('you should to sign up');
    } catch (error) {
      return error;
    }
    

    
  }
  //////////////////===============\\\\\\\\\\\\\\\\\\\
  async authenticateToken(token){
    try{
      const tokenObject = await jwt.verify(token, SECRET);
      const checkingIfThereIsUser = await this.get(tokenObject.username);

      if(checkingIfThereIsUser){
        return tokenObject;
      }else{
        return 'there is no user';
      }
    }catch(err) {return err.message;}
    
  }

  ///////========\\\\\\\\\\\

  async get(username){
    // record.password= await this.hash(record.password);
    const theIdOfObject = username ? {username} : {};
    return await this.schema.find(theIdOfObject);
  }
  async create(record){
    // record.password= await this.hash(record.password);
    return new this.schema(record).save();
  }
  update(_id, record){
    return this.schema.findByIdAndUpdate(_id, record, {new:true});
  }
  delete(_id){
    return this.schema.findByIdAndDelete(_id);
  }
}
module.exports = new Models();
