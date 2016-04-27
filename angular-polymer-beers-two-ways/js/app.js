'use strict';

/* App Module */

var angularBeer = angular.module('AngularPolymerBeer', [
  'ngRoute'
]);

angularBeer
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/beers', {
          templateUrl: 'partials/beer-list.html',
          controller: 'BeerListCtrl'
        }).
        when('/beers/:beerId', {
          templateUrl: 'partials/beer-detail.html',
          controller: 'BeerDetailCtrl'
        }).
        otherwise({
          redirectTo: '/beers'
        });
    }
  ])
  .controller('BeerListCtrl', ['$scope', '$document', function($scope, $document) {
     // document.querySelector("beer-list").addEventListener("current-beers-changed", function(ev) { console.debug("current-beers-changed detected")} )
  }])
  .controller('BeerDetailCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.beerId = $routeParams.beerId;
  }])
  .directive('bindPolymer', ['$parse', function($parse) {
    return {
      restrict: 'A',
      scope : false,
      compile: function bindPolymerCompile(el, attr) {
        
        console.debug("bindPolymerCompile");
        var attrMap = {};

        for (var prop in attr) {
          if (angular.isString(attr[prop])) {
            var _match = attr[prop].match(/\{\{\s*([\.\w]+)\s*\}\}/);
            if (_match) {
              attrMap[prop] = $parse(_match[1]);
            }
          }
        }
        return function bindPolymerLink(scope, element, attrs) {
          Object.keys(attrMap).forEach(function(key) {
            // we need to transform camelCasedProperties into camel-cased-properties
            var correctCasedKey = key.replace(/\.?([A-Z])/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, "")
            element.on(correctCasedKey + '-changed', function(event) {
              scope.$evalAsync(function() {
                if (attrMap[key](scope) === event.detail.value) return;
                attrMap[key].assign(scope, event.detail.value);
              });
            });
          });
        };
      }
    };
  }]);