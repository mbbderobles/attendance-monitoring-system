'use strict';

(function(){
    angular
    .module('myApp')
    .controller('CourseCtrl',['$scope', '$parse', 'CourseService', function ($scope, $parse, CourseService) {

        $scope.sortType     = 'courseNum'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchCourse   = '';     // set the default search/filter term

        $scope.courses=[];
        $scope.editCourse = {};
        $scope.editUser = {};
        $scope.addCrs = false;
        $scope.editCrs = false;

        CourseService.GetAll()
        .then(function(data){
            $scope.courses = data;
        });

        $scope.AddCourse = function(){
            CourseService.AddCourse($scope.newCourse)
            .then(function(data){
                $scope.courses.push(data);
                $scope.addCrs = !$scope.addCrs;
            });
        };

        $scope.ViewCourse = function(id){
            $scope.editCrs = !$scope.editCrs;

            $scope.courses.forEach(function(course) {
                if(course.courseId === id) {
                    $scope.editCourse.courseNum = course.courseNum;
                    $scope.editCourse.courseTitle = course.courseTitle;
                    $scope.editCourse.courseId = id;

                    return;
                }
            });
        };

        $scope.EditCourse = function(){
            CourseService.EditCourse($scope.editCourse, $scope.editCourse.courseId)
            .then(function(data){
                CourseService.GetAll()
                .then(function(data){
                    $scope.courses = data;
                });

                $scope.editCourse.courseNum = "";
                $scope.editCourse.courseTitle = "";
                $scope.editCourse.courseId = "";
                $scope.editCrs = !$scope.editCrs;
            });
        };

        $scope.DeleteCourse = function(id){
            var r = confirm("Are you sure you want to delete this course?");
            if(r == true){
                CourseService.DeleteCourse(id)
                .then(function(data2){
                    CourseService.GetAll()
                    .then(function(data){
                        $scope.courses = data;
                    });
                });
            }
        };

    }]);

})();