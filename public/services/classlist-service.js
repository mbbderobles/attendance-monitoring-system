'use strict';

(function(){
	angular
		.module("myApp")
		.factory("ClasslistService", ClasslistService);

	ClasslistService.$inject = ["$http", "$q"];

	function ClasslistService($http, $q){
		var course_url = "/api/courses";

		var service = {};
		service.AddCourse = AddCourse;
		service.AddUser = AddUser;
		service.AddTeacher = AddTeacher;
		service.AddSection = AddSection;
		service.AddClasslist = AddClasslist;
		return service;

		function AddClasslist(files){
			var cId, sem=files[0][0], year=files[0][1];
			files.shift();

			var promises = files.map(function(file) {
				var course={}, user={}, teacher={}, section={};
				
				if(file.length == 3){
					course.courseNum = file[0];
					course.courseTitle = file[1];
					$http.post(course_url,course)
					.then(function(data3){
						cId = data3.data.courseId;
						console.log("2 "+cId);
					});

					return;
				}else{
					console.log(cId);
					user.lastName = file[4];
					user.middleName = "";
					user.firstName = "";
					user.emailAddress = file[5];
					$http.post(user_url,user)
					.then(function(data1){
						teacher.id = data1.data.id;
						teacher.employeeId = file[6];
						teacher.unit = "";
						teacher.position = "";
						$http.post(teacher_url,teacher)
						.then(function(data2){

							section.sectionCode = file[0];
							section.employeeId = data2.data.employeeId;
							
							section.courseId = cId;
							section.day = file[2];
							section.time = file[1];
							section.room = file[3];
							section.semester = sem;
							section.year = year;
							return $http.post(section_url,section);
						});
					});
				}

		    });
		    
		    return $q.all(promises);
		}

		function AddCourse(data){
			console.log('course:'+data);
			var deferred = $q.defer();

			$http.post(course_url, data)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function AddUser(data){
        	var deferred = $q.defer();

			$http.post(user_url, data)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function AddTeacher(data){
        	var deferred = $q.defer();

			$http.post(teacher_url, data)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function AddSection(data){
        	console.log('section:'+data);
        };
	}

})();