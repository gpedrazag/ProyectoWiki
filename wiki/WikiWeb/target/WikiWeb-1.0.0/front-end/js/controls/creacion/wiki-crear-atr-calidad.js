(function ($) {

    $.fn.wikiCrearAtrCalidad = function (art, asu, id) {

        //Si es  5 es Atributo de Calidad
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

            //Se crea la parte izquierda del formulario
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
                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave5))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;
            //Se crea la parte derecha del formulario
            $("#right-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Artefacto"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-3"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Artefacto que tiene relación Atributo de Calidad."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Asunto"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-4"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Asunto que tiene relación Atributo de Calidad."))
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

                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-4"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Asuntos"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-4"})

                                                    )
                                            )
                                    )

                            );

            //Se llena el select con los artefactos
            $.each(art, function (index, data) {
                $("#slc-3").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "3"}));
            });
            //Se llena el select con las asuntos
            $.each(asu, function (index, data) {
                $("#slc-4").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "4"}));
            });

            //Se asigana el evento para llenar la tablas donde se guardaran artefactos 
            $("#slc-3").on("change", eventSelected5);
            //Se asigana el evento para llenar la tablas donde se guardaran asuntos 
            $("#slc-4").on("change", eventSelected5);

        }

        //evento para llenar las tablas en atributos de calidad
        function eventSelected5() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");

            //llena la tabla de artefactos
            if (idClassOptionSelected === "3") {

                $("#slc-3 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-3 option:selected").addClass("hidden");
                $("#slc-3 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-3")
                        .append($("<tr>").attr({"id": idOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove5)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );

            }

            //llena la tabla de asuntos
            if (idClassOptionSelected === "4") {

                $("#slc-4 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-4 option:selected").addClass("hidden");
                $("#slc-4 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-4")
                        .append($("<tr>").attr({"id": idOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove5)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );

            }
        }




        //evento para remover de las tablas en las atributos de calidad
        function eventRemove5() {
            $(this).parent().parent().remove();
            var tableId = $(this).parent().parent().attr("id");


            $("#slc-3 option").each(function () {

                if (tableId === $(this).attr("value")) {
                    $(this).removeClass("hidden");
                }

            });

            $("#slc-4 option").each(function () {

                if (tableId === $(this).attr("value")) {
                    $(this).removeClass("hidden");
                }

            });
        }


        //evento que guarda los datos de una atributo de calidad
        function eventsave5() {

            var actor = $("#txt-1-5").val();
            var ambiente = $("#txt-2-5").val();
            var medida = $("#txt-3-5").val();
            var estímulo = $("#txt-4-5").val();
            var fuentedeestímulo = $("#txt-5-5").val();
            var list3 = [];
            var list4 = [];


            $.each($("#tbody-3 tr"), function (index, data) {
                list3.push($(data).attr("id"));

            });

            alert(list3);

            $.each($("#tbody-4 tr"), function (index, data) {
                list4.push($(data).attr("id"));

            });

            alert(list4);

            alert(actor + " " + ambiente + " " + medida + " " + estímulo + " " + fuentedeestímulo);
        }


        return this;
    };

})(jQuery);




