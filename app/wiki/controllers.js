'use strict'

var wikiModule = angular.module('WikiModule', []);

wikiModule.controller('wiki.index', function($scope) {
    
});

wikiModule.controller('wiki.view', function($scope, $routeParams) {
    $scope.wikidoc = {
        title: decodeURIComponent($routeParams.name)
    };
});

wikiModule.controller('wiki.edit', function($scope, $routeParams) {
    
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