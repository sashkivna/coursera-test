/*
(function () {
    'use strict';

    angular.module('ShoppingListDirectiveApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .directive('shoppingList', ShoppingListDirective);


    function ShoppingListDirective() {
        var ddo = {
            templateUrl: 'shoppingList.html',
            scope: {
                items: '<',
                myTitle: '@title',
                onRemove: '&'
            },
            controller: ShoppingListDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }


    function ShoppingListDirectiveController() {
        var list = this;

        list.cookiesInList = function () {
            for (var i = 0; i < list.items.length; i++) {
                var name = list.items[i].name;
                if (name.toLowerCase().indexOf("cookie") !== -1) {
                    return true;
                }
            }

            return false;
        };
    }


    ShoppingListController.$inject = ['ShoppingListFactory'];
    function ShoppingListController(ShoppingListFactory) {
        var list = this;

        // Use factory to create new shopping list service
        var shoppingList = ShoppingListFactory();

        list.items = shoppingList.getItems();
        var origTitle = "Shopping List #1";
        list.title = origTitle + " (" + list.items.length + " items )";

        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function () {
            shoppingList.addItem(list.itemName, list.itemQuantity);
            list.title = origTitle + " (" + list.items.length + " items )";
        };

        list.removeItem = function (itemIndex) {
            console.log("'this' is: ", this);
            this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
            shoppingList.removeItem(itemIndex);
            this.title = origTitle + " (" + list.items.length + " items )";
        };
    }


// If not specified, maxItems assumed unlimited
    function ShoppingListService(maxItems) {
        var service = this;

        // List of shopping items
        var items = [];

        service.addItem = function (itemName, quantity) {
            if ((maxItems === undefined) ||
                (maxItems !== undefined) && (items.length < maxItems)) {
                var item = {
                    name: itemName,
                    quantity: quantity
                };
                items.push(item);
            }
            else {
                throw new Error("Max items (" + maxItems + ") reached.");
            }
        };

        service.removeItem = function (itemIndex) {
            items.splice(itemIndex, 1);
        };

        service.getItems = function () {
            return items;
        };
    }


    function ShoppingListFactory() {
        var factory = function (maxItems) {
            return new ShoppingListService(maxItems);
        };

        return factory;
    }

})();


//Z?m5R\mu*/

(function () {
    'use strict';

    angular.module('MenuCategoriesApp', [])
        .controller('MenuCategoriesController', MenuCategoriesController)
        .service('MenuCategoriesService', MenuCategoriesService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


    MenuCategoriesController.$inject = ['MenuCategoriesService'];
    function MenuCategoriesController(MenuCategoriesService) {
        var menu = this;

        var promise = MenuCategoriesService.getMenu();

        promise.then(function (response) {
            menu.description = response.data;
        })
            .catch(function (error) {
                console.log("Something went terribly wrong.");
            });

        menu.logMenuItems = function () {
            var promise = MenuCategoriesService.getMenu();

            promise.then(function (response) {
                console.log( response.data);
            })
                .catch(function (error) {
                    console.log(error);
                })
        };

    }


    MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
    function MenuCategoriesService($http, ApiBasePath) {
        var service = this;

        service.getMenu = function () {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
             /*   params: {
                    description: description
                }*/
            });
            console.log(response);
            return response;
        }

    }

})();