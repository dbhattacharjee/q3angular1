(function () {
    'use strict';

    angular
        .module('heroku1App')
        .constant('API_CONSTANTS', {"URL":"http://192.168.12.80/angular/heroku2/index.php", "KEY":"test"})
        .constant('PAGING_CONSTANTS', {"ITEMS_PER_PAGE":"5"})
})();