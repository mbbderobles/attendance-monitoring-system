'use strict';

(function(){
	angular
		.module("myApp")
		.factory("CourseOfferingService", CourseOfferingService);

	CourseOfferingService.$inject = ["$http", "$q"];

	function CourseOfferingService($http, $q){
		var course_url = "/api/courses";
		var user_url = "/api/users";
		var teacher_url = "/api/teachers";
		var service = {};
		service.AddCourseOffering = AddCourseOffering;
		return service;

		function AddCourseOffering(data){
			var deferred = $q.defer();
			var section = {}, teacher = {}, user = {};

			// Add Course
			if(data.length == 3){
				data = {courseNum: data[0], courseTitle: data[1]};
				$http.post(course_url, data)
	        	.success(function (data){
	        		deferred.resolve(data);
		        })
		        .error(function (data, status){
		        	deferred.reject(status);
		        });
			}/*else{
				//Add User
				user.firstName = "";
				user.lastName = data[4];
				user.middleName = "";
				user.emailAddress = data[5];
				
				$http.post(course_url, data)
	        	.success(function (data){
	        		deferred.resolve(data);
		        })
		        .error(function (data, status){
		        	deferred.reject(status);
		        });
			}*/

	        return deferred.promise;
        };
	}

})();