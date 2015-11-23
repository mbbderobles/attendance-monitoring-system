/*
function onSuccess(googleUser) {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
  console.log(error);
}

function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'https://www.googleapis.com/auth/plus.login',
        'width': 250,
        'height': 60,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}
*/
'use strict';

(function(){
    angular
    .module('myApp')
    .controller('AuthCtrl', ['$scope', function($scope){
        $scope.signedIn = false;
        
        $scope.userInfoCallback = function(userInfo){
            $scope.user = userInfo['displayName'];
        };
        
        $scope.getUserName = function(){
            gapi.client.request({
                'path': '/plus/v1/people/me',
                'method': 'GET',
                'callback': $scope.userInfoCallback
            });
        };
        
        $scope.processAuth = function(authResult){
            if(authResult['access_token']){
                $scope.signedIn = true;
                $scope.getUserName();
            }else if(authResult['error']){
                $scope.signedIn = false;
            }
        };
        
        $scope.signInCallback = function(authResult){
            $scope.$apply(function(){
                $scope.processAuth(authResult);
            });
        };
        
        $scope.renderSignInButton = function(){
            gapi.signin.render('my-signin2', {
                'scope': 'https://www.googleapis.com/auth/plus.login',
                'clientid': '740121264589-1gm3r2gtlb391so2d7ustvgmmmnncrsl.apps.googleusercontent.com',
                'callback': $scope.signInCallback,
                'cookiepolicy': 'single_host_origin',
                'requestvisibleactions': 'http://schemas.google.com/AddActivity'
            });
        };
        
        $scope.start = function(){
            $scope.renderSignInButton();
        };
        
        $scope.start();
    }]);

})();

