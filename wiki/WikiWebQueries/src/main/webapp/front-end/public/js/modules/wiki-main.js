(function (angular) {
    var module = angular.module("pmod-wiki-main", [
        "pmodAnimationServices",
        "pmodTranslatorServices",
        "pmodGeneralService",
        "pmodActionListService",
        "pmodImageService",
        "pmodConsultCarouselService",
        "pmod-drilldown",
        "pmod-ontology-element",
        "pmodResources",
        "pmodDcsAltMap",
        "pmodGraph",
        "pmodAdmin"
    ]);
    module.controller("pctrlViews", [
        "$scope", "$rootScope", "FoundationPanel", "FoundationApi", "QuickActionListService", "$timeout", "AnimationService", "TranslatorService", "GeneralService",
        function ($scope, $rootScope, FoundationPanel, FoundationApi, QuickActionListService, $timeout, AnimationService, TranslatorService, GeneralService) {
            $scope.inputSearchString = "";
            $scope.drilldownSelected = "";
            $scope.resourcesSelected = "";
            $scope.coincidences = [];
            $rootScope.actions = [];
            $rootScope.rImagesDoCount = 0;
            $rootScope.selectedContext = null;
            $rootScope.graphSelected = "selected";
            $rootScope.adminOpts = "";
            $rootScope.dcsAltMapSelected = "";
            $rootScope.ontologyElementSelected = false;
            $rootScope.actualReference = "";
            $rootScope.drilldownIndvs = [];
            $rootScope.user = null;

            $scope.haveEditPrivilege = function () {
                var haveIt = false;
                var obj = {};
                try {
                    $rootScope.user.havePrivileges.forEach(function (privilege) {
                        if (privilege.privilegeType === "edit" || privilege.privilegeType === "admin") {
                            haveIt = true;
                            throw obj;
                        }
                    });
                } catch (obj) {
                }

                return haveIt;
            };
            $scope.onDrilldown = function (event) {
                if (event) {
                    event.stopPropagation();
                }
                $scope.drilldownSelected = "selected";
                $scope.resourcesSelected = "";
                $rootScope.dcsAltMapSelected = "";
                $rootScope.graphSelected = "";
                $rootScope.adminOpts = "";
                $rootScope.ontologyElementSelected = false;
                $rootScope.rImages = [];
                if ($rootScope.selectedContext === null) {
                    $rootScope.selectedContext = $("#main-content-graph");
                }
                $timeout(function () {
                    $rootScope.$apply();
                    AnimationService.animate(
                            {in: $("#main-content-drilldown"), out: $rootScope.selectedContext},
                            {in: "fade-in", out: "fade-out"},
                            true
                            );
                    $rootScope.selectedContext = $("#main-content-drilldown");
                }, false, 500);
            };
            $scope.onGraph = function (event) {
                if (event) {
                    event.stopPropagation();
                }
                $scope.drilldownSelected = "";
                $scope.resourcesSelected = "";
                $rootScope.dcsAltMapSelected = "";
                $rootScope.graphSelected = "selected";
                $rootScope.adminOpts = "";
                $rootScope.ontologyElementSelected = false;
                $rootScope.rImages = [];
                $timeout(function () {
                    $rootScope.$apply();
                    AnimationService.animate(
                            {in: $("#main-content-graph"), out: $rootScope.selectedContext},
                            {in: "fade-in", out: "fade-out"},
                            true
                            );
                    $rootScope.selectedContext = $("#main-content-graph");
                }, false, 500);
            };
            $scope.onDcsAltMap = function (event) {
                if (event) {
                    event.stopPropagation();
                }
                $scope.drilldownSelected = "";
                $scope.resourcesSelected = "";
                $rootScope.dcsAltMapSelected = "selected";
                $rootScope.graphSelected = "";
                $rootScope.adminOpts = "";
                $rootScope.ontologyElementSelected = false;
                $rootScope.rImages = [];
                if ($rootScope.selectedContext === null) {
                    $rootScope.selectedContext = $("#main-content-graph");
                }
                $timeout(function () {
                    $rootScope.$apply();
                    AnimationService.animate(
                            {in: $("#main-content-dcsAltMap"), out: $rootScope.selectedContext},
                            {in: "fade-in", out: "fade-out"},
                            true
                            );
                    $rootScope.selectedContext = $("#main-content-dcsAltMap");
                }, false, 500);
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
                $rootScope.ontologyElementSelected = false;
                $rootScope.adminOpts = "";
                if ($rootScope.selectedContext === null) {
                    $rootScope.selectedContext = $("#main-content-graph");
                }
                $timeout(function () {
                    $rootScope.$apply();
                    AnimationService.animate(
                            {in: $("#main-content-resources"), out: $rootScope.selectedContext},
                            {in: "fade-in", out: "fade-out"},
                            true
                            );
                    $rootScope.selectedContext = $("#main-content-resources");
                }, false, 500);
                getViewerImages();
            };
            $scope.onAdminOpts = function (event) {
                if (event) {
                    event.stopPropagation();
                }
                $rootScope.rImagesDoCount = 0;
                $scope.drilldownSelected = "";
                $rootScope.dcsAltMapSelected = "";
                $scope.resourcesSelected = "";
                $rootScope.adminOpts = "selected";
                $rootScope.ontologyElementSelected = false;
                $rootScope.graphSelected = "";
                if ($rootScope.selectedContext === null) {
                    $rootScope.selectedContext = $("#main-content-graph");
                }
                $timeout(function () {
                    $rootScope.$apply();
                    AnimationService.animate(
                            {in: $("#main-content-admin"), out: $rootScope.selectedContext},
                            {in: "fade-in", out: "fade-out"},
                            true
                            );
                    $rootScope.selectedContext = $("#main-content-admin");
                }, false, 500);
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
                    $rootScope.actualReference = reference;
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
                    $rootScope.chkList = GeneralService.getCheckedStructure();
                    $rootScope.elemType = reference.replace("/", "").replace("/", "").toLowerCase();
                    $rootScope.$apply();

                    AnimationService.animate(
                            {in: $("#main-content-ontology-element"), out: $rootScope.selectedContext === null ? $("#main-content-drilldown") : $rootScope.selectedContext},
                            {in: "fade-in", out: "fade-out"},
                            true
                            );
                    $rootScope.selectedContext = document.getElementById("main-content-ontology-element");
                    QuickActionListService.addAction(
                            "action:" + $rootScope.elemTypeId,
                            "/" + window.location.pathname.split("/")[1] + reference + "selectById",
                            TranslatorService.translate(reference) + " " + $rootScope.elemTypeId,
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
                                    classType: TranslatorService.translate(data.classType),
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
            $scope.exitSession = function () {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/session/closeSession",
                    method: "POST",
                    dataType: "json"
                });
                window.location.href = "/" + window.location.pathname.split("/")[1];
            };

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
                        matches[i].property = TranslatorService.translate(matches[i].property);
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
            (function () {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/session/getPrivilegies",
                    method: "POST",
                    dataType: "json"
                }).done(function (response) {
                    if (response.error) {
                        window.location.href = "/" + window.location.pathname.split("/")[1];
                    } else {
                        $rootScope.user = response;
                        $rootScope.$apply();
                    }
                });
            })();
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
    module.filter('trustHTML', ['$sce', function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text);
            };
        }]);
})(window.angular);
