
// function that directs a user to an info page if first logged in
function requireInfo(req, res, next) {
  if(req.session.firstLogin) {
    return res.redirect(req.session.isTutor ? '../tutors/tutor-info' : '../students/student-info');
  }
  return next();
}


module.exports.requireInfo = requireInfo;
