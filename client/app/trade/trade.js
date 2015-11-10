'use strict';

angular.module('booktradeBootstrapApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/trade', {
        templateUrl: 'app/trade/trade.html',
        controller: 'TradeCtrl'
      });
  });
