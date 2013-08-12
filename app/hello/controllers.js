'use strict'

var helloModule = angular.module('HelloModule', []);

helloModule.controller('hello', function($scope) {
    $scope.greeting = { text: 'Hello' };
});

helloModule.controller('list', function($scope) {
    
});

helloModule.controller('detail', function($scope, $routeParams) {
    alert($routeParams.id);
});

helloModule.config(
    function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'list',
                templateUrl: 'views/list.html'
            })
            .when('/view/:id', {
                controller: 'detail',
                templateUrl: 'views/detail.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
);