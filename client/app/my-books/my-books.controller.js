'use strict';

angular.module('booktradeBootstrapApp')
  .controller('MyBooksCtrl', function ($scope, $http, Auth, $mdDialog, $mdToast) {

    // Toast
    var last = {
      bottom: true,
      top: false,
      left: false,
      right: true
    };

    $scope.toastPosition = angular.extend({},last);
    $scope.getToastPosition = function() {
      sanitizePosition();
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    function sanitizePosition() {
      var current = $scope.toastPosition;
      if ( current.bottom && last.top ) current.top = false;
      if ( current.top && last.bottom ) current.bottom = false;
      if ( current.right && last.left ) current.left = false;
      if ( current.left && last.right ) current.right = false;
      last = angular.extend({},current);
    }

    $scope.showSimpleToast = function() {
      $mdToast.show(
        $mdToast.simple()
          .content('Your book was successfully deleted!')
          .position($scope.getToastPosition())
          .hideDelay(3000)
      );
    };

    $scope.getCurrentUser = Auth.getCurrentUser().name;
    $scope.books = [];

    // Get list of books from db
    var getBooks = function () {
      $scope.books = [];
      $http.get('/api/books').success(function (books) {
        books.forEach(function (book) {
          if (book.owner === $scope.getCurrentUser) {
            $scope.books.push(book)
          }
        });
      }).error(function (error) {
        console.log('There was a problem: ', error);
      })
    };

    getBooks();

    // Deletes a book from my-books
    $scope.removeMyBook = function (book) {

      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to remove \'' + book.title + '\'?')
        .content('This will also remove any trade requests the book is part of.')
        .ok('Ok')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function () {
        httpDelete();
        $scope.showSimpleToast();
      }, function () {
        // error
      });

      var httpDelete = function () {
        $http.delete('/api/books/' + book.id).success(function () {
          // Also delete trade req
          $http.delete('/api/trades').success(function () {

          }).error(function (error) {
            console.log('error:', error);
          });

          // Get books from db (again) to prevent dupes on front end: inefficient?
          getBooks();
        }).error(function (error) {
          console.log(error);
        })
      };
    }

  });


