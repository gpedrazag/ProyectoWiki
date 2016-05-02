(function ($) {

    $.fn.wikiCrearRequerimientoFuncional = function (asu, id) {


        if (id === "c-9") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
            $("#panel-heading-left").html("Requerimiento Funcional");
            $("#panel-heading-right").html("Relaciones");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");


            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Nombre"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-1-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Nombre del Requerimiento Funcional."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Actor"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-2-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Actor del Requerimiento Funcional."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Descripción"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-3-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Descripción del Requerimiento Funcional."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Entrada"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-4-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Entrada del Requerimiento Funcional."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Salida"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-5-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Salida del Requerimiento Funcional."))
                            )
                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;
            //Se crea la parte derecha del formulario
            $("#right-row")
//                    .append($("<div>").addClass("form-group")
//                            .append($("<label>").html("Asunto"))
//                            .append($("<select>").addClass("form-control").attr({"id": "slc-4"})
//                                    .append($("<option>").html("...").attr({"value": "0"}))
//                                    )
//                            .append($("<p>").addClass("help-block").html("Seleccione el Asunto que tiene relación con el Requerimiento Funcional."))
//                            )
                    ;

            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
//                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-4"})
//                                    .append($("<table>").addClass("table table-hover")
//                                            .append($("<thead>")
//                                                    .append($("<tr>").addClass("active")
//                                                            .append($("<th>").html("Asunto"))
//                                                            .append($("<th>"))
//                                                            )
//                                                    )
//                                            .append($("<tbody>").attr({"id": "tbody-4"})
//                                                    )
//                                            )
//                                    )
                            )
                    ;


//            $.each(asu, function (index, data) {
//                $("#slc-4").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "4"}));
//            });
//
//            $("#slc-4").on("change", eventSelected);


        }
        //evento para llenar las tablas en atributos de calidad
        function eventSelected() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");
            //llena la tabla de artefactos
            if (idClassOptionSelected === "4") {

                $("#slc-4 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-4 option:selected").addClass("hidden");
                $("#slc-4 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-4")
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

            if (idClass === "4")
                $("#slc-4 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
        }


        //evento que guarda los datos de una atributo de calidad
        function eventsave(event) {
             event.preventDefault();
            var name = $("#txt-1-7").val();
            var actor = $("#txt-2-7").val();
            var description = $("#txt-3-7").val();
            var input = $("#txt-4-7").val();
            var output = $("#txt-5-7").val();
//            var list4 = [];

//            $.each($("#tbody-4 tr"), function (index, data) {
//                list4.push($(data).attr("id"));
//
//            });
//
//            alert(list4);

            alert(id + name + actor + description + input + output);

            var id = 0;

            ajaxInsert9(id, name, actor, description, input, output);
        }

        function ajaxInsert9(id, name, actor, description, input, output)
        {
            $.ajax({
                url: "WikiWeb/functionalRequeriment/insert",
                data: {
                    id: id,
                    name: name,
                    actor: actor,
                    description: description,
                    input: input,
                    output: output
                },
                method: "POST"
            }).done(function () {
                alert("Incerto la functionalRequeriment");
            }).fail(function (jrxml, errorThrow) {
                alert("Error no se pudo insertar la functionalRequeriment");
            });
        }

        return this;
    };

})(jQuery);




