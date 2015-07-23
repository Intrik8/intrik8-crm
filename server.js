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
var colors = require('colors');
var systemConfig = require('./cfg/systemConfig.json');
var pub = __dirname;
var router = express.Router();
var modulesEnabled = require('./lib/systemCalls').GetModulesInstalled;
var modulesInstalled = [];


console.log('Welcome to ' + systemConfig.name + '\n');
/*
  Setup Controllers based on system config file, offers the ability to turn on
  and off controller
  Also creates a variable based on the name called (name)Controller.  Convention
  needed for these modules.
  */
console.log('Loading Modules:');
for(var i=0; i<modulesEnabled.length; i++){
    try{
      var controller = modulesEnabled[i]+'Controller';
      
      eval(systemConfig.modules[i].name + "Controller = require('./controllers/" + controller+"')");
      console.log('\tLoaded: ' + systemConfig.modules[i].name + ' - ' + 'PASSED'.green);
    }catch(exception){
      console.log('\tLoaded: '+ systemConfig.modules[i].name + ' - '+'FAILED - Module did not load properly.'.red);
    }

}

/*
  Creates the app and sets up view location, engine used, and public location
  Also sets up bodyparser
  */
var app = express();
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
router.route('/api/customers')
  .post(customerController.postCustomer);


/*
  Catch 404 and forwarding to error handler
*/
  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

/*
  development error handler
  will print stacktrace
*/
  if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
          res.status(err.status || 500);
          res.render('error', {
              message: err.message,
              error: err
          });
      });
  }

/*
  production error handler
  no stacktraces leaked to user
*/
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: {}
      });
  });

var server = app.listen(1337);
console.log('Server loaded in: '+((new Date()).getTime()-beginning) + 'ms\nServer started at port 1337 \nCtrl+C to close');
module.exports = router;
