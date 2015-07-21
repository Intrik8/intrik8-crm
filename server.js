/*

  Intrik8 CRM
  Version 0.1.0


*/


//Required

console.log((new Date()).getTime())
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var systemConfig = require('./cfg/systemConfig.json');
var pub = __dirname;
var router = express.Router();
var modulesEnabled = require('./lib/systemCalls').GetModulesInstalled;

//Setup Controllers based on system config file, offers the ability to turn on and off controller
for(var i in modulesEnabled){
    var controller = systemConfig.modules[i].name+'Controller';
    controller = require('./controllers/'+controller);
    console.log('Loaded: ' + systemConfig.modules[i].name);
}


var app = express();
app.use(logger('dev'));
console.log((new Date()).getTime())
