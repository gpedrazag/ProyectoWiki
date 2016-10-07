(function (angular) {
    var module = angular.module("pmod-wiki-main", ["pmod-drilldown"]);
    module.controller("pctrl-views", ["$scope", function ($scope) {
            $scope.drilldownSelected = "";
            $scope.searchingSelected = "";
            $scope.resourcesSelected = "";
            
            $scope.onDrilldown = function () {
                $scope.drilldownSelected = "selected";
                $scope.searchingSelected = "";
                $scope.resourcesSelected = "";
                document.dispatchEvent(evtDrilldownSlideIn);
            };
            $scope.onSearching = function () {
                $scope.drilldownSelected = "";
                $scope.searchingSelected = "selected";
                $scope.resourcesSelected = "";
                document.dispatchEvent(evtSearchingSlideIn);
            };
            $scope.onResources = function () {
                $scope.drilldownSelected = "";
                $scope.searchingSelected = "";
                $scope.resourcesSelected = "selected";
                document.dispatchEvent(evtResourcesSlideIn);
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
            replace: "true"
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
