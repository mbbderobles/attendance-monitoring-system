'use strict';

(function(){
    angular
    .module('myApp')
    .controller('StudentCtrl',['$scope', '$parse', 'StudentService', function ($scope, $parse, StudentService) {

        $scope.students=[];
        $scope.editStudent = {};
        $scope.editUser = {};
        $scope.addS = false;
        $scope.editS = false;

        StudentService.GetAll()
        .then(function(data){
            $scope.students = data;
        });

        $scope.AddStudent = function(){
            StudentService.AddUser($scope.newUser)
            .then(function(data1){
                $scope.newStudent.id=data1.id;
                StudentService.AddStudent($scope.newStudent)
                .then(function(data2){
                    $scope.students.push(angular.extend(data1, data2));
                    $scope.addS = !$scope.addS;
                });
            });
        };

        $scope.ViewStudent = function(id){
            $scope.editS = !$scope.editS;

            console.log('ID'+id);

            $scope.students.forEach(function(student) {
                if(student.id === id) {
                    $scope.editStudent.studentNumber = student.studentNumber;
                    $scope.editUser.lastName = student.lastName;
                    $scope.editUser.firstName = student.firstName;
                    $scope.editUser.middleName = student.middleName;
                    $scope.editUser.emailAddress = student.emailAddress;
                    $scope.editStudent.sex = student.sex;
                    $scope.editStudent.degree = student.degree;
                    $scope.editStudent.college = student.college;
                    $scope.editUser.id = id;

                    return;
                }
            });
        };

        $scope.EditStudent = function(){
            StudentService.EditUser($scope.editUser, $scope.editUser.id)
            .then(function(data1){
                StudentService.EditStudent($scope.editStudent, data1.id)
                .then(function(data2){
                    StudentService.GetAll()
                    .then(function(data){
                        $scope.students = data;
                    });

                    $scope.editStudent.studentNumber = "";
                    $scope.editUser.lastName = "";
                    $scope.editUser.firstName = "";
                    $scope.editUser.middleName = "";
                    $scope.editUser.emailAddress = "";
                    $scope.editStudent.sex = "";
                    $scope.editStudent.degree = "";
                    $scope.editStudent.college = "";
                    $scope.editUser.id = "";
                    $scope.editS = !$scope.editS;
                });
            });
        };

        $scope.DeleteStudent = function(id){
            StudentService.DeleteUser(id)
            .then(function(data1){
                StudentService.DeleteStudent(id)
                .then(function(data2){
                    StudentService.GetAll()
                    .then(function(data){
                        $scope.students = data;
                    });
                });
            });
        };

    }]);

})();