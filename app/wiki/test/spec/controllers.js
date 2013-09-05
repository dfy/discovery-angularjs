'use strict';

describe('Wiki Controllers', function () {

  var $scope;
  var $controller;
  var $q;

  beforeEach(
    module('WikiModule')
  );
  beforeEach(inject(function($injector) {
    $scope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $q = $injector.get('$q');
  }));

  describe('wiki.view', function() {
    it('should create an editUrl with the route params name', function() {

      var deferred = $q.defer();
      deferred.resolve('get');

      var pouchWrapperMock = {
        get: function(param) {
          return deferred.promise;
        }
      };

      var params = {
        $scope: $scope,
        $routeParams: {
          name: 'hello world'
        },
        pouchWrapper: pouchWrapperMock
      };
      var ctrl = $controller('wiki.view', params);
      
      expect($scope.editUrl).toEqual(
        '/#/project/test/wiki/hello%20world/edit'
      );
    });
  });
});