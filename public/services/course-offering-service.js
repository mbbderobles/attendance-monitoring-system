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

		function AddCourseOffering(courses, c_count, sections, s_count){
            
            var deferred = $q.defer();
            var i;
            
            for(i=0; i<c_count; i++){
                AddCourse(courses[i]);
                console.log(courses[i][0]);
            }
            
            for(i=0; i<s_count; i++){
                AddSection(sections[i]);
                console.log(sections[i][0]);
            }
            
            deferred.resolve();
            return deferred.promise;
            
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
  
            var section = {}, user = {}, teacher = {};
            
            $http.get(section_url+'/code/'+data[7]+'/'+data[0]+'/'+data[8]+'/'+data[9])
            .success(function (section_data){
                section_promise.reject("Existing");
            })
            .error(function (section_data, status){
                section.sectionCode = data[0];
                section.employeeId = data[6];
                if(data[2] == "Sun"){
                    section.day = "1000000";
                }else if(data[2] == "Mon"){
                    section.day = "0100000";
                }else if(data[2] == "Tue"){
                    section.day = "0010000";
                }else if(data[2] == "Wed"){
                    section.day = "0001000";
                }else if(data[2] == "Thur"){
                    section.day = "0000100";
                }else if(data[2] == "Fri"){
                    section.day = "0000010";
                }else if(data[2] == "Sat"){
                    section.day = "0000001";
                }else{
                    var i, j=0;
                    section.day = "0000000";
                    for(i=data[2].length-1; i>=0; i--){
                        if(data[2][i] == 'M'){
                            section.day = section.day.substr(0,1) + '1' +section.day.substr(2);
                        }else if(data[2][i] == 'T'){
                            section.day = section.day.substr(0,2) + '1' +section.day.substr(3);
                        }else if(data[2][i] == 'W'){
                            section.day = section.day.substr(0,3) + '1' +section.day.substr(4);
                        }else if(data[2][i] == 'h'){
                            section.day = section.day.substr(0,4) + '1' +section.day.substr(4);
                            i--;
                        }else if(data[2][i] == 'F'){
                            section.day = section.day.substr(0,5) + '1' +section.day.substr(6);
                        }else if(data[2][i] == 'S'){
                            section.day = section.day.substr(0,6) + '1' +section.day.substr(7);
                        }
                    }
                }
				section.time = data[1];
				section.room = data[3];
				section.semester = data[8];
				section.year = data[9];
                section_promise.resolve(section_data);
            });
            
            $http.get(course_url+'/number/'+data[7])
            .success(function (course_data){
                section.courseId = course_data.courseId;
                course_promise.resolve(course_data);
            });
            
            $http.get(user_url+'/email/'+data[5])
            .success(function (user_data){
                $http.get(teacher_url+'/'+user_data.id)
                .success(function (teacher_data){
                    section.employeeId = teacher_data.employeeId;
                })
                .error(function (teacher_data, status){
                    teacher.id = user_data.id;
					teacher.employeeId = data[6];
					teacher.unit = "";
					teacher.position = "";
					$http.post(teacher_url, teacher)
					.success(function (teacher_data2){
					    section.employeeId = teacher_data2.employeeId;
					});
                });
                user_promise.resolve(user_data);
            })
            .error(function (user_data, status){
                user.lastName = data[4];
                user.firstName = "";
                user.middleName = "";
                user.emailAddress = data[5];
                $http.post(user_url, user)
                .success(function (user_data2){
                    teacher.id = user_data2.id;
					teacher.employeeId = data[6];
					teacher.unit = "";
					teacher.position = "";
					$http.post(teacher_url, teacher)
					.success(function (teacher_data){
					    section.employeeId = teacher_data.employeeId;
					});
                });
                user_promise.resolve(user_data);
            });
            
            $q.all([section_promise, course_promise, user_promise]).then(function() {
                console.log(section);
                //$http.post(section_url, section);
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
