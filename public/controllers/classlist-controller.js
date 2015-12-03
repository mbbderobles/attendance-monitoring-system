'use strict';

(function(){
    angular
    .module('myApp')
    .controller('ClasslistCtrl',['$scope', '$parse', '$window', '$routeParams', 'ClasslistService', function ($scope, $parse, $window, $routeParams, ClasslistService) {
        $scope.sectionDetails;
        
        // csv details
        $scope.csv = {
            content: null,
            header: true,
            headerVisible: false,
            separator: ',',
            separatorVisible: false,
            result: null,
            encoding: 'ISO-8859-1',
            encodingVisible: false,
        };

        // get section details
        ClasslistService.GetSection($routeParams.id2)
        .then(function(data){
            $scope.sectionDetails = data;
        });


        // parse csv content
        $scope.parseCSV = function(myData){
            var myData = myData.split('\n');
            var data = [];
            var i = 0;
            var students = [], students_enrolled = [];
            
             // get list of all students
            ClasslistService.GetStudents()
            .then(function(data2){
                students = data2;

                // get list of students enrolled in the section
                ClasslistService.GetStudentsBySection($routeParams.id2)
                .then(function(data3){
                    students_enrolled = data3;
                    addClasslist(myData, students, students_enrolled);

                }, function(fallback1){                                 // not students enrolled in the section
                    addClasslist(myData, students, students_enrolled);
                });
            }, function(fallback2){                                     // no students yet
                addClasslist(myData, students, students_enrolled);
            });

        };

        function addClasslist(myData, students, students_enrolled){
            var i=0;
            var data = [];

            while(i < myData.length){
                myData[i] = myData[i].split(',');
                if(checkStudent(students,'emailAddress',myData[i][6])){                // if student already exists
                    if(!(checkStudent(students_enrolled, 'emailAddress', myData[i][6]) && checkStudent(students_enrolled,'studentNumber',myData[i][0]))){ // if student is not yet enrolled
                        ClasslistService.AddClasslist({'studentNumber': myData[i][0], 'sectionId': $routeParams.id2});
                    }
                }else{
                    data.push(myData[i]);               // store non-existent students to be add later
                }
                i++;
            }

            if(data.length != 0){
                // add new students
                ClasslistService.AddUsers(data, $routeParams.id2)
                .then(function(data1){
                    $scope.finished = true;
                    $window.location.href = '/#/courses/'+$routeParams.id+'/sections/'+$routeParams.id2+'/attendance';
                });
            }else{
                $scope.finished = true;
                $window.location.href = '/#/courses/'+$routeParams.id+'/sections/'+$routeParams.id2+'/attendance';
            }
        }

        // check if student already exists
        function checkStudent(students,property,value){
            var i=0;
            while(i < students.length){
                if(students[i][property] == value){
                    return true;
                }
                i++;
            }
            return false;
        }
    }]);

})();