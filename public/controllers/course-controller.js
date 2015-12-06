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

        // get all courses
        CourseService.GetAll()
        .then(function(data){
            $scope.courses = data;
        });

        $scope.AddCourse = function(){
            if($scope.privilege==3){    // check if admin
                CourseService.AddCourse($scope.newCourse)
                .then(function(data){
                    $scope.courses.push(data);
                    $scope.addCrs = !$scope.addCrs;
                });
            }
        };

        // populate control fields in edit form
        $scope.ViewCourse = function(id){
            if($scope.privilege==3){    // check if admin
                $scope.editCrs = !$scope.editCrs;

                $scope.courses.forEach(function(course) {
                    if(course.courseId === id) {
                        $scope.editCourse.courseNum = course.courseNum;
                        $scope.editCourse.courseTitle = course.courseTitle;
                        $scope.editCourse.courseId = id;

                        return;
                    }
                });
            }
        };

        $scope.EditCourse = function(){
            if($scope.privilege==3){    // check if admin
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
            }
        };

        $scope.DeleteCourse = function(id){
            if($scope.privilege==3){    // check if admin
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
            }
        };

    }]);

})();