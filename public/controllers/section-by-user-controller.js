'use strict';

(function(){
    angular
    .module('myApp')
    .controller('SectionByUserCtrl',['$scope', '$parse', '$window', 'SectionByUserService', function ($scope, $parse, $window, SectionByUserService) {

        $scope.sortType     = 'courseNum'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchSection   = '';     // set the default search/filter term

        $scope.sectionDays;
        $scope.editSection={};
        $scope.sections=[];
        $scope.userDetails={};
        $scope.editSBT = false;
        var employeeId=0, studentNumber=0;

        if($scope.privilege == 2){      // teacher view
            // get teacher details
            SectionByUserService.GetTeacher($scope.userId)
            .then(function(data1){
                $scope.userDetails = data1;
                employeeId = data1.employeeId;
                // get all sections of teacher
                SectionByUserService.GetSectionsOfTeacher(employeeId)
                .then(function(data2){
                    var i=0;
                    while(i < data2.length){             // convert day to appropriate format (for display)
                        data2[i].sectionDays = convertBinToArray(data2[i].day);
                        data2[i].day = convertBinToDay(data2[i].day);
                        i++;
                    }
                    $scope.sections = data2;
                });
            });
        }else if($scope.privilege == 1){    // student view
            // get student details
            SectionByUserService.GetStudent($scope.userId)
            .then(function(data1){
                $scope.userDetails = data1;
                studentNumber = data1.studentNumber;
                // get all sections of student
                SectionByUserService.GetSectionsOfStudent(studentNumber)
                .then(function(data2){
                    var i=0;
                    while(i < data2.length){             // convert day to appropriate format (for display)
                        data2[i].sectionDays = convertBinToArray(data2[i].day);
                        data2[i].day = convertBinToDay(data2[i].day);
                        i++;
                    }
                    $scope.sections = data2;
                });
            });
        }

        // populate control fields in edit form
        $scope.ViewSection = function(id){
            if($scope.privilege==2){    // check if teacher
                $scope.editSBT = !$scope.editSBT;

                $scope.sections.forEach(function(section) {
                    if(section.sectionId === id) {
                        $scope.editSection.sectionId = section.sectionId;
                        $scope.editSection.courseId = section.courseId;
                        $scope.sectionDays = section.sectionDays;
                        section.sectionTime = section.time.split('-');
                        $scope.startTime = section.sectionTime[0];
                        $scope.endTime = section.sectionTime[1];
                        $scope.editSection.room = section.room;
                        $scope.editSection.maxAllowedAbsences = section.maxAllowedAbsences;

                        return;
                    }
                });
            }
        };

        $scope.EditSection = function(){
            if($scope.privilege==2){    // check if teacher\
                $scope.editSection.day = convertDayToBin($scope.sectionDays);        // convert day to appropriate format
                $scope.editSection.time = $scope.startTime + '-' + $scope.endTime;   // convert time
                console.log($scope.editSection.sectionId);
                SectionByUserService.EditSection($scope.editSection, $scope.editSection.sectionId)
                .then(function(data1){
                    SectionByUserService.GetSectionsOfTeacher(employeeId)
                    .then(function(data2){
                        var i=0;
                        while(i < data2.length){             // convert day to appropriate format (for display)
                            data2[i].sectionDays = convertBinToArray(data2[i].day);
                            data2[i].day = convertBinToDay(data2[i].day);
                            i++;
                        }
                        $scope.sections = data2;
                    });

                    $scope.sectionDays = "";
                    $scope.startTime = "";
                    $scope.endTime = "";
                    $scope.editSection.room = "";
                    $scope.editSection.maxAllowedAbsences = "";

                    $scope.editSBT = !$scope.editSBT;
                });
            }
        };

        $scope.ViewAttendance = function(courseId, sectionId){
            $window.location.href = '/#/courses/'+courseId+'/sections/'+sectionId+'/attendance';
        }
        

        //convert days array to string bin representation
        function convertDayToBin(sectionDays){
            var i=0;
            var days = [0,0,0,0,0,0,0];
            while(i < sectionDays.length){
                switch(sectionDays[i]){
                    case 'S': { days[0] = 1; break;}
                    case 'M': { days[1] = 1; break;}
                    case 'T': { days[2] = 1; break;}
                    case 'W': { days[3] = 1; break;}
                    case 'Th': { days[4] = 1; break;}
                    case 'F': { days[5] = 1; break;}
                    case 'Sa': { days[6] = 1; break;}
                }
                i++;
            }
            days = days.toString().replace(/,/g,'');     //convert from array to string

            return days;
        }

        //convert bin days to word
        function convertBinToDay(binDays){
            var i=0;
            var days = "", week = ['S','M','T','W','Th','F','Sa'];
            binDays = binDays.split('');
            while(i < binDays.length){
                if(binDays[i] == 1){
                    days = days + week[i];
                }
                i++;
            }

            return days;
        }

        //convert days to array
        function convertBinToArray(binDays){
            var i=0;
            var days = [], week = ['S','M','T','W','Th','F','Sa'];
            binDays = binDays.split('');
            while(i < binDays.length){
                if(binDays[i] == 1){
                    days.push(week[i]);
                }
                i++;
            }

            return days;
        }

    }]);

})();