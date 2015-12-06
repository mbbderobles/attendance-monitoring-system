'use strict';

(function(){
	angular
		.module("myApp")
		.factory("SectionByUserService", SectionByUserService);

	SectionByUserService.$inject = ["$http", "$q"];

	function SectionByUserService($http, $q){
		var teacher_section_url = "/api/teachers/sections/";
		var student_section_url = "/api/students/sections/";
		var teacher_url = "/api/teachers/";
		var student_url = "/api/students/";
		var section_url = "/api/sections/";

		var service = {};
		service.GetTeacher = GetTeacher;
		service.GetSectionsOfTeacher = GetSectionsOfTeacher;
		service.GetStudent = GetStudent;
		service.GetSectionsOfStudent = GetSectionsOfStudent;
		service.EditSection = EditSection;
		return service;

        function GetSectionsOfTeacher(id){
        	var deferred = $q.defer();

			$http.get(teacher_section_url+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function GetTeacher(id){
        	var deferred = $q.defer();

			$http.get(teacher_url+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function GetSectionsOfStudent(id){
        	var deferred = $q.defer();

			$http.get(student_section_url+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function GetStudent(id){
        	var deferred = $q.defer();

			$http.get(student_url+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function EditSection(section,id){
        	var deferred = $q.defer();

			$http.put(section_url+id, section)
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