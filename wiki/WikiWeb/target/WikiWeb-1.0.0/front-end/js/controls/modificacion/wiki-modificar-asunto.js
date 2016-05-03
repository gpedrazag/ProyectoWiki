(function ($) {

    $.fn.wikiModificarAsunto = function (id) {

        if (id === "c-4") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de Modificacion");
            $("#panel-heading-left").html("Asunto");
            $("#panel-heading-right").html("Relaciones");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");

            $("#row-content")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Asunto"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-4-tp"})
                                    .append($("<option>").html("..."))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Asunto que que va a modificar."))
                            );

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

            ajaxSelectAll4(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-4-tp").append($("<option>").html(data.id).attr({"value": data.id, "idClass": "4"}));
                });
            });

            ajaxSelectAll5(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-5").append($("<option>").html(data.id).attr({"value": data.id, "idClass": "5"}));
                });
            });

            ajaxSelectAll9(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-9").append($("<option>").html(data.id).attr({"value": data.id, "idClass": "9"}));
                });
            });


            $("#slc-4-tp").on("change", eventLoad);
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

        function eventsave(event) {
            event.preventDefault();
            var asunto = $("#txt-4").val();
            var id = $('option:selected', "#slc-4-tp").attr("value");
            var list5 = [];
            var list9 = [];

            $.each($("#tbody-5 tr"), function (index, data) {
                list5.push($(data).attr("id"));
            });

            $.each($("#tbody-9 tr"), function (index, data) {
                list9.push($(data).attr("id"));

            });

            ajaxUpdate4(id,asunto, list5, list9);
        }

        function eventLoad() {
            var textOptionSelected = $('option:selected', this).html();
            var id = $('option:selected', this).attr("value");
            $("#tbody-5 tr").empty();
            $("#tbody-9 tr").empty();

            if (textOptionSelected === '...') {
                $("#txt-4").val("");

                $("#tbody-5 tr").each(function (index, data) {

                    $("#slc-5 option").each(function (index, data1) {
                        if ($(data).attr("id") === $(data1).attr("value")) {
                            $(data1).removeClass("hidden");
                        }
                    });
                });

                $("#tbody-9 tr").each(function (index, data) {

                    $("#slc-9 option").each(function (index, data1) {
                        if ($(data).attr("id") === $(data1).attr("value")) {
                            $(data1).removeClass("hidden");
                        }
                    });
                });


            } else {

                ajaxSelectAll2(function (data) {
                    $.each(data, function (index, data) {

                        if (data.id == id) {
                            $("#txt-4").val(data.name);

                            if (data.describedByQA !== undefined) {
                                $("#tbody-5")
                                        .append($("<tr>").attr({"id": data.describedByQA.id, "value": "8"})
                                                .append($("<td>").html(data.describedByQA.id).attr({"width": "80%"}))
                                                .append($("<td>")
                                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                                )
                                                        )
                                                );

                                $("#tbody-5 tr").each(function (index, data) {

                                    $("#slc-5 option").each(function (index, data1) {
                                        if ($(data).attr("id") === $(data1).attr("value")) {
                                            $(data1).addClass("hidden");
                                        }
                                    });
                                });
                            }

                            if (data.describedByFR !== undefined) {
                                $("#tbody-9")
                                        .append($("<tr>").attr({"id": data.describedByFR.id, "value": "8"})
                                                .append($("<td>").html(data.describedByFR.id).attr({"width": "80%"}))
                                                .append($("<td>")
                                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                                )
                                                        )
                                                );

                                $("#tbody-9 tr").each(function (index, data) {

                                    $("#slc-9 option").each(function (index, data1) {
                                        if ($(data).attr("id") === $(data1).attr("value")) {
                                            $(data1).addClass("hidden");
                                        }
                                    });
                                });
                            }
                        }
                    });
                });
            }
        }

        function ajaxUpdate4(id, concern, describedByQA, describedByFR)
        {
            $.ajax({
                url: "WikiWeb/concern/update",
                data: {
                    id: id,
                    concern: concern,
                    describedByQA: JSON.stringify(describedByQA),
                    describedByFR: JSON.stringify(describedByFR)
                },
                method: "POST"
            }).done(function () {
                alert("Creo");
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
            });
        }
        
        function ajaxSelectAll4(callback)
        {
            $.ajax({
                url: "WikiWeb/concern/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                callback(data);
            }).fail(function (jrxml, errorThrow) {
                callback(null);
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




