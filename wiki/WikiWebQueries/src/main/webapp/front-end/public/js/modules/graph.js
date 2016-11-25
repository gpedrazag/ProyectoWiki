(function (angular) {
    var module = angular.module("pmodGraph", []);

    module.controller('pctrlGraph', [
        "$scope",
        "$rootScope",
        "$timeout",
        "TranslatorService",
        function ($scope, $rootScope, $timeout, TranslatorService) {
            $scope.init = function () {

                var filtro = ["/QualityAttributeStage/", "/Decision/", "/Artifact/"];
                var nodes = [];
                var edges = [];

                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/search/getAllClass",
                    data: {
                        filtro: JSON.stringify(filtro)
                    },
                    method: "POST",
                    dataType: "json"
                }).done(function (data) {
                    var nodesData = [];
                    var edgesData = [];
                    var obj = {};
                    data.forEach(function (data) {
                        data.forEach(function (data) {
                            nodesData.push(
                                    //TranslatorService.translate(data.reference) + " " +
                                    {id: data.id, label: data.id, shape: 'circle'}
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
                                        while (filtro[i]) {
                                            if (filtro[i] === elem.reference) {
                                                try {
                                                    edgesData.forEach(function (edge) {
                                                        if (edge.from === elem.id && edge.to === data.id) {
                                                            throw obj;
                                                        }
                                                    });
                                                    edgesData.push({from: data.id, to: elem.id});
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
                    $(container).ready(function () {

                    });

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
                            alert(params.nodes);
                        });
                        network.fit();
                    }, 1200, false);



                });


//                var nodes = new vis.DataSet([
//                    {id: 1, label: 'Clase ID',childs },
//                    {id: 2, label: 'Node 2'},
//                    {id: 3, label: 'Node 3'},
//                    {id: 4, label: 'Node 4'},
//                    {id: 5, label: 'Node 5'}
//                ]);

//                var edges = new vis.DataSet([
//                    {from: 1, to: 3},
//                    {from: 1, to: 2},
//                    {from: 2, to: 4},
//                    {from: 2, to: 5}
//                ]);


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