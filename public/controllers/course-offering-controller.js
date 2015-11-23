'use strict';

(function(){
    angular
    .module('myApp')
    .controller('CourseOfferingCtrl',['$scope', '$parse', 'CourseOfferingService', function ($scope, $parse, CourseOfferingService) {
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

        $scope.parseCSV = function(myData){
            var data = myData.split('\n');
            var i=0, j=0, courses={}, user={}, teacher={};

            while(i < data.length){
                data[i] = data[i].split(',');
                i++;
            }

            /*i=0;

            while(i < data.length){
                if(data[i].length == 3){
                    //courses.push({courseNum: data[i][0],courseTitle: data[i][1]});
                    course.courseNum = data[i][0];
                    course.courseTitle = data[i][1];
                    j=i;
                    CourseOfferingService.AddCourse(course)
                    .then(function(data1){
                        j++;
                        console.log(j);
                        while(data[j].length != 3 && j < data.length){
                            user.lastName = data[i][5];
                            user.middleName = "";
                            user.firstName = "";
                            user.emailAddress = data[i][6];
                            CourseOfferingService.AddUser(user)
                            .then(function(data2){
                                teacher.id = data2.id;
                                teacher.employeeId = data[i][6];
                                teacher.unit = "";
                                teacher.position = "";
                                CourseOfferingService.AddTeacher(teacher)
                                .then(function(data3){
                                    $scope.finished = true;
                                });
                            });
                            j++;
                        }
                    });
                }
                i++;
            }*/
            CourseOfferingService.AddCourseOffering(data)
            .then(function(data1){
                console.log('done!');
                $scope.finished = true;
            });
            
        };
    }]);

})();