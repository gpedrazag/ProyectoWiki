(function ($) {

    $.fn.wikiCrearArquitectura = function (art, des, id) {

        //Si es  1 es Arquitectura de software
        if (id === "c-2") {

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
                            .append($("<label>").html("Nombre"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-2"}))
                            .append($("<p>").addClass("help-block").html("Ingreses el nombre de la Arquitectura."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Descripción"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-area-2"}))
                            .append($("<p>").addClass("help-block").html("Ingreses la descripción de la Arquitectura."))
                            )
                    .append($("<button>").attr({"id": "btn-2"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave2))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;
            //Se crea la parte derecha del formulario
            $("#right-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Artefacto"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-3"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Artefacto que tiene relación con la Arquitectura."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Decisión"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-7"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Decisión que tiene relación con la Arquitectura."))
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

                            );

            //Se llena el select con los artefactos
            $.each(art, function (index, data) {
                $("#slc-3").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "3"}));
            });
            //Se llena el select con las decisiones
            $.each(des, function (index, data) {
                $("#slc-7").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "7"}));
            });

            //Se asigana el evento para llenar la tablas donde se guardaran decisiones 
            $("#slc-3").on("change", eventSelected2);
            //Se asigana el evento para llenar la tablas donde se guardaran soluciones 
            $("#slc-7").on("change", eventSelected2);

        }

        //evento para remover de las tablas en la Arquitectura de software
        function eventRemove2() {
            $(this).parent().parent().remove();
            var tableId = $(this).parent().parent().attr("id");
            var idClass = $(this).parent().parent().attr("value");

            if (idClass === "3") {
                $("#slc-3 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
            }


            if (idClass === "7") {
                $("#slc-7 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
            }

        }

        //evento para llenar las tablas en la Arquitectura de software
        function eventSelected2() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");


            //llena la tabla de artefactos
            if (idClassOptionSelected === "3") {

                $("#slc-3 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-3 option:selected").addClass("hidden");
                $("#slc-3 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-3")
                        .append($("<tr>").attr({"id": idOptionSelected,"value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove2)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );

            }

            //llena la tabla de desisiones
            if (idClassOptionSelected === "7") {

                $("#slc-7 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-7 option:selected").addClass("hidden");
                $("#slc-7 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-7")
                        .append($("<tr>").attr({"id": idOptionSelected,"value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove2)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );

            }
        }

        //evento que guarda los datos de una Arquitectura de software
        function eventsave2() {

            var name = $("#txt-2").val();
            var description = $("#txt-area-2").val();
            var list3 = [];
            var list7 = [];


            $.each($("#tbody-3 tr"), function (index, data) {
                list3.push($(data).attr("id"));

            });

            alert(list3);

            $.each($("#tbody-7 tr"), function (index, data) {
                list7.push($(data).attr("id"));

            });

            alert(list7);

            alert(name + " " + description);
        }

        return this;
    };

})(jQuery);




