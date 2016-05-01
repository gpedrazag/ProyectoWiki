(function ($) {

    $.fn.wikiModificarArtefacto = function (art, atrical, arqsoft, des, id) {

        if (id === "m-3") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de modificación");
            $("#panel-heading-left").html("Artefacto");
            $("#panel-heading-right").html("Relaciones");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");

            $("#row-content")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Artefacto"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-3-tp"})
                                    .append($("<option>").html("..."))

                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Artefacto que que va a modificar."))
                            );

            //Se crea la parte izquierda del formulario
            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Id"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-3"}))
                            .append($("<p>").addClass("help-block").html("Ingreses el id del artefacto."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Descripción"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-area-3"}))
                            .append($("<p>").addClass("help-block").html("Ingreses la descripción del artefacto."))
                            )
                    .append($("<button>").attr({"id": "btn-3"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave3))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;
            //Se crea la parte derecha del formulario
            $("#right-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Atributo de Calidad"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-5"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Arquitectura de software  que tiene relación con el artefacto."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Arquitectura de software"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-2"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Atributo de Calidad que tiene relación con el artefacto."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Decisión"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-7"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Decisión  que tiene relación con el artefacto."))
                            )
                    ;

            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
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

                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-2"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Arqu de software"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-2"})

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

            $.each(art, function (index, data) {
                $("#slc-3-tp").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "3"}));
            });

            //Se llena el select con Atributo de Calidad
            $.each(atrical, function (index, data) {
                $("#slc-5").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "5"}));
            });

            //Se llena el select con Arquitectura de software
            $.each(arqsoft, function (index, data) {
                $("#slc-2").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "2"}));
            });
            //Se llena el select con Decisión
            $.each(des, function (index, data) {
                $("#slc-7").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "7"}));
            });

            $("#slc-3-tp").on("change", eventLoad);
            //Se asigana el evento para llenar la tablas donde se guardaran Atributo de Calidad 
            $("#slc-5").on("change", eventSelected3);
            //Se asigana el evento para llenar la tablas donde se guardaran Arquitectura de software 
            $("#slc-2").on("change", eventSelected3);
            //Se asigana el evento para llenar la tablas donde se guardaran Decisión 
            $("#slc-7").on("change", eventSelected3);
        }

        //evento para remover de las tablas en las artefactos
        function eventRemove3() {
            $(this).parent().parent().remove();
            var tableId = $(this).parent().parent().attr("id");
            var idClass = $(this).parent().parent().attr("value");

            if (idClass === "5") {
                $("#slc-5 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
            }

            if (idClass === "2") {
                $("#slc-2 option").each(function () {

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

        //evento para llenar las tablas en los artefactos
        function eventSelected3() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");

            //llena la tabla de desisiones
            if (idClassOptionSelected === "5") {

                $("#slc-5 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-5 option:selected").addClass("hidden");
                $("#slc-5 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-5")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove3)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );

            }
            //llena la tabla de soluciones
            if (idClassOptionSelected === "2") {

                $("#slc-2 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-2 option:selected").addClass("hidden");
                $("#slc-2 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-2")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove3)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );

            }

            //llena la tabla de evaluaciones
            if (idClassOptionSelected === "7") {

                $("#slc-7 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-7 option:selected").addClass("hidden");
                $("#slc-7 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-7")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove3)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );

            }

        }

        //evento que guarda los datos de una alternativa
        function eventsave3() {

            var id = $("#txt-3").val();
            var description = $("#txt-area-3").val();
            var list5 = [];
            var list2 = [];
            var list7 = [];


//            $.each($("#tbody-5 tr"), function (index, data) {
//                list5.push($(data).attr("id"));
//
//            });
//
//            alert(list5);
//
//            $.each($("#tbody-2 tr"), function (index, data) {
//                list2.push($(data).attr("id"));
//
//            });
//
//            alert(list2);
//
//            $.each($("#tbody-7 tr"), function (index, data) {
//                list7.push($(data).attr("id"));
//
//            });
//
//            alert(list7);
//
//            alert(id + " " + description);
        }


        function eventLoad() {

            //alert();
            ajaxSetArtefacto("455", function (data) {
//                alert(data.id + " " + data.description);
                $("#txt-3").val(data.id);
                $("#txt-area-3").val(data.description);
            });

        }

        function ajaxSetArtefacto(id, miCallback)
        {
            $.ajax({
                url: "WikiWeb/artifact/get",
                data: {
                    id: id
                },
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                miCallback(data);
            }).fail(function (jrxml, errorThrow) {
                miCallback(null);
            });
        }



        return this;
    };

})(jQuery);




