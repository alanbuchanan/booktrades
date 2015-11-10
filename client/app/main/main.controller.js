'use strict';

angular.module('booktradeBootstrapApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.books = [];

    $http.get('/api/books').success(function (books) {
      $scope.books = books;
      console.log('Books: ', books);
    }).error(function (error) {
      console.log('There was a problem: ', error);
    })
  });

// TODO: experiment with adding a book to books collection bearing in mind notes made
// TODO: prevent user interacting with app if they are not logged in. always redirect to login
// TODO: can trades view be done in an alert with dropdowns?
