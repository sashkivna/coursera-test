(function () {
    'use strict';
    angular.module('myFirstApp', [])
        .controller('MyFirstController', function ($scope) {
            var food = [];
            $scope.name = "";
            $scope.status = "";
            $scope.checkTheLunch = function () {
                food.push($scope.name);
                if (food[0] == "") {
                    $scope.status ="Please enter data first";
                    $scope.state ={
                        "color": "red"
                    }
                    $scope.borderState = {
                        "border-color": "red"
                    }
                    return food = [];
                }
                //console.log(food);
                else
                if (food.join().split(',').length <= 3 && food.join().split(',').length >= 1) {
                    $scope.status = "Enjoy!";
                    $scope.state ={
                        "color": "green"
                    }
                    $scope.borderState = {
                        "border-color": "green"
                    }
                }
                else {
                    $scope.status = "Too much!";
                    $scope.state ={
                        "color": "green"
                    }
                    $scope.borderState = {
                        "border-color": "green"
                    }
                }
                return food = [];
            };
        });
})();