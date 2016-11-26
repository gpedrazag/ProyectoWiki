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
                "Evaluaciones", "Requerimientos Funcionales", "Responsables", "Vistas"
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
            $scope.translate = function(key) {
                
            };
        }]).directive("pdirecDrilldown", function () {
        return {
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/drilldown.html",
            restrict: "E",
            replace: "true"
        };
    });

})(window.angular);
