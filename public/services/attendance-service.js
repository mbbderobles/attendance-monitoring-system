'use strict';

(function(){
	angular
	.module("myApp")
	.factory("AttendanceService", AttendanceService);

	AttendanceService.$inject = ["$http", "$q"];

	function AttendanceService($http, $q){
		var attendance_url = "/api/attendance/";
		var attendance_section_url = "/api/attendance/section";
		var section_student_url = "/api/sections/student";
		var section_url = "/api/sections";

		var service = {};
		service.GetSection = GetSection;
		service.GetStudents = GetStudents;
		service.GetAttendance = GetAttendance;
		service.GetAll = GetAll;
		service.AddAttendance = AddAttendance;
		service.EditAttendance = EditAttendance;
		return service;

		function GetSection(id){
        	var deferred = $q.defer();

			$http.get(section_url+'/'+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function GetAttendance(id){
        	var deferred = $q.defer();
        	//var promises = weeks.map(function(week){
        		//return $http.get(attendance_url, {params:{sectionId:sectionId,studentNumber:studentNumber,attended:week}});
        	//});
			$http.get(attendance_section_url+'/'+id)
			.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });
	        //return $q.all(promises);
	        return deferred.promise;
        };

        function GetStudents(id){
        	var deferred = $q.defer();

			$http.get(section_student_url+'/'+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

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