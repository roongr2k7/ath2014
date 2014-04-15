var app = angular.module("ath2014", ['ngRoute', 'facebook']);

app.config(['FacebookProvider', function(FacebookProvider) {
     FacebookProvider.init('302908129857189');
}])

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/topic/:permalink', {
      templateUrl: 'pages/topic.html',
      controller: 'topicController'
    })
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'homeController'
    });
  $locationProvider.html5Mode(false);
});

app.controller("homeController", function($scope, $http, $routeParams) {
  $scope.topics = [];
  $http.get('/topics').success(function(data) {
     $scope.topics = data;
  });
});

app.controller("topicController", function($scope, $location, Facebook, $routeParams) {
  $scope.permalink = $routeParams.permalink;
  $scope.url = $location.absUrl();

  console.log($scope.url);

});
