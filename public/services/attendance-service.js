'use strict';

(function(){
	angular
	.module("myApp")
	.factory("AttendanceService", AttendanceService);

	AttendanceService.$inject = ["$http", "$q"];

	function AttendanceService($http, $q){
		var attendance_url = "/api/attendance/";
		var attendance_section_url = "/api/attendance/sections/";
		var attendance_present_url = "/api/attendance/sections/present/";
		var attendance_absent_url = "/api/attendance/sections/absent/";
		var attendance_excused_url = "/api/attendance/sections/excused/";
		var section_student_url = "/api/sections/students/";
		var section_url = "/api/sections/";

		var service = {};
		service.GetSection = GetSection;
		service.GetStudentsBySection = GetStudentsBySection;
		service.GetAttendance = GetAttendance;
		service.GetPresentStudents = GetPresentStudents;
		service.GetAbsentStudents = GetAbsentStudents;
		service.GetExcusedStudents = GetExcusedStudents;
		service.AddAttendance = AddAttendance;
		service.EditAttendance = EditAttendance;
		service.DeleteAttendance = DeleteAttendance;
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
        function GetStudentsBySection(id){
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

        // get present students
        function GetPresentStudents(id){
        	var deferred = $q.defer();

			$http.get(attendance_present_url+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        // get absent students
        function GetAbsentStudents(id){
        	var deferred = $q.defer();

			$http.get(attendance_absent_url+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        // get excused students
        function GetExcusedStudents(id){
        	var deferred = $q.defer();

			$http.get(attendance_excused_url+id)
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

        // delete attendance of student
        function DeleteAttendance(id){
        	var deferred = $q.defer();

			$http.delete(attendance_url+id)
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