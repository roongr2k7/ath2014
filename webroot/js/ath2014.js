var app = angular.module("ath2014", ['ngRoute', 'ezfb']);

app.config(function(ezfbProvider) {
  ezfbProvider.setInitParams({
    appId: '302908129857189'
  });
});

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/topic/:permalink', {
      templateUrl: '/pages/topic.html',
      controller: 'topicController'
    })
    .when('/', {
      templateUrl: '/pages/home.html',
      controller: 'homeController'
    });
  $locationProvider.html5Mode(true);
});

var fbqlUrl = "https://api.facebook.com/method/fql.query?query="
var host = "ath2014.varokas.com"
function getFBLikeURL(permalink) {
    return fbqlUrl + encodeURI("select like_count from link_stat where url='" + host + "/topic/" + permalink) + "'&format=json"; 
}
function getScore(http, collector, topic) {
  http.get(getFBLikeURL(topic.Permalink)).success(function(data) {
    collector.push({
      "title": topic.Title,
      "permalink": topic.Permalink,
      "likes":  data[0]["like_count"]
    });

    collector.sort( function(a,b) { return a.likes - b.likes; } );
  });
}

app.controller("homeController", function($scope, $http, $routeParams) {
  $scope.topics = [];

  $http.get('/api/topics').success(function(data) {
     data.forEach( function(d) { getScore($http, $scope.topics, d); } );
  });
});

app.controller("topicController", function($scope, $location, $routeParams) {
  $scope.permalink = $routeParams.permalink;
  $scope.url = $location.absUrl();

  console.log($scope.url);

});
