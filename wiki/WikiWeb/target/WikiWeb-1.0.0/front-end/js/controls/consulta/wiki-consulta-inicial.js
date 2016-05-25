(function ($) {

    $.fn.wikiConsultaGeneral = function () {

            $("#row-content")
                .append($("<div>").addClass("row")
                    .append($("<div>").addClass("col-lg-12").append($("<h2>").addClass("page-header").html("Alternativas").attr("id","alternative_ul"))
                    
                    )
                )
                .append($("<div>").addClass("row")
                    .append($("<div>").addClass("col-lg-12").append($("<h2>").addClass("page-header").html("Artefactos").attr("id", "artifact_ul"))
                        
                    )
                )
                .append($("<div>").addClass("row")
                    .append($("<div>").addClass("col-lg-12").append($("<h2>").addClass("page-header").html("Supuestos").attr("id", "assumption_ul"))
                        
                    )
                )
                .append($("<div>").addClass("row")
                    .append($("<div>").addClass("col-lg-12").append($("<h2>").addClass("page-header").html("Asuntos").attr("id", "concern_ul"))
                        
                    )
                )
                .append($("<div>").addClass("row")
                    .append($("<div>").addClass("col-lg-12").append($("<h2>").addClass("page-header").html("Restricciones de las Decisiones").attr("id", "constraint_ul"))
                        
                    )
                )
                .append($("<div>").addClass("row")
                    .append($("<div>").addClass("col-lg-12").append($("<h2>").addClass("page-header").html("Criterios de Evaluación").attr("id", "criteria_ul"))
                        
                    )
                )
                .append($("<div>").addClass("row")
                    .append($("<div>").addClass("col-lg-12").append($("<h2>").addClass("page-header").html("Alternativas").attr("id", "decision_ul"))
                        
                    )
                )
                .append($("<div>").addClass("row")
                    .append($("<div>").addClass("col-lg-12").append($("<h2>").addClass("page-header").html("Evaluaciones").attr("id", "evaluation_ul"))
                        
                    )
                )
                .append($("<div>").addClass("row")
                    .append($("<div>").addClass("col-lg-12").append($("<h2>").addClass("page-header").html("Requerimientos Funcionales").attr("id", "functionalRequeriment_ul"))
                        
                    )
                )
                .append($("<div>").addClass("row")
                    .append($("<div>").addClass("col-lg-12").append($("<h2>").addClass("page-header").html("Atributos de Calidad").attr("id", "qualityAttribute_ul"))
                        
                    )
                )
                .append($("<div>").addClass("row")
                    .append($("<div>").addClass("col-lg-12").append($("<h2>").addClass("page-header").html("Responsables o Actores de las Decisiones").attr("id", "responsible_ul"))
                        
                    )
                )
                .append($("<div>").addClass("row")
                    .append($("<div>").addClass("col-lg-12").append($("<h2>").addClass("page-header").html("Arquitectura de Softwares").attr("id", "SoftwareArchitecture_ul"))
                        
                    )
                )
                .append($("<div>").addClass("row")
                    .append($("<div>").addClass("col-lg-12").append($("<h2>").addClass("page-header").html("Soluciones").attr("id", "solution_ul"))
                        
                    )
                )
                
            ;   
        
        function showAllComponents(component,data)
        {
            
            $("#"+component+"_ul").append($("<table>").addClass("table"));
            var table =  $("#"+component+"_ul").find("table");        
            var row = null;
            var i = 0;
            data.forEach(function(alternative){
                if(i < 3)
                {
                    if(row === null)
                    {
                        $(table).append($("<tr>"));
                        row = $(table).find("tr")[$(table).find("tr").length - 1];
                    }
                     $(row).append($("<td>")
                         .append($("<a>").on('click',redirectPage).html(typeof alternative.name !== "undefined"?alternative.name:component+" "+(alternative.id.split("_")[0]===alternative.id?alternative.id:alternative.id.split("_")[1])).attr("id",alternative.id))
                     );
                }
                else
                {
                     i = 0;
                     row = table.append($("<tr>"));
                     $(row).append($("<td>")
                         .append($("<a>").on('click',redirectPage).html(typeof alternative.name !== "undefined"?alternative.name:component+" "+(alternative.id.split("_")[0]===alternative.id?alternative.id:alternative.id.split("_")[1])).attr("id",alternative.id))
                     );
                }
                i++;
            });
        }
        
        ajaxGetAllAlternatives();
        ajaxGetAllArtifacts();
        ajaxGetAllAssumptions();
        ajaxGetAllConcern();
        ajaxGetAllConstraint();
        ajaxGetAllCriteria();
        ajaxGetAllDecision();
        ajaxGetAllEvaluation();
        ajaxGetAllFunctionalRequeriment();
        ajaxGetAllQualityAttribute();
        ajaxGetAllResponsible();
        ajaxGetAllSoftwareArchitecture();
        ajaxGetAllSolution();        
        
        function ajaxGetAllAlternatives()
        {
            $.ajax({
                url: "WikiWeb/alternative/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                showAllComponents("alternative", data);
            });
        }
        
        function ajaxGetAllArtifacts()
        {
            $.ajax({
                url: "WikiWeb/artifact/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                showAllComponents("artifact", data);
            });
        }
        
        function ajaxGetAllAssumptions()
        {
            $.ajax({
                url: "WikiWeb/assumption/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                showAllComponents("assumption", data);
            });
        }
        
        function ajaxGetAllConcern()
        {
            $.ajax({
                url: "WikiWeb/concern/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                showAllComponents("concern", data);
            });
        }
        
        function ajaxGetAllConstraint()
        {
            $.ajax({
                url: "WikiWeb/constraint/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                showAllComponents("constraint", data);
            });
        }
        
        function ajaxGetAllCriteria()
        {
            $.ajax({
                url: "WikiWeb/criteria/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                showAllComponents("criteria", data);
            });
        }
        
        function ajaxGetAllDecision()
        {
            $.ajax({
                url: "WikiWeb/decision/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                showAllComponents("decision", data);
            });
        }
        
        function ajaxGetAllEvaluation()
        {
            $.ajax({
                url: "WikiWeb/evaluation/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                showAllComponents("evaluation", data);
            });
        }
        
        function ajaxGetAllFunctionalRequeriment()
        {
            $.ajax({
                url: "WikiWeb/functionalRequeriment/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                showAllComponents("fr", data);
            });
        }
        
        function ajaxGetAllQualityAttribute()
        {
            $.ajax({
                url: "WikiWeb/qualityAttribute/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                showAllComponents("qa", data);
            });
        }
        
        function ajaxGetAllResponsible()
        {
            $.ajax({
                url: "WikiWeb/responsible/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                showAllComponents("responsible", data);
            });
        }
        
        function ajaxGetAllSoftwareArchitecture()
        {
            $.ajax({
                url: "WikiWeb/SoftwareArchitecture/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                showAllComponents("sa", data);
            });
        }
        
        function ajaxGetAllSolution()
        {
            $.ajax({
                url: "WikiWeb/solution/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                showAllComponents("solution", data);
            });
        }
        
        function redirectPage(event)
        {
            var component = $(event.target).parent().parent().parent().parent().parent().attr("id").split("_")[0];
            $("<div>").consultaClase(component, event.target.id);
        }
        
        return this;
    };
})(jQuery);




