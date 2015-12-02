'use strict';

(function(){
	angular
	.module("myApp")
	.factory("AttendanceService", AttendanceService);

	AttendanceService.$inject = ["$http", "$q"];

	function AttendanceService($http, $q){
		var attendance_url = "/api/attendance/";
		var attendance_section_url = "/api/attendance/sections/";
		var section_student_url = "/api/sections/students/";
		var section_url = "/api/sections/";

		var service = {};
		service.GetSection = GetSection;
		service.GetStudents = GetStudents;
		service.GetAttendance = GetAttendance;
		service.AddAttendance = AddAttendance;
		service.EditAttendance = EditAttendance;
		return service;

		// get section details
		function GetSection(id){
        	var deferred = $q.defer();

			$http.get(section_url+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        // get attendance record of a section
        function GetAttendance(id){
        	var deferred = $q.defer();

			$http.get(attendance_section_url+id)
			.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });
	        //return $q.all(promises);
	        return deferred.promise;
        };

        // get students enrolled in the section
        function GetStudents(id){
        	var deferred = $q.defer();

			$http.get(section_student_url+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        // add attendance record of student
        function AddAttendance(attendance){
        	var deferred = $q.defer();

			$http.post(attendance_url, attendance)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        // edit attendance status of student
        function EditAttendance(user,id){
        	var deferred = $q.defer();

			$http.put(attendance_url+id, user)
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