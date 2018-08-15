(function () {
    'use strict';
    angular.module('ControllerAsApp', [])
        .controller('ShoppingListController1', ShoppingListController1)
        .controller('ShoppingListController2', ShoppingListController2)
        .factory('ShoppingListFactory', ShoppingListFactory);
    ShoppingListController1.$inject = ['ShoppingListFactory'];
    function ShoppingListController1(ShoppingListFactory) {
        var list1 = this;
        var shoppingList = ShoppingListFactory();
        list1.items = shoppingList.getItems();
        list1.state = "Everything is bought!";
        list1.itemName = "";
        list1.itemQuantity = "";
        list1.addItem = function () {
            shoppingList.addItem(list1.itemName, list1.itemQuantity);
        };
        list1.removeItem = function (itemIndex) {
            shoppingList.removeItem(itemIndex);
        };
    }
    var removedItems = [];
    ShoppingListController2.$inject = ['ShoppingListFactory'];
    function ShoppingListController2(ShoppingListFactory) {
        var list2 = this;
        list2.state = "Nothing bought yet";
        var shoppingList = ShoppingListFactory();
        list2.items = shoppingList.getRemovedItems();

        list2.removeItem = function (itemIndex) {
            list2.items.splice(itemIndex, 1);
        };

    }
    function ShoppingListService(maxItems) {
        var service = this;
        var items = [];
        service.state;
        service.addItem = function (itemName, quantity) {
            if ((maxItems === undefined) ||
                (maxItems !== undefined) && (items.length < maxItems)) {
                var item = {
                    name: itemName,
                    quantity: quantity
                };
                items.push(item);
            }
        };
        service.removeItem = function (itemIndex) {
            removedItems.push(items[itemIndex]);
            items.splice(itemIndex, 1);
        };

        service.getItems = function () {
            return items;
        };
        service.getRemovedItems = function () {
            return removedItems;
        }
    }
    function ShoppingListFactory() {
        var factory = function (maxItems) {
            return new ShoppingListService(maxItems);
        };
        return factory;
    }

})();
