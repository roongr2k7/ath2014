var app = angular.module("ath2014", ['ngRoute', 'ezfb']);

app.config(function(ezfbProvider) {
  ezfbProvider.setInitParams({
    appId: '302908129857189'
  });
});

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/topic/:permalink', {
      templateUrl: '/static/pages/topic.html',
      controller: 'topicController'
    })
    .when('/', {
      templateUrl: '/static/pages/home.html',
      controller: 'homeController'
    });
  $locationProvider.html5Mode(true);
});

app.controller("homeController", function($scope, $http, $routeParams) {
  $scope.topics = [];
  $http.get('/api/topics').success(function(data) {
     $scope.topics = data;
  });
});

app.controller("topicController", function($scope, $location, $routeParams) {
  $scope.permalink = $routeParams.permalink;
  $scope.url = $location.absUrl();

  console.log($scope.url);

});
