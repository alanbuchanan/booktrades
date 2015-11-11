'use strict';

angular.module('booktradeBootstrapApp')
  .controller('TradeDialogCtrl', function ($scope, $http, userClickedBook, usersBooks, $mdDialog, Auth) {

    // Passed in from the MainCtrl, which called the dialog
    $scope.usersBooks = usersBooks;
    $scope.userClickedBook = userClickedBook;

    $scope.getCurrentUser = Auth.getCurrentUser;

    console.log('userbook:', $scope.userClickedBook);
    console.log('usersBooks: ', $scope.usersBooks);

    var tradeItem = {
      wanted: {
        user:$scope.userClickedBook.owner,
        bookId: $scope.userClickedBook.id
      },
      offered: {
        user: $scope.usersBooks[0].owner,
        bookId: $scope.usersBooks[0].id
      }
    };

    // User pressed 'save' on the trade dialog
    $scope.save = function () {
      $http.post('api/trades', tradeItem).success(function () {

      }).error(function (error) {
        console.log('There was a problem: ', error);
      })
      $scope.cancelDialog();
    };

    // User pressed 'cancel' on trade dialog
    $scope.cancelDialog = function () {
      $mdDialog.hide();
    }
  });
