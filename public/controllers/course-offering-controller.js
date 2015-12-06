'use strict';

(function(){
    angular
    .module('myApp')
    .controller('CourseOfferingCtrl',['$scope', '$parse', '$window', '$timeout', 'CourseOfferingService', function ($scope, $parse, $window, $timeout, CourseOfferingService) {
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
            if($scope.privilege==3){    // check if admin
                var data = myData.split('\n');
                var i=0, c_count=0, s_count=0, courses=[], sections=[], temp_course;
                var sem;
                var year;

                // Create array of courses and sections from CSV
                while(i < data.length){
                    data[i] = data[i].split(',');
                    if(data[i].length == 3){
                        courses[c_count++] = data[i];
                        temp_course = data[i][0];
                    }else if(data[i].length == 7){
                        sections[s_count] = data[i];
                        sections[s_count][7] = temp_course;
                        sections[s_count][8] = sem;
                        sections[s_count][9] = year;
                        s_count++;
                    }else if(data[i].length == 2){
                        sem = data[i][0][0];
                        year = data[i][1];
                    }
                    i++;
                }
                
                // Insert all of them into the DB
                CourseOfferingService.AddCourseOffering(courses, sections)
                .then(function(data1){
                    $scope.finished = true;
                    $timeout(function(){$window.location.href = '/#/courses/'}, 700);
                });
            }
        }
    }]);

})();
