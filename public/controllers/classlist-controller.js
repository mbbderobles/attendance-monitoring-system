'use strict';

(function(){
    angular
    .module('myApp')
    .controller('ClasslistCtrl',['$scope', '$parse', '$routeParams', 'ClasslistService', function ($scope, $parse, $routeParams, ClasslistService) {
        var students;

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

        // get list of users
        ClasslistService.GetStudents($routeParams.id)
            .then(function(data1){
                students = data1;
        });

        // parse csv content
        $scope.parseCSV = function(myData){
            var myData = myData.split('\n');
            var data = [];
            var i = 0;
            while(i < myData.length){
                myData[i] = myData[i].split(',');
                if(checkStudent(myData[i][6])){            // if student already exists
                    ClasslistService.AddClasslist({'studentNumber': myData[i][0], 'sectionId': $routeParams.id});
                }else{
                    data.push(myData[i]);
                }
                i++;
            }

            // add new students
            ClasslistService.AddUsers(data, $routeParams.id)
            .then(function(data1){
                $scope.finished = true;
            });
        };

        // check if student already exists
        function checkStudent(emailAddress){
            var i=0;
            while(i<students.length){
                if(students[i].emailAddress == emailAddress){
                    return true;
                }
                i++;
            }
            return false;
        }
    }]);

})();