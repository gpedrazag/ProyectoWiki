$(document).ready(function () {

    var alt = [{"id": "1", "name": "Alternativa  1"}, {"id": "2", "name": "Alternativa  2"}, {"id": "3", "name": "Alternativa  3"}, {"id": "4", "name": "Alternativa  4"}];
    var arqsoft = [{"id": "1", "name": " Arquitectura de software 1"}, {"id": "2", "name": " Arquitectura de software 2"}, {"id": "3", "name": " Arquitectura de software 3"}, {"id": "4", "name": " Arquitectura de software 4"}];
    var art = [{"id": "1", "name": "Artefacto 1"}, {"id": "2", "name": "Artefacto 2"}, {"id": "3", "name": "Artefacto 3"}, {"id": "4", "name": "Artefacto 4"}];
    var asu = [{"id": "1", "name": "Asunto  1"}, {"id": "2", "name": "Asunto  2"}, {"id": "3", "name": "Asunto  3"}, {"id": "4", "name": "Asunto  4"}];
    var atrical = [{"id": "1", "name": "Atributo de Calidad 1"}, {"id": "2", "name": "Atributo de Calidad 2"}, {"id": "3", "name": "Atributo de Calidad 3"}, {"id": "4", "name": "Atributo de Calidad 4"}];
    var cri = [{"id": "1", "name": "Criterio 1"}, {"id": "2", "name": "Criterio 2"}, {"id": "3", "name": "Criterio 3"}, {"id": "4", "name": "Criterio 4"}];
    var des = [{"id": "1", "name": "Desicion 1"}, {"id": "2", "name": "Desicion 2"}, {"id": "3", "name": "Desicion 3"}, {"id": "4", "name": "Desicion 4"}];
    var eval = [{"id": "1", "name": "Evaluacion 1"}, {"id": "2", "name": "Evaluacion 2"}, {"id": "3", "name": "Evaluacion 3"}, {"id": "4", "name": "Evaluacion 4"}];
    var reffunc = [{"id": "1", "name": "Requerimiento funcional 1"}, {"id": "2", "name": "Requerimiento funcional 2"}, {"id": "3", "name": "Requerimiento funcional 3"}, {"id": "4", "name": "Requerimiento funcional 4"}];
    var resp = [{"id": "1", "name": "Responsable 1"}, {"id": "2", "name": "Responsable 2"}, {"id": "3", "name": "Responsable 3"}, {"id": "4", "name": "Responsable 4"}];
    var rest = [{"id": "1", "name": "Restricción 1"}, {"id": "2", "name": "Restricción 2"}, {"id": "3", "name": "Restricción 3"}, {"id": "4", "name": "Restricción 4"}];
    var sol = [{"id": "1", "name": "Solucion 1"}, {"id": "2", "name": "Solucion 2"}, {"id": "3", "name": "Solucion 3"}, {"id": "4", "name": "Solucion 4"}];
    var supo = [{"id": "1", "name": "Suposición 1"}, {"id": "2", "name": "Suposición 2"}, {"id": "3", "name": "Suposición 3"}, {"id": "4", "name": "Suposición 4"}];

    $("#c-1").on("click", eventCreate);
    $("#c-2").on("click", eventCreate);
    $("#c-3").on("click", eventCreate);
    $("#c-4").on("click", eventCreate);
    $("#c-5").on("click", eventCreate);
    $("#c-6").on("click", eventCreate);
    $("#c-7").on("click", eventCreate);
    $("#c-8").on("click", eventCreate);
    $("#c-9").on("click", eventCreate);
    $("#c-10").on("click", eventCreate);
    $("#c-11").on("click", eventCreate);
    $("#c-12").on("click", eventCreate);
    $("#c-13").on("click", eventCreate);


    function eventCreate() {

        var id = $(this).attr("id");
        $("<div>").wikiCrearAlternativa(des, sol, eval, id);
        $("<div>").wikiCrearArquitectura(art, des, id);
        $("<div>").wikiCrearArtefacto(atrical, arqsoft, des, id);
        $("<div>").wikiCrearAsunto(des, atrical, reffunc, id);
        $("<div>").wikiCrearAtrCalidad(art, asu, id);
        $("<div>").wikiCrearCriterio(des, eval, id);
        $("<div>").wikiCrearDecision(des, arqsoft, resp, asu, cri, supo, rest, sol, alt, art, id);
        $("<div>").wikiCrearEvaluacion(alt, cri, id);
        $("<div>").wikiCrearRequerimientoFuncional(asu, id);
        $("<div>").wikiCrearResponsable(des, id);
        $("<div>").wikiCrearRestriccion(des, id);
        $("<div>").wikiCrearSolucion(alt, des, id);
        $("<div>").wikiCrearSuposicion(des, id);

    }



});


