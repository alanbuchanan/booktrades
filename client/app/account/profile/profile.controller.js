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
      // TODO: make a new view of profile info
      // TODO: when user clicks settings wheel allow them to choose either password or profile from a dropdown
      // TODO: change user settings, hopefully with a http put
    };
  });
