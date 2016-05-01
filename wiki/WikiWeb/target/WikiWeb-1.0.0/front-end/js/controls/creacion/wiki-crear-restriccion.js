(function ($) {

    $.fn.wikiCrearRestriccion = function (des, id) {


        if (id === "c-11") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
            $("#panel-heading-left").html("Restricción");
            $("#panel-heading-right").html("Relaciones");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");

            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Nombre"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-1-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Nombre de la Restricción."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Descripción"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-2-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Descripción de la Restricción."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Justificación"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-3-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Justificación de la Restricción."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Palabra clave"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-4-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Palabra clave de la Restricción."))
                            )

                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row")
//                    .append($("<div>").addClass("form-group")
//                            .append($("<label>").html("Decisión"))
//                            .append($("<select>").addClass("form-control").attr({"id": "slc-7"})
//                                    .append($("<option>").html("...").attr({"value": "0"}))
//                                    )
//                            .append($("<p>").addClass("help-block").html("Seleccione la Decisión  que tiene relación con la Restricción."))
//                            )
                    ;

            $("#panel-foot")
//                    .append($("<div>").addClass("col-lg-12")
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
//                            )
                    ;


//            $.each(des, function (index, data) {
//                $("#slc-7").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "7"}));
//            });
//
//            $("#slc-7").on("change", eventSelected);


        }

        function eventSelected() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");
            //llena la tabla de artefactos
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

        function eventRemove() {
            $(this).parent().parent().remove();
            var tableId = $(this).parent().parent().attr("id");
            var idClass = $(this).parent().parent().attr("value");

            if (idClass === "7")
                $("#slc-7 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
        }

        function eventsave() {

            var name = $("#txt-1-7").val();
            var description = $("#txt-2-7").val();
            var rationale = $("#txt-3-7").val();
            var keyword = $("#txt-4-7").val();
            
//            var list7 = [];
//
//            $.each($("#tbody-7 tr"), function (index, data) {
//                list7.push($(data).attr("id"));
//
//            });
//
//            alert(list7);

            var id = 0;

            ajaxInsert11(id, name, description, rationale, keyword);
        }

        function ajaxInsert11(id, name, description, rationale, keyword)
        {
            $.ajax({
                url: "WikiWeb/constraint/insert",
                data: {
                    id: id,
                    name: name,
                    description: description,
                    rationale: rationale,
                    keyword: keyword
                },
                method: "POST"
            }).done(function () {
                alert("Incerto la constraint");
            }).fail(function (jrxml, errorThrow) {
                alert("Error no se pudo insertar la constraint");
            });
        }

        return this;
    };

})(jQuery);




