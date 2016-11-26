(function (angular) {
    var module = angular.module("pmodConsultCarouselService", []);
    module.service("ConsultCarouselService", [
        "$rootScope",
        "AnimationService",
        "QuickActionListService",
        "TranslatorService",
        "GeneralService",
        function ($rootScope, AnimationService, QuickActionListService, TranslatorService, GeneralService) {
            this.goTo = function (id, reference, elemOut, cb, before) {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + reference + "selectById",
                    method: "POST",
                    dataType: "json",
                    data: {id: id}
                }).done(function (elem) {
                    if (elem !== null) {
                        if (before) {
                            cb();
                            $rootScope.$apply();
                        }
                        $rootScope.elemData = [];
                        $rootScope.relatedElems = [];
                        $rootScope.elemTypeId = "";
                        $rootScope.ontologyElementSelected = false;
                        $rootScope.$apply();
                        Object.keys(elem).forEach(function (key) {
                            if (key !== "id") {
                                if (key === "reference") {
                                    $rootScope.actualReference = elem[key];
                                }
                                if (typeof elem[key] !== "object") {
                                    $rootScope.elemData.push({key: key, content: elem[key]});
                                } else {
                                    $rootScope.relatedElems.push({key: key, content: (typeof elem[key].length === "undefined" ? [elem[key]] : elem[key])});
                                }
                            } else {
                                $rootScope.elemTypeId = elem[key];
                            }
                        });
                        $rootScope.ontologyElementSelected = true;
                        $rootScope.chkList = GeneralService.getCheckedStructure();
                        $rootScope.selectedContext = document.getElementById("main-content-ontology-element");
                        $rootScope.$apply();
                        AnimationService.animate(
                                {in: $rootScope.selectedContext, out: elemOut},
                                {in: "fade-in", out: "fade-out"},
                                false
                                );
                        QuickActionListService.addAction(
                                "action:" + $rootScope.elemTypeId,
                                "/" + window.location.pathname.split("/")[1] + reference + "selectById",
                                TranslatorService.translate(reference) + " " + $rootScope.elemTypeId,
                                reference.replace("/", "").replace("/", "").toLowerCase());

                        if (!before && cb) {
                            cb();
                            $rootScope.$apply();
                        }
                    }
                });
            };
            this.openModal = function (id, reference, elems, cb) {
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
                    if (cb) {
                        cb();
                        $rootScope.$apply();
                    }
                });
            };
        }
    ]);
})(window.angular);


