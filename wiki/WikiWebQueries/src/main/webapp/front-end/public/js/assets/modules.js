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



(function (angular) {
    var module = angular.module("pmodAdmin", ["pmodChangeRecovery"]);
    module.controller("pctrlAdmin", [
        "$scope", "$rootScope", "FoundationModal", "$timeout", "AnimationService", "TranslatorService",
        function ($scope, $rootScope, FoundationModal, $timeout, AnimationService, TranslatorService) {
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
                    AnimationService.animateOut($("#select-admin-dp").parent().parent(), "fade-out", false);
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
                    if ($rootScope.selectAdmin.adminClass !== "") {
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
                                AnimationService.animateIn($("#select-admin-dp").parent().parent(), "fade-in", false);
                            }
                        });
                    }
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
                return TranslatorService.translate(key);
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
(function (angular) {
    var module = angular.module("pmod-drilldown", []);
    module.controller("pctrl-drilldown", [
        "$scope", "$filter", "$rootScope", "QuickActionListService", "AnimationService", "TranslatorService", "GeneralService", 
        function ($scope, $filter, $rootScope, QuickActionListService, AnimationService, TranslatorService, GeneralService) {
            var url = "";
            $scope.haveSolutions = {};
            $rootScope.elemData = [];
            $rootScope.relatedElems = [];
            $scope.list = [
                "Alternativas", "Arquitecturas de Software", "Artefactos",
                "Atributos de Calidad", "Criterios", "Decisiones",
                "Evaluaciones", "Requerimientos Funcionales", "Responsables"
            ];
            $scope.do = function (i, event) {
                if(event) {
                    event.stopPropagation();
                }
                if ($rootScope.selectedContext === null) {
                    $rootScope.selectedContext = $("#main-content-drilldown");
                }
                if (i === 0) {
                    url = "/" + window.location.pathname.split("/")[1] + "/Alternative/selectAll";
                    $rootScope.elemType = "alternative";
                } else if (i === 1) {
                    url = "/" + window.location.pathname.split("/")[1] + "/SoftwareArchitecture/selectAll";
                    $rootScope.elemType = "softwarearchitecture";
                } else if (i === 2) {
                    url = "/" + window.location.pathname.split("/")[1] + "/Artifact/selectAll";
                    $rootScope.elemType = "artifact";
                } else if (i === 3) {
                    url = "/" + window.location.pathname.split("/")[1] + "/QualityAttributeStage/selectAll";
                    $rootScope.elemType = "qualityattributestage";
                } else if (i === 4) {
                    url = "/" + window.location.pathname.split("/")[1] + "/Criteria/selectAll";
                    $rootScope.elemType = "criteria";
                } else if (i === 5) {
                    url = "/" + window.location.pathname.split("/")[1] + "/Decision/selectAll";
                    $rootScope.elemType = "decision";
                } else if (i === 6) {
                    url = "/" + window.location.pathname.split("/")[1] + "/Evaluation/selectAll";
                    $rootScope.elemType = "evaluation";
                } else if (i === 7) {
                    url = "/" + window.location.pathname.split("/")[1] + "/FunctionalRequeriment/selectAll";
                    $rootScope.elemType = "functionalrequeriment";
                } else if (i === 8) {
                    url = "/" + window.location.pathname.split("/")[1] + "/Responsible/selectAll";
                    $rootScope.elemType = "responsible";
                }

                $.ajax({
                    url: url,
                    method: "POST",
                    dataType: "json"
                }).done(function (data) {
                    if (typeof data !== "undefined") {
                        if (data.length === 0) {
                            if (Object.keys(data).length !== 0) {
                                data = [data];
                            }
                        }
                        $scope.haveSolutions = {};
                        $rootScope.drilldownIndvs = [];
                        $rootScope.$apply();
                        $rootScope.drilldownIndvs = $filter("orderBy")(data, "id");
                        $rootScope.$apply();
                    }
                });
            };

            $scope.getN = function (n) {
                var arr = new Array(Math.ceil($rootScope.drilldownIndvs.length / n));
                var i = 0;
                while(i < arr.length) {
                    arr[i] = i;
                    i++;
                }
                return arr;
            };
            $scope.getNElem = function (row, col, n) {
                var pos = (row * n - (n - col)) * 5 - 5;
                var arr = [];
                for (i = pos; i <= pos + 4; i++) {
                    if (typeof $rootScope.drilldownIndvs[i] !== "undefined") {
                        arr.push($rootScope.drilldownIndvs[i]);
                    } else {
                        break;
                    }
                }
                return arr;
            };
            $scope.showElemData = function (id) {
                if ($rootScope.drilldownIndvs.length > 0) {
                    $rootScope.elemData = [];
                    $rootScope.relatedElems = [];
                    $rootScope.elemTypeId = "";
                }
                var nurl = url.split("/");
                nurl = "/" + nurl[1] + "/" + nurl[2] + "/selectById";
                $.ajax({
                    url: nurl,
                    method: "POST",
                    dataType: "json",
                    data: {id: id}
                }).done(function (elem) {
                    var reference = "";
                    if (elem !== null) {
                        Object.keys(elem).forEach(function (key) {
                            if (key !== "id") {
                                if (typeof elem[key] !== "object") {
                                    if (key === "reference") {
                                        reference = elem[key];
                                        $rootScope.actualReference = elem[key];
                                    }
                                    if (key !== "did") {
                                        $rootScope.elemData.push({key: key, content: elem[key]});
                                    }
                                } else {
                                    $rootScope.relatedElems.push({key: key, content: (typeof elem[key].length === "undefined" ? [elem[key]] : elem[key])});
                                }
                            } else {
                                $rootScope.elemTypeId = elem[key];
                            }
                        });
                        $rootScope.chkList = [];
                        $rootScope.chkList = GeneralService.getCheckedStructure();
                        $rootScope.selectedContext = document.getElementById("main-content-ontology-element");
                        $rootScope.ontologyElementSelected = true;
                        $rootScope.$apply();
                        AnimationService.animate(
                                {in: $rootScope.selectedContext, out: $("#main-content-drilldown")},
                                {in: "slide-in-left", out: "slide-out-right"},
                                false
                                );
                        QuickActionListService.addAction(
                                "action:" + $rootScope.elemTypeId,
                                "/" + window.location.pathname.split("/")[1] + reference + "selectById",
                                TranslatorService.translate(reference) + " " + $rootScope.elemTypeId,
                                $rootScope.elemType);
                    }
                });
            };
            $scope.isAnAltAndSol = function (d) {
                if (typeof d !== "undefined") {
                    if (d.reference === "/Alternative/" && d.rationale.trim() !== "") {
                        return true;
                    }
                }
                return false;
            };
            $scope.isADcsAndWhtoutSol = function (d, key) {
                if (typeof d !== "undefined" && d.reference === "/Decision/") {
                    $.ajax({
                        url: "/" + window.location.pathname.split("/")[1] + d.reference + "haveSolution",
                        method: "POST",
                        data: {id: d.id},
                        dataType: "json"
                    }).done(function (response) {
                        $scope.haveSolutions[key] = !response.value;
                        $rootScope.$apply();
                    });
                }
                return false;
            };
        }]).directive("pdirecDrilldown", function () {
        return {
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/drilldown.html",
            restrict: "E",
            replace: "true"
        };
    });

})(window.angular);

(function (angular) {
    var module = angular.module("pmodGraph", []);

    module.controller('pctrlGraph', ["$scope", "$rootScope", "$timeout", function ($scope, $rootScope, $timeout) {
            $scope.init = function () {
                var nodes = new vis.DataSet([
                    {id: 1, label: 'Node 1'},
                    {id: 2, label: 'Node 2'},
                    {id: 3, label: 'Node 3'},
                    {id: 4, label: 'Node 4'},
                    {id: 5, label: 'Node 5'}
                ]);

                var edges = new vis.DataSet([
                    {from: 1, to: 3},
                    {from: 1, to: 2},
                    {from: 2, to: 4},
                    {from: 2, to: 5}
                ]);

                var container = document.getElementById('graphContainer');
                $(container).ready(function () {

                });
                var data = {
                    nodes: nodes,
                    edges: edges
                };
                var options = {
                    height: "600px",
                    width: "100%"
                };
                $timeout(function () {
                    var network = new vis.Network(container, data, options);
                    network.fit();
                }, 1200, false);
            };

        }]);

    module.directive("pdirecGraph", function () {
        return {
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/graph.html",
            restrict: "E",
            replace: "true"
        };
    });

})(window.angular);
(function (angular) {
    var module = angular.module("pmod-ontology-element", ["pmod-ontology-sub-element"]);
    module.controller("pctrlOntologyElement", [
        "$rootScope",
        "$scope",
        "$compile",
        "FoundationApi",
        "$timeout",
        "$filter",
        "AnimationService",
        "TranslatorService",
        "GeneralService",
        "ImageService",
        "ConsultCarouselService",
        function ($rootScope, $scope, $compile, FoundationApi, $timeout, $filter, AnimationService, TranslatorService, GeneralService, ImageService, ConsultCarouselService) {
            var imageCount = 0;
            var selectedImage = null;
            var urlImages = [];
            var selectedKeys = {};
            var indexForEdit = -1;
            var imagesForSearching = 0;
            var reference = "";
            $scope.showLocalImage = false;
            $scope.showURLImage = false;
            $scope.showExistentImage = false;
            $scope.type = null;
            $scope.images = [];
            $scope.tinyMCE = [];
            $scope.pos = 0;
            $scope.selected = {editor: "", type: "", file: null};
            $scope.haveSolutions = {};
            $rootScope.subElems = [];

            $scope.init = function () {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + $rootScope.actualReference + "selectAll",
                    method: "POST",
                    dataType: "json"
                }).done(function (data) {
                    if (typeof data !== "undefined") {
                        if (data.length === 0) {
                            if (Object.keys(data).length !== 0) {
                                data = [data];
                            }
                        }
                        $rootScope.drilldownIndvs = [];
                        $rootScope.$apply();
                        $rootScope.drilldownIndvs = $filter("orderBy")(data, "id");
                        $rootScope.$apply();
                        var obj = {};
                        $scope.pos = 0;
                        try {
                            $rootScope.drilldownIndvs.forEach(function (elem) {
                                if (elem["id"] === $rootScope.elemTypeId) {
                                    reference = elem["reference"];
                                    throw obj;
                                }
                                $scope.pos = $scope.pos + 1;
                            });
                        } catch (obj) {
                        }
                    }
                });
            };
            $scope.showPrevious = function () {
                $scope.pos = $scope.pos - 1;
                showElemData($rootScope.drilldownIndvs[$scope.pos]["id"]);
            };
            $scope.showNext = function () {
                $scope.pos = $scope.pos + 1;
                showElemData($rootScope.drilldownIndvs[$scope.pos]["id"]);
            };
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
            $scope.returnOrNotContent = function (data, containerId) {
                $timeout(function () {
                    var container = document.getElementById(containerId);
                    if (typeof data !== "undefined" && data.trim().indexOf("</div>") < 0) {
                        if (data.trim() !== "") {
                            $(container).html($("<div>").html(data));
                        } else {
                            $(container).html($("<div>").html("No existe contenido"));
                        }
                    } else {
                        loadHTML(container, data, false);
                    }
                }, false, 500);
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
            $scope.getNImages = function (row, col, n) {
                var pos = (row * n - (n - col)) - 1;
                if (typeof $scope.images[pos] !== "undefined") {
                    return $scope.images[pos];
                }
                return null;
            };
            $scope.selectedImage = function (id) {
                if (selectedImage !== null) {
                    $(document.getElementById(selectedImage)).hide();
                }
                $(document.getElementById(id)).show();
                selectedImage = id;
            };
            $scope.uploadLocalImage = function (id) {
                $scope.showLocalImage = true;
                $scope.showURLImage = false;
                $scope.showExistentImage = false;
                $scope.selected = {
                    editor: id,
                    type: "l"
                };
            };
            $scope.uploadURLImage = function (id) {
                $scope.showLocalImage = false;
                $scope.showURLImage = true;
                $scope.showExistentImage = false;
                $scope.selected = {
                    editor: id,
                    type: "u"
                };
            };
            $scope.uploadExistentImage = function (id) {
                $scope.showLocalImage = false;
                $scope.showURLImage = false;
                $scope.showExistentImage = true;
                $scope.selected = {
                    editor: id,
                    type: "e"
                };
                $scope.images = [];
            };
            $scope.uploadImage = function () {
                var fileName = null;
                if ($scope.selected.type === "l") {
                    var file = document.getElementById("input-local-image");
                    fileName = document.getElementById("input-local-image-name");
                    if (typeof fileName.value !== "undefined" && fileName.value !== "") {
                        if (typeof file.files[0] !== "undefined" && file.files[0] !== null) {
                            if (/\.(jpe?g|png|gif|jpg)$/i.test(file.files[0].name)) {
                                var reader = new FileReader();
                                reader.onload = function (e) {
                                    imageCount++;
                                    var imgHTML = $(""
                                            + "  <img src='" + reader.result + "' "
                                            + "     name=\"" + fileName.value + "." + file.files[0].name.split(".")[1] + "\" "
                                            + "     id='" + fileName.value + "' />"
                                            );
                                    FoundationApi.closeActiveElements({exclude: fileName.value});
                                    tinymce.get($scope.selected.editor).insertContent($(imgHTML)[0].outerHTML);
                                };
                                reader.readAsDataURL(file.files[0]);
                                $(fileName).removeClass("has-error");
                                $(fileName).removeClass("has-error");
                            } else {
                                FoundationApi.publish("main-notifications", {
                                    title: 'Atención!!!',
                                    content: 'Solo puede subir archivos de imagen jpg, jpeg, png o gif',
                                    position: "bottom-right", color: "dark",
                                    autoclose: "3000"});
                            }
                        } else {
                            $(file).addClass("has-error");
                        }
                    } else {
                        $(fileName).addClass("has-error");
                        fileName.placeholder = "Debe agregar un nombre al archivo";
                    }
                } else if ($scope.selected.type === "u") {
                    var url = document.getElementById("input-url-image").value;
                    fileName = document.getElementById("input-url-image-name");
                    if (typeof fileName.value !== "undefined" && fileName.value !== "") {
                        var imgHTML = $(""
                                + "  <img "
                                + "     name=\"" + fileName.value + "|url\" "
                                + "     id='" + fileName.value + "' />"
                                );
                        imgHTML.error(function () {
                            FoundationApi.publish("main-notifications", {
                                title: 'Atención!!!',
                                content: 'El enlace suministrado está roto',
                                position: "bottom-right",
                                color: "alert",
                                autoclose: "3000"});
                        });
                        imgHTML.load(function () {
                            FoundationApi.closeActiveElements({exclude: fileName.value});
                            tinymce.get($scope.selected.editor).insertContent($(imgHTML)[0].outerHTML);
                        });
                        imgHTML.attr("src", url);
                    } else {
                        $(fileName).addClass("has-error");
                        fileName.placeholder = "Debe agregar un nombre al archivo";
                    }
                } else {
                    if (selectedImage && selectedImage !== "") {
                        var name = selectedImage.split("-")[1];
                        var image = null;
                        var obj = {};
                        try {
                            $scope.images.forEach(function (img) {
                                if (img.name === name) {
                                    image = img;
                                    throw obj;
                                }
                            });
                        } catch (obj) {
                        }
                        var img = null;
                        if ($scope.type === "url") {
                            img = ""
                                    + "<img name=\"" + image.name + "|url\" src=\"" + image.base64 + "\"  />";
                        } else {
                            img = ""
                                    + "<img name=\"" + image.name + "|exists\" src=\"" + image.base64 + "\"  />";
                        }
                        tinymce.get($scope.selected.editor).insertContent(img);
                        FoundationApi.closeActiveElements();
                    } else {
                        FoundationApi.publish("main-notifications", {
                            title: 'Atención!!!',
                            content: 'No ha seleccionado una imagen',
                            position: "bottom-right",
                            color: "alert",
                            autoclose: "3000"});
                    }
                }
            };
            $scope.translate = function (key) {
                return TranslatorService.translate(key);
            };
            $scope.saveEdit = function (editorId, key, event) {
                if (event) {
                    event.stopPropagation();
                }
                var editorContent = tinymce.get(editorId).getContent();
                var html = $(editorContent);
                var names = [];
                var files = [];
                var imageRegisters = [];
                var images = html.find("img");
                var reference = getElemReference();
                images.each(function (i, img) {
                    var name = $(img).attr("name");
                    var nameProps = name.split("|");
                    var h = $(img).css("height") === "0px" ? img.height + "px" : $(img).css("height");
                    var w = $(img).css("width") === "0px" ? img.width + "px" : $(img).css("width");
                    names.push(nameProps[0]);
                    if (typeof nameProps[1] === "undefined") {
                        imageRegisters.push({
                            type: "local",
                            content: "<span img=\"" + names[i] + "\" h=\"" + h + "\" w=\"" + w + "\"></span>",
                            references: [reference],
                            name: names[i]
                        });
                        files.push(dataURIToBlob(img.src));
                        html.find("img:eq(0)").replaceWith(imageRegisters[i].content);
                    } else {
                        if (nameProps[1] === "url") {
                            imageRegisters.push({
                                type: "url",
                                content: "<span img=\"" + names[i] + "\" h=\"" + h + "\" w=\"" + w + "\" url=\"" + img.src + "\"></span>",
                                references: [reference],
                                name: names[i]
                            });
                            html.find("img:eq(0)").replaceWith(imageRegisters[i].content);
                        } else {
                            imageRegisters.push({
                                type: "local",
                                content: "<span img=\"" + names[i] + "\" h=\"" + h + "\" w=\"" + w + "\"></span>",
                                references: [reference],
                                name: names[i]
                            });
                            html.find("img:eq(0)").replaceWith(imageRegisters[i].content);
                        }
                        files.push(null);
                    }
                });
                if (html.length > 1) {
                    var newHtml = $("<div>");
                    $.each(html, function (i, elem) {
                        newHtml.append(elem);
                    });
                    html = newHtml;
                }
                saveChanges(key, html[0].outerHTML);
                saveConfiguration(key, html[0].innerHTML, reference);
                saveArrayOfImages(names, files, function (data) {
                    var go = false;
                    if (typeof data === "undefined") {
                        go = true;
                    } else if (data.val) {
                        go = true;
                    }
                    if (go) {
                        saveImageRegisters(imageRegisters);
                    }
                    loadHTML(document.getElementById("neContent-" + index), html[0].outerHTML, false);
                });
                var index = new Number(editorId.split("_")[2]);
                indexForEdit = index;
            };
            $scope.getViewerRows = function () {
                return new Array(Math.ceil($scope.images.length / 3));
            };
            $scope.showLocalImages = function () {
                getViewerImages();
            };
            $scope.showURLImages = function () {
                getViewerURLImages();
            };
            $scope.goTo = function (id, reference, elems) {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + reference + "selectById",
                    data: {id: id},
                    method: "POST",
                    dataType: "json"
                }).done(function (reponse) {
                    $rootScope.subElemData = [];
                    $rootScope.subRelatedElems = [];
                    $rootScope.subElems = elems;
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
            };
            $scope.setSelectedKey = function (key, i, content) {
                if (key !== null && content !== null) {
                    selectedKeys[key] = {
                        "selected": $scope.chkList[i],
                        "content": (selectedKeys[key]) ? selectedKeys[key].content : content
                    };
                }
                var elemIn = null;
                var elemOut = null;
                var isEditorIn = false;

                if ($scope.chkList[i]) {
                    elemIn = document.getElementById("eContent-" + i);
                    elemOut = document.getElementById("neContent-" + i);
                    isEditorIn = true;
                } else {
                    elemIn = document.getElementById("neContent-" + i);
                    elemOut = document.getElementById("eContent-" + i);
                }
                AnimationService.animate(
                        {in: elemIn, out: elemOut},
                        {in: "fade-in", out: "fade-out"},
                        false
                        );
                if (isEditorIn) {
                    showContentInEditor(elemOut.innerHTML, "editor_content_" + i);

                }
            };
            $scope.enterConsultMode = function (id, reference, event) {
                if (event) {
                    event.stopPropagation();
                }
                ConsultCarouselService.goTo(id, reference, null);
            };

            function showElemData(id) {
                if ($scope.drilldownIndvs.length > 0) {
                    $rootScope.elemData = [];
                    $rootScope.relatedElems = [];
                    $rootScope.elemTypeId = "";
                }
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + reference + "selectById",
                    method: "POST",
                    dataType: "json",
                    data: {id: id}
                }).done(function (elem) {
                    var reference = "";
                    if (elem !== null) {
                        Object.keys(elem).forEach(function (key) {
                            if (key !== "id") {
                                if (typeof elem[key] !== "object") {
                                    if (key === "reference") {
                                        reference = elem[key];
                                    }
                                    if (key !== "did") {
                                        $rootScope.elemData.push({key: key, content: elem[key]});
                                    }
                                } else {
                                    $rootScope.relatedElems.push({key: key, content: (typeof elem[key].length === "undefined" ? [elem[key]] : elem[key])});
                                }
                            } else {
                                $rootScope.elemTypeId = elem[key];
                            }
                        });
                        $rootScope.chkList = [];
                        $rootScope.chkList = GeneralService.getCheckedStructure();
                        $rootScope.selectedContext = document.getElementById("main-content-ontology-element");
                        $rootScope.ontologyElementSelected = true;
                        $rootScope.$apply();
                        AnimationService.animate(
                                {in: $rootScope.selectedContext, out: $("#main-content-drilldown")},
                                {in: "slide-in-left", out: "slide-out-right"},
                                false
                                );
                    }
                });
            }
            function getElemReference() {
                var reference = "";
                var obj = {};
                try {
                    $rootScope.elemData.forEach(function (elem) {
                        if (elem.key === "reference") {
                            reference = elem.content;
                        }
                    });
                } catch (obj) {
                }
                return reference;
            }
            function initTinyMCE(containerId) {
                var obj = {};
                var push = true;
                try {
                    $scope.tinyMCE.forEach(function (mce) {
                        if (mce.id === containerId) {
                            throw obj;
                        }
                    });
                } catch (obj) {
                    tinymce.EditorManager.execCommand('mceRemoveEditor', true, containerId);
                    push = false;
                }
                tinymce.init({
                    selector: "textarea#" + containerId,
                    plugins: "table textcolor",
                    toolbar: "table | forecolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | addImg",
                    menubar: false
                });
                if (push) {
                    $scope.tinyMCE.push({id: containerId});
                }

            }
            function showContentInEditor(data, containerId) {
                var container = document.getElementById(containerId);
                initTinyMCE(containerId);
                if (typeof data !== "undefined" && data.trim() !== "") {
                    if (data.trim().indexOf("</div>") < 0) {
                        loadHTML(container, data, true);
                    } else {
                        $timeout(function () {
                            tinymce.get(containerId).setContent("<div>" + data + "</div>")
                        }, false, 2000);
                    }
                } else {
                    $timeout(function () {
                        tinymce.get(containerId).setContent("<div>No existe contenido</div>")
                    }, false, 2000);
                }
            }
            function saveImageRegisters(registers) {
                var json = JSON.stringify(registers);
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/fileManager/saveData",
                    method: "POST",
                    data: {json: json}
                }).done(function (saved) {
                });

            }
            function getImagesAndPos(html) {
                var divs = html.find("div");
                var arr = [];
                var i = 0;
                var pos = 0;
                while (divs[i]) {
                    var spans = $(divs[i]).find("span");
                    var j = 0;
                    if (spans[j]) {
                        while (spans[j]) {
                            var span = $(spans[j]);
                            if (span.attr("img")) {
                                var trace = "";
                                while (!span.parent().is("div")) {
                                    span = span.parent();
                                    trace += span.prop("nodeName") + " ";
                                }
                                arr.push({
                                    pos: pos,
                                    name: $(spans[j]).attr("img"),
                                    trace: trace
                                });
                            }
                            j++;
                        }
                    } else {
                        pos--;
                    }
                    i++;
                    pos++;
                }
                return arr;
            }
            function saveChanges(key, content) {
                var cover = $("#cover-dont-do-anything");
                var pastContent = selectedKeys[key].content;
                var html1 = $(
                        pastContent.indexOf("<div") >= 0
                        ? pastContent
                        : "<div>" + pastContent + "</div>"
                        );
                var html2 = $(content);
                var go = true;

                if (html1[0].innerText.trim() === html2[0].innerText.trim()) {
                    var imagesPos1 = getImagesAndPos(html1);
                    var imagesPos2 = getImagesAndPos(html2);
                    if (imagesPos1.length === imagesPos2.length && imagesPos1.length === 0) {
                        go = false;
                    } else if (imagesPos1.length === imagesPos2.length) {
                        var i = 0;
                        while (imagesPos1[i]) {
                            if (
                                    imagesPos1[i].pos !== imagesPos2[i].pos ||
                                    imagesPos1[i].name !== imagesPos2[i].name ||
                                    imagesPos1[i].trace !== imagesPos2[i].trace
                                    ) {
                                break;
                            }
                            i++;
                        }
                        if (i === imagesPos1.length) {
                            go = false;
                        }
                    }
                }
                if (go) {
                    cover.show();
                    var date = new Date();
                    $.ajax({
                        url: "/" + window.location.pathname.split("/")[1] + "/change/insert",
                        method: "POST",
                        data: {
                            pastContent: selectedKeys[key].content,
                            newContent: content,
                            indvId: $rootScope.elemTypeId,
                            userID: $rootScope.user.id,
                            date: "" + date.getTime(),
                            dpChanged: key
                        }
                    }).done(function (id) {
                        if (typeof id !== "undefined" && id !== "") {
                            $.ajax({
                                url: "/" + window.location.pathname.split("/")[1] + "/change/updateChange",
                                method: "POST",
                                data: {
                                    id: id,
                                    indvID: $rootScope.elemTypeId,
                                    dp: key
                                }
                            }).done(function (error) {
                                cover.hide();
                            });
                        }
                    });

                }
                selectedKeys[key].content = content;
            }
            function saveConfiguration(key, content, reference) {
                var obj = {};
                obj["id"] = $rootScope.elemTypeId;
                $rootScope.elemData.forEach(function (elem) {
                    if (elem.key !== "reference") {
                        obj[elem.key] = elem.key === key ? content : "-_-";
                    }
                });
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + reference + "update",
                    method: "POST",
                    data: obj
                });
            }
            function loadHTML(container, html, isEditor) {
                html = $(html);
                if (html.length > 1) {
                    var newHtml = $("<div>");
                    $.each(html, function (i, elem) {
                        newHtml.append(elem);
                    });
                    html = newHtml;
                }
                var images = ImageService.getImages(html);
                imagesForSearching = images.length;
                images.forEach(function (img) {
                    searchImage(html, container, img, isEditor);
                });
                if (!isEditor) {
                    $(container).html(html.prop("outerHTML"));
                } else {
                    tinymce.get(container.id).setContent(html.prop("outerHTML"));
                }
                if (imagesForSearching === 0) {
                    $timeout(function () {
                        $scope.chkList[indexForEdit] = false;
                        $scope.setSelectedKey(null, indexForEdit, null);
                        indexForEdit = -1;
                    }, false, 500);
                }
            }
            function getViewerImages() {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/downloader/getAllImagesNames",
                    method: "POST",
                    dataType: "json"
                }).done(function (response) {
                    if (typeof response.error === "undefined") {
                        $(document.getElementById("ontoelem-li-local")).addClass("menu-bar-selected");
                        $(document.getElementById("ontoelem-li-url")).removeClass("menu-bar-selected");
                        $scope.type = "local";
                        $scope.images = [];
                        $rootScope.$apply();
                        setImagesInViewer(response, 0);
                    }
                });
            }
            function getViewerURLImages() {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/downloader/getAllURLImages",
                    method: "POST",
                    dataType: "json"
                }).done(function (response) {
                    if (typeof response.error === "undefined") {
                        $(document.getElementById("ontoelem-li-url")).addClass("menu-bar-selected");
                        $(document.getElementById("ontoelem-li-local")).removeClass("menu-bar-selected");
                        $scope.type = "url";
                        $scope.images = [];
                        urlImages = [];
                        $rootScope.$apply();
                        response.forEach(function (r) {
                            urlImages.push(r);
                        });
                        setURLImagesInViewer();
                    } else {
                        FoundationApi.publish("main-rename-notifications", {
                            title: 'Atención!!!',
                            content: 'No se encontraron imágenes por URL',
                            position: "bottom-right", color: "dark",
                            autoclose: "3000"});
                    }
                });
            }
            function setURLImagesInViewer() {
                var i = 0;
                while (urlImages[i]) {
                    addURLImage(urlImages[i]);
                    i++;
                }

            }
            function addURLImage(img) {
                var elem = $(img.content);
                var image = $("<img>");
                image.attr({"src": elem.attr("url"), "name": elem.attr("img")});
                image.load(function () {
                    $scope.images.push({
                        name: image.attr("name"),
                        base64: image.attr("src"),
                        resolution: image[0].width + "x" + image[0].height
                    });
                    $scope.$apply();
                    AnimationService.animateIn(
                            document.getElementById("div-" + image.attr("name")),
                            "fade-in",
                            false
                            );
                });
            }
            function setImagesInViewer(images, i) {
                if (typeof images[i] !== "undefined") {
                    $.ajax({
                        url: "/" + window.location.pathname.split("/")[1] + "/downloader/getImage",
                        data: {name: images[i].name},
                        method: "POST",
                        dataType: "json"
                    }).done(function (image) {
                        $scope.images.push(image);
                        $scope.$apply();
                        AnimationService.animateIn(
                                document.getElementById("div-" + image.name),
                                "fade-in",
                                false
                                );
                        i++;
                        setImagesInViewer(images, i);
                    });

                }
            }
            function getImages(html) {
                var images = [];
                html.find("span").each(function (i, span) {
                    if (span.attributes[0].localName === "img") {
                        images.push(span);
                    }
                });
                return images;
            }
            function searchImage(html, container, img, isEditor) {
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
                            imagesForSearching--;
                            if (imagesForSearching === 0) {
                                $timeout(function () {
                                    $scope.chkList[indexForEdit] = false;
                                    $scope.setSelectedKey(null, indexForEdit, null);
                                    indexForEdit = -1;
                                }, false, 2000);
                            }
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
                        imagesForSearching--;
                        if (imagesForSearching === 0) {
                            $timeout(function () {
                                $scope.chkList[indexForEdit] = false;
                                $scope.setSelectedKey(null, indexForEdit, null);
                                indexForEdit = -1;
                            }, false, 2000);
                        }
                    }
                }
            }
            function saveArrayOfImages(names, files, cb) {
                var j = 0;
                for (var i = 0; i < files.length; i++) {
                    if (files[i] !== null) {
                        var frmData = new FormData();
                        frmData.append("name", names[i]);
                        frmData.append("file", files[i]);

                        $.ajax({
                            url: "/" + window.location.pathname.split("/")[1] + "/uploader/uploadFile",
                            contentType: false,
                            data: frmData,
                            dataType: "json",
                            method: "POST",
                            processData: false
                        }).done(function (data) {
                            cb(data);
                        });
                    } else {
                        j++;
                    }
                }
                if (j === files.length) {
                    cb();
                }
            }
            function dataURIToBlob(data) {
                var byteString;
                if (data.split(',')[0].indexOf('base64') >= 0)
                    byteString = atob(data.split(',')[1]);
                else
                    byteString = unescape(data.split(',')[1]);

                var mimeString = data.split(',')[0].split(':')[1].split(';')[0];

                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                return new Blob([ia], {type: mimeString});
            }

        }]);
    module.directive("pdirecOntoelem", function () {
        return {
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/ontology-element.html",
            restrict: "E",
            replace: "true"
        };
    });

})(window.angular);



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


