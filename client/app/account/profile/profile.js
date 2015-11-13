'use strict';

angular.module('booktradeBootstrapApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/profile', {
        templateUrl: 'app/account/profile/profile.html',
        controller: 'ProfileCtrl'
      });
  });
