'use strict';

(function(){

    angular
    .module('myApp')
    .controller('AuthCtrl', ['$scope', '$rootScope', '$location', 'AuthService', function($scope, $rootScope, $location, AuthService){
        $scope.auth2 = {};
        $scope.g = {};
        $scope.signedIn = false;
        $scope.privilege = -1;
        $scope.userId = 0;
        $scope.user = '';
        $scope.email = '';
                
        $scope.logout = function(){
            $scope.user = '';
            $scope.email = '';
            $scope.signedIn = false;
            $scope.privilege = -1;
            $scope.auth2.disconnect();
        }
        
        $scope.signInSuccess = function(googleUser){
            $scope.signedIn = true;
            $scope.privilege = 0;
            $scope.user = googleUser.getBasicProfile().getName();
            $scope.email = googleUser.getBasicProfile().getEmail();
            AuthService.GetUsers()
                .then(function(data){
                    for(var i=0; i<data.length; i++){
                        if($scope.email == data[i].emailAddress){               // To find privilege, find user based from email
                            $scope.userId = data[i].id;
                            AuthService.CheckAdmin(data[i].id)                  // Check if Admin
                                .then(function(data2){
                                    $scope.privilege = 3;
                                }, function(error){                             // If not, check if Teacher
                                    AuthService.CheckTeacher(data[i].id)
                                        .then(function(data2){
                                            $scope.privilege = 2;
                                        }, function(error){                     // If not, check if Student
                                            AuthService.CheckStudent(data[i].id)
                                                .then(function(data2){
                                                    $scope.privilege = 1;
                                                }, function (data2){            // Unidentified
                                                    $scope.privilege = 0;
                                                });
                                        });
                                });
                            break;
                        }
                    }
                });
            $scope.$apply();
        };
        
        $scope.signInFailure = function(error){
            console.log(error);
            $scope.signedIn = false;
            $scope.privilege = -1;
            $scope.user = '';
            $scope.email = '';
        }
        
        $scope.renderSignInButton = function(){
            gapi.signin2.render('my-signin2', {
                'fetch_basic_profile': true,
                'scope': 'https://www.googleapis.com/auth/plus.login',
                'width': 120,
                'height': 36,
                'longtitle': false,
                'theme': 'dark',
                'onsuccess': $scope.signInSuccess,
                'onfailure': $scope.signInFailure
            });
        };
        
        $scope.start = function(){
            gapi.load('auth2', function() {
                gapi.client.load('plus','v1').then(function() {
                $scope.renderSignInButton();
                gapi.auth2.init({
                    fetch_basic_profile: true,
                    scope:'https://www.googleapis.com/auth/plus.login'
                }).then(function (){
                      $scope.auth2 = gapi.auth2.getAuthInstance();
                    });
                });
            });
        };
        
        $scope.start();
        
        // executes every route changes
        // it checks if the user is logged in and if the next route needs permission
        $rootScope.$on('$routeChangeStart', function(event, next){
            if(!$scope.signedIn || next.privilege > $scope.privilege){
                $location.path('/');
            }
        });

        
    }]);

})();
