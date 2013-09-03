'use strict'

var discoveryApp = angular.module('DiscoveryApp',
  [
    'HelloModule',
    'WikiModule'
  ]
);

discoveryApp.controller('discovery.index', function($scope) {
    
});

discoveryApp.controller('discovery.project', function($scope, $routeParams) {
    //console.log($routeParams);
    $scope.project = {
        name: $routeParams.project
    };
});

helloModule.config(
    function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'discovery.index',
                templateUrl: 'discovery/views/list.html'
            })
            .when('/project/:project', {
                controller: 'discovery.project',
                templateUrl: 'discovery/views/project.html'
            })
            /*.when('/view/:id', {
                controller: 'detail',
                templateUrl: 'views/detail.html'
            })*/
            .otherwise({
                redirectTo: '/'
            });
    }
);