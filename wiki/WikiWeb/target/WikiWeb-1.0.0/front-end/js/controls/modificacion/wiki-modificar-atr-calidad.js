(function ($) {

    $.fn.wikiModificarAtrCalidad = function (id) {

        if (id === "c-5") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de Modificacion");
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

            $("#row-content")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Atributo De Calidad"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-5-tp"})
                                    .append($("<option>").html("..."))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Atributo De Calidad que va a modificar."))
                            );


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

            ajaxSelectAll5(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-5-tp").append($("<option>").html(data.id).attr({"value": data.id, "idClass": "5"}));
                });
            });

            ajaxSelectAll3(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-3").append($("<option>").html(data.id).attr({"value": data.id, "idClass": "3"}));
                });
            });

            $("#slc-5-tp").on("change", eventLoad);
            $("#slc-3").on("change", eventSelected);

        }


        function eventSelected() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");

            if (idClassOptionSelected === "3") {

                $("#slc-3 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-3 option:selected").addClass("hidden");
                $("#slc-3 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-3")
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

            $("#slc-3 option").each(function () {

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
            var id = $('option:selected', "#slc-5-tp").attr("value");

            var list3 = [];

            $.each($("#tbody-3 tr"), function (index, data) {
                list3.push($(data).attr("id"));

            });

            ajaxUpdate5(id, actor, ambiente, medida, estímulo, fuentedeestímulo, list3);
        }

        function eventLoad() {
            var textOptionSelected = $('option:selected', this).html();

            var id = $('option:selected', this).attr("value");
            $("#tbody-3 tr").empty();

            if (textOptionSelected === '...') {
                $("#txt-1-5").val("");
                $("#txt-2-5").val("");
                $("#txt-3-5").val("");
                $("#txt-4-5").val("");
                $("#txt-5-5").val("");

                $("#tbody-3 tr").each(function (index, data) {

                    $("#slc-3 option").each(function (index, data1) {
                        if ($(data).attr("id") === $(data1).attr("value")) {
                            $(data1).removeClass("hidden");
                        }
                    });
                });


            } else {

                ajaxSelectAll3(function (data) {
                    $.each(data, function (index, data) {

                        if (data.id == id) {
                            $("#txt-1-5").val(data.actor);
                            $("#txt-2-5").val(data.enviroment);
                            $("#txt-3-5").val(data.measure);
                            $("#txt-4-5").val(data.boost);
                            $("#txt-5-5").val(data.boostSource);

                            if (data.triggerArtifacts !== undefined) {

                                $("#tbody-3")
                                        .append($("<tr>").attr({"id": data.triggerArtifacts.id, "value": "8"})
                                                .append($("<td>").html(data.triggerArtifacts.id).attr({"width": "80%"}))
                                                .append($("<td>")
                                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                                )
                                                        )
                                                );

                                $("#tbody-3 tr").each(function (index, data) {

                                    $("#slc-3 option").each(function (index, data1) {
                                        if ($(data).attr("id") === $(data1).attr("value")) {
                                            $(data1).addClass("hidden");
                                        }
                                    });
                                });
                            }
                        }
                    });
                });
            }
        }

        function ajaxUpdate5(id, actor, enviroment, measure, boost, boostSource, triggerArtifacts)
        {
            $.ajax({
                url: "WikiWeb/qualityAttribute/update",
                data: {
                    id: id,
                    actor: actor,
                    enviroment: enviroment,
                    measure: measure,
                    boost: boost,
                    boostSource: boostSource,
                    triggerArtifacts: JSON.stringify(triggerArtifacts)
                },
                method: "POST"
            }).done(function () {
                alert("Incerto");
            }).fail(function (jrxml, errorThrow) {
                alert("Error no se pudo");
            });
        }

        function ajaxSelectAll5(callback)
        {
            $.ajax({
                url: "WikiWeb/qualityAttribute/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                callback(data);
            }).fail(function (jrxml, errorThrow) {
                callback(null);
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




