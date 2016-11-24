(function (angular) {
    var module = angular.module("pmod-ontology-sub-element", []);

    module.controller("pctrlOntologySubElement", [
        "$scope",
        "$rootScope",
        "FoundationApi",
        "TranslatorService",
        "ImageService",
        "ConsultCarouselService",
        function ($scope, $rootScope, FoundationApi, TranslatorService, ImageService, ConsultCarouselService) {
            var pos = 0;
            $scope.haveSolutions = {};
            $scope.dcsWithOutsol = false;

            $scope.isAnAltAndSol = function (d) {
                if (typeof d !== "undefined") {
                    if (d.reference === "/Alternative/" && d.rationale.trim() !== "") {
                        return true;
                    }
                }
                return false;
            };
            $scope.isADcsAndWhtoutSol = function (d, i, key) {
                if (typeof d !== "undefined" && d.reference === "/Decision/") {
                    $.ajax({
                        url: "/" + window.location.pathname.split("/")[1] + d.reference + "haveSolution",
                        method: "POST",
                        data: {id: d.id},
                        dataType: "json"
                    }).done(function (response) {
                        $scope.haveSolutions[key][i].value = !response.value;
                        $scope.$apply();
                    });
                }
                return {value: false, id: d.id};
            };
            $scope.getN = function (elemData, n) {
                var array = new Array(Math.ceil(elemData.length / n));
                var i = 0;
                while (array[i]) {
                    array[i] = i;
                    i++;
                }
                return array;
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
            $scope.returnOrNotContent = function (data, containerId) {
                var container = document.getElementById(containerId);
                if (typeof data !== "undefined" && data.trim() !== "") {
                    if (data.indexOf("</div>") >= 0) {
                        ImageService.loadHTML(container, "<div style='width:100%;'>" + data + "</div>", $scope);
                    } else {
                        $(container).html($("<div>").html(data));
                    }
                } else {
                    $(container).html($("<div>").html("No existe contenido"));
                }

            };
            $scope.translate = function (key) {
                return TranslatorService.translate(key);
            };
            $scope.getModalTitle = function () {
                var title = "";
                var obj = {};
                try {
                    if (typeof $rootScope.subElemData !== "undefined" && $rootScope.subElemData.length > 0) {
                        if (typeof $rootScope.elemSubTypeId !== "undefined") {
                            $rootScope.subElemData.forEach(function (data) {
                                if (data.key === "reference") {
                                    title = $scope.translate(data.content) + " " + $rootScope.elemSubTypeId;
                                    throw obj;
                                }
                            });
                        }
                    }
                } catch (obj) {
                }
                return title;
            };
            $scope.existPrevious = function () {
                return  findSubElemPos() >= 1;
            };
            $scope.existNext = function () {
                var pos = findSubElemPos();
                if (typeof $rootScope.subElems.content !== "undefined") {
                    return  pos < $rootScope.subElems.content.length - 1;
                }
                return  false;
            };
            $scope.showPrevious = function () {
                var previous = pos - 1;
                var content = $rootScope.subElems.content[previous];
                findElem(content.id, content.reference);
            };
            $scope.showNext = function () {
                var previous = pos + 1;
                var content = $rootScope.subElems.content[previous];
                findElem(content.id, content.reference);
            };
            $scope.enterEditMode = function () {
                var i = findSubElemPos();
                var content = $rootScope.subElems.content[i];
                ConsultCarouselService.goTo(content.id, content.reference, null, function () {
                    FoundationApi.closeActiveElements();
                });
            };
            $scope.goTo = function (id, reference) {
                ConsultCarouselService.goTo(id, reference, null, function () {
                    FoundationApi.closeActiveElements();
                });
            };

            function findElem(id, reference) {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + reference + "selectById",
                    data: {id: id},
                    method: "POST",
                    dataType: "json"
                }).done(function (reponse) {
                    $rootScope.subElemData = [];
                    $rootScope.subRelatedElems = [];
                    $rootScope.$apply();
                    if (reponse !== null && reponse.id === id) {
                        Object.keys(reponse).forEach(function (key) {
                            if (key !== "id") {
                                if (typeof reponse[key] !== "object") {
                                    $rootScope.subElemData.push({key: key, content: reponse[key]});
                                } else {
                                    $rootScope.subRelatedElems.push({
                                        key: key,
                                        content: (typeof reponse[key].length === "undefined" ? [reponse[key]] : reponse[key])
                                    });
                                }
                            } else {
                                $rootScope.elemSubTypeId = reponse[key];
                            }
                        });
                        $rootScope.$apply();
                    }
                });
            }
            function findSubElemPos() {
                var obj = {};
                pos = 0;
                try {
                    if (typeof $rootScope.subElems.content !== "undefined") {
                        $rootScope.subElems.content.forEach(function (elem) {
                            if (elem.id === $rootScope.elemSubTypeId) {
                                throw obj;
                            }
                            pos++;
                        });
                    }
                } catch (obj) {

                }
                return pos;
            }
        }]);
    module.directive("pdirecOntoSubElem", function () {
        return {
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/ontology-sub-element.html",
            restrict: "E",
            replace: "true",
            require: "ngModel"
        };
    });
})(window.angular);

