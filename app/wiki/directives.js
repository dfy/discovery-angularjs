'use strict'

var wikiModule = (function(module, angular) {

  module.directive('dwikiMarkdown', function($compile, wikiMarkdown) {
    return {
      restrict: 'E',
      replace: true, // doesn't seem to work here - ?
      link: function(scope, element, attrs) {
        scope.$watch(
          function(scope) {
            // watch the 'compile' expression for changes
            return scope.$eval(attrs.content);
          },
          function(value) {
            if (value !== undefined) {
              // generate html from markdown
              var content = 
                wikiMarkdown.toHTML(value)
                .replace(/\[\[([^\]]+)\]\]/gi, function(match, name) {
                  return '<a href="/#/project/test/wiki/' + name + '">' + name + '</a>';
                });

              // when the 'compile' expression changes
              // assign it into the current DOM
              element.html(content);
               
              // compile the new DOM and link it to the current
              // scope.
              // NOTE: we only compile .childNodes so that
              // we don't get into infinite loop compiling ourselves
              $compile(element.contents())(scope);
            }
          }
        );
      }
    };
  });

  return module; 
})(wikiModule || angular.module('WikiModule', []), angular);

