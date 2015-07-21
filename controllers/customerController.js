

var customer = require('../models/customer.js');


exports.postCustomer = function(req, res){
  if(req.body.firstName == customer.findById({firstName: req.body.firstName})){
    res.send("Customer Exists with that first name and last name.");
  };
    var customer = new customer();
    customer.firstName = req.body.firstName;
    customer.lastName = req.body.lastName;



}
