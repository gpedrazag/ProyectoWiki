(function ($) {

    $.fn.wikiCrearSolucion = function (alt, des, id) {


        if (id === "c-12") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
            $("#panel-heading-left").html("Solución");
            $("#panel-heading-right").html("Relaciones");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");


            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Justificación"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-1-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Justificación de la Solución."))
                            )

                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row")
//                    .append($("<div>").addClass("form-group")
//                            .append($("<label>").html("Alternativa"))
//                            .append($("<select>").addClass("form-control").attr({"id": "slc-1"})
//                                    .append($("<option>").html("...").attr({"value": "0"}))
//                                    )
//                            .append($("<p>").addClass("help-block").html("Seleccione la Alternativa  que tiene relación con la Solución."))
//                            )
//                    .append($("<div>").addClass("form-group")
//                            .append($("<label>").html("Decisión"))
//                            .append($("<select>").addClass("form-control").attr({"id": "slc-7"})
//                                    .append($("<option>").html("...").attr({"value": "0"}))
//                                    )
//                            .append($("<p>").addClass("help-block").html("Seleccione la Decisión  que tiene relación con la Solución."))
//                            )
                    ;

            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
//                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-1"})
//                                    .append($("<table>").addClass("table table-hover")
//                                            .append($("<thead>")
//                                                    .append($("<tr>").addClass("active")
//                                                            .append($("<th>").html("Alternativa"))
//                                                            .append($("<th>"))
//                                                            )
//                                                    )
//                                            .append($("<tbody>").attr({"id": "tbody-1"})
//                                                    )
//                                            )
//                                    )
//                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-7"})
//                                    .append($("<table>").addClass("table table-hover")
//                                            .append($("<thead>")
//                                                    .append($("<tr>").addClass("active")
//                                                            .append($("<th>").html("Decisión"))
//                                                            .append($("<th>"))
//                                                            )
//                                                    )
//                                            .append($("<tbody>").attr({"id": "tbody-7"})
//                                                    )
//                                            )
//                                    )
                            )
                    ;


//            $.each(alt, function (index, data) {
//                $("#slc-1").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "1"}));
//            });
//
//            $.each(des, function (index, data) {
//                $("#slc-7").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "7"}));
//            });
//
//            $("#slc-1").on("change", eventSelected);
//            $("#slc-7").on("change", eventSelected);


        }
        //evento para llenar las tablas en atributos de calidad
        function eventSelected() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");
            //llena la tabla de artefactos
            if (idClassOptionSelected === "1") {

                $("#slc-1 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-1 option:selected").addClass("hidden");
                $("#slc-1 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-1")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove).append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );
            }

            if (idClassOptionSelected === "7") {

                $("#slc-7 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-7 option:selected").addClass("hidden");
                $("#slc-7 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-7")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove).append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );
            }
        }




        //evento para remover de las tablas en las atributos de calidad
        function eventRemove() {
            $(this).parent().parent().remove();
            var tableId = $(this).parent().parent().attr("id");
            var idClass = $(this).parent().parent().attr("value");

            if (idClass === "1")
                $("#slc-1 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });

            if (idClass === "7")
                $("#slc-7 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
        }


        //evento que guarda los datos de una atributo de calidad
        function eventsave(event) {
             event.preventDefault();

            var rationale = $("#txt-1-7").val();

//            var list1 = [];
//            var list7 = [];
//
//            $.each($("#tbody-1 tr"), function (index, data) {
//                list1.push($(data).attr("id"));
//
//            });
//
//            alert(list1);
//
//            $.each($("#tbody-7 tr"), function (index, data) {
//                list7.push($(data).attr("id"));
//
//            });
//
//            alert(list7);

            alert(rationale);

            var id = 0;

            ajaxInsert12(id, rationale);
        }

        function ajaxInsert12(id, rationale)
        {
            $.ajax({
                url: "WikiWeb/solution/insert",
                data: {
                    id: id,
                    rationale: rationale
                },
                method: "POST"
            }).done(function () {
                alert("Incerto la solution");
            }).fail(function (jrxml, errorThrow) {
                alert("Error no se pudo insertar la solution");
            });
        }

        return this;
    };

})(jQuery);




