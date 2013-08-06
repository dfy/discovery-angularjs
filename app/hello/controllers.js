'use strict'

angular.module('helloMod', [], function() {})
    .controller('hello', function($scope){
    
    $scope.greeting = { text: 'Hello' };
    
});