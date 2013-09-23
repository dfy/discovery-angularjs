'use strict'

var wikiModule = wikiModule || angular.module('WikiModule', []);

wikiModule.factory('wikiMarkdown', function() {
    // markdown is created in the global scope
    return markdown;
});

wikiModule.factory('myPouch', function() {
    return new PouchDB('testdiscovery');
});

wikiModule.factory('wikiStore', ['pouchWrapper', function(pouchWrapper) {
    return {
        create: pouchWrapper.put,
        find: pouchWrapper.get
    };
}]);

wikiModule.factory('pouchWrapper', ['$q', '$rootScope', 'myPouch', function($q, $rootScope, myPouch) {

    var getDefaultHandler = function(pouchFunc) {
        return function(param) {
            var deferred = $q.defer();
            pouchFunc(param, function(err, res) {
                $rootScope.$apply(function() {
                if (err) {
                    deferred.reject(err)
                } else {
                    deferred.resolve(res)
                }
                });
            });
            return deferred.promise;
        };
    };

    return {
        put: getDefaultHandler(myPouch.put),
        get: getDefaultHandler(myPouch.get)
    };
}]);

    /*return {
        put: function(doc) {
            var deferred = $q.defer();
            myPouch.put(doc, function(err, res) {
                $rootScope.$apply(function() {
                if (err) {
                    deferred.reject(err)
                } else {
                    deferred.resolve(res)
                }
                });
            });
            return deferred.promise;
        },
        get: function(id) {
            var deferred = $q.defer();
            myPouch.get(id, function(err, res) {
                $rootScope.$apply(function() {
                if (err) {
                    deferred.reject(err)
                } else {
                    deferred.resolve(res)
                }
                });
            });
            return deferred.promise;
        }/*,
    remove: function(id) {
      var deferred = $q.defer();
      myPouch.get(id, function(err, doc) {
        $rootScope.$apply(function() {
          if (err) {
            deferred.reject(err);
          } else {
            myPouch.remove(doc, function(err, res) {
              $rootScope.$apply(function() {
                if (err) {
                  deferred.reject(err)
                } else {
                  deferred.resolve(res)
                }
              });
            });
          }
        });
      });
      return deferred.promise;
    }
    }*/

