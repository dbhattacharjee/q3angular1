(function () {
    'use strict';

    angular
        .module('heroku1App')
        .controller('MailController', MailController);

    MailController.$inject = ['$location', 'UserService', 'FlashService', '$rootScope'];
    function MailController($location, UserService, FlashService, $rootScope) {
        var vm = this;
        function register() {
            vm.dataLoading = true;
            UserService.GetAllMails()
                .then(function (response) {
                    if (response.data.success) {
                        FlashService.Success('Emails Fetched !', true);
                        $rootScope.mails = response.data.mails;
                        vm.dataLoading = false;
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        };
        
        $rootScope.readMail = function(mailUID) {
            vm.dataLoading = true;
            UserService.GetSingleMail(mailUID)
                .then(function (response) {
                    if (response.data.success) {
                        FlashService.Success('Emails Fetched !', true);
                        $rootScope.mails = response.data.mails;
                        vm.dataLoading = false;
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        };
        register();
    }

})();