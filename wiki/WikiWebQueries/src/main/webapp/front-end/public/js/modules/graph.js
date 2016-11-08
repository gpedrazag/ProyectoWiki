(function (angular) {
    var module = angular.module("pmodGraph", []);

    module.controller('pctrlGraph', ["$scope", "$rootScope", "$timeout", function ($scope, $rootScope, $timeout) {
            $scope.init = function () {
                var nodes = new vis.DataSet([
                    {id: 1, label: 'Node 1'},
                    {id: 2, label: 'Node 2'},
                    {id: 3, label: 'Node 3'},
                    {id: 4, label: 'Node 4'},
                    {id: 5, label: 'Node 5'}
                ]);

                var edges = new vis.DataSet([
                    {from: 1, to: 3},
                    {from: 1, to: 2},
                    {from: 2, to: 4},
                    {from: 2, to: 5}
                ]);

                var container = document.getElementById('graphContainer');
                $(container).ready(function () {

                });
                var data = {
                    nodes: nodes,
                    edges: edges
                };
                var options = {
                    height: "600px",
                    width: "100%"
                };
                $timeout(function () {
                    var network = new vis.Network(container, data, options);
                    network.fit();
                }, 1200, false);
            };

        }]);

    module.directive("pdirecGraph", function () {
        return {
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/graph.html",
            restrict: "E",
            replace: "true"
        };
    });

})(window.angular);