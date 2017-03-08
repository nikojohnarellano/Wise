'use strict';

angular.module('wise')
.service('tutorDataService', function($http, $location) {
  this.postData = function(data) {
    $http
        .post('../tutors/tutor-info', data)
        .then(function(data){
            console.log('Data is successfully posted : ' + data);
        })
        .catch(function(data){
            console.log('Error: ' + data);
        })
    }
});
