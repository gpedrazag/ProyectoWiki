(function (angular) {
    var module = angular.module("pmodAdmin", ["pmodChangeRecovery"]);
    module.controller("pctrlAdmin", ["$scope", "$rootScope", "FoundationModal", "$timeout", function ($scope, $rootScope, FoundationModal, $timeout) {
            $rootScope.changes = [];
            $rootScope.change = null;
            $rootScope.changePos = -1;
            $rootScope.selectAdmin = {
                adminClass: "",
                adminDP: ""
            };
            $scope.dps = [];
            $scope.init = function () {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/change/selectAll",
                    method: "POST",
                    dataType: "json"
                }).done(function (response) {
                    if (response && response !== null) {
                        $rootScope.changes = [];
                        $rootScope.$apply();
                        $rootScope.changes = response;
                        $rootScope.initTimeline();
                    }
                });
            };
            $rootScope.selectAdminClass = function () {
                if ($rootScope.selectAdmin.adminClass === "") {
                    animateOut($("#select-admin-dp").parent().parent(), "fade-out", false);
                    $rootScope.selectAdmin.adminDP = "";
                }
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/change/selectAllChangesByClass",
                    data: {classType: $rootScope.selectAdmin.adminClass},
                    dataType: "json",
                    method: "POST"
                }).done(function (response) {
                    $rootScope.changes = [];
                    $rootScope.$apply();
                    $rootScope.changes = response;
                    $rootScope.initTimeline();
                    $.ajax({
                        url: "/" + window.location.pathname.split("/")[1] + "/search/getDPForClass",
                        data: {classType: $rootScope.selectAdmin.adminClass},
                        dataType: "json",
                        method: "POST"
                    }).done(function (data) {
                        if (data) {
                            $scope.dps = [];
                            $rootScope.$apply();
                            $scope.dps = data;
                            $rootScope.$apply();
                            animateIn($("#select-admin-dp").parent().parent(), "fade-in", false);
                        }
                    });
                });

            };
            $rootScope.selectAdminDP = function () {
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
            };
            $scope.translate = function (key) {
                return translate(key);
            };
            $rootScope.initTimeline = function () {
                var items = [];
                $rootScope.changes.forEach(function (change) {
                    var item = null;
                    if (change.isActive) {
                        item = $(
                                "<div style='background-color:green; color:red;'>" + change.id + "</div>"
                                );
                        items.push({
                            id: change.id,
                            content: item[0],
                            start: new Date(change.date)
                        });
                    } else {
                        items.push({
                            id: change.id,
                            content: change.id,
                            start: new Date(change.date)
                        });
                    }
                });
                var container = document.getElementById('general-time-line');
                $(container).empty();
                var options = {
                    height: 600,
                    editable: false
                };
                var timeline = new vis.Timeline(container, items, options);
                $timeout(function () {
                    var divs = $(container).find(".vis-item-content");
                    $.each(divs, function (i, div) {
                        div = $(div);
                        div.addClass("link-item-hover").on("click", activateModal);
                        div.parent().addClass("link-item-hover").on("click", activateModal);
                        $rootScope.$apply();
                    });
                }, false, 500);
            };

            function activateModal(event) {
                var target = event.target;
                if (target) {
                    var id = target.innerHTML;
                    $.ajax({
                        url: "/" + window.location.pathname.split("/")[1] + "/change/selectById",
                        method: "POST",
                        dataType: "json",
                        data: {id: id}
                    }).done(function (response) {
                        if (response && response !== null) {
                            var i = 0;
                            while ($rootScope.changes[i]) {
                                if ($rootScope.changes[i].id === id) {
                                    $rootScope.changePos = i;
                                    break;
                                }
                                i++;
                            }
                            $rootScope.change = null;
                            $rootScope.$apply();
                            $rootScope.change = response;
                            $rootScope.$apply();
                            FoundationModal.activate("change-recovery-modal");
                        }

                    });
                }
            }
        }]);
    module.directive("pdirecAdmin", function () {
        return {
            restrict: "E",
            replace: "true",
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/adminTools.html"
        };
    });
})(window.angular);


