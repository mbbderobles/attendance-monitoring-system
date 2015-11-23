'use strict';

(function(){
	angular
		.module("myApp")
		.factory("TeacherService", TeacherService);

	TeacherService.$inject = ["$http", "$q"];

	function TeacherService($http, $q){
		var teacher_url = "/api/teachers";
		var user_url = "/api/users";

		var service = {};
		service.GetAll = GetAll;
		service.AddUser = AddUser;
		service.AddTeacher = AddTeacher;
		service.EditUser = EditUser;
		service.EditTeacher = EditTeacher;
		service.DeleteUser = DeleteUser;
		service.DeleteTeacher = DeleteTeacher;
		return service;

        function GetAll(){
        	var deferred = $q.defer();

			$http.get(teacher_url)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function AddUser(user){
        	var deferred = $q.defer();

			$http.post(user_url, user)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function AddTeacher(user){
        	var deferred = $q.defer();

			$http.post(teacher_url, user)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function EditUser(user,id){
        	var deferred = $q.defer();

			$http.put(user_url+'/'+id, user)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function EditTeacher(user,id){
        	var deferred = $q.defer();

			$http.put(teacher_url+'/'+id, user)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function DeleteUser(id){
        	var deferred = $q.defer();

			$http.delete(user_url+'/'+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function DeleteTeacher(id){
        	var deferred = $q.defer();

			$http.delete(teacher_url+'/'+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

	}

})();