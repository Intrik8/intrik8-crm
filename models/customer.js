

var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Basic Schema for messages to be stored in the database.
var customerSchema = new schema({
    firstName: String,
    lastName: String,
    addresses: [{
      address: String,
      city: String,
      state: String,
      zipCode: Number,
      active: Boolean
    }],
    phoneNumbers: [{
      phoneNumber: Number,
      phoneType: String,
      active: Boolean
    }],
    emails: [{
      emailAddress: String,
      emailType: String,
      active: Boolean
    }],
    dateEntered: Date,
    dateOfLastContacted: {type: Date, default: null},
    active: Boolean
});

module.exports = mongoose.model('Customer', customerSchema);
