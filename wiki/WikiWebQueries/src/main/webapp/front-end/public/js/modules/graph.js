(function (angular) {
    var module = angular.module("pmodGraph", []);

    module.controller('pctrlGraph', [
        "$scope",
        "$timeout",
        "TranslatorService",
        function ($scope, $timeout, TranslatorService) {
            $scope.printGraph = function (classes) {
                var filter = typeof classes === "undefined" ? ["/QualityAttributeStage/", "/Decision/", "/Artifact/"] : classes;
                var nodes = [];
                var edges = [];

                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/search/getAllClass",
                    data: {filter: JSON.stringify(filter)},
                    method: "POST",
                    dataType: "json"
                }).done(function (data) {
                    var nodesData = [];
                    var edgesData = [];
                    var obj = {};
                    data.forEach(function (data) {
                        data.forEach(function (data) {
                            nodesData.push(
                                    {id: data.reference + "_" + data.id, label: TranslatorService.translate(data.reference) + " " + data.id, shape: 'dot'}
                            );
                            Object.keys(data).forEach(function (key) {
                                if (typeof data[key] === "object") {
                                    var list = [];
                                    if (data[key].length > 0) {
                                        list = data[key];
                                    } else {
                                        list = [data[key]];
                                    }
                                    list.forEach(function (elem) {
                                        var i = 0;
                                        while (filter[i]) {
                                            if (filter[i] === elem.reference) {
                                                try {
                                                    edgesData.forEach(function (edge) {
                                                        if (edge.from === elem.reference + "_" + elem.id && edge.to === data.reference + "_" + data.id) {
                                                            throw obj;
                                                        }
                                                    });
                                                    edgesData.push({from: data.reference + "_" + data.id, to: elem.reference + "_" + elem.id});
                                                } catch (obj) {
                                                }
                                            }
                                            i++;
                                        }
                                    });

                                }
                            });
                        });
                    });
                    nodes = new vis.DataSet(nodesData);
                    edges = new vis.DataSet(edgesData);
                    var container = document.getElementById('graphContainer');
                    $(container).empty();
                    var data = {
                        nodes: nodes,
                        edges: edges
                    };
                    var options = {
                        height: "600px",
                        width: "100%",
                        layout: {
                            randomSeed: 754,
                            improvedLayout: true
                        },
                        stabilization: {
                            enabled: true,
                            iterations: 1000,
                            updateInterval: 100,
                            onlyDynamicEdges: false,
                            fit: true
                        }
                    };
                    $timeout(function () {
                        var network = new vis.Network(container, data, options);
                        network.on("selectNode", function (params) {
                            var data = params.nodes[0].split("_");
                            alert("reference:" + data[0] + "\n id:" + data[1]);
                        });
                        network.fit();
                    }, 1200, false);
                });
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