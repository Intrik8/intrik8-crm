

var user = require('../models/user.js');


exports.postUser = function(req, res){

};
exports.getUsers = function(req, res){
  user.find(function(err, users){
    if(err)
      res.send(err);
    res.json(users);
  });
};

exports.getUserById = function(req, res){
  user.findById(req.params.user_id, function(err, user){
        if(err)
          res.send(err);
        res.send(user);
  });
};
