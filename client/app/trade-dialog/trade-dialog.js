'use strict';

angular.module('booktradeBootstrapApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/trade-dialog', {
        templateUrl: 'app/trade-dialog/trade-dialog.html',
        controller: 'MainCtrl',
        authenticate: true
      });
  });
