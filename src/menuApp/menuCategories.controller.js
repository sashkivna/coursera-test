(function () {
    'use strict';
    angular.module('MenuApp')
        .controller('MenuCategoriesController', MenuCategoriesController);

    MenuCategoriesController.$inject = ['menuCategories'];
    function MenuCategoriesController (menuCategories) {
        var menu = this;
        menu.categories = menuCategories;
    };

})();