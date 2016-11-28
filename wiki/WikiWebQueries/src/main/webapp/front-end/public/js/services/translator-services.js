(function (angular) {
    var module = angular.module("pmodTranslatorServices", []);

    module.service("TranslatorService", function () {
        var dictionary = {
            relatedDecisions: "Decisiones relacionadas",
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
            linkAlternative: "Alternativas evaluadas",
            rationale: "Razón o justificación",
            content: "Información relacionada",
            description: "Descripción",
            name: "Nombre",
            source: "Fuento u origen",
            concern: "Preocupación o interés",
            keyword: "Palabras clave",
            "arguments": "Argumentos",
            type:"Tipo",
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
            "/Artifact/": "Artefacto",
            "/Views/": "Vista",
            "InformationView": "Vistas de Información",
            "FunctionalView": "Vistas Funcionales",
            "ContextView": "Vistas de Contexto",
            "DeploymentView": "Vistas de Despliegue",
            "ConcurrenceView": "Vistas de Concurrencia"            
        };

        this.translate = function (key) {
            var content = dictionary[key];
            return typeof content !== "undefined" ? content : null;
        };
    });
})(window.angular);

