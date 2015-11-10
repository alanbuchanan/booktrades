'use strict';

angular.module('booktradeBootstrapApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/my-books', {
        templateUrl: 'app/my-books/my-books.html',
        controller: 'MyBooksCtrl'
      });
  });
