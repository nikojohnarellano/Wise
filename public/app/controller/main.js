'use strict';

angular.module('wise')

.controller('mainCtrl', function($scope, tutorDataService){

})

// controller for tutor info after registration
.controller('tutorRegCtrl', function($scope, tutorDataService) {
  $scope.field = "";
  $scope.formData = {};
  $scope.formData.courses= [];

  $scope.addCourse = function() {
    var data = $scope.field;
    $scope.formData.courses.push(data);
    $scope.field = "";
  }
});
