var express = require('express');
var router = express.Router();
var Tutor = require('../models/tutor');
var User = require('../models/user');
var mid = require('../middleware');

// Middleware function that creates a tutor 1
function saveTutor (req, res, next) {
  if(req.body.program && req.body.contact && req.body.courses) {

    var tutorData = {
      user : req.session.userId,
      program : req.body.program,
      description : req.body.description,
      contact : req.body.contact,
      courses : req.body.courses,
      rate : req.body.rate,
      availability : [],
      appointments : []
    }

    Tutor.create(tutorData, function(error, tutor) {
      if(error) {
        console.log(error.message);
        return next(error);
      } else {

        // Set the user's first login value to be false
        User.findOneAndUpdate(
          {'_id' : tutor.user},
          {'firstLogin' : false},
          {upsert : false},
          function(error, user) {
            if(error) {
              var err = new Error('Error in updating user');
              err.status = 500;
              return next(err);
            } else {
              // set the session to false
              req.session.firstLogin = false;
              res.redirect('../tutors/tutor-dashboard');
            }
        });
      }
    });
  } else {
    var err = new Error('Program, contact and courses are required fields');
    err.status = 400;
    return next(err);
  }
}

function addAvailability(req, res, next) {
  if(req.body.day && req.body.start && req.body.end) {
    var availabilityItems = [],
        length            = req.body.day.length;

    for(var i = 0; i < length; i++) {
      availabilityItems.push({
        day : req.body.day[i],
        startTime : req.body.start[i],
        endTime : req.body.end[i]
      });
    }

    Tutor.findOneAndUpdate(
      { user : req.session.userId },
      { $pushAll : { availability : availabilityItems } },
      { upsert : false},
      function(err, tutor) {
        if(err) {
          return next(err);
        } else {
          res.redirect('../tutors/tutor-dashboard');
        }
      }
    );
  } else {
    var err = new Error("Incorrect availability data.");
    err.status = 400;
    return next(err);
  }
}

/* GET tutor-dashboard page. */
router.get('/tutor-dashboard', mid.requireInfo, function(req, res, next) {
  Tutor.find({user : req.session.userId})
       .populate('user')
       .exec(function(err, tutor) {
         if(err) {
           return next(err);
         }

         var tutorData = tutor[0];
         if(tutorData.availability.length) {
           tutorData.availability.sort(function (m1, m2) {
             return m1.day.localeCompare(m2.day);
           });
         }
         res.render('tutor-dashboard', {title : 'Wise WebApp', tutor : tutorData, userId : req.session.userId});
       })
});

/* GET tutor-dashboard page. */
router.get('/tutor-info', function(req, res, next) {
  res.render('tutor-info', {title : 'Wise WebApp', userId : req.session.userId});
});

/* POST register*/
router.post('/tutor-info', saveTutor);

/* POST availability*/
router.post('/availability', addAvailability);


module.exports = router;
