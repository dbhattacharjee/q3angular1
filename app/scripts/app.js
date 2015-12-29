(function() {
    'use strict';

    angular
            .module('heroku1App', ['ngRoute', 'ngCookies', 'ngSanitize'])
            .config(config)
            .run(run)
            .filter('ashtml', function($sce) { return $sce.trustAsHtml; });

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
                .when('/mail', {
            templateUrl: 'views/mail/mail.view.html',
            controller: 'MailController',
            controllerAs: 'vm'
        })

                .when('/login', {
            controller: 'LoginController',
            templateUrl: 'views/user/login.view.html',
            controllerAs: 'vm'
        })

                .otherwise({redirectTo: '/login'});
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$sce'];
    function run($rootScope, $location, $cookieStore, $http, $sce) {
        $rootScope.login_text = 'Login';
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
        
        $rootScope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
            if(loggedIn) {
                $rootScope.login_text = 'Logout';
            }
        });
    }

})();