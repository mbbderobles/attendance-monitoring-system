'use strict';

(function(){
    angular
    .module('myApp')
    .controller('AttendanceCtrl',['$scope', '$parse', '$routeParams', 'AttendanceService', function ($scope, $parse, $routeParams, AttendanceService) {
        var students = [], retrievedAttendance, startEndTime;

        $scope.attendance = [];         // list of attendance record of students
        $scope.sectionDetails = {};     // details of the section
        $scope.weekStart = 1;           // monday = 1
        $scope.weeks = getWeek();
        //console.log($scope.attendance);

        // get section details given the section id
        AttendanceService.GetSection($routeParams.id)
        .then(function(data1){
            $scope.sectionDetails = data1;
            startEndTime = getStartEndDateTime();

            // get students enrolled in a section
            // get attendance by section
            AttendanceService.GetStudents($routeParams.id)
            .then(function(data2){
                students = data2;
                AttendanceService.GetAttendance($routeParams.id)
                .then(function(data3){
                    retrievedAttendance = data3;
                    //console.log(retrievedAttendance);
                    viewAttendance(data2, data3);
                });
            });

        });

        

        // adjust the calendar to next week
        $scope.nextWeek = function(){
            $scope.weekStart += 7;
            $scope.weeks = getWeek();
            $scope.attendance = [];
            viewAttendance(students, retrievedAttendance);
        }

        // adjust the calendar to previous week
        $scope.previousWeek = function(){
            $scope.weekStart -= 7;
            $scope.weeks = getWeek();
            $scope.attendance = [];
            viewAttendance(students, retrievedAttendance);
        }

        //change student status (present, absent, excused)
        $scope.changeStatus = function(index, attendanceIndex){
            var desc;
            var status = $scope.attendance[index].attendance[attendanceIndex];
            var id = $scope.attendance[index].id[attendanceIndex];

            if(status != 0){
                status = (status + 1) % 4;
                if(status == 0){ status++; }
                switch(status){
                    case 1: { desc = "Present"; break; }
                    case 2: { desc = "Absent"; break; }
                    case 3: { desc = "Excused"; break; }
                }
                //console.log(attended);
                if(id==0){
                    var d = new Date($scope.weeks[attendanceIndex]);
                    d.setUTCHours(startEndTime[0], startEndTime[1], 0, 0);
                    //console.log(d);
                    AttendanceService.AddAttendance({'courseId': $scope.sectionDetails.courseId, 'sectionId': $scope.sectionDetails.sectionId, 'status': desc, 'attended': d, 'studentNumber': $scope.attendance[index].studentNumber})
                    .then(function(data1){
                        $scope.attendance[index].attendance[attendanceIndex] = status;
                        $scope.attendance[index].id[attendanceIndex] = data1.attendanceId;
                    });
                }else{
                    AttendanceService.EditAttendance({'status': desc}, id)
                    .then(function(data2){
                        $scope.attendance[index].attendance[attendanceIndex] = status;
                    });
                }
                
            }
        }

        // store and organize attendance record
        //1 - present, 2 - absent, 3 - excused, 0 - none
        function viewAttendance(studentNumbers,retrievedAttendance){
            studentNumbers.forEach(function(studentNumber){ // loop for all students registered in the course
                var i=0, j=0, sectionTime;
                var currDate = new Date();
                var at = [0,0,0,0,0,0];
                var id = [0,0,0,0,0];
                while(j<$scope.weeks.length){   // loop for checking attendance for all dates of the week
                    var wk = createDate($scope.weeks[j], startEndTime[2], startEndTime[3], 0, 0);
                    if(wk.getTime() <= currDate.getTime()){  // only checks dates on or before current date
                        i=0;
                        at[j] = 2;  // initially absent
                        while(i < retrievedAttendance.length){
                            var d1 = createDate(retrievedAttendance[i].attended, 0, 0, 0, 0);
                            var d2 = createDate($scope.weeks[j], 0, 0, 0, 0);
                            var d3 = createDate($scope.weeks[j], 0, 0, 0, 0);
                            
                            if(retrievedAttendance[i].studentNumber == studentNumber.studentNumber && d1.getTime() == d2.getTime()){
                                d1 = new Date(retrievedAttendance[i].attended);
                                d2 = createDate($scope.weeks[j], startEndTime[0], startEndTime[1], 0, 0);
                                d3 = createDate($scope.weeks[j], startEndTime[2], startEndTime[3], 0, 0);
                                if(d1.getTime() >= d2.getTime() && d1.getTime() <= d3.getTime()){
                                    id[j] = retrievedAttendance[i].attendanceId;
                                    if(retrievedAttendance[i].status == "Excused"){ at[j] = 3; }
                                    else if(retrievedAttendance[i].status == "Absent"){ at[j] = 2; }
                                    else{ at[j] = 1; }   // present
                                    break;
                                }
                            }
                            i++;
                        } // end of attendance loop
                    }else{
                        break;
                    }
                    j++;
                }// end of weeks loop
                $scope.attendance.push({'studentNumber': studentNumber.studentNumber, 'name': studentNumber.lastName +  ', ' + studentNumber.firstName, 'attendance': at, 'id': id});
            });
        }

        function createDate(date, hr, min, sec, ms){
            var d = new Date(date);
            d.setHours(hr, min, sec, ms);
            return d;
        }

        function getStartEndDateTime(){
            var sectionTime = $scope.sectionDetails.time.split('-');
            sectionTime[0] = ConvertTimeformat(sectionTime[0], 'start');
            sectionTime[1] = ConvertTimeformat(sectionTime[1], 'end');

            return [sectionTime[0][0], sectionTime[0][1], sectionTime[1][0], sectionTime[1][1]];
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

        // convert time from 12hr format to 24hr format
        function ConvertTimeformat(sectionTime, mode) {
            sectionTime = String(sectionTime).split(':');
            var hours = Number(sectionTime[0]);
            var minutes = Number(sectionTime[1]);
            if(mode == 'start'){
                if(hours >= 1 && hours < 7){ hours = hours + 12; }
            }else{
                if(hours >= 1 && hours <= 7){ hours = hours + 12; }
            }
            
            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            return [sHours,sMinutes];
        }
        
    }]);

})();