(function() {
    'use strict';

    angular
            .module('heroku1App')
            .factory('UserService', UserService);

    UserService.$inject = ['$http', '$rootScope', 'API_CONSTANTS'];
    function UserService($http, $rootScope, API_CONSTANTS) {
        var service = {};
        
        service.GetAllMails = GetAllMails;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;
        
        function GetAllMails() {
            return $http.get(API_CONSTANTS.URL+'/api/mails?authkey='+$rootScope.globals.currentUser.authdata).then(handleSuccess, handleError('Error getting mails'));
        }
        
        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function() {
                return {success: false, message: error};
            };
        }
    }

})();