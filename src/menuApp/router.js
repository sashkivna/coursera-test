(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: 'src/menuApp/templates/home.template.html'
            })

            .state('categories', {
                url: '/categories',
                templateUrl: 'src/menuApp/templates/categories.template.html',
                controller: 'MenuCategoriesController as menu',
                resolve: {
                    menuCategories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService
                            .getAllCategories()
                            .then(function (res) { return res.data; });
                    }]
                }
            })

            .state('items', {
                url: '/category/{category}',
                templateUrl: 'src/menuApp/templates/items.template.html',
                controller: 'CategoryEntriesController as category',
                resolve : {
                    categoryData: ['MenuDataService', '$stateParams' , function (MenuDataService, $stateParams) {
                        return MenuDataService
                            .getItemsForCategory($stateParams.category)
                            .then(function (res) { return res.data; });
                    }]
                }
            });

    }

})();