/*

  Intrik8 CRM
  Version 0.1.0


*/


//Required

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
