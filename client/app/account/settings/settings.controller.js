'use strict';

angular.module('booktradeBootstrapApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};

    // Testing with firstName with view to add lastName and location according to schema
    $scope.user = {
      firstName: ''
    };

    $scope.updateUserInfo = function () {
      // TODO: make a new view of profile info
      // TODO: when user clicks settings wheel allow them to choose either password or profile from a dropdown
      // TODO: change user settings, hopefully with a http put
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
