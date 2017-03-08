var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type : String,
    unique : true,
    required : true,
    trim : true
  },

  firstName : {
    type : String,
    required : true,
    trim : true
  },

  lastName : {
    type : String,
    required : true,
    trim : true
  },

  password : {
    type: String,
    required : true
  },

  isTutor : {
    type : Boolean,
    required : true
  },

  firstLogin : {
    type : Boolean
  }
});

// TODO replace with passportJs
// create an authenticate method in UserSchema statics
// authenticates input against database documents
  UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({ email : email })
        .exec(function(error, user) {
          // check if an error is thrown before while finding for the user
          if (error) {
            return callback(error);
          // check if user is not found.
          } else if ( !user ) {
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
          }

          // check if password is correct
          /*
          bcrypt.compare(password, user.password, function(error, result) {
            if(result == true) {
              return callback(null, user);
            } else {
              return callback();
            }
          })*/
          return callback(null, user);
        });
  };

  // TODO replace with passportJs
  // hash password before saving to database
  UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
      if(err) {
        return next(err);
      }

      user.password = hash;
      next();
    })
  });

  var User = mongoose.model('User', UserSchema);
  module.exports = User;
