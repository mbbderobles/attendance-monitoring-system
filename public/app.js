'use strict';

//Configure Routes

(function(){
  angular
    .module('myApp', ['ngRoute','ngCsvImport'])
    .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'views/home-view.html'
    })
    .when('/course-offering', {
      templateUrl: 'views/course-offering-view.html',
      controller: 'CourseOfferingCtrl'
    })
    .otherwise({redirectTo: '/'});
  }

})();
