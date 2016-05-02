$(document).ready(function () {

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

    $("#m-1").on("click", eventModify);
    $("#m-2").on("click", eventModify);
    $("#m-3").on("click", eventModify);
    $("#m-4").on("click", eventModify);
    $("#m-5").on("click", eventModify);
    $("#m-6").on("click", eventModify);
    $("#m-7").on("click", eventModify);
    $("#m-8").on("click", eventModify);
    $("#m-9").on("click", eventModify);
    $("#m-10").on("click", eventModify);
    $("#m-11").on("click", eventModify);
    $("#m-12").on("click", eventModify);
    $("#m-13").on("click", eventModify);


    function eventCreate() {

        var id = $(this).attr("id");
        $("<div>").wikiCrearAlternativa(id);
        $("<div>").wikiCrearArquitectura(id);
        $("<div>").wikiCrearArtefacto(id);
        $("<div>").wikiCrearAsunto(id);
        $("<div>").wikiCrearAtrCalidad(id);
        $("<div>").wikiCrearCriterio(id);
        $("<div>").wikiCrearDecision(id);
        $("<div>").wikiCrearEvaluacion(id);
        $("<div>").wikiCrearRequerimientoFuncional(id);
        $("<div>").wikiCrearResponsable(id);
        $("<div>").wikiCrearRestriccion(id);
        $("<div>").wikiCrearSolucion(id);
        $("<div>").wikiCrearSuposicion(id);

    }

    function eventModify() {

        var id = $(this).attr("id");
        $("<div>").wikiModificarAlternativa(id);
        $("<div>").wikiModificarArquitectura(id);
        $("<div>").wikiModificarArtefacto(id);
        $("<div>").wikiModificarAsunto(id);
        $("<div>").wikiModificarAtrCalidad(id);
        $("<div>").wikiModificarCriterio(id);
        $("<div>").wikiModificarDecision(id);
        $("<div>").wikiModificarEvaluacion(id);
        $("<div>").wikiModificarRequerimientoFuncional(id);
        $("<div>").wikiModificarResponsable(id);
        $("<div>").wikiModificarRestriccion(id);
        $("<div>").wikiModificarSolucion(id);
        $("<div>").wikiModificarSuposicion(id);

    }



});


