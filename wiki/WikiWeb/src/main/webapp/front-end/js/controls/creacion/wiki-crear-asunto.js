(function ($) {

    $.fn.wikiCrearAsunto = function (id) {

        if (id === "c-4") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
            $("#panel-heading-left").html("Asunto");
            $("#panel-heading-right").html("Relaciones");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");

            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Asunto"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-4"}))
                            .append($("<p>").addClass("help-block").html("Ingreses el Asunto."))
                            )
                    .append($("<button>").attr({"id": "btn-4"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row")
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

            ajaxSelectAll5(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-5").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "5"}));
                });
            });

            ajaxSelectAll9(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-9").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "9"}));
                });
            });

            $("#slc-5").on("change", eventSelected);
            $("#slc-9").on("change", eventSelected);
        }

        function eventSelected() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");


            if (idClassOptionSelected === "5") {

                $("#slc-5 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-5 option:selected").addClass("hidden");
                $("#slc-5 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-5")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );

            }

            if (idClassOptionSelected === "9") {

                $("#slc-9 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-9 option:selected").addClass("hidden");
                $("#slc-9 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-9")
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

        function eventRemove() {
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

            if (idClass === "9") {
                $("#slc-9 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
            }

        }

        //evento que guarda los datos de una alternativa
        function eventsave(event) {
            event.preventDefault();
            var asunto = $("#txt-4").val();
            var list5 = [];
            var list9 = [];

            $.each($("#tbody-5 tr"), function (index, data) {
                list5.push($(data).attr("id"));
            });

            alert(list5);

            $.each($("#tbody-9 tr"), function (index, data) {
                list9.push($(data).attr("id"));

            });

            alert(list9);

            alert(asunto);

            ajaxInsert4(asunto, list5, list9);
        }

        function ajaxInsert4(concern, describedByQA, describedByFR)
        {
            $.ajax({
                url: "WikiWeb/concern/insert",
                data: {
                    concern: concern,
                    describedByQA: describedByQA,
                    describedByFR: describedByFR
                },
                method: "POST"
            }).done(function () {
                alert("Incerto el artefacto");
            }).fail(function (jrxml, errorThrow) {
                alert("Error no se pudo insertar el artefacto");
            });
        }

        function ajaxSelectAll5(callback)
        {
            $.ajax({
                url: "WikiWeb/qualityAttribute/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                callback(data);
            }).fail(function (jrxml, errorThrow) {
                callback(null);
            });
        }

        function ajaxSelectAll9(callback)
        {
            $.ajax({
                url: "WikiWeb/functionalRequeriment/selectAll",
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




