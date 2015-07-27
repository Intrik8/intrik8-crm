/*

  Intrik8 CRM
  Version 0.1.0

TODO:
  1. Work on dynamic controller loading based on json file

*/

//Required

var beginning = (new Date()).getTime()
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var colors = require('colors');
var mongoose = require('mongoose');
var systemConfig = require('./cfg/systemConfig.json');
var pub = __dirname;
var router = express.Router();
var slabsEnabled = require('./lib/systemCalls').GetSlabsInstalled;
var db = mongoose.connect('mongodb://localhost:27017/'+ systemConfig.systemName);
var app = express();
var crudOperators = [
    'post',
    'get',
    'put',
    'delete']
console.log('Welcome to ' + systemConfig.systemName + '\n');
/*
  Setup Controllers based on system config file, offers the ability to turn on
  and off controller
  Also creates a variable based on the name called (name)Controller.  Convention
  needed for these slabs.
  */
console.log('Loading Slabs:');
for(var i=0; i < slabsEnabled.length; i++){
      var slabName = slabsEnabled[i];
      var controller = slabsEnabled[i]+'Controller';
      eval(systemConfig.slabs[i].name + "Controller = require('./slabs/" + slabName+"/controllers/"+ controller +"')");
      /*
      TODO:Get this to load the different routes right away...if possible
      */
      for(var j = 0; j<crudOperators.length; j++){
        //router.route('/api/'+ slabsEnabled[i]+').'+ crudOperators[j]+'('+systemConfig.slabs[i].name+'Controller.'+crudOperators[j]+systemConfig.slabs[i].name.charAt(0).toUpperCase()+systemConfig.slabs[i].name.slice(1)+')');
        router.route('/api/'+ slabsEnabled[i])
              //.get(systemConfig.slabs[i].name+'Controller.'+crudOperators[j]+systemConfig.slabs[i].name.charAt(0).toUpperCase()+systemConfig.slabs[i].name.slice(1))
              console.log(systemConfig.slabs[i].name+'Controller.'+crudOperators[j]+systemConfig.slabs[i].name.charAt(0).toUpperCase()+systemConfig.slabs[i].name.slice(1))
      //console.log('router.route(\'/api/'+ slabsEnabled[i]+'\').'+ crudOperators[j]+'('+systemConfig.slabs[i].name+'Controller.'+crudOperators[j]+systemConfig.slabs[i].name.charAt(0).toUpperCase()+systemConfig.slabs[i].name.slice(1)+')')
      }

      //router.route(eval('/api/' + slabsEnabled[i])).post(eval());
      console.log('\tLoaded: ' + systemConfig.slabs[i].name + ' - ' + 'PASSED'.green);
}

/*
  Creates the app and sets up view location, engine used, and public location
  Also sets up bodyparser
  */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
  }));
app.use(bodyParser.json());
app.use(router);
/*
  Make our db accessible to our router
  */
app.use(function(req,res,next){
    req.db = db;
    next();
});

/*
  Routes being used
*/

/*
  Catch 404 and forwarding to error handler
*/
  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });


var server = app.listen(1337);
console.log('Server loaded in: '+((new Date()).getTime()-beginning) + 'ms\nServer started at port 1337 \nCtrl+C to close');
module.exports = router;
