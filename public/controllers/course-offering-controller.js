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

        $scope.parseCSV = function(data){
            data = data.split('\n');
            var i = 0;
            
            //console.log(data[0].length);
            while(i < data.length){
                data[i] = data[i].split(',');
                CourseOfferingService.AddCourseOffering(data[i])
                i++;
            }
            
            return true;
        };
    }]);

})();