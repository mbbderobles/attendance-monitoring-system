'use strict';

(function(){
    angular
    .module('myApp')
    .controller('SectionByCourseCtrl',['$scope', '$parse', '$routeParams', 'SectionByCourseService', function ($scope, $parse, $routeParams, SectionByCourseService) {

        var cId = $routeParams.id;
        $scope.sections=[];
        $scope.editSection = {};
        $scope.addSBC = false;
        $scope.editSBC = false;

        SectionByCourseService.GetAllByCourse(cId)
        .then(function(data){
            $scope.sections = data;
        });

        $scope.AddSection = function(){
            $scope.newSection.courseId = cId;
            SectionByCourseService.AddSection($scope.newSection)
            .then(function(data){
                $scope.courses.push(data);
                $scope.addSBC = !$scope.addSBC;
            });
        };

        $scope.ViewSection = function(id){
            $scope.editSBC = !$scope.editSBC;

            $scope.courses.forEach(function(course) {
                if(course.courseId === id) {
                    $scope.editSection.courseNum = course.courseNum;
                    $scope.editSection.courseTitle = course.courseTitle;
                    $scope.editSection.courseId = id;

                    return;
                }
            });
        };

        $scope.EditSection = function(){
            SectionByCourseService.EditSection($scope.editSection, $scope.editSection.courseId)
            .then(function(data){
                SectionByCourseService.GetAll()
                .then(function(data){
                    $scope.courses = data;
                });

                $scope.editSection.courseNum = "";
                $scope.editSection.courseTitle = "";
                $scope.editSection.courseId = "";
                $scope.editSBC = !$scope.editSBC;
            });
        };

        $scope.DeleteSection = function(id){
            SectionByCourseService.DeleteSection(id)
            .then(function(data2){
                SectionByCourseService.GetAll()
                .then(function(data){
                    $scope.courses = data;
                });
            });
        };

    }]);

})();