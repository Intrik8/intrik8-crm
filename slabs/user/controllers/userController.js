

var user = require('../models/user');


exports.postUser = function(req, res){
  var user = new User({
    username : req.body.username,
    password : req.body.password
  });
  user.save(function(err){
    if (err)
      res.send(err);
    res.json({ message: 'New user added.'});
  });
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
