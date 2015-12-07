'use strict';

(function(){
    angular
    .module('myApp')
    .controller('StudentCtrl',['$scope', '$parse', 'StudentService', function ($scope, $parse, StudentService) {

        $scope.sortType     = 'studentNumber'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchStudent   = '';     // set the default search/filter term

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
            if($scope.privilege==3 || $scope.privilege==2){    // check if admin
                StudentService.AddUser($scope.newUser)
                .then(function(data1){
                    $scope.newStudent.id=data1.id;
                    StudentService.AddStudent($scope.newStudent)
                    .then(function(data2){
                        $scope.students.push(angular.extend(data1, data2));
                        $scope.addS = !$scope.addS;
                    });
                });
            }
        };

        // populate control fields in edit form
        $scope.ViewStudent = function(id){
            if($scope.privilege==3 || $scope.privilege==2){    // check if admin
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
            }
        };

        $scope.EditStudent = function(){
            if($scope.privilege==3 || $scope.privilege==2){    // check if admin
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
            }
        };

        $scope.DeleteStudent = function(id){
            if($scope.privilege==3){    // check if admin
                var r = confirm("Are you sure you want to delete this student?");
                if(r == true){
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
                }
            }
        };

    }]);

})();