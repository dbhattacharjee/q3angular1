(function () {
    'use strict';

    angular
        .module('heroku1App')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.data.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/mail');
                } else {
                    FlashService.Error(response.data.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();