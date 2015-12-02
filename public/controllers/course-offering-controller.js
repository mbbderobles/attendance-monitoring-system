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
            
            CourseOfferingService.AddCourseOffering(data)
            .then(function(data1){
                console.log('done!');
                $scope.finished = true;
            });
            
        };
    }]);

})();