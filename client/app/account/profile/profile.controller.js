'use strict';

angular.module('booktradeBootstrapApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.errors = {};

    // Testing with firstName with view to add lastName and location according to schema
    $scope.user = {
      firstName: '',
      lastName: '',
      location: ''
    };

    $scope.updateUserInfo = function () {

    };
  });
