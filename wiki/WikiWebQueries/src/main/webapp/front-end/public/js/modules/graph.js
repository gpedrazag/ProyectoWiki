(function (angular) {
    var module = angular.module("pmodGraph", []);

    module.controller('pctrlGraph', ["$scope", function ($scope) {
            var nodes = null;
            var edges = null;
            var network = null;

            nodes = [];
            edges = [];

            var nodes = [
                {id: "des1", label: "Decision 1", child: ["soul1", "eval1", "artf1"]},
                {id: "alter1", label: "Solucion 1", child: []},
                {id: "sol1", label: "Evaluacion 1", child: ["artf2", "artf3", "artf4"]},
                {id: "const1", label: "Artefacto 1", child: []},
                {id: "assum1", label: "Artefacto 2", child: []},
                {id: "artf3", label: "Artefacto 3", child: []},
                {id: "artf4", label: "Artefacto 4", child: []}

            ];

            var nodeAux;

            $.each(nodes, function (index, node) {
                nodeAux = node.id;
                $.each(node.child, function (index, child) {
                    edges.push({from: nodeAux, to: child, arrows: 'to'});
                });
            });

            var container = document.getElementById('mynetwork');

            var data = {
                nodes: nodes,
                edges: edges
            };

            var options = {
                edges: {
                    smooth: {
                        type: 'cubicBezier',
                        forceDirection: "horizontal",
                        roundness: 0.4
                    }
                },
                layout: {
                    hierarchical: {
                        direction: "UD"
                    }
                },
                physics: false
            };
            network = new vis.Network(container, data, options);
        }]);

    module.directive("pdirecGraph", function () {
        return {
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/graph.html",
            restrict: "E",
            replace: "true"            
        };
    });

})(window.angular);