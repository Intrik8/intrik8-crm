/*

  Intrik8 CRM
  Version 0.1.0


*/


//Required


var beginning = (new Date()).getTime()
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var systemConfig = require('./cfg/systemConfig.json');
var pub = __dirname;
var router = express.Router();
var modulesEnabled = require('./lib/systemCalls').GetModulesInstalled;
var modulesInstalled = [];
console.log('Welcome to ' + systemConfig.name + '\n');
/*Setup Controllers based on system config file, offers the ability to turn on
  and off controller
  Also creates a variable based on the name called (name)Controller.  Convention
  needed for these modules.
  */
for(var i=0; i<modulesEnabled.length; i++){
    try{
      var controller = modulesEnabled[i]+'Controller';
      eval(systemConfig.modules[i].name + "Controller = require('./controllers/" + controller+"')");
      console.log('Loading Modules:\n\tLoaded: ' + systemConfig.modules[i].name);
    }catch(exception){
      console.log('\tModule: '+ systemConfig.modules[i].name + ' did not load correctly.');
    }

}

router.route('/api/customers')
  .post(customerController.postCustomer);

var app = express();
app.use(logger('dev'));
console.log('Server loaded in: '+((new Date()).getTime()-beginning) + 'ms')
var server = app.listen(1337);
console.log('Server started at port \nCtrl+C to close');
module.exports = router;
