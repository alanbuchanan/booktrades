'use strict';

angular.module('booktradeBootstrapApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $http) {

    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.errors = {};

    $scope.message = '';

    $scope.info = '';

    $scope.user = {
      name: $scope.getCurrentUser().name,
      fullName: '',
      location: ''
    };

    $scope.changeInfo = function () {
      $http.put('/api/users', $scope.user).success(function () {
        $scope.info = 'Information successfuly changed.';
      }).error(function (error) {
        $scope.info = 'There was a problem with the information you entered.';
        console.log('error putting:', error);
      });
    };

    $scope.changePassword = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(function () {
            $scope.message = 'Password successfuly changed.';
          })
          .catch(function () {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
            $scope.message = '';
          });
      }
    };
  });
