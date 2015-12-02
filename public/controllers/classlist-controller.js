'use strict';

(function(){
    angular
    .module('myApp')
    .controller('ClasslistCtrl',['$scope', '$parse', '$window', '$routeParams', 'ClasslistService', function ($scope, $parse, $window, $routeParams, ClasslistService) {

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


        // parse csv content
        $scope.parseCSV = function(myData){
            var myData = myData.split('\n');
            var data = [];
            var i = 0;
            var students, students_enrolled;
            
             // get list of all students
            ClasslistService.GetStudents()
                .then(function(data2){
                    students = data2;

                    // get list of students enrolled in the section
                    ClasslistService.GetStudentsBySection($routeParams.id)
                    .then(function(data3){
                        students_enrolled = data3;

                        while(i < myData.length){
                            myData[i] = myData[i].split(',');
                            if(checkStudent(students,myData[i][6])){                // if student already exists
                                if(!checkStudent(students_enrolled,myData[i][6])){ // if student is not yet enrolled
                                    ClasslistService.AddClasslist({'studentNumber': myData[i][0], 'sectionId': $routeParams.id});
                                }
                            }else{
                                //console.log(myData[i]);
                                data.push(myData[i]);
                            }
                            i++;
                        }

                        // add new students
                        ClasslistService.AddUsers(data, $routeParams.id)
                        .then(function(data1){
                            $scope.finished = true;
                            $window.location.href = '/#/sections/'+$routeParams.id+'/attendance';
                        });
                    });

            });

        };

        // check if student already exists
        function checkStudent(students,emailAddress){
            var i=0;
            while(i < students.length){
                if(students[i].emailAddress == emailAddress){
                    return true;
                }
                i++;
            }
            return false;
        }
    }]);

})();