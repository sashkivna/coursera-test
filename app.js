(function() {
    'use strict';
    angular
        .module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .factory('MenuSearchFactory', MenuSearchFactory)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;

        list.isEmpty = function() {
            return list.found != undefined && list.found.length === 0;
        }
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ndController = this;

        ndController.searchTerm = "";

        ndController.narrowIt = function() {
            if (ndController.searchTerm === "") {
                ndController.items = [];
                return;
            }
            var promise = MenuSearchService.getMatchedMenuItems(ndController.searchTerm);
            promise.then(function(response) {
                ndController.items = response;
            })
                .catch(function(error) {
                    console.log("Error:", error);
                });
        };

        ndController.removeItem = function(index) {
            ndController.items.splice(index, 1);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: 'GET',
                url: (ApiBasePath + '/menu_items.json')
            }).then(function (result) {
                var items = result.data.menu_items;
                var foundItems = [];

                for (var i = 0; i < items.length; i++) {
                    if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
                        foundItems.push(items[i]);
                    }
                }
                return foundItems;
            });
        };
    }


    function MenuSearchFactory() {
        var factory = function () {
            return new MenuSearchService();
        };

        return factory;
    }

})();
