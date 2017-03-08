var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var StudentSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.ObjectId,
    ref : 'User',
    required : true
  },

  program : {
    type : String,
    required : true
  },

  level : {
    type : String,
    required : true
  },

  contact : {
    type : String,
    required : true
  },

  appointments : [{
    tutor : {
        type: mongoose.Schema.ObjectId,
        ref : 'Tutor'
    },

    date : Date,
    startTime : String,
    endTime : String
  }]
});

var Student  = mongoose.model('Student', StudentSchema);
module.exports = Student;
