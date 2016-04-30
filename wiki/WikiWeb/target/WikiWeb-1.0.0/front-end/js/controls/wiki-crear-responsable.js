(function ($) {

    $.fn.wikiCrearResponsable = function (des, id) {


        if (id === "c-10") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
            $("#panel-heading-left").html("Responsable");
            $("#panel-heading-right").html("Relaciones");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");

            //Se crea la parte izquierda del formulario
            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Nombre"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-1-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Nombre del Responsable."))
                            )

                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;
            //Se crea la parte derecha del formulario
            $("#right-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Decisión"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-7"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Decisión  que tiene relación con el Responsable."))
                            )
                    ;

            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-7"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Decisión"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-7"})
                                                    )
                                            )
                                    )
                            )
                    ;


            $.each(des, function (index, data) {
                $("#slc-7").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "7"}));
            });

            $("#slc-7").on("change", eventSelected);


        }
        //evento para llenar las tablas en atributos de calidad
        function eventSelected() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");

            //llena la tabla de artefactos
            if (idClassOptionSelected === "7") {

                $("#slc-7 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-7 option:selected").addClass("hidden");
                $("#slc-7 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-7")
                        .append($("<tr>").attr({"id": textOptionSelected})
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


            $("#slc-7 option").each(function () {

                if (tableId === $(this).html()) {
                    $(this).removeClass("hidden");
                }

            });
        }


        //evento que guarda los datos de una atributo de calidad
        function eventsave() {

            var Nombre = $("#txt-1-7").val();

            var list7 = [];

            $.each($("#tbody-7 tr"), function (index, data) {
                list7.push($(data).attr("id"));

            });

            alert(list7);

            alert(Nombre);
        }


        return this;
    };

})(jQuery);




