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
    "/Artifact/":"Artefacto"
};

function translate(key) {
    var content = dictionary[key];
    return typeof content !== "undefined" ? content : null;
}

function animate(elems, animations, all) {
    if (elems.in !== null && typeof elems.in[0] === "undefined") {
        elems.in = [elems.in];
    }
    if (elems.out !== null && typeof elems.out[0] === "undefined") {
        elems.out = [elems.out];
    }
    if (elems.out !== null || elems.in !== null) {
        if (elems.out === null) {
            animateIn(elems.in, animations.in, all);
        } else if (elems.in === null) {
            animateOut(elems.out, animations.out, all);
        } else if (elems.in[0].id !== elems.out[0].id) {
            animateOut(elems.out, animations.out, all, function () {
                animateIn(elems.in, animations.in, all);
            });
        }
    }
}

function animateIn(elem, animation, all) {
    $(elem).show();
    $(elem).children().show();
    MotionUI.animateIn(all ? document.getElementById("content") : elem, animation);
}

function animateOut(elem, animation, all, cb) {
    MotionUI.animateOut(all ? document.getElementById("content") : elem, animation, function () {
        $(elem).hide();
        $(elem).children().hide();
        if (typeof cb !== "undefined") {
            cb();
        }
    });
}
