'use strict'

var wikiModule = angular.module('WikiModule', []);

wikiModule.controller('wiki.index', function($scope) {
    //
});

// if we get a 404, create new wikidoc with name from routeparams

wikiModule.controller('wiki.view', function($scope, $routeParams, pouchWrapper) {
    pouchWrapper.get($routeParams.name).then(function(res) {
        $scope.wikidoc = res;
    }, function(reason) {
        console.log(reason);
    });

    $scope.editUrl = 
        '/#/project/' + encodeURIComponent($routeParams.project) + 
        '/wiki/' + encodeURIComponent($routeParams.name) + '/edit';
});

wikiModule.controller('wiki.edit', function($scope, $routeParams, $location, pouchWrapper) {

    var viewUrl = '/project/' + $routeParams.project + '/wiki/' + $routeParams.name;
    $scope.viewUrl = 
        '/#/project/' + encodeURIComponent($routeParams.project) + 
        '/wiki/' + encodeURIComponent($routeParams.name);

    pouchWrapper.get($routeParams.name).then(function(res) {
        $scope.wikidoc = res;
    }, function(reason) {
        console.log(reason);
    });

    /*$scope.wikidoc = {
        title: decodeURIComponent($routeParams.name),
        content: 'As a person I want to succeed so that I can win...'
    };*/

    /*$scope.$watch('wikidoc.content', function() {
        console.log($scope.wikidoc.content);
    });*/

    $scope.editComplete = function() {
        var doc = $scope.wikidoc;
        doc._id = encodeURIComponent(doc.title);

        pouchWrapper.put(doc).then(function(res) {
            console.log("put: ");
            console.log(res);
            $location.path(viewUrl);
        }, function(reason) {
            console.log(reason);
        });
    };
});

wikiModule.config(
    function($routeProvider) {
        $routeProvider
            .when('/project/:project/wiki', {
                controller: 'wiki.index',
                templateUrl: 'wiki/views/index.html'
            })
            .when('/project/:project/wiki/:name', {
                controller: 'wiki.view',
                templateUrl: 'wiki/views/view.html'
            })
            .when('/project/:project/wiki/:name/edit', {
                controller: 'wiki.edit',
                templateUrl: 'wiki/views/edit.html'
            });
    }
);