'use strict';

describe('Controller: TradeDialogCtrl', function () {

  // load the controller's module
  beforeEach(module('booktradeBootstrapApp'));

  var TradeDialogCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TradeDialogCtrl = $controller('TradeDialogCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
