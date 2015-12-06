'use strict';

(function(){
    angular
    .module('myApp')
    .controller('AttendanceCtrl',['$scope', '$parse', '$window', '$routeParams', 'AttendanceService', function ($scope, $parse, $window, $routeParams, AttendanceService) {
        var students = [], retrievedAttendance, startEndTime;

        $scope.attendance = [];         // list of attendance record of students
        $scope.sectionDetails = {};     // details of the section
        $scope.weekStart = 0;           // sunday = 0
        $scope.weeks = getWeek();
        $scope.not_enrolled = [];
        GetStudentsNotEnrolledInSection();

        var studentRemarks = [];

        // get section details given the section id
        AttendanceService.GetSection($routeParams.id2)
        .then(function(data1){
            data1.day = convertBinToDay(data1.day);
            $scope.sectionDetails = data1;

            startEndTime = getStartEndDateTime();

            retrieveRecords();

        });

        // adjust the calendar to next week
        $scope.nextWeek = function(){
            $scope.weekStart += 7;
            $scope.weeks = getWeek();
            $scope.attendance = [];
            AttendanceService.GetAttendance($routeParams.id2)   // get attendance by section
            .then(function(data){
                retrievedAttendance = data;
                viewAttendance(students, data);
            });
        }

        // adjust the calendar to previous week
        $scope.previousWeek = function(){
            $scope.weekStart -= 7;
            $scope.weeks = getWeek();
            $scope.attendance = [];
            AttendanceService.GetAttendance($routeParams.id2)   // get attendance by section
            .then(function(data){
                retrievedAttendance = data;
                viewAttendance(students, data);
            });
        }

        //change student status (present, absent, excused, no record)
        $scope.changeStatus = function(index, attendanceIndex){
            if($scope.privilege==2 || $scope.privilege==3){
                var desc;
                var status = $scope.attendance[index].attendance[attendanceIndex];
                var id = $scope.attendance[index].id[attendanceIndex];

                if(status != 0){
                    status = (status + 1) % 5;
                    if(status == 0){ status++; }
                    switch(status){
                        case 1: { desc = "Present"; break; }
                        case 2: { desc = "Absent"; break; }
                        case 3: { desc = "Excused"; break; }
                    }

                    if(id==0){
                        var d = new Date($scope.weeks[attendanceIndex]);
                        d.setUTCHours(startEndTime[0], startEndTime[1], 0, 0);
                        // 0 to present
                        AttendanceService.AddAttendance({'courseId': $scope.sectionDetails.courseId, 'sectionId': $scope.sectionDetails.sectionId, 'status': desc, 'attended': d, 'studentNumber': $scope.attendance[index].studentNumber})
                        .then(function(data1){
                            console.log('PRESENT');
                            $scope.attendance[index].attendance[attendanceIndex] = status;
                            $scope.attendance[index].id[attendanceIndex] = data1.attendanceId;
                        });
                    }else if(status == 4){
                        // excused to no record
                        AttendanceService.DeleteAttendance(id)
                        .then(function(data2){
                            console.log('NO RECORD');
                            $scope.attendance[index].attendance[attendanceIndex] = status;
                            $scope.attendance[index].remarks.excused--;
                            $scope.attendance[index].id[attendanceIndex] = 0;
                        });                  
                    }else{
                        // ___ to absent or excused
                        AttendanceService.EditAttendance({'status': desc}, id)
                        .then(function(data3){
                            $scope.attendance[index].attendance[attendanceIndex] = status;
                            if(status == 2){        // absent
                                console.log('ABSENT');
                                $scope.attendance[index].remarks.absent++;
                            }else{                  // excused
                                console.log('EXCUSED');
                                $scope.attendance[index].remarks.absent--;
                                $scope.attendance[index].remarks.excused++;
                            }
                        });
                    }
                }
            }
            
        }

        $scope.AddStudentToSection = function(){
            if($scope.privilege==2 || $scope.privilege==3){
                $scope.newStudentToSection.sectionId = $routeParams.id2;
                AttendanceService.AddStudentToSection($scope.newStudentToSection)
                .then(function(data){
                    students.push(data);
                    retrieveRecords();
                    $scope.addS2S = !$scope.addS2S;
                    GetStudentsNotEnrolledInSection();
                });
            }
        }

        $scope.DeleteStudentFromSection = function(){
            if($scope.privilege==2 || $scope.privilege==3){
                if(confirm('Are you sure you want to delete the student from the section?')){
                    AttendanceService.DeleteStudentFromSection($scope.deleteStudentFromSection.studentSectionId)
                    .then(function(data){
                        $scope.deleteS2S = !$scope.deleteS2S;
                        GetStudentsNotEnrolledInSection();
                        retrieveRecords();
                    });
                }
            }
        }

        function GetStudentsNotEnrolledInSection(){
            AttendanceService.GetStudentsNotEnrolledInSection($routeParams.id2)        // get students not enrolled in a section
            .then(function(data){
                $scope.not_enrolled = data;
            });
        }

        function retrieveRecords(){
            $scope.attendance = [];
            AttendanceService.GetStudentsBySection($routeParams.id2)        // get students enrolled in a section
            .then(function(data2){
                students = data2;

                AttendanceService.GetAbsentStudents($routeParams.id2)       // count students' absences
                .then(function(abs){
                    AttendanceService.GetExcusedStudents($routeParams.id2)  // count students' excused record
                    .then(function(exc){
                        studentRemarks = viewRemarks(students,abs,exc);

                        AttendanceService.GetAttendance($routeParams.id2)   // get attendance by section
                        .then(function(data3){
                            retrievedAttendance = data3;
                            viewAttendance(data2, data3);
                        });

                    });
                });

                
            }, function(error){
                $window.location.href = '/#/courses/'+$routeParams.id+'/sections/'+$routeParams.id2+'/classlist';
            });
        }

        // store and organize remarks of each student
        function viewRemarks(students, abs, exc){
            var remarks = [];
            students.forEach(function(student){
                var i=0, rem={absent:0, excused:0};

                while(i<abs.length){
                    if(student.studentNumber == abs[i].studentNumber){
                        rem.absent = abs[i].absent;
                        break;
                    }
                    i++;
                }

                i=0;
                while(i<exc.length){
                    if(student.studentNumber == exc[i].studentNumber){
                        rem.excused = exc[i].excused;
                        break;
                    }
                    i++;
                }
                remarks.push(rem);
            });
            return remarks;
        }

        // store and organize attendance record
        //1 - present, 2 - absent, 3 - excused, 4 - no record, 0 - none
        function viewAttendance(studentNumbers,retrievedAttendance){
            var cnt = 0;
            studentNumbers.forEach(function(studentNumber){ // loop for all students registered in the course
                var i=0, j=0, sectionTime;
                var currDate = new Date();
                var at = [0,0,0,0,0,0,0];     // attendance
                var id = [0,0,0,0,0,0,0];
                while(j<$scope.weeks.length){   // loop for checking attendance for all dates of the week
                    var wk = createDate($scope.weeks[j], startEndTime[2], startEndTime[3], 0, 0);
                    if(wk.getTime() <= currDate.getTime()){  // only checks dates on or before current date
                        i=0;
                        at[j] = 4;  // no record
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
                $scope.attendance.push({'studentNumber': studentNumber.studentNumber, 'studentSectionId': studentNumber.studentSectionId, 'name': studentNumber.lastName +  ', ' + studentNumber.firstName, 'attendance': at, 'id': id, 'remarks': studentRemarks[cnt++]});
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
            var su = new Date(curr.getTime() - 60*60*24*day*1000); // returns first day (monday) of the week 
            var mon = new Date(curr.getTime() - 60*60*24*(day-1)*1000);
            var tues = new Date(curr.getTime() - 60*60*24*(day-2)*1000);
            var wed = new Date(curr.getTime() - 60*60*24*(day-3)*1000);
            var thurs = new Date(curr.getTime() - 60*60*24*(day-4)*1000);
            var fri = new Date(curr.getTime() - 60*60*24*(day-5)*1000);
            var sat = new Date(curr.getTime() - 60*60*24*(day-6)*1000);
            return [su,mon,tues,wed,thurs,fri,sat];
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
        
    }]);

})();