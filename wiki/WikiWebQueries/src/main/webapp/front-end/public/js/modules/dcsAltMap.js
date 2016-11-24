(function (angular) {
    var module = angular.module("pmodDcsAltMap", []);
    module.controller("pctrlDcsAltMap", [
        "$scope",
        "$rootScope",
        "AnimationService",
        "ConsultCarouselService",
        function ($scope, $rootScope, AnimationService, ConsultCarouselService) {
            $scope.dcsAltMatrix = [];
            $scope.data = {
                selectedAlternative: null
            };
            var i = 0;
            var selectedId = "";
            var selectedReference = "";

            $scope.getMatrix = function () {
                var references = $scope.data.selectedAlternative.split("-");
                var firstReference = references[0];
                var secondReference = references[1];
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + firstReference + "selectAll",
                    method: "POST",
                    dataType: "json"
                }).done(function (response1) {
                    if (response1 && response1.length > 0) {
                        var firstResponse = response1;
                        $.ajax({
                            url: "/" + window.location.pathname.split("/")[1] + secondReference + "selectAll",
                            method: "POST",
                            dataType: "json"
                        }).done(function (response2) {
                            if (response2 && response2.length > 0) {
                                $scope.dcsAltMatrix = [];
                                i = 0;
                                $scope.$apply();
                                var secondResponse = response2;
                                fillMatrix(firstResponse, secondResponse);
                                divideMatrix();
                                $scope.$apply();
                            }
                        });
                    }
                });
            };
            $scope.goTo = function () {
                ConsultCarouselService.goTo(
                        selectedId,
                        selectedReference,
                        $("#main-content-dcsAltMap"),
                        function () {
                            $rootScope.dcsAltMapSelected = "";
                        });
            };
            $scope.showContent = function (i, id, content, reference) {
                var cover = document.getElementById("tbl-cover-" + i);
                if (cover) {
                    selectedId = id;
                    selectedReference = reference;
                    AnimationService.animateIn(cover, "fade-in", false);
                    document.getElementById("tbl-tooltip-" + i + "-id").innerHTML = id;
                    document.getElementById("tbl-tooltip-" + i + "-content").innerHTML = content;
                }
            };
            $scope.hideContent = function (id) {
                var cover = document.getElementById(id);
                if (cover) {
                    AnimationService.animateOut(cover, "fade-out", false);
                }
            };

            function fillMatrix(firstResponse, secondResponse) {
                var obj = {};
                $scope.dcsAltMatrix.push([]);
                $scope.dcsAltMatrix[i].push("");
                secondResponse.forEach(function (response) {
                    $scope.dcsAltMatrix[i].push({
                        id: response.id,
                        content: response.name,
                        reference: response.reference
                    });
                });
                i++;
                firstResponse.forEach(function (response) {
                    $scope.dcsAltMatrix.push([]);
                    $scope.dcsAltMatrix[i].push({
                        id: response.id,
                        content: response.description,
                        reference: response.reference
                    });

                    secondResponse.forEach(function (sResponse) {
                        try {
                            var responseObjects = getObjectKeys(response);
                            var j = 0;
                            var isResponse = false;
                            var obj2 = {};
                            try {
                                responseObjects.forEach(function (object) {
                                    if (object[0].reference === sResponse.reference) {
                                        throw obj2;
                                    }
                                    j++;
                                });
                                responseObjects = getObjectKeys(sResponse);
                                j = 0;
                                responseObjects.forEach(function (object) {
                                    if (object[0].reference === response.reference) {
                                        isResponse = true;
                                        throw obj2;
                                    }
                                    j++;
                                });
                            } catch (obj2) {
                            }
                            responseObjects[j].forEach(function (actualObj) {
                                var comp = isResponse ? response : sResponse;
                                if (actualObj.id === comp.id) {
                                    if (actualObj.reference === "/Alternative/") {
                                        if (comp.rationale.trim() !== "") {
                                            $scope.dcsAltMatrix[i].push({content: "sol"});
                                            throw obj;
                                        }
                                    }
                                    $scope.dcsAltMatrix[i].push({content: "true"});
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
            function getObjectKeys(object) {
                var keys = Object.keys(object);
                var arr = [];
                keys.forEach(function (key) {
                    if (typeof object[key] === "object") {
                        if (object[key].length > 0) {
                            arr.push(object[key]);
                        } else {
                            arr.push([object[key]]);
                        }
                    }
                });
                return arr;
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
        }]);
    module.directive("pdirecDcsAltMap", function () {
        return {
            replace: "true",
            restrict: "E",
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/dcsAltMap.html"
        };
    });
})(window.angular);