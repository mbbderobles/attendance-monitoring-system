'use strict';

(function(){
	angular
		.module("myApp")
		.factory("ClasslistService", ClasslistService);

	ClasslistService.$inject = ["$http", "$q"];

	function ClasslistService($http, $q){
		var classlist_url = "/api/sections/students";
		var student_url = '/api/students';
		var user_url = '/api/users';
		var section_url = "/api/sections/";

		var service = {};
		service.GetSection = GetSection;
		service.AddClasslist = AddClasslist;
		service.GetStudents = GetStudents;
		service.GetStudentsBySection = GetStudentsBySection;
		service.AddUsers = AddUsers;
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

		// add to user, student, student_section
		function AddUsers(files,sectionId){
			var promises = files.map(function(file) {
				var user = {'lastName': file[1], 'firstName': file[2], 'middleName': file[3], 'emailAddress': file[6]};
				var student = {'studentNumber': file[0], 'sex': '', 'degree': file[4], 'college': file[5]};
				var classlist = {'studentNumber': file[0], 'sectionId': sectionId};
				
				$http.post(user_url, user)					// add user
				.then(function(data1){
					console.log(data1);
					student['id'] = data1.data.id;
					$http.post(student_url, student)		// add student
					.then(function(data2){
						return $http.post(classlist_url, classlist)		// add student to section
					});
				});
		    });
		    
		    return $q.all(promises);
		}

		// add to student_section record
		function AddClasslist(classlist){
        	var deferred = $q.defer();

			$http.post(classlist_url, classlist)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        // get list of all students
		function GetStudents(){
        	var deferred = $q.defer();

			$http.get(student_url)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        // get list of all students of a section
		function GetStudentsBySection(sectionId){
        	var deferred = $q.defer();

			$http.get(classlist_url+'/'+sectionId)
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