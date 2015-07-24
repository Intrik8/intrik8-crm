

var customer = require('../models/customer.js');


exports.postCustomer = function(req, res){
  if(req.body.firstName == customer.findById({firstName: req.body.firstName})){
    res.send("Customer Exists with that first name and last name.");
  };
    var customer = new customer();
    customer.firstName = req.body.firstName;
    customer.lastName = req.body.lastName;
}
exports.getCustomers = function(req, res){
  //Uses the Test model to find all tests
  customer.find(function(err, customers){
    if (err){
      res.send(err);
    };
    res.render('customer/showAllCustomers.jade');

  });
};
