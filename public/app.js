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
    .when('/courses', {
      templateUrl: 'views/course-view.html',
      controller: 'CourseCtrl'
    })
    .when('/sections/:id', {
      templateUrl: 'views/section-by-course-view.html',
      controller: 'SectionByCourseCtrl'
    })
    .when('/course-offering', {
      templateUrl: 'views/course-offering-view.html',
      controller: 'CourseOfferingCtrl'
    })
    .when('/students', {
      templateUrl: 'views/student-view.html',
      controller: 'StudentCtrl'
    })
    .when('/teachers', {
      templateUrl: 'views/teacher-view.html',
      controller: 'TeacherCtrl'
    })
    .otherwise({redirectTo: '/'});
  }

})();