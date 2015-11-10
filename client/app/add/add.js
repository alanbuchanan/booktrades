'use strict';

angular.module('booktradeBootstrapApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/add', {
        templateUrl: 'app/add/add.html',
        controller: 'AddCtrl'
      });
  });
