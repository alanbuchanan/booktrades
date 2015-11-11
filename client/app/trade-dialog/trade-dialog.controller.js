'use strict';

angular.module('booktradeBootstrapApp')
  .controller('TradeDialogCtrl', function ($scope, userClickedBook, usersBooks) {

    $scope.usersBooks = usersBooks;
    $scope.userClickedBook = userClickedBook;

    console.log('userbook:', $scope.userBook);

  });
