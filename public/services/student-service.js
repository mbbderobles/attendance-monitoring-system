'use strict';

(function(){
    angular
        .module("myApp")
        .factory("StudentService", StudentService);

    StudentService.$inject = ["$http", "$q"];

    function StudentService($http, $q){
        var student_url = "/api/students";
        var user_url = "/api/users";

        var service = {};
        service.GetAll = GetAll;
        service.AddUser = AddUser;
        service.AddStudent = AddStudent;
        service.EditUser = EditUser;
        service.EditStudent = EditStudent;
        service.DeleteUser = DeleteUser;
        service.DeleteStudent = DeleteStudent;
        return service;

        function GetAll(){
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

        function AddUser(user){
            var deferred = $q.defer();

            $http.post(user_url, user)
            .success(function (data){
                deferred.resolve(data);
            })
            .error(function (data, status){
                deferred.reject(status);
            });

            return deferred.promise;
        };

        function AddStudent(user){
            var deferred = $q.defer();

            $http.post(student_url, user)
            .success(function (data){
                deferred.resolve(data);
            })
            .error(function (data, status){
                deferred.reject(status);
            });

            return deferred.promise;
        };

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

        function DeleteUser(id){
            var deferred = $q.defer();

            $http.delete(user_url+'/'+id)
            .success(function (data){
                deferred.resolve(data);
            })
            .error(function (data, status){
                deferred.reject(status);
            });

            return deferred.promise;
        };

        function DeleteStudent(id){
            var deferred = $q.defer();

            $http.delete(student_url+'/'+id)
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