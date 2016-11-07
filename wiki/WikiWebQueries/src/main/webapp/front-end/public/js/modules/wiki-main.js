(function (angular) {
    var module = angular.module("pmod-wiki-main", ["pmod-drilldown", "pmod-ontology-element", "pmodResources", "pmodDcsAltMap", "pmodGraph"]);
    module.controller("pctrlViews", ["$scope", "$rootScope", "FoundationPanel", "FoundationApi", "QuickActionListService", function ($scope, $rootScope, FoundationPanel, FoundationApi, QuickActionListService) {
            $scope.inputSearchString = "";
            $scope.drilldownSelected = "selected";
            $scope.resourcesSelected = "";
            $rootScope.graphSelected = "";
            $rootScope.dcsAltMapSelected = "";
            $scope.coincidences = [];
            $rootScope.actions = [];
            $rootScope.rImagesDoCount = 0;
            $rootScope.selectedContext = null;

            $scope.onDrilldown = function (event) {
                if (event) {
                    event.stopPropagation();
                }
                $scope.drilldownSelected = "selected";
                $scope.resourcesSelected = "";
                $rootScope.dcsAltMapSelected = "";
                $rootScope.graphSelected = "";
                $rootScope.rImages = [];
                animate(
                        {in: $("#main-content-drilldown"), out: $rootScope.selectedContext},
                        {in: "slide-in-left", out: "slide-out-right"},
                        true
                        );
                $rootScope.selectedContext = $("#main-content-drilldown");
            };
            $scope.onGraph = function (event) {
                if (event) {
                    event.stopPropagation();
                }
                $scope.drilldownSelected = "";
                $scope.resourcesSelected = "";
                $rootScope.dcsAltMapSelected = "";
                $rootScope.graphSelected = "selected";
                $rootScope.rImages = [];
                if($rootScope.selectedContext === null) {
                    $rootScope.selectedContext = $("#main-content-drilldown");
                }
                animate(
                        {in: $("#main-content-graph"), out: $rootScope.selectedContext},
                        {in: "slide-in-left", out: "slide-out-right"},
                        true
                        );
                $rootScope.selectedContext = $("#main-content-drilldown");
            };
            $scope.onDcsAltMap = function (event) {
                if (event) {
                    event.stopPropagation();
                }
                $scope.drilldownSelected = "";
                $scope.resourcesSelected = "";
                $rootScope.dcsAltMapSelected = "selected";
                $rootScope.graphSelected = "";
                $rootScope.rImages = [];                
                if($rootScope.selectedContext === null) {
                    $rootScope.selectedContext = $("#main-content-drilldown");
                }
                animate(
                        {in: $("#main-content-dcsAltMap"), out: $rootScope.selectedContext},
                        {in: "slide-in-left", out: "slide-out-right"},
                        true
                        );
                $rootScope.selectedContext = $("#main-content-dcsAltMap");
            };
            $scope.onResources = function (event) {
                if (event) {
                    event.stopPropagation();
                }
                $rootScope.rImagesDoCount = 0;
                $scope.drilldownSelected = "";
                $rootScope.dcsAltMapSelected = "";
                $scope.resourcesSelected = "selected";
                $rootScope.graphSelected = "";
                if ($rootScope.selectedContext === null) {
                    $rootScope.selectedContext = $("#main-content-drilldown");
                }
                animate(
                        {in: $("#main-content-resources"), out: $rootScope.selectedContext},
                        {in: "slide-in-left", out: "slide-out-right"},
                        true
                        );
                $rootScope.selectedContext = $("#main-content-resources");
                getViewerImages();
            };
            $scope.outHoverMenuOption = function (event) {
                if (event) {
                    event.stopPropagation();
                }
                deselectMenuOption(true);
            };
            $scope.hoverMenuOption = function (event) {
                if (event) {
                    event.stopPropagation();
                }
                var source = $(event.target);
                if ($(source).is("span")) {
                    source = $(event.target).parent().parent().parent();
                } else {
                    source = $(event.target).parent().parent();
                }
                $($(source).find("div")[2]).find("a").addClass("selected");
            };
            $scope.closeSearchPanel = function () {
                FoundationPanel.deactivate("search-panel");
            };
            $scope.enterEditModeMain = function (id, reference) {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + reference + "selectById",
                    method: "POST",
                    dataType: "json",
                    data: {id: id}
                }).done(function (response) {
                    $rootScope.elemData = [];
                    $rootScope.relatedElems = [];
                    $rootScope.subElemData = [];
                    $rootScope.subRelatedElems = [];
                    $rootScope.elemTypeId = "";
                    $rootScope.$apply();
                    Object.keys(response).forEach(function (key) {
                        if (key !== "id") {
                            if (typeof response[key] !== "object") {
                                $rootScope.elemData.push({
                                    key: key,
                                    content: response[key]});
                            } else {
                                $rootScope.relatedElems.push({
                                    key: key,
                                    content: (typeof response[key].length === "undefined" ? [response[key]] : response[key])});
                            }
                        } else {
                            $rootScope.elemTypeId = response[key];
                        }
                    });
                    $rootScope.chkList = getCheckedStructure();
                    $rootScope.elemType = reference.replace("/", "").replace("/", "").toLowerCase();
                    $rootScope.$apply();

                    animate(
                            {in: $("#main-content-ontology-element"), out: $rootScope.selectedContext === null ? $("#main-content-drilldown") : $rootScope.selectedContext},
                            {in: "fade-in", out: "fade-out"},
                            true
                            );
                    $rootScope.selectedContext = document.getElementById("main-content-ontology-element");
                    QuickActionListService.addAction(
                            "action:" + $rootScope.elemTypeId,
                            "/" + window.location.pathname.split("/")[1] + reference + "selectById",
                            translate(reference) + " " + $rootScope.elemTypeId,
                            reference.replace("/", "").replace("/", "").toLowerCase());
                    FoundationApi.closeActiveElements();
                });
            };
            $scope.$watch("inputSearchString", function (nv, ov) {
                if ($scope.inputSearchString !== "") {
                    $.ajax({
                        url: "/" + window.location.pathname.split("/")[1] + "/search/patternSearch",
                        method: "POST",
                        data: {pattern: $scope.inputSearchString, limit: -1, offset: 0},
                        dataType: "json"
                    }).done(function (response) {
                        $scope.coincidences = [];
                        $scope.$apply();
                        if (response && response !== null && response.length > 0) {
                            response.forEach(function (data) {
                                $scope.coincidences.push({
                                    id: data.id,
                                    classType: translate(data.classType),
                                    reference: data.classType,
                                    matches: getDomElemFromMatches(data.matches, $scope.inputSearchString)
                                });
                            });
                            FoundationPanel.activate("search-panel");
                            $scope.$apply();
                        }
                    });
                } else {
                    setTimeout(function () {
                        FoundationPanel.deactivate("search-panel");
                    }, 600);
                }
            });

            function getDomElemFromMatches(matches, find) {
                if (matches && matches.length > 0) {
                    var i = 0;
                    matches.forEach(function (match) {
                        var content = $("<div>");
                        var append = "";
                        match.content.split(" ").forEach(function (part) {
                            var partLC = part.toLowerCase();
                            var findLC = find.toLowerCase();
                            if (partLC.indexOf(findLC) > -1) {
                                var offset = partLC.indexOf(findLC);
                                var limit = find.length;
                                if (offset === 0) {
                                    append +=
                                            " <span style='background-color:rgba(56, 216, 120, 0.5);'>" +
                                            part.substring(offset, limit + offset) +
                                            "</span>";
                                    append += part.substring(limit + offset, part.length);
                                } else {
                                    append += " " + part.substring(0, offset);
                                    append +=
                                            "<span style='background-color:rgba(56, 216, 120, 0.5);'>" +
                                            part.substring(offset, limit + offset) +
                                            "</span>";
                                    append +=
                                            (limit + offset) < part.length ? part.substring(limit + offset, part.length) : "";
                                }
                            } else {
                                append += " " + part;
                            }
                        });
                        content.html(append);
                        matches[i].property = translate(matches[i].property);
                        matches[i].content = $(content).html();
                        i++;
                    });
                }
                return matches;
            }
            function getViewerImages() {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/downloader/getAllImagesNames",
                    method: "POST",
                    dataType: "json"
                }).done(function (response) {
                    if (typeof response.error === "undefined") {
                        $rootScope.rImages = response;
                        $rootScope.$apply();
                    }
                });
            }

            function getCheckedStructure() {
                var arr = [];
                $rootScope.elemData.forEach(function (data) {
                    arr.push(false);
                });
                return arr;
            }

            function deselectMenuOption(bool) {
                var isHover = bool || false;
                if (isHover) {
                    $.each($($(document).find(".action-sheet.is-active ul li")), function (i, obj) {
                        if (typeof $(obj).attr("class") === "undefined" || $(obj).attr("class") === "") {
                            $(obj).find("a").removeClass("selected");
                        }

                    });
                } else {
                    $($(document).find(".action-sheet.is-active .selected")).removeClass("selected");
                }
            }
        }]);
    module.directive("pdirecContent", function () {
        return {
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/content.html",
            restrict: "E",
            replace: "true",
            link: function (s, e, a) {
                s.si = $(e).find("#main-content-drilldown");
            }
        };
    });
    module.directive("pdirecNav", function () {
        return {
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/nav.html",
            restrict: "E",
            replace: "true"
        };
    });
    module.service("QuickActionListService", ["$rootScope", "FoundationApi", function ($rootScope, FoundationApi) {
            this.addAction = function (id, url, description, elementType) {
                var go = true;
                $rootScope.actions.forEach(function (action) {
                    if (action.id === id) {
                        go = false;
                    }
                });
                if (go) {
                    $rootScope.actions.push({
                        id: id,
                        description: description,
                        do: function () {
                            $.ajax({
                                url: url,
                                method: "POST",
                                dataType: "json",
                                data: {id: id.split(":")[1]}
                            }).done(function (response) {
                                $rootScope.elemData = [];
                                $rootScope.relatedElems = [];
                                $rootScope.subElemData = [];
                                $rootScope.subRelatedElems = [];
                                $rootScope.elemTypeId = "";
                                $rootScope.$apply();
                                Object.keys(response).forEach(function (key) {
                                    if (key !== "id") {
                                        if (typeof response[key] !== "object") {
                                            $rootScope.elemData.push({
                                                key: key,
                                                content: response[key]});
                                        } else {
                                            $rootScope.relatedElems.push({
                                                key: key,
                                                content: (typeof response[key].length === "undefined" ? [response[key]] : response[key])});
                                        }
                                    } else {
                                        $rootScope.elemTypeId = response[key];
                                    }
                                });
                                $rootScope.chkList = getCheckedStructure();
                                $rootScope.elemType = elementType;
                                $rootScope.$apply();
                                animate(
                                        {in: $("#main-content-ontology-element"), out: $rootScope.selectedContext},
                                        {in: "fade-in", out: "fade-out"},
                                        true
                                        );
                                $rootScope.selectedContext = document.getElementById("main-content-ontology-element");
                                FoundationApi.closeActiveElements();
                            });
                        }
                    });
                }
            };

            function getCheckedStructure() {
                var arr = [];
                $rootScope.elemData.forEach(function (data) {
                    arr.push(false);
                });
                return arr;
            }
        }]);
    module.filter('trustHTML', ['$sce', function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text);
            };
        }]);
})(window.angular);
