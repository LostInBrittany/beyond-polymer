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
  .controller('BeerListCtrl', ['$scope', function($scope) {
  }])
  .controller('BeerDetailCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.beerId = $routeParams.beerId;
  }]);