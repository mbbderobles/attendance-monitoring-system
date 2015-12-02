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
      controller: 'CourseCtrl',
      privilege: 3
    })
    .when('/courses/:id/sections/:id2/attendance', {
      templateUrl: 'views/attendance-view.html',
      controller: 'AttendanceCtrl',
      privilege: 3
    })
    .when('/courses/:id/sections/:id2/classlist', {
      templateUrl: 'views/classlist-view.html',
      controller: 'ClasslistCtrl',
      privilege: 2
    })
    .when('/courses/:id/sections', {
      templateUrl: 'views/section-by-course-view.html',
      controller: 'SectionByCourseCtrl',
      privilege: 3
    })
    .when('/course-offering', {
      templateUrl: 'views/course-offering-view.html',
      controller: 'CourseOfferingCtrl',
      privilege: 3
    })
    .when('/students', {
      templateUrl: 'views/student-view.html',
      controller: 'StudentCtrl',
      privilege: 1
    })
    .when('/teachers', {
      templateUrl: 'views/teacher-view.html',
      controller: 'TeacherCtrl',
      privilege: 2
    })
    .otherwise({redirectTo: '/'});
  }

})();
