'use strict';

angular.module('booktradeBootstrapApp')
  .controller('AddCtrl', function ($scope, $http, $mdDialog, Auth) {
    $scope.userInputBook = 'bible';

    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.books = [];

    $scope.addBook = function (book) {
      console.log('hello from add book');

        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .title('Would you like to add \'' + book.title + '\' to the collection?')
          .content('This book will be added to the collection and tradeable with other users.')
          .ariaLabel('Lucky day')
          .targetEvent(book)
          .ok('OK')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
          var bookDetails = {
            id: book.id,
            title: book.title,
            thumbnail: book.thumbnail,
            author: book.authors[0],
            owner: $scope.getCurrentUser().name,
            tradeRequests: []
          }
          $http.post('/api/books', bookDetails).success(function (data) {
            console.log('Posted your book ', book.title);
          })
        }, function() {
          $scope.status = 'You decided to keep your debt.';
        });

    }

    //$scope.bookLookup = function () {
      console.log('Doing a book lookup for ', $scope.userInputBook);

      $http.get('/api/books/' + $scope.userInputBook).success(function (data) {
        console.log(data);
        $scope.books = data;
      }).error(function (error) {
        console.log(error);
      });
    //}

  });
