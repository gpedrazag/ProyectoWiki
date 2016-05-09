(function ($) {

    $.fn.wikiCrearAtrCalidad = function (id) {

        if (id === "c-5") {

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
                    .append($("<div>").addClass("form-group").attr({"id": "frm-1"})
                            .append($("<label>").html("Actor"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-1-5"}))
                            .append($("<p>").addClass("help-block").html("Ingreses el Actor del Atributo de Calidad."))
                            )
                    .append($("<div>").addClass("form-group").attr({"id": "frm-2"})
                            .append($("<label>").html("ambiente"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-2-5"}))
                            .append($("<p>").addClass("help-block").html("Ingreses el ambiente del Atributo de Calidad."))
                            )
                    .append($("<div>").addClass("form-group").attr({"id": "frm-3"})
                            .append($("<label>").html("Medida"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-3-5"}))
                            .append($("<p>").addClass("help-block").html("Ingreses la medida del Atributo de Calidad."))
                            )
                    .append($("<div>").addClass("form-group").attr({"id": "frm-4"})
                            .append($("<label>").html("Estímulo"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-4-5"}))
                            .append($("<p>").addClass("help-block").html("Ingreses el estímulo del Atributo de Calidad."))
                            )
                    .append($("<div>").addClass("form-group").attr({"id": "frm-5"})
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
                    $("#slc-3").append($("<option>").html(data.id).attr({"value": data.id, "idClass": "3"}));
                });
            });

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

            var list3 = [];

            $.each($("#tbody-3 tr"), function (index, data) {
                list3.push($(data).attr("id"));

            });

            var ok = true;

            if (actor == "")
            {
                $("#frm-1").addClass("has-error");
                ok = false;
            } else {
                $("#frm-1").removeClass("has-error");
            }

            if (ambiente == "")
            {
                $("#frm-2").addClass("has-error");
                ok = false;
            } else {
                $("#frm-2").removeClass("has-error");
            }

            if (medida == "")
            {
                $("#frm-3").addClass("has-error");
                ok = false;
            } else {
                $("#frm-3").removeClass("has-error");
            }

            if (estímulo == "")
            {
                $("#frm-4").addClass("has-error");
                ok = false;
            } else {
                $("#frm-4").removeClass("has-error");
            }

            if (fuentedeestímulo == "")
            {
                $("#frm-5").addClass("has-error");
                ok = false;
            } else {
                $("#frm-5").removeClass("has-error");
            }

            if (ok == true) {

                ajaxInsert5(actor, ambiente, medida, estímulo, fuentedeestímulo, list3);
                $("#txt-1-5").val("");
                $("#txt-2-5").val("");
                $("#txt-3-5").val("");
                $("#txt-4-5").val("");
                $("#txt-5-5").val("");

                $("#tbody-3").empty();
                $("#slc-3 option").removeClass("hidden");
                $("#slc-3 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-3 option[value=" + 0 + "]").attr("selected", true);
            }


        }


        function ajaxInsert5(actor, enviroment, measure, boost, boostSource, triggerArtifacts)
        {
            $.ajax({
                url: "WikiWeb/qualityAttribute/insert",
                data: {
                    actor: actor,
                    enviroment: enviroment,
                    measure: measure,
                    boost: boost,
                    boostSource: boostSource,
                    triggerArtifacts: JSON.stringify(triggerArtifacts)
                },
                method: "POST"
            }).done(function () {
                swal({title: "Creacion Compeltada!!!", text: "Se creo correctamente el Atributo de Calidad", timer: 2000, showConfirmButton: false, type: "success"});
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




