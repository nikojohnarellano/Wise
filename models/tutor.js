var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var TutorSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.ObjectId,
    ref : 'User',
    required : true
  },

  program : {
    type : String,
    required : true
  },

  courses : [{
    type : String,
    required : true
  }],

  description : {
    type : String
  },

  rate : {
    type : String
  },

  contact : {
    type : String,
    required : true
  },

  availability : [{
    day : String,
    startTime : String,
    endTime : String
  }],

  appointments : [{
    tutor : {
        type: mongoose.Schema.ObjectId,
        ref : 'Student'
    },

    date : Date,
    startTime : String,
    endTime : String
  }]
});

var Tutor  = mongoose.model('Tutor', TutorSchema);
module.exports = Tutor;
