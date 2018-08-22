(function () {
    'use strict';

    angular.module('Items')

        .component(
            'items', {
                templateUrl: 'src/items/items.component.template.html',
                bindings: {
                    categoryItems: '<',
                    categoryInfo: '<'
                }
            }
        )

})();