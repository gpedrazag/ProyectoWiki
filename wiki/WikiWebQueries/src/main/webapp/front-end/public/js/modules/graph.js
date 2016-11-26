(function (angular) {
    var module = angular.module("pmodGraph", []);

    module.controller('pctrlGraph', [
        "$scope",
        "$timeout",
        "TranslatorService",
        "FoundationModal",
        "ConsultCarouselService",
        "$rootScope",
        "FoundationApi",
        function ($scope, $timeout, TranslatorService, FoundationModal, ConsultCarouselService, $rootScope, FoundationApi) {
            $scope.checkList = [];
            $scope.checkList.push({reference: "/Alternative/", color: "#DA2323", checked: false});
            $scope.checkList.push({reference: "/Assumption/", color: "#D7DA23", checked: false});
            $scope.checkList.push({reference: "/Concern/", color: "#3CDA23", checked: false});
            $scope.checkList.push({reference: "/Constraint/", color: "#236BDA", checked: false});
            $scope.checkList.push({reference: "/Criteria/", color: "#CC23DA", checked: false});
            $scope.checkList.push({reference: "/Decision/", color: "#8B1414", checked: false});
            $scope.checkList.push({reference: "/Evaluation/", color: "#A6A91C", checked: false});
            $scope.checkList.push({reference: "/FunctionalRequeriment/", color: "#207812", checked: false});
            $scope.checkList.push({reference: "/QualityAttributeStage/", color: "#143E7E", checked: false});
            $scope.checkList.push({reference: "/Responsible/", color: "#711278", checked: false});
            $scope.checkList.push({reference: "/SoftwareArchitecture/", color: "#00A39C", checked: false});
            $scope.checkList.push({reference: "/Artifact/", color: "#00EBE0", checked: false});

            $scope.printGraph = function (classes) {
                var filter = [];
                if (typeof classes !== "undefined") {
                    classes.forEach(function (c) {
                        if (c.checked) {
                            filter.push(c.reference);
                        }
                    });
                }
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
                                    //TranslatorService.translate(data.reference) + " " + 
                                            {id: data.reference + "_" + data.id, label: data.id, shape: 'circle', color: getColorbyReference(data.reference)}
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
                            randomSeed: 856,
                            improvedLayout: true
                        },
                        nodes: {
                            font: {
                                color: '#FFFFFF'
                            }
                        }
                    };
                    $timeout(function () {
                        var network = new vis.Network(container, data, options);
                        network.on("selectNode", function (params) {
                            var data = params.nodes[0].split("_");
                            ConsultCarouselService.openModal(
                                    data[1],
                                    data[0],
                                    {content: [{id: data[1], reference: data[0], elemOut: $("#main-content-graph")}]},
                                    {
                                        firstOnEnter: function () {
                                            $rootScope.graphSelected = "";
                                        },
                                        lastOnEnter: function() {
                                             FoundationApi.closeActiveElements();
                                        },
                                        cb: function () {
                                            FoundationModal.activate("sub-element-modal")
                                        }
                                    }
                            );
                        });
                        network.fit();
                    }, 1200, false);
                });
            };
            $scope.translate = function (reference) {
                return TranslatorService.translate(reference);
            };

            function getColorbyReference(referece) {
                var color = "";
                switch (referece) {
                    case  "/Assumption/":
                        color = "#D7DA23";
                        break;
                    case "/Concern/":
                        color = "#3CDA23";
                        break;
                    case "/Constraint/":
                        color = "#236BDA";
                        break;
                    case "/Criteria/":
                        color = "#CC23DA";
                        break;
                    case "/Decision/":
                        color = "#8B1414";
                        break;
                    case "/Evaluation/":
                        color = "#A6A91C";
                        break;
                    case "/Alternative/":
                        color = "#DA2323";
                        break;
                    case "/FunctionalRequeriment/":
                        color = "#207812";
                        break;
                    case "/QualityAttributeStage/":
                        color = "#143E7E";
                        break;
                    case "/Responsible/":
                        color = "#711278";
                        break;
                    case "/SoftwareArchitecture/":
                        color = "#00A39C";
                        break;
                    case "/Artifact/":
                        color = "#00EBE0";
                        break;
                }
                return color;
            }


        }]);

    module.directive("pdirecGraph", function () {
        return {
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/graph.html",
            restrict: "E",
            replace: "true"
        };
    });


})(window.angular);