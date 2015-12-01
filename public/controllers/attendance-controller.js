'use strict';

(function(){
    angular
    .module('myApp')
    .controller('AttendanceCtrl',['$scope', '$parse', '$routeParams', 'AttendanceService', function ($scope, $parse, $routeParams, AttendanceService) {
        $scope.attendance = [];
        var students = [], attendance;
        $scope.sectionDetails = {};
        $scope.weekStart = 1;
        $scope.weeks = getWeek();

        // get section details given the section id
        AttendanceService.GetSection($routeParams.id)
        .then(function(data1){
            $scope.sectionDetails = data1;
        });

        // get students enrolled in a section
        AttendanceService.GetStudents($routeParams.id)
        .then(function(data2){
            students = data2;
            // get attendance by section
            AttendanceService.GetAttendance($routeParams.id)
            .then(function(data3){
                attendance = data3;
                viewAttendance(data2, data3);
            });
        });

        $scope.nextWeek = function(){
            $scope.weekStart += 7;
            $scope.weeks = getWeek();
            $scope.attendance = [];
            viewAttendance(students, attendance);
        }

        $scope.previousWeek = function(){
            $scope.weekStart -= 7;
            $scope.weeks = getWeek();
            $scope.attendance = [];
            viewAttendance(students, attendance);
        }

        // store and organize attendance record
        function viewAttendance(studentNumbers,attendance){
            studentNumbers.forEach(function(studentNumber){
                var i=0, j=0, sectionTime;
                var at = [0,0,0,0,0,0];
                while(j<$scope.weeks.length){
                    i=0;
                    while(i<attendance.length){
                        var d1 = new Date(attendance[i].attended);
                        d1.setHours(0, 0, 0, 0);
                        var d2 = new Date($scope.weeks[j]);
                        d2.setHours(0, 0, 0, 0);
                        var d3 = new Date($scope.weeks[j]);
                        if(attendance[i].studentNumber == studentNumber.studentNumber && d1.getTime() == d2.getTime()){
                            sectionTime = $scope.sectionDetails.time.split('-');
                            sectionTime[0] = sectionTime[0].split(':');
                            sectionTime[1] = sectionTime[1].split(':');
                            d1 = new Date(attendance[i].attended);
                            d2.setHours(sectionTime[0][0], sectionTime[0][1], 0, 0);    // start time
                            d3.setHours(sectionTime[1][0], sectionTime[1][1], 0, 0);    // end time
                            if(d1.getTime() >= d2.getTime() && d1.getTime() <= d3.getTime()){
                                at[j] = 1;    // present
                                break;
                            }
                        }
                        i++;
                    } // end of attendance loop
                    j++;
                }// end of weeks loop
                $scope.attendance.push({'studentNumber': studentNumber.studentNumber, 'name': studentNumber.lastName +  ', ' + studentNumber.firstName, 'attendance': at});
            });
        }

        // get the dates of the week (mon-sat)
        function getWeek(){
            var curr = new Date();
            var day = curr.getDay() - $scope.weekStart;
            var mon = new Date(curr.getTime() - 60*60*24*day*1000); // returns first day (monday) of the week 
            var tues = new Date(curr.getTime() - 60*60*24*(day-1)*1000);
            var wed = new Date(curr.getTime() - 60*60*24*(day-2)*1000);
            var thurs = new Date(curr.getTime() - 60*60*24*(day-3)*1000);
            var fri = new Date(curr.getTime() - 60*60*24*(day-4)*1000);
            var sat = new Date(curr.getTime() - 60*60*24*(day-5)*1000);
            return [mon,tues,wed,thurs,fri,sat];
        }
        
    }]);

})();