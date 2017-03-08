var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Tutor = require('../models/tutor');
var mid = require('../middleware');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wise WebApp' });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Wise WebApp' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Wise WebApp' });
});

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

/* GET profile page. */
router.get('/profile', function(req, res, next) {
  res.render('profile', {title : 'Wise WebApp'});
});

/* POST login*/
router.post('/login', function(req, res, next) {
  if(req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if(error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
          req.session.userId = user._id;
          req.session.isTutor = user.isTutor;
          req.session.firstLogin = user.firstLogin;
          return res.redirect(user.isTutor ? '../tutors/tutor-dashboard' : '../students/student-dashboard');
      }});
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

/* POST register*/
router.post('/register', function(req, res, next) {
  if(req.body.firstName && req.body.lastName && req.body.password && req.body.confirmPassword && req.body.email && req.body.optIsTutor) {

    // confirm that user typed same password twice
    if(req.body.password !== req.body.confirmPassword) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      return next(err);
    }

    // create object with form input
    var userData = {
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : req.body.password,
      confirmPassword : req.body.confirmPassword,
      isTutor : req.body.optIsTutor,
      firstLogin : true
    }

    User.create(userData, function(error, user) {
      if(error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        req.session.isTutor = user.isTutor;
        req.session.firstLogin = user.firstLogin;
        return res.redirect(user.isTutor ? '../tutors/tutor-dashboard' : '../students/student-dashboard');
      }
    });
  } else {
    var err = new Error('All fields required');
    err.status = 400;
    return next(err);
  }
});


module.exports = router;
