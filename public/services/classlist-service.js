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

		var service = {};
		service.AddClasslist = AddClasslist;
		service.GetStudents = GetStudents;
		service.AddUsers = AddUsers;
		return service;

		function AddUsers(files,sectionId){
			var promises = files.map(function(file) {
				var user = {'lastName': file[1], 'firstName': file[2], 'middleName': file[3], 'emailAddress': file[6]};
				var student = {'studentNumber': file[0], 'sex': '', 'degree': file[4], 'college': file[5]};
				var classlist = {'studentNumber': file[0], 'sectionId': sectionId};
				
				$http.post(user_url, user)
				.then(function(data1){
					student['id'] = data1.id;
					$http.post(student_url, student)
					.then(function(data2){
						return $http.post(classlist_url, classlist)
					});
				});
		    });
		    
		    return $q.all(promises);
		}

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

		function GetStudents(sectionId){
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
	}

})();