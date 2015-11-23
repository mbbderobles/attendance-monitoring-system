'use strict';

(function(){
	angular
		.module("myApp")
		.factory("CourseService", CourseService);

	CourseService.$inject = ["$http", "$q"];

	function CourseService($http, $q){
		var course_url = "/api/courses";

		var service = {};
		service.GetAll = GetAll;
		service.AddCourse = AddCourse;
		service.EditCourse = EditCourse;
		service.DeleteCourse = DeleteCourse;
		return service;

        function GetAll(){
        	var deferred = $q.defer();

			$http.get(course_url)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function AddCourse(user){
        	var deferred = $q.defer();

			$http.post(course_url, user)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function EditCourse(user,id){
        	var deferred = $q.defer();

			$http.put(course_url+'/'+id, user)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function DeleteCourse(id){
        	var deferred = $q.defer();

			$http.delete(course_url+'/'+id)
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