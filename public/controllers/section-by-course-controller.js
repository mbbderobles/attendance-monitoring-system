'use strict';

(function(){
    angular
    .module('myApp')
    .controller('SectionByCourseCtrl',['$scope', '$parse', '$routeParams', 'SectionByCourseService', function ($scope, $parse, $routeParams, SectionByCourseService) {

        $scope.sortType     = 'sectionCode'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchSection   = '';     // set the default search/filter term

        var cId = $routeParams.id;
        $scope.teachers;
        $scope.sectionDays;
        $scope.courseDetails = {};
        $scope.sections=[];
        $scope.editSection = {};
        $scope.addSBC = false;
        $scope.editSBC = false;

        // get course details
        SectionByCourseService.GetCourse(cId)
        .then(function(data){
            $scope.courseDetails = data;
        });

        // get all sections by course
        SectionByCourseService.GetAllByCourse(cId)
        .then(function(data){
            var i=0;
            while(i < data.length){             // convert day to appropriate format (for display)
                data[i].sectionDays = convertBinToArray(data[i].day);
                data[i].day = convertBinToDay(data[i].day);
                i++;
            }
            $scope.sections = data;
        });

        // get all teachers
        SectionByCourseService.GetTeachers()
        .then(function(data){
            $scope.teachers = data;
        });

        $scope.AddSection = function(){
            if($scope.privilege==3){    // check if admin
                $scope.newSection.courseId = cId;                                   // get courseId
                $scope.newSection.day = convertDayToBin($scope.sectionDays);        // convert day to appropriate format
                $scope.newSection.time = $scope.startTime + '-' + $scope.endTime;   // convert time

                SectionByCourseService.AddSection($scope.newSection)
                .then(function(data1){
                    // get all sections by course
                    SectionByCourseService.GetAllByCourse(cId)
                    .then(function(data2){
                        var i=0;
                        while(i < data2.length){             // convert day to appropriate format (for display)
                            data2[i].sectionDays = convertBinToArray(data2[i].day);
                            data2[i].day = convertBinToDay(data2[i].day);
                            i++;
                        }
                        $scope.sections = data2;
                    });

                    $scope.addSBC = !$scope.addSBC;
                });
            }
        };

        // populate control fields in edit form
        $scope.ViewSection = function(id){
            if($scope.privilege==3){    // check if admin
                $scope.editSBC = !$scope.editSBC;

                $scope.sections.forEach(function(section) {
                    if(section.sectionId === id) {
                        $scope.editSection.courseId = section.courseId;
                        $scope.editSection.sectionId = section.sectionId;
                        $scope.editSection.sectionCode = section.sectionCode;
                        $scope.editSection.employeeId = section.employeeId;
                        $scope.sectionDays = section.sectionDays;
                        section.sectionTime = section.time.split('-');
                        $scope.startTime = section.sectionTime[0];
                        $scope.endTime = section.sectionTime[1];
                        $scope.editSection.room = section.room;
                        $scope.editSection.maxAllowedAbsences = section.maxAllowedAbsences;
                        $scope.editSection.semester = section.semester;
                        $scope.editSection.year = section.year;

                        return;
                    }
                });
            }
        };

        $scope.EditSection = function(){
            if($scope.privilege==3){    // check if admin
                //$scope.editSection.courseId = cId;                                   // get courseId
                $scope.editSection.day = convertDayToBin($scope.sectionDays);        // convert day to appropriate format
                $scope.editSection.time = $scope.startTime + '-' + $scope.endTime;   // convert time

                SectionByCourseService.EditSection($scope.editSection, $scope.editSection.sectionId)
                .then(function(data1){
                    SectionByCourseService.GetAllByCourse(cId)
                    .then(function(data2){
                        var i=0;
                        while(i < data2.length){             // convert day to appropriate format (for display)
                            data2[i].sectionDays = convertBinToArray(data2[i].day);
                            data2[i].day = convertBinToDay(data2[i].day);
                            i++;
                        }
                        $scope.sections = data2;
                    });

                    $scope.editSection.sectionCode = "";
                    $scope.editSection.employeeId = "";
                    $scope.sectionDays = "";
                    $scope.startTime = "";
                    $scope.endTime = "";
                    $scope.editSection.room = "";
                    $scope.editSection.maxAllowedAbsences = "";
                    $scope.editSection.semester = "";
                    $scope.editSection.year = "";

                    $scope.editSBC = !$scope.editSBC;
                });
            }
        };

        $scope.DeleteSection = function(id){
            if($scope.privilege==3){    // check if admin
                var r = confirm("Are you sure you want to delete this section?");
                if(r == true){
                    SectionByCourseService.DeleteSection(id)
                    .then(function(data1){
                        SectionByCourseService.GetAllByCourse(cId)
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
            }
        };

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