
'use strict';
angular.module('booktradeBootstrapApp')
// User wants to trade a book
.controller('MainCtrl', function ($scope, $http, Auth, $mdDialog) {


    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.books = [];
    $scope.usersBooks = [];


    // Get list of all books from db
    $http.get('/api/books').success(function (books) {
      $scope.books = books;

      // Get users books
      $scope.books.forEach(function (book) {
        if (book.owner === $scope.getCurrentUser().name) {
          $scope.usersBooks.push(book);
        }
      })

      console.log('Books: ', books);
    }).error(function (error) {
      console.log('There was a problem: ', error);
    });

    $scope.currentTradeBook = {};

    // User pressed trade button
    $scope.trade = function (ev, userClickedBook) {

      $scope.currentTradeBook = userClickedBook;

      $mdDialog.show({
        controller: 'TradeDialogCtrl',
        templateUrl: 'app/trade-dialog/trade-dialog.html',
        clickOutsideToClose:true,
        // Pass in vals from MainCtrl
        locals: {
          userClickedBook: userClickedBook,
          usersBooks: $scope.usersBooks
        }
      })
        .then(function(answer) {
          console.log('Traded ' + userClickedBook.title + ' for ?');
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    // Check if book belongs to user
    $scope.isUsers = function (book) {
      return $scope.getCurrentUser().name === book.owner;
    }
  });

// TODO: fix schema for book trade
// TODO: prevent user interacting with app if they are not logged in. always redirect to login
// TODO: add material toast for UX when they add a book
// TODO: If 0 trade requests in the `trade-requests` view, show a different message
// TODO: loading spinner for 'add' search and every get request across site
// TODO: why is scss showing errors in the 'messages' pane every time you create a route
// TODO: improve footer on every ng-repeat item in `my-books` and `all books`
// TODO: message if nothing returned from 'add' search
// TODO: Fix top menu: it goes two-tier at a certain browser width
