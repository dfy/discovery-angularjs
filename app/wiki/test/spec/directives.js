'use strict';

describe('Wiki Directives', function () {

  // init module
  beforeEach(
    module('WikiModule')
  );

  describe('dwikiMarkdown', function() {

    var 
      scope,
      elem,
      directive,
      compile,
      compiled,
      html;

    beforeEach(function(){
      inject(function($compile, $rootScope) {
        html = '<dwiki-markdown content="mdown"></dwiki-markdown>';

        //create a scope (you could just use $rootScope, I suppose)
        scope = $rootScope.$new();
          
        //get the jqLite or jQuery element
        elem = angular.element(html);
          
        //compile the element into a function to 
        // process the view.
        compiled = $compile(elem);
          
        //run the compiled view.
        compiled(scope);
          
        //call digest on the scope!
        scope.$digest();
      });
    });

    it('Should convert the content to HTML', function() {

      scope.mdown = 'hello' + "\n\n" + 'world';
      scope.$digest();

      var nodes = elem[0].childNodes;

      expect(nodes.length).toBe(3);

      var firstParagraph = nodes[0];
      var secondParagraph = nodes[2];

      expect(firstParagraph.nodeName).toBe('P');
      expect(firstParagraph.innerText).toBe('hello');

      expect(secondParagraph.nodeName).toBe('P');
      expect(secondParagraph.innerText).toBe('world');
    });

    it('Should do nothing if there is no content', function() {

      scope.$digest();

      var nodes = elem[0].childNodes;
      expect(nodes.length).toBe(0);
    });

  });

});