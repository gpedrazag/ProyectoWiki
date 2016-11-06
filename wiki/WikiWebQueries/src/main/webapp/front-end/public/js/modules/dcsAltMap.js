(function (angular) {
    var module = angular.module("pmodDcsAltMap", []);
    module.controller("pctrlDcsAltMap", ["$scope", "$rootScope", "QuickActionListService", function ($scope, $rootScope, QuickActionListService) {
            $scope.dcsAltMatrix = [];
            var i = 0;
            var selectedId = "";
            var selectedReference = "";
            $scope.getMatrix = function () {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/Decision/selectAll",
                    method: "POST",
                    dataType: "json"
                }).done(function (response1) {
                    if (response1 && response1.length > 0) {
                        var decisions = response1;
                        $.ajax({
                            url: "/" + window.location.pathname.split("/")[1] + "/Alternative/selectAll",
                            method: "POST",
                            dataType: "json"
                        }).done(function (response2) {
                            if (response2 && response2.length > 0) {
                                $scope.dcsAltMatrix = [];
                                i = 0;
                                $scope.$apply();
                                var alternatives = response2;
                                fillMatrix(decisions, alternatives);
                                divideMatrix();
                                $scope.$apply();
                            }
                        });
                    }
                });
            };
            $scope.goTo = function () {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + selectedReference + "selectById",
                    method: "POST",
                    dataType: "json",
                    data: {id: selectedId}
                }).done(function (elem) {
                    if (elem !== null) {
                        $rootScope.elemData = [];
                        $rootScope.relatedElems = [];
                        $rootScope.elemTypeId = "";
                        $rootScope.dcsAltMapSelected = "";
                        $rootScope.$apply();
                        Object.keys(elem).forEach(function (key) {
                            if (key !== "id") {
                                if (typeof elem[key] !== "object") {
                                    if (key !== "did") {
                                        $rootScope.elemData.push({key: key, content: elem[key]});
                                    }
                                } else {
                                    $rootScope.relatedElems.push({key: key, content: (typeof elem[key].length === "undefined" ? [elem[key]] : elem[key])});
                                }
                            } else {
                                $rootScope.elemTypeId = elem[key];
                            }
                        });
                        $rootScope.chkList = [];
                        $rootScope.chkList = getCheckedStructure();
                        $rootScope.selectedContext = document.getElementById("main-content-ontology-element");
                        $rootScope.$apply();
                        animate(
                                {in: $rootScope.selectedContext, out: $("#main-content-dcsAltMap")},
                                {in: "fade-in", out: "fade-out"},
                                false
                                );
                        QuickActionListService.addAction(
                                "action:" + $rootScope.elemTypeId,
                                "/" + window.location.pathname.split("/")[1] + selectedReference + "selectById",
                                translate(selectedReference) + " " + $rootScope.elemTypeId,
                                $rootScope.elemType);
                    }
                });
            };
            $scope.showContent = function (i, id, content, reference) {
                var cover = document.getElementById("tbl-cover-" + i);
                if (cover) {
                    selectedId = id;
                    selectedReference = reference;
                    animateIn(cover, "fade-in", false);
                    document.getElementById("tbl-tooltip-" + i + "-id").innerHTML = id;
                    document.getElementById("tbl-tooltip-" + i + "-content").innerHTML = content;
                }
            };
            $scope.hideContent = function (id) {
                var cover = document.getElementById(id);
                if (cover) {
                    animateOut(cover, "fade-out", false);
                }
            };

            function fillMatrix(decisions, alternatives) {
                var obj = {};
                $scope.dcsAltMatrix.push([]);
                $scope.dcsAltMatrix[i].push("");
                decisions.forEach(function (decision) {
                    $scope.dcsAltMatrix[i].push({
                        id: decision.id,
                        content: decision.name,
                        reference: decision.reference
                    });
                });
                i++;
                alternatives.forEach(function (alternative) {
                    $scope.dcsAltMatrix.push([]);
                    $scope.dcsAltMatrix[i].push({
                        id: alternative.id,
                        content: alternative.description,
                        reference: alternative.reference
                    });
                    decisions.forEach(function (decision) {
                        try {
                            decision.haveAlternatives.forEach(function (dcsAlt) {
                                if (dcsAlt.id === alternative.id) {
                                    if (alternative.rationale.trim() !== "") {
                                        $scope.dcsAltMatrix[i].push({content: "sol"});
                                    } else {
                                        $scope.dcsAltMatrix[i].push({content: "true"});
                                    }
                                    throw obj;
                                }
                            });
                        } catch (obj) {
                            return;
                        }
                        $scope.dcsAltMatrix[i].push({content: ""});
                    });
                    i++;
                });
            }
            function divideMatrix() {
                var i = 0;
                var count = 0;
                var subMatrices = [];
                if ($scope.dcsAltMatrix.length > 0) {
                    subMatrices.push([]);
                    var firstRow = $scope.dcsAltMatrix[0];
                    i++;
                    subMatrices[count].push(firstRow);
                    while ($scope.dcsAltMatrix[i]) {
                        if ((i - 1) % 10 !== 0 || (i - 1) === 0) {
                            subMatrices[count].push($scope.dcsAltMatrix[i]);
                        } else {
                            subMatrices.push([]);
                            count++;
                            subMatrices[count].push(firstRow);
                            subMatrices[count].push($scope.dcsAltMatrix[i]);
                        }
                        i++;
                    }
                    $scope.dcsAltMatrix = subMatrices;
                }
            }
            function getCheckedStructure() {
                var arr = [];
                $rootScope.elemData.forEach(function (data) {
                    if (data.key !== "reference" && data.key !== "did") {
                        arr.push(false);
                    }
                });
                return arr;
            }
        }]);
    module.directive("pdirecDcsAltMap", function () {
        return {
            replace: "true",
            restrict: "E",
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/dcsAltMap.html"
        };
    });
})(window.angular);