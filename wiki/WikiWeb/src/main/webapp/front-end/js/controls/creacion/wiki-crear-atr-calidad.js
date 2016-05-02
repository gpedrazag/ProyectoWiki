(function ($) {

    $.fn.wikiCrearAtrCalidad = function (id) {

        if (id === "c-5") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
            $("#panel-heading-left").html("Arquitectura De Software");
            $("#panel-heading-right").html("Relaciones");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");


            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Actor"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-1-5"}))
                            .append($("<p>").addClass("help-block").html("Ingreses el Actor del Atributo de Calidad."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("ambiente"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-2-5"}))
                            .append($("<p>").addClass("help-block").html("Ingreses el ambiente del Atributo de Calidad."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Medida"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-3-5"}))
                            .append($("<p>").addClass("help-block").html("Ingreses la medida del Atributo de Calidad."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Estímulo"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-4-5"}))
                            .append($("<p>").addClass("help-block").html("Ingreses el estímulo del Atributo de Calidad."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Fuente de estímulo"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-5-5"}))
                            .append($("<p>").addClass("help-block").html("Ingreses la fuente de estímulo del Atributo de Calidad."))
                            )
                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Artefacto"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-3"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Artefacto que tiene relación Atributo de Calidad."))
                            )
                    ;
            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-3"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Artefactos"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-3"})

                                                    )
                                            )
                                    )
                            );
            ajaxSelectAll3(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-4").append($("<option>").html(data.id).attr({"value": data.id, "idClass": "4"}));
                });
            });

            $("#slc-4").on("change", eventSelected);

        }


        function eventSelected() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");

            if (idClassOptionSelected === "4") {

                $("#slc-4 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-4 option:selected").addClass("hidden");
                $("#slc-4 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-4")
                        .append($("<tr>").attr({"id": idOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );
            }
        }

        function eventRemove() {
            $(this).parent().parent().remove();
            var tableId = $(this).parent().parent().attr("id");

            $("#slc-4 option").each(function () {

                if (tableId === $(this).attr("value")) {
                    $(this).removeClass("hidden");
                }
            });
        }

        function eventsave(event) {
             event.preventDefault();
            var actor = $("#txt-1-5").val();
            var ambiente = $("#txt-2-5").val();
            var medida = $("#txt-3-5").val();
            var estímulo = $("#txt-4-5").val();
            var fuentedeestímulo = $("#txt-5-5").val();

            var list4 = [];

            $.each($("#tbody-4 tr"), function (index, data) {
                list4.push($(data).attr("id"));

            });

            alert(list4);

            alert(actor + " " + ambiente + " " + medida + " " + estímulo + " " + fuentedeestímulo);

            ajaxInsert5(actor, ambiente, medida, estímulo, fuentedeestímulo, list4);
        }


        function ajaxInsert5(id, actor, enviroment, measure, boost, boostSource, triggerArtifacts)
        {
            $.ajax({
                url: "WikiWeb/qualityAttribute/insert",
                data: {
                    id: id,
                    actor: actor,
                    enviroment: enviroment,
                    measure: measure,
                    boost: boost,
                    boostSource: boostSource,
                    triggerArtifacts: triggerArtifacts
                },
                method: "POST"
            }).done(function () {
                alert("Incerto");
            }).fail(function (jrxml, errorThrow) {
                alert("Error no se pudo");
            });
        }

        function ajaxSelectAll3(callback)
        {
            $.ajax({
                url: "WikiWeb/artifact/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                callback(data);
            }).fail(function (jrxml, errorThrow) {
                callback(null);
            });
        }

        return this;
    };

})(jQuery);




