var express = require('express');
var router = express.Router();
var Student = require('../models/student');
var User = require('../models/user');
var mid = require('../middleware');

/* GET tutors page. */
router.get('/tutors', function(req, res, next) {
  res.render('tutors', { title: 'Wise WebApp' });
});

/* GET student-info page. */
router.get('/student-info', function(req, res, next) {
  res.render('student-info', { title: 'Wise WebApp', userId : req.session.userId });
});

/* GET student-dashboard page. */
router.get('/student-dashboard', mid.requireInfo,  function(req, res, next) {
  res.render('student-dashboard', {title : 'Wise WebApp', userId : req.session.userId});
});

/* POST student info*/
router.post('/student-info', function(req, res, next) {
    if(req.body.program && req.body.level && req.body.contact) {

      var studentInfo = {
        user : req.session.userId,
        program : req.body.program,
        level : req.body.level,
        contact : req.body.contact,
        appointments : []
      }

      Student.create(studentInfo, function(err, student) {
        if(err) {
          console.log(err);
          return next(err);
        } else {
          User.findOneAndUpdate(
            {'_id' : student.user},
            {'firstLogin' : false},
            {upsert : false},
            function(error, user) {
              if(error) {
                var err = new Error('Error in updating user');
                err.status = 500;
                return next(err);
              } else {
                req.session.firstLogin = false;
                return res.redirect('../students/student-dashboard' );
              }
          });
        }
      });

    } else {
      var err = new Error('Please complete required fields.');
      err.status = 500;
      return next(err);
    }
})

module.exports = router;
