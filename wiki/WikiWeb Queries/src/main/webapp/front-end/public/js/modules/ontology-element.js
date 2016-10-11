(function (angular) {
    var module = angular.module("pmod-ontology-element", []);
    module.controller("pctrl-ontology-element", ["$rootScope", "$scope", function ($rootScope, $scope) {
            $scope.chkList = getCheckedStructure();
            $scope.getN = function (elemData, n) {
                return new Array(Math.ceil(elemData.length / n));
            };
            $scope.getNElem = function (row, col, n, data) {
                var pos = (row * n - (n - col)) * 5 - 5;
                var arr = [];
                for (i = pos; i <= pos + 4; i++) {
                    if (typeof data.content[i] !== "undefined") {
                        arr.push(data.content[i]);
                    } else {
                        break;
                    }
                }
                return arr;
            };
            $scope.returnOrNotContent = function (data) {
                return (typeof data !== "undefined" && data.trim() !== "") ? data : "No existe contenido";
            };

            function getCheckedStructure() {
                var arr = [];
                $rootScope.elemData.forEach(function (data) {
                    arr.push(false);
                });
                return arr;
            }


            $scope.$watchCollection("chkList", function (nl, ol) {
                var i = 0;
                var obj = {};
                var elemIn = null;
                var elemOut = null;
                try
                {
                    nl.forEach(function (bool) {
                        if (bool !== ol[i]) {
                            if (bool) {
                                elemIn = document.getElementById("eContent-" + i);
                                elemOut = document.getElementById("neContent-" + i);
                            } else {
                                elemIn = document.getElementById("neContent-" + i);
                                elemOut = document.getElementById("eContent-" + i);
                            }
                            animate(
                                    {in: elemIn, out: elemOut},
                                    {in: "fade-in", out: "fade-out"},
                                    false
                                    );
                            throw obj;
                        }
                        i++;
                    });
                } catch (obj) {
                }
                ;
            });

        }]);
    module.directive("pdirecOntoelem", function () {
        return {
            templateUrl: window.location.pathname + "/front-end/views/templates/ontology-element.html",
            restrict: "E",
            replace: "true"
        };
    });
})(window.angular);


