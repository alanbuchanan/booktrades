
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
        locals: {
          userClickedBook: userClickedBook,
          usersBooks: $scope.usersBooks
        }
      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
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
// TODO: fix custom dialog, fix console error that comes up when you click trade in `my-books`. ideally move route to a separate file
// TODO: Trades
// TODO: prevent user interacting with app if they are not logged in. always redirect to login
// TODO: can trades view be done in an alert with dropdowns?
// TODO: add material toast for UX when they add a book
// TODO: message if nothing returned from 'add' search
// tODO: loading spinner for 'add' search
// TODO: improve footer on every ng-repeat item in `my-books` and `all books`
// TODO: why is scss showing errors in the 'messages' pane every time you create a route
// TODO: delete trade-dialog route if unneeded, from VCS as well
