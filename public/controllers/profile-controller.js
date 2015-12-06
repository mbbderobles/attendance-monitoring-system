'use strict';

(function(){
    angular
    .module('myApp')
    .controller('ProfileCtrl',['$scope', 'ProfileService', function ($scope, ProfileService) {
    
        $scope.user = {};
        $scope.teacher = {};
        $scope.student = {};
    
        ProfileService.GetUser($scope.userId)
        .then(function(data){
            $scope.user = data
        });
        
        if($scope.privilege == 3){
            // Do nothing
        }else if($scope.privilege == 2){
            // Get Teacher data
            ProfileService.GetTeacher($scope.userId)
            .then(function(data){
                $scope.teacher.employeeId = data.employeeId;
                $scope.teacher.scope = data.scope;
                $scope.teacher.position = data.position;
            });
        }else if($scope.privilege == 1){
            // Get Student data
            ProfileService.GetStudent($scope.userId)
            .then(function(data){
                $scope.student.studentNumber = data.studentNumber;
                $scope.student.sex = data.sex;
                $scope.student.degree = data.degree;
                $scope.student.college = data.college;
            });
        }
        
        $scope.EditAdmin = function(){
            if($scope.privilege==3){                                                // check if admin
                ProfileService.EditUser($scope.user, $scope.user.id);
            }
        };
        
        $scope.EditTeacher = function(){
            if($scope.privilege==2){
                ProfileService.EditUser($scope.user, $scope.user.id)
                .then(function(data1){
                    ProfileService.EditTeacher($scope.teacher, data1.id)
                });
            }
        };
        
        $scope.EditStudent = function(){
            if($scope.privilege==1){
                ProfileService.EditUser($scope.user, $scope.user.id)
                .then(function(data1){
                    ProfileService.EditStudent($scope.student, data1.id)
                });
            }
        };
    
    }]);
})();
