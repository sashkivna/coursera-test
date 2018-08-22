(function () {
    'use strict';

    angular.module('Categories')

        .component('categories', {
                templateUrl: 'src/categories/categories.component.template.html',
                bindings: {
                    categories: '<'
                }
            }
        );

})();