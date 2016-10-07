(function (angular) {
    var module = angular.module("pmod-drilldown", []);
    module.controller("pctrl-drilldown", ["$scope", "$filter", function ($scope, $filter) {
            url = "";
            $scope.list = [
                "Alternativas", "Arquitecturas de Software", "Artefactos",
                "Atributos de Calidad", "Criterios", "Decisiones",
                "Evaluaciones", "Requerimientos Funcionales", "Responsables"
            ];
            $scope.data = [];
            $scope.do = function (i) {
                if (i === 0) {
                    url = window.location.pathname + "/alternative/selectAll";
                } else if (i === 1) {
                    url = window.location.pathname + "/SoftwareArchitecture/selectAll";
                } else if (i === 2) {
                    url = window.location.pathname + "/artifact/selectAll";
                } else if (i === 3) {
                    url = window.location.pathname + "/qualityAttribute/selectAll";
                } else if (i === 4) {
                    url = window.location.pathname + "/criteria/selectAll";
                } else if (i === 5) {
                    url = window.location.pathname + "/decision/selectAll";
                } else if (i === 6) {
                    url = window.location.pathname + "/evaluation/selectAll";
                } else if (i === 7) {
                    url = window.location.pathname + "/functionalRequeriment/selectAll";
                } else if (i === 8) {
                    url = window.location.pathname + "/responsible/selectAll";
                }
                $.ajax({
                    url: url,
                    method: "POST",
                    dataType: "json"
                }).done(function (data) {
                    if (typeof data !== "undefined") {
                        if (data.length === 0) {
                            data = [data];
                        }
                        $scope.data = $filter("orderBy")(data, "id");
                    }
                    url = window.location.pathname;
                });
            };

            $scope.getN = function (n) {
                return new Array(Math.ceil($scope.data.length / n));
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
            $scope.showElemData = function(id) {
                
            };
        }]).directive("pdirecDrilldown", function () {
        return {
            templateUrl: window.location.pathname + "/front-end/views/templates/drilldown.html",
            restrict: "E",
            replace: "true"
        };
    });

})(window.angular);
