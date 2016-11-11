(function (angular) {
    var module = angular.module("pmodChangeRecovery", []);
    module.controller("pctrlChangeRecovery", ["$scope", "$compile", "$rootScope", "$timeout", "QuickActionListService", "FoundationApi", function ($scope, $compile, $rootScope, $timeout, QuickActionListService, FoundationApi) {
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
                        loadHTML(document.getElementById("after-div"), html);
                        loadHTML(document.getElementById("before-div"), $rootScope.change.newContent);
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
                return translate(key);
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
                loadHTML(document.getElementById("before-div"), $rootScope.change.newContent);
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
                loadHTML(document.getElementById("before-div"), $rootScope.change.newContent);
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
                    $.ajax({
                        url: "/" + window.location.pathname.split("/")[1] + "/" + classType + "/selectById",
                        data: {id: $rootScope.change.individualID},
                        method: "POST",
                        dataType: "json"
                    }).done(function (reponse) {
                        $rootScope.elemData = [];
                        $rootScope.relatedElems = [];
                        $rootScope.elemTypeId = "";
                        $rootScope.$apply();
                        if (reponse !== null && reponse.id === $rootScope.change.individualID) {
                            var reference = "";
                            Object.keys(reponse).forEach(function (key) {
                                if (key !== "id") {
                                    if (key === "reference") {
                                        reference = reponse[key];
                                    }
                                    if (typeof reponse[key] !== "object") {
                                        $rootScope.elemData.push({key: key, content: reponse[key]});
                                    } else {
                                        $rootScope.relatedElems.push({
                                            key: key,
                                            content: (typeof reponse[key].length === "undefined" ? [reponse[key]] : reponse[key])
                                        });
                                    }
                                } else {
                                    $rootScope.elemTypeId = reponse[key];
                                }
                            });
                            $rootScope.chkList = getCheckedStructure();
                            $rootScope.$apply();
                            var ain = document.getElementById("main-content-ontology-element");
                            animate(
                                    {in: ain, out: $rootScope.selectedContext},
                                    {in: "fade-in", out: "fade-out"},
                                    false
                                    );
                            QuickActionListService.addAction(
                                    "action:" + $rootScope.elemTypeId,
                                    "/" + window.location.pathname.split("/")[1] + reference + "selectById",
                                    translate(reference) + " " + $rootScope.elemTypeId,
                                    reference.replace("/", "").replace("/", "").toLowerCase());
                            FoundationApi.closeActiveElements();
                            $rootScope.selectedContext = ain;
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

            function loadHTML(container, html) {
                var images = getImages(html);
                html = $(html);
                images.forEach(function (img) {
                    searchImage(html, img, container);
                });
                $(container).html(html.prop("outerHTML"));
            }
            function getImages(html) {
                var c = $("<div style='width:100%'>" + $(html)[0].outerHTML + "</div>");
                var images = [];
                c.find("span").each(function (i, span) {
                    if (span.attributes[0].localName === "img") {
                        images.push(span);
                    }
                });
                return images;
            }
            function searchImage(html, img, container) {
                var props = function () {
                    this.name = "";
                    this.height = "";
                    this.width = "";
                    this.url = "";
                };
                props = new props();
                props.name = img.attributes[0].value;
                props.height = img.attributes[1].value;
                props.width = img.attributes[2].value;
                props.url = typeof img.attributes[3] !== "undefined" ? img.attributes[3].value : null;

                if (props.url === null) {
                    $.ajax({
                        url: "/" + window.location.pathname.split("/")[1] + "/downloader/getImage",
                        data: {name: props.name},
                        method: "POST",
                        dataType: "json"
                    }).done(function (response) {
                        var ext = props.name.split(".")[1];
                        var img = ""
                                + "<img "
                                + "name=\"" + props.name + "\" "
                                + "src=\"" + response.base64 + "\" style='width:" + props.width + "; height:" + props.height + ";'/>";

                        var i = 0;
                        $(html).find("span").each(function (i, span) {
                            if (span.attributes[0].localName === "img" && span.attributes[0].value === props.name) {
                                $(html).find("span:eq(" + i + ")").replaceWith(img);
                                $compile($(img))($scope);
                                $scope.$apply();
                            }
                            i++;
                        });
                        $(container).html(html);

                    });
                } else {
                    var img = ""
                            + "<img "
                            + "name=\"" + props.name + "|url\" "
                            + "src=\"" + props.url + "\" style='width:" + props.width + "; height:" + props.height + ";'/>";
                    var i = 0;
                    $(html).find("span").each(function (i, span) {
                        if (span.attributes[0].localName === "img" && span.attributes[0].value === props.name && span.attributes[3].value === props.url) {
                            $(html).find("span:eq(" + i + ")").replaceWith(img);
                        }
                        i++;
                    });
                    $(container).html(html);

                }
            }
        }]);
    module.directive("pdirecChangeRecovery", function () {
        return {
            restrict: "E",
            replace: "true",
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/adminChangeRecovery.html"
        };
    });
})(window.angular);


