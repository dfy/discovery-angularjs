'use strict';

describe('Wiki Controllers', function () {

  var $scope;
  var $controller;
  var $q;
  var $location;

  var pouchGetDeferred,
      pouchPutDeferred,
      pouchWrapperMock,
      resolvePouchGet,
      resolvePouchPut;

  var wikiDoc = {
    title: 'Title',
    body: 'Lorem ipsum, etc'
  };

  /* set up 
   */

  // init module
  beforeEach(
    module('WikiModule')
  );
  // inject angular stuff
  beforeEach(inject(function($injector) {
    $scope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $q = $injector.get('$q');
    $location = $injector.get('$location');
  }));
  // init pouch mock
  beforeEach(function(){
    pouchWrapperMock = {
      get: function(param) {
        return pouchGetDeferred.promise;
      },
      put: function(param) {
        return pouchPutDeferred.promise;
      }
    };
    resolvePouchGet = function(value) {
      pouchGetDeferred = $q.defer();
      pouchGetDeferred.resolve(value);
    };
    resolvePouchPut = function(value) {
      pouchPutDeferred = $q.defer();
      pouchPutDeferred.resolve(value);
    };
  });

  /* describe...
   */

  describe('wiki.view', function() {

    function getController() {
      var params = {
        $scope: $scope,
        $routeParams: {
          project: 'test',
          name: 'hello world'
        },
        pouchWrapper: pouchWrapperMock
      };
      return $controller('wiki.view', params);
    }

    it('should create an editUrl with the route params name', function() {
      resolvePouchGet(wikiDoc);

      var ctrl = getController();
      $scope.$apply();
      
      expect($scope.editUrl).toEqual(
        '/#/project/test/wiki/hello%20world/edit'
      );
    });

    it('should pass the retrieved document to scope', function() {
      resolvePouchGet(wikiDoc);

      var ctrl = getController();
      $scope.$apply();

      expect($scope.wikidoc).toBe(wikiDoc);
    });
  });

  describe('wiki.edit', function() {

    function getController() {
      var params = {
        $scope: $scope,
        $routeParams: {
          project: 'test',
          name: 'hello world'
        },
        pouchWrapper: pouchWrapperMock
      };
      return $controller('wiki.edit', params);
    }

    it('should create a viewUrl with the route params name', function() {
      resolvePouchGet('get');

      var ctl = getController();
      
      expect($scope.viewUrl).toEqual(
        '/#/project/test/wiki/hello%20world'
      );
    });

    it('should pass the retrieved document to scope', function() {
      resolvePouchGet(wikiDoc);

      var ctrl = getController();
      $scope.$apply();

      expect($scope.wikidoc).toBe(wikiDoc);
    });

    it('should save the document and redirect to the viewUrl after editing', function() {
      spyOn(pouchWrapperMock, 'put').andCallThrough();

      resolvePouchGet(wikiDoc);
      resolvePouchPut('put');

      var ctl = getController();
      $scope.$apply();

      $scope.editComplete();
      $scope.$apply();

      expect(pouchWrapperMock.put).toHaveBeenCalledWith(wikiDoc);
      expect($location.path()).toBe('/project/test/wiki/hello world');
    });
  });
});