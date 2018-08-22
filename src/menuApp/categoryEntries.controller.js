(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoryEntriesController', CategoryEntriesController);

    CategoryEntriesController.$inject = ['categoryData'];
    function CategoryEntriesController(categoryData) {
        var category = this;
        category.info = categoryData.category;
        category.items = categoryData.menu_items;
    }

})();