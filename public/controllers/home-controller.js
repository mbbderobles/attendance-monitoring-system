'use strict';

(function(){
    angular
    .module('myApp')
    .controller('HomeCtrl',['$scope', 'ProfileService', function ($scope, ProfileService) {
        
        ProfileService.GetUser($scope.userId)
        .then(function(data){
            $scope.fullname = data.firstName + ' ' + data.lastName;
        });
        
    }]);
    
})();
