(function ($) {

    $.fn.wikiCrearEvaluacion = function (alt, cri, id) {


        if (id === "c-8") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
            $("#panel-heading-left").html("Evaluación");
            $("#panel-heading-right").html("Relaciones");
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
            //Se crea la parte derecha del formulario
            $("#right-row")
//                    .append($("<div>").addClass("form-group")
//                            .append($("<label>").html("Alternativa"))
//                            .append($("<select>").addClass("form-control").attr({"id": "slc-1"})
//                                    .append($("<option>").html("...").attr({"value": "0"}))
//                                    )
//                            .append($("<p>").addClass("help-block").html("Seleccione la Alternativa que tiene relación con la Evaluación."))
//                            )
//                    .append($("<div>").addClass("form-group")
//                            .append($("<label>").html("Criterio"))
//                            .append($("<select>").addClass("form-control").attr({"id": "slc-6"})
//                                    .append($("<option>").html("...").attr({"value": "0"}))
//                                    )
//                            .append($("<p>").addClass("help-block").html("Seleccione el Criterio  que tiene relación con la Evaluación."))
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
//
//                                                    )
//                                            )
//                                    )
//
//                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-6"})
//                                    .append($("<table>").addClass("table table-hover")
//                                            .append($("<thead>")
//                                                    .append($("<tr>").addClass("active")
//                                                            .append($("<th>").html("Criterio"))
//                                                            .append($("<th>"))
//                                                            )
//                                                    )
//                                            .append($("<tbody>").attr({"id": "tbody-6"})
//
//                                                    )
//                                            )
//                                    )
                            )
                    ;
//            $.each(alt, function (index, data) {
//                $("#slc-1").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "1"}));
//            });
//
//            $.each(cri, function (index, data) {
//                $("#slc-6").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "6"}));
//            });
//
//
//
//
//            $("#slc-1").on("change", eventSelected);
//            $("#slc-6").on("change", eventSelected);

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

//llena la tabla de artefactos
            if (idClassOptionSelected === "6") {

                $("#slc-6 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-6 option:selected").addClass("hidden");
                $("#slc-6 option[value=" + 0 + "]").attr("selected", true);
                $("#tbody-6")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
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
            if (idClass === "6")
                $("#slc-6 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
        }


//evento que guarda los datos de una atributo de calidad
        function eventsave() {

            var pros = $("#txt-1-7").val();
            var cons = $("#txt-2-7").val();
            var valoration = $("#txt-3-7").val();
//            var list1 = [];
//            var list6 = [];
//            $.each($("#tbody-1 tr"), function (index, data) {
//                list1.push($(data).attr("id"));
//            });
//            alert(list1);
//            $.each($("#tbody-6 tr"), function (index, data) {
//                list6.push($(data).attr("id"));
//            });
//            alert(list6);
            alert(pros + " " + cons + " " + valoration);
            
            var id = 0;
            
            ajaxInsert8(id, pros, cons, valoration);
        }

        function ajaxInsert8(id, pros, cons, valoration)
        {
            $.ajax({
                url: "WikiWeb/evaluation/insert",
                data: {
                    id: id,
                    pros: pros,
                    cons: cons,
                    valoration: valoration
                },
                method: "POST"
            }).done(function () {
                alert("Incerto la alternativa");
            }).fail(function (jrxml, errorThrow) {
                alert("Error no se pudo insertar la alternativa");
            });
        }


        return this;
    };
})(jQuery);