(function (angular) {
    var module = angular.module("pmodResources", []);
    module.controller("pctrlResources", [
        "$scope", "$rootScope", "FoundationApi", "AnimationService",
        function ($scope, $rootScope, FoundationApi, AnimationService) {
            var selectedImage = null;
            var page = 1;
            var nPages = 0;
            var count = 0;
            var name = "";
            var urlImages = [];
            $scope.images = [];
            $scope.type = null;

            $scope.getPages = function (n) {
                if (typeof $rootScope.rImages !== "undefined") {
                    nPages = Math.ceil($rootScope.rImages.length / n);
                    return new Array(nPages);
                }
                return [];
            };
            $scope.getImageInPos = function (row, col, n) {
                if ($scope.images.length > 0) {
                    return $scope.images[(row * n - (n - col)) - 1];
                }
            };
            $scope.selectedImage = function (id) {
                var cover = $(document.getElementById(id));
                cover.show();
                if (selectedImage !== null) {
                    $(document.getElementById(selectedImage)).hide();
                }
                selectedImage = id;
                name = id.split("-")[2];
            };
            $scope.showImagesForPage = function (p, max) {
                var context = document.getElementById("main-content-resources");
                $(context).find("span[name=page-" + page + "]")
                        .removeClass("secondary").addClass("dark");
                page = p;
                $scope.images = [];
                var pos = (page - 1) * max;
                if ($scope.type === "local") {
                    setImagesInViewer(pos, max, pos);
                } else {
                    setURLImagesInViewer(pos, max, pos);
                }
                $(context).find("span[name=page-" + page + "]").
                        addClass("secondary").removeClass("dark");
            };
            $scope.existPrevious = function () {
                var exists = false;
                if (typeof $rootScope.rImages !== "undefined") {
                    return page !== 1 && page <= nPages;
                }
                return exists;
            };
            $scope.existNext = function () {
                var exists = false;
                if (typeof $rootScope.rImages !== "undefined") {
                    return page < nPages;
                }
                return exists;
            };
            $scope.showPrevious = function (max) {
                var context = document.getElementById("main-content-resources");
                $(context).find("span[name=page-" + page + "]")
                        .removeClass("secondary").addClass("dark");
                page--;
                $scope.images = [];
                var pos = (page - 1) * max;
                if ($scope.type === "local") {
                    setImagesInViewer(pos, max, pos);
                } else {
                    setURLImagesInViewer(pos, max, pos);
                }
                $(context).find("span[name=page-" + page + "]").
                        addClass("secondary").removeClass("dark");
            };
            $scope.showNext = function (max) {
                var context = document.getElementById("main-content-resources");
                $(context).find("span[name=page-" + page + "]")
                        .removeClass("secondary").addClass("dark");
                page++;
                $scope.images = [];
                var pos = (page - 1) * max;
                if ($scope.type === "local") {
                    setImagesInViewer(pos, max, pos);
                } else {
                    setURLImagesInViewer(pos, max, pos);
                }
                $(context).find("span[name=page-" + page + "]").
                        addClass("secondary").removeClass("dark");
            };
            $scope.deleteImage = function (limit) {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/fileManager/deleteFile",
                    method: "POST",
                    data: {name: name, type: $scope.type}
                }).done(function (response) {
                    if (response) {
                        $scope.images = [];
                        if ($scope.type === "local") {
                            getViewerImages(1, limit, $scope.showImagesForPage);
                        } else if ($scope.type === "url") {
                            getViewerURLImages(1, limit, $scope.showImagesForPage);
                        }
                    }
                });
            };
            $scope.updateImage = function (limit, event) {
                if (event) {
                    event.stopPropagation();
                }
                var elem = document.getElementById("input-new-name");
                if (elem.value === "") {
                    FoundationApi.publish("main-rename-notifications", {
                        title: 'Atención!!!',
                        content: 'Debe ingFoundatresar un nuevo nombre',
                        position: "bottom-right", color: "dark",
                        autoclose: "3000"});
                } else {
                    $.ajax({
                        url: "/" + window.location.pathname.split("/")[1] + "/fileManager/updateFile",
                        method: "POST",
                        data: {name: name, nName: elem.value, type: $scope.type}
                    }).done(function (response) {
                        if (response) {
                            $scope.images = [];
                            if ($scope.type === "local") {
                                getViewerImages(1, limit, $scope.showImagesForPage);
                            } else if ($scope.type === "url") {
                                getViewerURLImages(1, limit, 0, $scope.showImagesForPage);
                            }
                        }
                    });
                    FoundationApi.closeActiveElements();
                    $scope.nName = "";
                }
            };
            $scope.showLocalImages = function (i, limit) {
                getViewerImages(i, limit, $scope.showImagesForPage);
            };
            $scope.showURLImages = function (i, limit) {
                getViewerURLImages(i, limit, $scope.showImagesForPage);
            };
            $scope.$watchCollection("rImages", function (ol, nl) {
                if ($rootScope.rImages && $rootScope.rImagesDoCount === 0) {
                    $scope.type = null;
                    $scope.images = [];
                    FoundationApi.closeActiveElements();
                    setImagesInViewer(0, 6, 0);
                    $rootScope.rImagesDoCount++;
                }
            });

            function setImagesInViewer(i, limit, cons) {
                if (i < limit + cons) {
                    if (typeof $rootScope.rImages !== "undefined") {
                        var images = $rootScope.rImages;
                        if (typeof images[i] !== "undefined") {
                            $.ajax({
                                url: "/" + window.location.pathname.split("/")[1] + "/downloader/getImage",
                                data: {name: images[i].name},
                                method: "POST",
                                dataType: "json"
                            }).done(function (image) {
                                $scope.images.push(image);
                                $rootScope.$apply();
                                i++;
                                AnimationService.animateIn(
                                        document.getElementById("r-div-" + image.name),
                                        "fade-in",
                                        false
                                        );
                                setImagesInViewer(i, limit, cons);
                            });

                        }
                    }

                }
            }
            function getViewerImages(i, limit, cb) {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/downloader/getAllImagesNames",
                    method: "POST",
                    dataType: "json"
                }).done(function (response) {
                    if (typeof response.error === "undefined") {
                        $(document.getElementById("ontoelem-li-local")).addClass("menu-bar-selected");
                        $(document.getElementById("ontoelem-li-url")).removeClass("menu-bar-selected");
                        $scope.type = "local";
                        $rootScope.rImages = response;
                        $scope.images = [];
                        $rootScope.$apply();
                        cb(i, limit);
                    } else {
                        FoundationApi.publish("main-rename-notifications", {
                            title: 'Atención!!!',
                            content: 'No se encontraron imágenes locales',
                            position: "bottom-right", color: "dark",
                            autoclose: "3000"});
                    }
                });
            }
            function getViewerURLImages(i, limit, cb) {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/downloader/getAllURLImages",
                    method: "POST",
                    dataType: "json"
                }).done(function (response) {
                    if (typeof response.error === "undefined") {
                        $(document.getElementById("resources-li-url")).addClass("menu-bar-selected");
                        $(document.getElementById("resources-li-local")).removeClass("menu-bar-selected");
                        $scope.type = "url";
                        $scope.images = [];
                        $rootScope.rImages = [];
                        urlImages = [];
                        $rootScope.$apply();
                        response.forEach(function (r) {
                            $rootScope.rImages.push(r.name);
                            urlImages.push(r);
                        });
                        $rootScope.$apply();
                        cb(i, limit);
                    } else {
                        FoundationApi.publish("main-rename-notifications", {
                            title: 'Atención!!!',
                            content: 'No se encontraron imágenes por URL',
                            position: "bottom-right", color: "dark",
                            autoclose: "3000"});
                    }
                });
            }
            function setURLImagesInViewer(pos, limit, cons) {
                var i = pos;
                var obj = {};
                try {
                    while (i < limit + cons) {
                        if (urlImages[i]) {
                            addURLImage(urlImages[i]);
                            i++;
                        } else {
                            throw obj;
                        }
                    }
                } catch (obj) {
                }
            }
            function addURLImage(img) {
                var elem = $(img.content);
                var image = $("<img>");
                image.attr({"src": elem.attr("url"), "name": elem.attr("img")});
                image.load(function () {
                    $scope.images.push({
                        name: image.attr("name"),
                        base64: image.attr("src"),
                        resolution: image[0].width + "x" + image[0].height
                    });
                    $rootScope.$apply();
                    setTimeout(function () {
                        AnimationService.animateIn(
                                document.getElementById("r-div-" + image.attr("name")),
                                "fade-in",
                                false
                                );
                    }, 500);
                });
            }
        }]);
    module.directive("pdirecResources", function () {
        return {
            replace: "true",
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/resources.html",
            restrict: "E"
        };
    });
})(window.angular);


