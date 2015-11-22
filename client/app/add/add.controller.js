// User wants to add a book to the collection

'use strict';
angular.module('booktradeBootstrapApp')
  .controller('AddCtrl', function ($scope, $http, $mdDialog, Auth, $mdToast) {

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
          .content('Your book was successfully added!')
          .position($scope.getToastPosition())
          .hideDelay(3000)
      );
    };

    $scope.userInputBook = '';

    $scope.nothingFound = '';

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.books = [];

    $scope.bookIds = [];

    $scope.isLoading = false;

    // User searched for a search term
    $scope.bookLookup = function () {
      $scope.books = [];
      $scope.nothingFound = '';
      $scope.isLoading = true;

      // Populate books array with books from google books api that have a thumbnail and authors
      $http.get('/api/books/' + $scope.userInputBook).success(function (booksFromGoogleApi) {


        // User entered something strange
        if (booksFromGoogleApi.length === 0) {
          $scope.isLoading = false;
          $scope.nothingFound = 'Nothing found for \'' + $scope.userInputBook + '\'.';

        } else {

          booksFromGoogleApi.forEach(function (book) {
            if (book.hasOwnProperty('thumbnail') && book.hasOwnProperty('authors')) {
              $scope.books.push(book);
            }
          });

          $scope.isLoading = false;

        }

      }).error(function (error) {
        console.log(error);
      });
    };

    $scope.addBook = function (book) {

      // First, check for dupes
      $http.get('/api/books').success(function (dbBooks) {

        $scope.isLoading = true;

        dbBooks.forEach(function (dbBook) {
          $scope.bookIds.push(dbBook.id);
        });

        if ($scope.bookIds.indexOf(book.id) !== -1) {
          dupeMessage();
        } else {
          confirmAdd();
        }

        $scope.isLoading = false;

      });

      var dupeMessage = function (ev) {
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Book already in collection')
            .content('Someone else already owns this book!')
            .ok('Got it!')
            .targetEvent(ev)
        );
      };

      var confirmAdd = function () {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .title('Would you like to add \'' + book.title + '\' to the collection?')
          .content('This book will be added to the collection and tradeable with other users.')
          .targetEvent(book)
          .ok('OK')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
          var bookDetails = {
            id: book.id,
            title: book.title,
            thumbnail: book.thumbnail,
            author: book.authors[0],
            owner: $scope.getCurrentUser().name
          };
          $http.post('/api/books', bookDetails).success(function () {
            $scope.showSimpleToast();
          });
        }, function () {
          $scope.status = 'Unable to add that book.';
        });

      };
    };

  });
