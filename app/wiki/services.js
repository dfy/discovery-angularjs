'use strict'

/*  TODO
 *
 *  - separation of wiki data into projects, including links
 *  -- pass whole wikidoc into markdown directive so the project can be used -
 *     e.g. use current project in links unless another is specified
 *  - authentication
 *  - consider one db per project... easier to query and probable performance 
 *    benefit
 *  - replace links with directives
 */

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
        create: pouchWrapper.put, // TODO rename to save?
        find: pouchWrapper.get,
        fetchAll: pouchWrapper.fetchAll
    };
}]);

wikiModule.factory('pouchWrapper', ['$q', '$rootScope', 'myPouch', function($q, $rootScope, myPouch) {

    var getDefaultHandler = function(pouchFunc) {
        return function(param) {
            var deferred = $q.defer();
            pouchFunc(param, function(err, res) {
                $rootScope.$apply(function() {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
                });
            });
            return deferred.promise;
        };
    };

    return {
        put: getDefaultHandler(myPouch.put),
        get: getDefaultHandler(myPouch.get),
        fetchAll: function(project) {
            // map is essentially recreated in a pouchdb scope, like this:
            //  eval('fun.map = ' + fun.map.toString() + ';');
            // it is therefore impossible (?) to pass any variables in
            wikiModule._currentProject = project;
            var map = function(doc) {
                if (doc.project && doc.project == wikiModule._currentProject) {
                    emit(doc._id, doc);
                }
            };
            var deferred = $q.defer();
            myPouch.query(
                { map: map },
                function(err, res) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var items = [];
                        for (var i in res.rows) {
                            items.push(res.rows[i].value);
                        }
                        console.log(items);
                        deferred.resolve(items);
                    }
                }
            );
            return deferred.promise;
        }
    };
}]);
wikiModule._currentProject = undefined;

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

