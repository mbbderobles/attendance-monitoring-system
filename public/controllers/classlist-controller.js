'use strict';

(function(){
    angular
    .module('myApp')
    .controller('ClasslistCtrl',['$scope', '$parse', 'ClasslistService', function ($scope, $parse, ClasslistService) {
        
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

        // parse csv content
        $scope.parseCSV = function(myData){
            var data = myData.split('\n');
            var i=0, j=0, courses={}, user={}, teacher={};

            while(i < data.length){
                data[i] = data[i].split(',');
                i++;
            }

            ClasslistService.AddClasslist(data)
            .then(function(data1){
                $scope.finished = true;
            });
        };
    }]);

})();