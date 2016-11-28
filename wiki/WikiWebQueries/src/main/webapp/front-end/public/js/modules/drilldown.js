(function (angular) {
    var module = angular.module("pmod-drilldown", []);
    module.controller("pctrl-drilldown", [
        "$scope",
        "$filter",
        "$rootScope",
        "QuickActionListService",
        "AnimationService",
        "TranslatorService",
        "GeneralService",
        "$timeout",
        function ($scope, $filter, $rootScope, QuickActionListService, AnimationService, TranslatorService, GeneralService, $timeout) {
            var url = "";
            $scope.haveSolutions = {};
            $scope.drilldownIndvs = [];
            $rootScope.elemData = [];
            $rootScope.relatedElems = [];
            $scope.list = [
                "Alternativas", "Arquitecturas de Software", "Artefactos",
                "Atributos de Calidad", "Criterios", "Decisiones",
                "Evaluaciones", "Requerimientos Funcionales", "Responsables", "Vistas"
            ];
            $scope.viewsData = [];

            $scope.do = function (i, event) {
                if (event) {
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
                } else if (i === 9) {
                    url = "/" + window.location.pathname.split("/")[1] + "/Views/selectAll";
                    $rootScope.elemType = "views";
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
                        $scope.drilldownIndvs = [];
                        $scope.viewsData = [];
                        $rootScope.$apply();
                        $scope.drilldownIndvs = $filter("orderBy")(data, "id");
                        i = $scope.drilldownIndvs.length;
                        if ($rootScope.elemType === "views") {
                            setViewData(0);
                        } else {
                            $rootScope.$apply();
                        }

                    }
                });
            };

            $scope.showElemData = function (id, elem, pos) {
                if ($scope.drilldownIndvs.length > 0) {
                    $rootScope.elemData = [];
                    $rootScope.relatedElems = [];
                    $rootScope.elemTypeId = "";
                }
                if (elem) {
                    $timeout(function () {
                       $rootScope.rDrilldownIndvs = $scope.viewsData[pos];
                       $rootScope.viewDataType = $scope.viewsData[pos][0].type;
                       setElemsData(elem);
                    }, false, 500);
                } else {
                    var nurl = url.split("/");
                    nurl = "/" + nurl[1] + "/" + nurl[2] + "/selectById";
                    $.ajax({
                        url: nurl,
                        method: "POST",
                        dataType: "json",
                        data: {id: id}
                    }).done(function (response) {
                        $rootScope.rDrilldownIndvs = $scope.drilldownIndvs;
                        setElemsData(response);
                    });
                }
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
            $scope.translate = function (key) {
                return TranslatorService.translate(key);
            };
            $scope.getViewName = function (name) {
                return (name.trim() === "") ? "Nombre no asignado" : getRelatedElemsVisibleContent(name);
            };
            $scope.getElemName = function(elem) {
                var content = "";
                var def = "No tiene nombre o descripción asignada";
                if(elem) {
                    if(elem.name) {
                        content = (elem.name.trim() === "") ? def : getRelatedElemsVisibleContent(elem.name);
                    } else if(elem.description) {
                        content = (elem.description.trim() === "") ? def : getRelatedElemsVisibleContent(elem.description);
                    }
                }
                return content;
            };
            
            function getRelatedElemsVisibleContent(content) {
                if(content.trim().indexOf("</div>") >= 0) {
                    content = $(content)[0].innerText;
                }
                return content;
            };

            function setViewData(i) {
                if (i < $scope.drilldownIndvs.length) {
                    $.ajax({
                        url: "/" + window.location.pathname.split("/")[1] + "/Views/selectByType",
                        method: "POST",
                        data: {type: $scope.drilldownIndvs[i]},
                        dataType: "json"
                    }).done(function (data) {
                        $scope.viewsData.push(data);
                        i = i + 1;
                        setViewData(i)
                    });
                } else {
                    $timeout(function () {
                        $scope.$apply();
                    }, false, 500);
                }
            }

            function setElemsData(elem) {
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
                            true
                            );
                    QuickActionListService.addAction(
                            "action:" + $rootScope.elemTypeId,
                            "/" + window.location.pathname.split("/")[1] + reference + "selectById",
                            TranslatorService.translate(reference) + " " + $rootScope.elemTypeId,
                            $rootScope.elemType);
                }
            }

        }]).directive("pdirecDrilldown", function () {
        return {
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/drilldown.html",
            restrict: "E",
            replace: "true"
        };
    });

})(window.angular);
