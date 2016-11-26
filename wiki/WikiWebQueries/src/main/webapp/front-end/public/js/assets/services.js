(function (angular) {
    var module = angular.module("pmodActionListService",[]);
    module.service("QuickActionListService", [
        "$rootScope", 
        "FoundationApi", 
        "AnimationService", 
        "GeneralService", 
        function ($rootScope, FoundationApi, AnimationService, GeneralService) {
            this.addAction = function (id, url, description, elementType) {
                var go = true;
                $rootScope.actions.forEach(function (action) {
                    if (action.id === id) {
                        go = false;
                    }
                });
                if (go) {
                    $rootScope.actions.push({
                        id: id,
                        description: description,
                        do: function (event) {
                            if (event) {
                                event.stopPropagation();
                            }
                            $.ajax({
                                url: url,
                                method: "POST",
                                dataType: "json",
                                data: {id: id.split(":")[1]}
                            }).done(function (response) {
                                $rootScope.elemData = [];
                                $rootScope.relatedElems = [];
                                $rootScope.subElemData = [];
                                $rootScope.subRelatedElems = [];
                                $rootScope.elemTypeId = "";
                                $rootScope.ontologyElementSelected = false;
                                $rootScope.$apply();
                                Object.keys(response).forEach(function (key) {
                                    if (key !== "id") {
                                        if (key === "reference") {
                                            $rootScope.actualReference = response[key];
                                        }
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
                                $rootScope.elemType = elementType;
                                $rootScope.ontologyElementSelected = true;
                                $rootScope.$apply();
                                AnimationService.animate(
                                        {in: $("#main-content-ontology-element"), out: $rootScope.selectedContext},
                                        {in: "fade-in", out: "fade-out"},
                                        true
                                        );
                                $rootScope.selectedContext = document.getElementById("main-content-ontology-element");
                                FoundationApi.closeActiveElements();
                            });
                        }
                    });
                }
            };            
        }]);
})(window.angular);


(function (angular) {
    var module = angular.module("pmodAnimationServices", []);
    module.service("AnimationService", function () {
        this.animate = function (elems, animations, all, visibleChildrens) {
            visibleChildrens = visibleChildrens | true;
            if (elems.in !== null && typeof elems.in[0] === "undefined") {
                elems.in = [elems.in];
            }
            if (elems.out !== null && typeof elems.out[0] === "undefined") {
                elems.out = [elems.out];
            }
            if (elems.out !== null || elems.in !== null) {
                if (elems.out === null) {
                    animateIn(elems.in, animations.in, all, visibleChildrens);
                } else if (elems.in === null) {
                    animateOut(elems.out, animations.out, all);
                } else {
                    animateOut(elems.out, animations.out, all, function () {
                        animateIn(elems.in, animations.in, all, visibleChildrens);
                    });
                }
            }
        };

        this.animateIn = function (elem, animation, all, visibleChildrens) {
            visibleChildrens = visibleChildrens | true;
            $(elem).show();
            if (visibleChildrens) {
                $(elem).children().show();
            }
            MotionUI.animateIn(all ? document.getElementById("content") : elem, animation);
        };

        this.animateOut = function (elem, animation, all, cb) {
            MotionUI.animateOut(all ? document.getElementById("content") : elem, animation, function () {
                $(elem).hide();
                $(elem).children().hide();
                if (typeof cb !== "undefined") {
                    cb();
                }
            });
        };
        
        var animateIn = this.animateIn;
        var animateOut = this.animateOut;
    });    
})(window.angular);


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



(function (angular) {
    var module = angular.module("pmodGeneralService", []);
    module.service("GeneralService", [
        "$rootScope",
        "AnimationService",
        "TranslatorService",
        function ($rootScope, AnimationService, QuickActionListService, TranslatorService) {
            this.getCheckedStructure = function () {
                var arr = [];
                $rootScope.elemData.forEach(function (data) {
                    arr.push(false);
                });
                return arr;
            };

            
            var getCheckedStructure = this.getCheckedStructure;
        }]);
})(window.angular);



(function (angular) {
    var module = angular.module("pmodImageService", []);
    module.service("ImageService", function ($rootScope) {            
            this.loadHTML = function(container, html, $scope) {
                html = $("<div style='width:100%'>" + $(html)[0].outerHTML + "</div>");
                var images = getImages(html);
                html = $(html);
                images.forEach(function (img) {
                    searchImage(html, container, img, $scope);
                });
                $(container).html(html.prop("outerHTML"));
            };
            
            this.getImages = function(html) {
                var images = [];
                html.find("span").each(function (i, span) {
                    if (span.attributes[0].localName === "img") {
                        images.push(span);
                    }
                });
                return images;
            };
            
            this.searchImage = function(html, container, img, $scope) {
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
            };
            
            var getImages = this.getImages;
            var searchImage = this.searchImage;
        });
})(window.angular);



(function (angular) {
    var module = angular.module("pmodTranslatorServices", []);
        
    module.service("TranslatorService", function () {
        var dictionary = {
            haveEvaluation: "Evaluaciones realizadas",
            haveDecisions: "Decisiones tomadas",
            describedByQA: "Atributos de calidad que influenciaron",
            describedByFR: "Requerimientos funcionales que influenciaron",
            linkedEvaluations: "Evaluaciones que siguien el criterio",
            mayHaveConstraints: "Restricciones consideradas",
            haveCriterias: "Criterios considerados",
            mayHaveAssumptions: "Supuestos que se tomaron en cuenta",
            haveAsTriggerConcerns: "Concerns que influenciaron a la toma de la decisión",
            haveResponsibles: "Responsables de tomar la decisión",
            descomposeInDecisions: "Decisiones que la componen",
            notCompatibleToDecisions: "Decisiones no compatibles",
            haveAlternatives: "Alternativas consideradas",
            triggerArtifacts: "Artefactos que se crearon para satisfacer el atributo de calidad",
            decisions: "Decisiones tomadas por el responsable",
            relatedArtifacts: "Artefactos que componen la arquitectura",
            relatedDecisions: "Decisiones relacionadas a la arquitectura",
            linkAlternative: "Alternativas evaluadas",
            rationale: "Razón o justificación",
            description: "Descripción",
            name: "Nombre",
            source: "Fuento u origen",
            concern: "Preocupación o interés",
            keyword: "Palabras clave",
            "arguments": "Argumentos",
            state: "Estado",
            pros: "Pros",
            cons: "Contras",
            valoration: "Valoración",
            actor: "Actor",
            input: "Entrada",
            output: "Salida",
            utility: "Utilidad",
            expectative: "Expectativas",
            response: "Respuesta",
            context: "Contenxto",
            boost: "Impulso",
            boostSource: "Origen del Impulso",
            context: "Contexto",
                    measure: "Medida",
            "/Alternative/": "Alternativa",
            "/Assumption/": "Supuesto",
            "/Concern/": "Concern",
            "/Constraint/": "Restricción",
            "/Criteria/": "Criterio",
            "/Decision/": "Decisión",
            "/Evaluation/": "Evaluación",
            "/FunctionalRequeriment/": "Requerimiento Funcional",
            "/QualityAttributeStage/": "Atributo de Calidad",
            "/Responsible/": "Responsable",
            "/SoftwareArchitecture/": "Arquitectura de Software",
            "/Artifact/": "Artefacto"
        };

        this.translate = function (key) {
            var content = dictionary[key];
            return typeof content !== "undefined" ? content : null;
        };
    });
})(window.angular);

