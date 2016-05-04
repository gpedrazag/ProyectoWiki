(function ($) {

    $.fn.wikiCrearEvaluacion = function (id) {

        if (id === "c-8") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
            $("#panel-heading-left").html("Alternativa");
            $("#panel-heading-right").html("Relaciones");

            $("#panel-heading-left").removeClass("hidden");
            $("#panel-heading-right").removeClass("hidden");
            $("#left-row").removeClass("hidden");
            $("#right-row").removeClass("hidden");

            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");
            
            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Pros"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-1-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese los Pros de la Evaluación."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Contras"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-2-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese los Contras de la Evaluación."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Valoración"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-3-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Valoración de la Evaluación."))
                            )
                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row");
            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
                            )
                    ;
        }
        
        function eventsave(event) {
            event.preventDefault();
            var pros = $("#txt-1-7").val();
            var cons = $("#txt-2-7").val();
            var valoration = $("#txt-3-7").val();

            ajaxInsert8(pros, cons, valoration);
        }

        function ajaxInsert8(pros, cons, valoration)
        {
            $.ajax({
                url: "WikiWeb/evaluation/insert",
                data: {
                    pros: pros,
                    cons: cons,
                    valoration: valoration
                },
                method: "POST"
            }).done(function () {
                alert("Incerto");
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
            });
        }

        return this;
    };
})(jQuery);




