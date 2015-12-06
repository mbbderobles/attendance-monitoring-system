'use strict';

(function(){
    angular
        .module("myApp")
        .factory("ProfileService", ProfileService);

    ProfileService.$inject = ["$http", "$q"];
    
    function ProfileService($http, $q){
    
        var user_url = "/api/users";
        var teacher_url = "/api/teachers";
        var student_url = "/api/students";
        
        var service = {};
        service.GetUser = GetUser;
        service.GetTeacher = GetTeacher;
        service.GetStudent = GetStudent;
        service.EditUser = EditUser;
		service.EditTeacher = EditTeacher;
		service.EditStudent = EditStudent;
		return service;
		
		function GetUser(id){
		    var deferred = $q.defer();
		    
		    $http.get(user_url+'/'+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });
		    
		    return deferred.promise;
		}
		
		function GetTeacher(id){
		    var deferred = $q.defer();
		    
		    $http.get(teacher_url+'/'+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });
		    
		    return deferred.promise;
		}
		
		function GetStudent(id){
		    var deferred = $q.defer();
		    
		    $http.get(student_url+'/'+id)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });
		    
		    return deferred.promise;
		}
		
		function EditUser(user,id){
        	var deferred = $q.defer();

			$http.put(user_url+'/'+id, user)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };

        function EditTeacher(user,id){
        	var deferred = $q.defer();

			$http.put(teacher_url+'/'+id, user)
        	.success(function (data){
        		deferred.resolve(data);
	        })
	        .error(function (data, status){
	        	deferred.reject(status);
	        });

	        return deferred.promise;
        };
        
        function EditStudent(user,id){
            var deferred = $q.defer();

            $http.put(student_url+'/'+id, user)
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
