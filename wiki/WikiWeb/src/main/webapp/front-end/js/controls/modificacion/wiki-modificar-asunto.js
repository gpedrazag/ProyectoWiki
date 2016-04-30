(function ($) {

    $.fn.wikiModificarAsunto = function (des, atrical, reffunc, id) {

        //Si es  1 es Asunto
        if (id === "m-4") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de modificación");
            $("#panel-heading-left").html("Asunto");
            $("#panel-heading-right").html("Relaciones");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");
            
            $("#row-content")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Asunto"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-7-tp"})
                                    .append($("<option>").html("..."))

                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Asunto que que va a modificar."))
                            );

            //Se crea la parte izquierda del formulario
            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Asunto"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-4"}))
                            .append($("<p>").addClass("help-block").html("Ingreses el Asunto."))
                            )
                    .append($("<button>").attr({"id": "btn-4"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave4))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;
            //Se crea la parte derecha del formulario
            $("#right-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Decisión"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-7"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la decisión que tiene relación con un Asunto."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Atributo de Calidad"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-5"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Atributo de Calidad que tiene relación con un Asunto."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Requerimiento funcional"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-9"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Requerimiento funcional que tiene relación con un Asunto."))
                            )
                    ;

            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-7"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Decisiónes"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-7"})

                                                    )
                                            )
                                    )

                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-5"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Atr de Calidad"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-5"})

                                                    )
                                            )
                                    )

                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-9"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Requ funcionales"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-9"})

                                                    )
                                            )
                                    )
                            );

            //Se llena el select con las decisiones
            $.each(des, function (index, data) {
                $("#slc-7").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "7"}));
            });
            //Se llena el select con  Atributo de Calidad
            $.each(atrical, function (index, data) {
                $("#slc-5").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "5"}));
            });
            //Se llena el select con Requerimiento funcional
            $.each(reffunc, function (index, data) {
                $("#slc-9").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "9"}));
            });

            //Se asigana el evento para llenar la tablas donde se guardaran decisiones 
            $("#slc-7").on("change", eventSelected4);
            //Se asigana el evento para llenar la tablas donde se guardaran Atributo de Calidad 
            $("#slc-5").on("change", eventSelected4);
            //Se asigana el evento para llenar la tablas donde se guardaran Requerimiento funcional 
            $("#slc-9").on("change", eventSelected4);
        }

        //evento para remover de las tablas en asuntos
        function eventRemove4() {
            $(this).parent().parent().remove();
            var tableId = $(this).parent().parent().attr("id");
            var idClass = $(this).parent().parent().attr("value");

            if (idClass === "7") {
                $("#slc-7 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
            }

            if (idClass === "5") {
                $("#slc-5 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
            }

            if (idClass === "9") {
                $("#slc-9 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
            }

        }

        //evento para llenar las tablas en las Asunto
        function eventSelected4() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");

            //llena la tabla de decisiones
            if (idClassOptionSelected === "7") {

                $("#slc-7 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-7 option:selected").addClass("hidden");
                $("#slc-7 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-7")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove4)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );

            }
            //llena la tabla de atributo de calidad
            if (idClassOptionSelected === "5") {

                $("#slc-5 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-5 option:selected").addClass("hidden");
                $("#slc-5 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-5")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove4)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );

            }

            //llena la tabla de Requerimiento funcional
            if (idClassOptionSelected === "9") {

                $("#slc-9 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-9 option:selected").addClass("hidden");
                $("#slc-9 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-9")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove4)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );

            }

        }

        //evento que guarda los datos de una alternativa
        function eventsave4() {

            var asunto = $("#txt-4").val();
            var list7 = [];
            var list5 = [];
            var list9 = [];


            $.each($("#tbody-7 tr"), function (index, data) {
                list7.push($(data).attr("id"));

            });

            alert(list7);

            $.each($("#tbody-5 tr"), function (index, data) {
                list5.push($(data).attr("id"));

            });

            alert(list5);

            $.each($("#tbody-9 tr"), function (index, data) {
                list9.push($(data).attr("id"));

            });

            alert(list9);

            alert(asunto);
        }



        return this;
    };

})(jQuery);




