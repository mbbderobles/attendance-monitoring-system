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
		var section_url = "/api/sections";

		var service = {};
		service.AddCourse = AddCourse;
		service.AddSection = AddSection;
		service.AddUser = AddUser;
		service.AddTeacher = AddTeacher;
		service.AddCourseOffering = AddCourseOffering;
		return service;

		function AddCourseOffering(files){
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

			var deferred = $q.defer();
			var course = {};

            $http.get(course_url+'/number/'+data[0])
            .success(function (data1){
                deferred.reject("Existing");
            })
            .error(function (data1, status){
                course.courseNum = data[0];
                course.courseTitle = data[1];
                $http.post(course_url, course)
            	.success(function (data2){
            		deferred.resolve(data2);
	            })
	            .error(function (data2, status){
	            	deferred.reject(status);
	            });
            });

	        return deferred.promise;

        };
        
        function AddSection(data){
        
            var section_promise = $q.defer();
            var course_promise = $q.defer();
            var user_promise = $q.defer();
            //var teacher_promise = $q.defer();
        
            
            
            var section = {}, user = {}, teacher = {};
            
            $http.get(section_url+'/code/'+data[7]+'/'+data[0]+'/'+data[8]+'/'+data[9])
            .success(function (section_data){
                section_promise.reject("Existing");
            })
            .error(function (section_data, status){
                section.sectionCode = data[0];
                section.employeeId = data[6];
                section_promise.resolve(section_data);
            });
            
            $http.get(course_url+'/number/'+data[7])
            .success(function (course_data){
                section.courseId = course_data.courseId;
                course_promise.resolve(course_data);
            });
            
            $http.get(user_url+'/email/'+data[5])
            .success(function (user_data){
                
            })
            .error(function (user_data, status){
            
            });
            
            $q.all([section_promise, course_promise]).then(function() {
                console.log(section);
            });
            
        
        }

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
	}

})();
