(function () {
    'use strict';

    angular
        .module('heroku1App')
        .controller('MailController', MailController);

    MailController.$inject = ['$location', 'UserService', 'FlashService', '$rootScope', 'ngDialog', 'PAGING_CONSTANTS', '$sce'];
    function MailController($location, UserService, FlashService, $rootScope, ngDialog, PAGING_CONSTANTS, $sce) {
        var vm = this;
        $rootScope.ITEMS_PER_PAGE = PAGING_CONSTANTS.ITEMS_PER_PAGE;
        $rootScope.sortKey = 'dated';
        $rootScope.reverse = true;
        $rootScope.sort = function(keyname) {
            $rootScope.sortKey = keyname;   //set the sortKey to the param passed
            $rootScope.reverse = !$rootScope.reverse; //if true make it false and vice versa
        }
        function register() {
            vm.dataLoading = true;
            UserService.GetAllMails()
                .then(function (response) {
                    if (response.data.success) {
                        FlashService.Success('Emails Fetched !', false);
                        $rootScope.mails = response.data.mails;
                        vm.dataLoading = false;
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        };
        
        $rootScope.readMail = function(id) {
            vm.dataLoading = true;
            UserService.GetSingleMail(id)
                .then(function (response) {
                    if (response.data.success) {
                        try{
                        $rootScope.email_from = $sce.trustAsHtml(response.data.mailInfo.fromAddress);
                        $rootScope.email_to = $sce.trustAsHtml(response.data.mailInfo.toAddress);
                        $rootScope.email_cc = $sce.trustAsHtml(response.data.mailInfo.ccAddress);
                        $rootScope.email_subject = $sce.trustAsHtml(response.data.mailInfo.subject);
                        $rootScope.email_body = $sce.trustAsHtml(response.data.mailInfo.body);
                        $rootScope.email_attachments = $sce.trustAsHtml(response.data.mailInfo.attachments);
                        
                        ngDialog.open({
					template: 'firstDialogId',
					className: 'ngdialog-theme-default'
				});
                        vm.dataLoading = false;
                        }catch(e) {
                            FlashService.Error(e);
                            vm.dataLoading = false;
                        }
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        };
        
        $rootScope.refreshQueue = function(id) {
            vm.dataLoading = true;
            UserService.GetRefreshQueue()
                .then(function (response) {
                    if (response.data.success) {
                        vm.dataLoading = false;
                        register();
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        };
        
        register();
    }

})();