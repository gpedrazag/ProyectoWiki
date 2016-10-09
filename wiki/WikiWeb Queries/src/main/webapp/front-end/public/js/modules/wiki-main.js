(function (angular) {
    var module = angular.module("pmod-wiki-main", ["pmod-drilldown","pmod-ontology-element"]);
    module.controller("pctrl-views", ["$scope", function ($scope) {
            $scope.drilldownSelected = "selected";
            $scope.searchingSelected = "";
            $scope.resourcesSelected = "";
                                 
            $scope.onDrilldown = function () {
                $scope.drilldownSelected = "selected";
                $scope.searchingSelected = "";
                $scope.resourcesSelected = "";
                animate(
                    {in:$("#main-content-drilldown"), out:$scope.si},
                    {in:"slide-in-left", out:"slide-out-right"},
                    true
                );
                $scope.si = $("#main-content-drilldown");
                
            };
            $scope.onSearching = function () {
                $scope.drilldownSelected = "";
                $scope.searchingSelected = "selected";
                $scope.resourcesSelected = "";
                animate(
                    {in:$("#main-content-searching"), out:$scope.si},
                    {in:"slide-in-left", out:"slide-out-right"},
                    true
                );
                $scope.si = $("#main-content-searching");
            };
            $scope.onResources = function () {
                $scope.drilldownSelected = "";
                $scope.searchingSelected = "";
                $scope.resourcesSelected = "selected";
                animate(
                    {in:$("#main-content-resources"), out:$scope.si},
                    {in:"slide-in-left", out:"slide-out-right"},
                    true
                );
                $scope.si = $("#main-content-resources");
            };

            $scope.outHoverMenuOption = function () {
                deselectMenuOption(true);
            };

            $scope.hoverMenuOption = function (event) {
                var source = $(event.target);
                if ($(source).is("span")) {
                    source = $(event.target).parent().parent().parent();
                } else {
                    source = $(event.target).parent().parent();
                }
                $($(source).find("div")[2]).find("a").addClass("selected");
            };

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
            templateUrl: window.location.pathname + "/front-end/views/templates/content.html",
            restrict: "E",
            replace: "true",
            link:function(s,e,a) {
                s.si = $(e).find("#main-content-drilldown");
            }
        };
    });
    module.directive("pdirecNav", function () {
        return {
            templateUrl: window.location.pathname + "/front-end/views/templates/nav.html",
            restrict: "E",
            replace: "true"
        };
    });
})(window.angular);
