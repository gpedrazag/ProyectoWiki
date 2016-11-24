(function (angular) {
    var module = angular.module("pmodChangeRecovery", []);
    module.controller("pctrlChangeRecovery", [
        "$scope",
        "$rootScope",
        "$timeout",
        "FoundationApi",
        "TranslatorService",
        "ImageService",
        "ConsultCarouselService",
        function ($scope, $rootScope, $timeout, FoundationApi, TranslatorService, ImageService, ConsultCarouselService) {
            $scope.actualStateText = "Contenido Cambiado";
            var classType = "";
            $scope.init = function () {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/change/selectActualChange",
                    method: "POST",
                    data: {id: $rootScope.change.individualID, dp: $rootScope.change.dpChanged}
                }).done(function (response) {
                    if (response && response !== null) {
                        if (response.trim().indexOf("</div>") < 0) {
                            response = "<div>" + response + "</div>";
                        }
                        var html = $(response);
                        if (html.length > 1) {
                            var newHtml = $("<div>");
                            $.each(html, function (i, elem) {
                                newHtml.append(elem);
                            });
                            html = newHtml;
                        }
                        ImageService.loadHTML(document.getElementById("after-div"), html, $scope);
                        ImageService.loadHTML(document.getElementById("before-div"), $rootScope.change.newContent, $scope);
                        $.ajax({
                            url: "/" + window.location.pathname.split("/")[1] + "/search/getClassByIndvID",
                            data: {id: $rootScope.change.individualID},
                            method: "POST"
                        }).done(function (response) {
                            if (response !== "") {
                                classType = response;
                            }
                        });
                    }
                });
            };
            $scope.translate = function (key) {
                return TranslatorService.translate(key);
            };
            $scope.showBefore = function (event) {
                if (event) {
                    event.stopPropagation();
                }
                $rootScope.changePos = $rootScope.changePos - 1;
                $rootScope.change = $rootScope.changes[$rootScope.changePos];
                $timeout(function () {
                    $rootScope.$apply();
                }, false, 200);
                ImageService.loadHTML(document.getElementById("before-div"), $rootScope.change.newContent, $scope);
                $timeout(function () {
                    $rootScope.$apply();
                }, false, 200);
            };
            $scope.showAfter = function (event) {
                if (event) {
                    event.stopPropagation();
                }
                $rootScope.changePos = $rootScope.changePos + 1;
                $rootScope.change = $rootScope.changes[$rootScope.changePos];
                $timeout(function () {
                    $rootScope.$apply();
                }, false, 200);
                ImageService.loadHTML(document.getElementById("before-div"), $rootScope.change.newContent, $scope);
                $timeout(function () {
                    $rootScope.$apply();
                }, false, 200);
            };
            $scope.turnTheChangeEffective = function (id, individualID, dpChanged, event) {
                if (event) {
                    event.stopPropagation();
                }
                var data = {};
                data["id"] = $rootScope.change.individualID;
                data[$rootScope.change.dpChanged] = $rootScope.change.newContent;
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/" + classType + "/update",
                    data: data,
                    method: "POST",
                    dataType: "json"
                }).done(function (error1) {
                    if (!error1) {
                        $.ajax({
                            url: "/" + window.location.pathname.split("/")[1] + "/change/updateChange",
                            data: {id: id, indvID: individualID, dp: dpChanged},
                            method: "POST"
                        }).done(function (error2) {
                            if (!error2) {
                                if ($rootScope.selectAdmin.adminDP === "") {
                                    $rootScope.selectAdminClass();
                                } else {
                                    $.ajax({
                                        url: "/" + window.location.pathname.split("/")[1] + "/change/selectAllChangesByClassAndDp",
                                        data: {dp: $rootScope.selectAdmin.adminDP, classType: $rootScope.selectAdmin.adminClass},
                                        dataType: "json",
                                        method: "POST"
                                    }).done(function (response) {
                                        $rootScope.changes = [];
                                        $rootScope.$apply();
                                        $rootScope.changes = response;
                                        $rootScope.initTimeline();
                                    });
                                }
                            }
                        });
                    }
                });
                FoundationApi.closeActiveElements();
            };
            $scope.enterEditMode = function () {
                if (classType !== "") {
                    ConsultCarouselService.goTo(
                            $rootScope.change.individualID,
                            "/" + classType + "/",
                            $("#main-content-admin"),
                            function () {
                                FoundationApi.closeActiveElements();
                            });
                }
            };
        }]);
    module.directive("pdirecChangeRecovery", function () {
        return {
            restrict: "E",
            replace: "true",
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/adminChangeRecovery.html"
        };
    });
})(window.angular);


