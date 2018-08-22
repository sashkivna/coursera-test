(function () {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService)
        .constant('ApiPath', "https://davids-restaurant.herokuapp.com");

    MenuDataService.$inject = ['$http', '$rootScope', 'ApiPath'];
    function MenuDataService ($http, $rootScope, ApiPath) {
        var service = this;

        service.getAllCategories = function () {
            return $http.get(ApiPath + "/categories.json");
        };

        service.getItemsForCategory = function (categoryShortName) {
            return $http({
                method: "GET",
                url: (ApiPath + "/menu_items.json"),
                params: {category: categoryShortName}
            });
        }

    }

})();