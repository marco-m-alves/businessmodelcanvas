angular.module('businessmodelcanvas', []).
directive('businessModelCanvas', function($http, BMCDOM, $compile){
  
  var templateUrl = "businessmodelcanvas.html", 
      raw;
  
  // Grabs the original html
  function compile(elm, attrs){
    raw = $(elm.parent().html());
    return link
  }
  
  
  function link(scope, elm, attrs){ 
    var userData = BMCDOM.scrape(raw);
    
    $http.get(templateUrl).success(function(template){
      var $template = $(template);
      BMCDOM.render($template, userData);
      elm.html($template);
      $compile($template)(scope);
    });
  }
  
  return {
    restrict: 'E',
    compile: compile
  };
}).
service('BMCDOM', function(){
  var tags = ['key-partners', 'key-activities', 'key-resources', 
              'value-proposition', 'customer-relationships', 'channels',
              'customer-segments', 'cost-structure', 'revenue-streams' ];
  
  function scrapeElementContents(tags, root){
    var scraped = {}
    angular.forEach(tags, function(tag){
      scraped[tag] = root.find(tag).html();
    });
    return scraped;
  }
  
  function insertTagContent(tag, content, elm){
    var selector = '.' + tag;
    elm.find(selector).find('.content').append(content);
  }
  
  this.scrape = function(elm){
    return scrapeElementContents(tags, elm);
  };
  
  this.render = function(template, data){
    angular.forEach(tags, function(tag){
      if (data[tag]) insertTagContent(tag, data[tag], template)
    });
  };
});