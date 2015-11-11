'use strict';

angular.module('booktradeBootstrapApp')
  .controller('TradeDialogCtrl', function ($scope, userClickedBook, usersBooks, $location, $mdDialog) {

    $scope.usersBooks = usersBooks;
    $scope.userClickedBook = userClickedBook;

    console.log('userbook:', $scope.userClickedBook);

    // User pressed 'save' on the trade dialog
    $scope.save = function () {
      console.log('YES');
      $scope.cancelDialog();
    }

    // User pressed 'cancel' on trade dialog
    $scope.cancelDialog = function () {
      $mdDialog.hide();
    }
  });
