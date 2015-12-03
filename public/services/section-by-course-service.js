'use strict';

(function(){
	angular
		.module("myApp")
		.factory("SectionByCourseService", SectionByCourseService);

	SectionByCourseService.$inject = ["$http", "$q"];

	function SectionByCourseService($http, $q){
		var section_course_url = "/api/sections/courses";
		var section_url = "/api/sections";
		var course_url = "/api/courses/";
		var teacher_url = "/api/teachers";

		var service = {};
		service.GetTeachers = GetTeachers;
		service.GetAllByCourse = GetAllByCourse;
		service.GetCourse = GetCourse;
		service.AddSection = AddSection;
		service.EditSection = EditSection;
		service.DeleteSection = DeleteSection;
		return service;

		function GetCourse(id){
        	var deferred = $q.defer();

			$http.get(course_url+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function GetAllByCourse(id){
        	var deferred = $q.defer();

			$http.get(section_course_url+'/'+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function GetTeachers(){
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
        
        function AddSection(user){
        	var deferred = $q.defer();

			$http.post(section_url, user)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function EditSection(user,id){
        	var deferred = $q.defer();

			$http.put(section_url+'/'+id, user)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function DeleteSection(id){
        	var deferred = $q.defer();

			$http.delete(section_url+'/'+id)
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