(function (angular) {
    var module = angular.module("pmod-ontology-element", []);
    module.controller("pctrl-ontology-element", ["$rootScope", "$scope", function ($rootScope, $scope) {
            $scope.getN = function (elemData, n) {
                return new Array(Math.ceil(elemData.length / n));
            };
            $scope.getNElem = function (row, col, n) {
                var pos = (row * n - (n - col)) * 5 - 5;
                var arr = [];
                for (i = pos; i <= pos + 4; i++) {
                    if (typeof $scope.data[i] !== "undefined") {
                        arr.push($scope.data[i]);
                    } else {
                        break;
                    }
                }
                return arr;
            };
        }]);
    module.directive("pdirecOntologyElement", function () {
        return {
            templateURL:window.location.pathname + "/front-end/views/templates/ontology-element.html",
            restrict:"E",
            replace:"true"
        };
    });
})(window.angular);


