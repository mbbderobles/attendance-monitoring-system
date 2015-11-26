'use strict';

(function(){

angular
    .module("myApp")
    .factory("AuthService", AuthService);
    
	AuthService.$inject = ["$http", "$q"];

	function AuthService($http, $q){
		var user_url = "/api/users";
		var admin_url = "/api/admins";
		var teacher_url = "/api/teachers";
		var student_url = "/api/students";

		var service = {};
		service.GetUsers = GetUsers;
		service.CheckAdmin = CheckAdmin;
		service.CheckTeacher = CheckTeacher;
		service.CheckStudent = CheckStudent;
		return service;
        
        function GetUsers(){
            var deferred = $q.defer();

            $http.get(user_url)
            .success(function (data){
                deferred.resolve(data);
            })
            .error(function (data, status){
                deferred.reject(status);
            });

            return deferred.promise;
        };
        
        function CheckAdmin(id){
            var deferred = $q.defer();

            $http.get(admin_url+'/'+id)
            .success(function (data){
                deferred.resolve(data);
            })
            .error(function (data, status){
                deferred.reject(status);
            });

            return deferred.promise;
        };
        
        function CheckTeacher(id){
            var deferred = $q.defer();

            $http.get(teacher_url+'/'+id)
            .success(function (data){
                deferred.resolve(data);
            })
            .error(function (data, status){
                deferred.reject(status);
            });

            return deferred.promise;
        };
        
        function CheckStudent(id){
            var deferred = $q.defer();

            $http.get(student_url+'/'+id)
            .success(function (data){
                deferred.resolve(data);
            })
            .error(function (data, status){
                deferred.reject(status);
            });

            return deferred.promise;
        };
        
    
    }   // function AuthService

})();   // Anonymous function
