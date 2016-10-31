(function (angular) {
    var module = angular.module("pmod-ontology-sub-element", []);

    module.controller("pctrlOntologySubElement", ["$scope", "$rootScope", "$compile", "FoundationApi", "QuickActionListService", function ($scope, $rootScope, $compile, FoundationApi, QuickActionListService) {
            var pos = 0;
            $scope.haveSolutions = {};
            $scope.dcsWithOutsol = false;

            $scope.isAnAltAndSol = function (d) {
                if (typeof d !== "undefined") {
                    if (d.reference === "/alternative/" && d.rationale.trim() !== "") {
                        return true;
                    }
                }
                return false;
            };
            $scope.isADcsAndWhtoutSol = function (d, i, key) {
                if (typeof d !== "undefined" && d.reference === "/decision/") {
                    $.ajax({
                        url: window.location.pathname + d.reference + "haveSolution",
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
                if (container.innerHTML.indexOf("div") < 0 && container.innerHTML.indexOf("<p") < 0) {
                    if (typeof data !== "undefined" && data.trim() !== "") {
                        if (data.indexOf("div") === 1) {
                            loadHTML(container, data, false);
                        } else {
                            $(container).html($("<div>").html(data));
                        }
                    } else {
                        $(container).html($("<div>").html("No existe contenido"));
                    }
                }
            };
            $scope.translate = function (key) {
                return translate(key);
            };
            $scope.getModalTitle = function () {
                var title = "";
                var obj = {};
                try {
                    if (typeof $rootScope.subElemData !== "undefined" && $rootScope.subElemData.length > 0) {
                        if (typeof $rootScope.elemSubTypeId !== "undefined") {
                            $rootScope.subElemData.forEach(function (data) {
                                if (data.key === "reference") {
                                    title = translate(data.content) + " " + $rootScope.elemSubTypeId;
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
                findElemInEditor(content.id, content.reference);
                QuickActionListService.addAction(
                        "action:" + content.id,
                        window.location.pathname + content.reference + "selectById",
                        translate(content.reference) + " " + content.id,
                        content.reference.replace("/","").replace("/","").toLowerCase());
                FoundationApi.closeActiveElements();
            };
            $scope.goTo = function (id, reference) {
                $.ajax({
                    url: window.location.pathname + reference + "selectById",
                    data: {id: id},
                    method: "POST",
                    dataType: "json"
                }).done(function (reponse) {
                    $rootScope.elemData = [];
                    $rootScope.relatedElems = [];
                    $rootScope.elemTypeId = "";
                    $rootScope.$apply();
                    if (reponse !== null && reponse.id === id) {
                        var reference = "";
                        Object.keys(reponse).forEach(function (key) {
                            if (key !== "id") {
                                if(key === "reference") {
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
                                window.location.pathname + reference + "selectById",
                                translate(reference) + " " + $rootScope.elemTypeId,
                                reference.replace("/","").replace("/","").toLowerCase());
                        FoundationApi.closeActiveElements();
                        $rootScope.selectedContext = ain;
                    }
                });
            };

            function getCheckedStructure() {
                var arr = [];
                $rootScope.elemData.forEach(function (data) {
                    arr.push(false);
                });
                return arr;
            }
            function findElem(id, reference) {
                $.ajax({
                    url: window.location.pathname + reference + "selectById",
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
            function findElemInEditor(id, reference) {
                $.ajax({
                    url: window.location.pathname + reference + "selectById",
                    data: {id: id},
                    method: "POST",
                    dataType: "json"
                }).done(function (reponse) {
                    $rootScope.elemData = [];
                    $rootScope.relatedElems = [];
                    $rootScope.$apply();
                    if (reponse !== null && reponse.id === id) {
                        Object.keys(reponse).forEach(function (key) {
                            if (key !== "id") {
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
            ;
            function loadHTML(container, html, isEditor) {
                var images = getImages(html);
                html = $(html);
                images.forEach(function (img) {
                    searchImage(html, img, container, isEditor);
                });
                if (!isEditor) {
                    $(container).html(html.prop("outerHTML"));
                }
            }
            function searchImage(html, img, container, isEditor) {
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
                        url: window.location.pathname + "/downloader/getImage",
                        data: {name: props.name},
                        method: "POST",
                        dataType: "json"
                    }).done(function (response) {
                        var ext = props.name.split(".")[1];
                        var img = ""
                                + "<img "
                                + "name=\"" + props.name + "\" "
                                + "src=\"" + response.base64 + "\" style='width:" + props.width + "; height:" + props.height + ";'/>";
                        if (!isEditor) {
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
                        }
                    });
                } else {
                    var img = ""
                            + "<img "
                            + "name=\"" + props.name + "|url\" "
                            + "src=\"" + props.url + "\" style='width:" + props.width + "; height:" + props.height + ";'/>";
                    if (!isEditor) {
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
        }]);
    module.directive("pdirecOntoSubElem", function () {
        return {
            templateUrl: window.location.pathname + "/front-end/views/templates/ontology-sub-element.html",
            restrict: "E",
            replace: "true",
            require: "ngModel"
        };
    });
})(window.angular);