(function (angular) {
    var module = angular.module("pmod-wiki-main", [
        "pmod-drilldown",
        "pmod-ontology-element",
        "pmodResources",
        "pmodDcsAltMap",
        "pmodGraph",
        "pmodAdmin",
        "pmodAnimationServices",
        "pmodTranslatorServices",
        "pmodGeneralService",
        "pmodActionListService",
        "pmodImageService",
        "pmodConsultCarouselService"
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
                AnimationService.animate(
                        {in: $("#main-content-drilldown"), out: $rootScope.selectedContext},
                        {in: "slide-in-left", out: "slide-out-right"},
                        true
                        );
                $rootScope.selectedContext = $("#main-content-drilldown");
                $timeout(function () {
                    $rootScope.$apply();
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
                AnimationService.animate(
                        {in: $("#main-content-graph"), out: $rootScope.selectedContext},
                        {in: "slide-in-left", out: "slide-out-right"},
                        true
                        );
                $rootScope.selectedContext = $("#main-content-graph");
                $timeout(function () {
                    $rootScope.$apply();
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
                AnimationService.animate(
                        {in: $("#main-content-dcsAltMap"), out: $rootScope.selectedContext},
                        {in: "slide-in-left", out: "slide-out-right"},
                        true
                        );
                $rootScope.selectedContext = $("#main-content-dcsAltMap");
                $timeout(function () {
                    $rootScope.$apply();
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
                AnimationService.animate(
                        {in: $("#main-content-resources"), out: $rootScope.selectedContext},
                        {in: "slide-in-left", out: "slide-out-right"},
                        true
                        );
                $rootScope.selectedContext = $("#main-content-resources");
                $timeout(function () {
                    $rootScope.$apply();
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
                AnimationService.animate(
                        {in: $("#main-content-admin"), out: $rootScope.selectedContext},
                        {in: "slide-in-left", out: "slide-out-right"},
                        true
                        );
                $rootScope.selectedContext = $("#main-content-admin");
                $timeout(function () {
                    $rootScope.$apply();
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
