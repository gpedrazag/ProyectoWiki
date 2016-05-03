(function ($) {

    $.fn.wikiModificarCriterio = function (id) {

        if (id === "c-6") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario De Modificacion");
            $("#panel-heading-left").html("Criterio");
            $("#panel-heading-right").html("Relaciones");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");

            $("#row-content")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Criterio"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-6-tp"})
                                    .append($("<option>").html("..."))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Criterio que que va a modificar."))
                            );

            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Palabra clave"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-1-6"}))
                            .append($("<p>").addClass("help-block").html("Ingreses Palabra clave del Criterio."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Descripción"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-2-6"}))
                            .append($("<p>").addClass("help-block").html("Ingreses la Descripción del Criterio."))
                            )
                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Evaluación"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-8"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Evaluación que tiene relación con el Criterio."))
                            )
                    ;
            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-8"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Evaluación"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-8"})

                                                    )
                                            )
                                    )
                            );

            ajaxSelectAll6(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-6-tp").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "6"}));
                });
            });

            ajaxSelectAll8(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-8").append($("<option>").html(data.id).attr({"value": data.id, "idClass": "8"}));
                });
            });

            $("#slc-6-tp").on("change", eventLoad);
            $("#slc-8").on("change", eventSelected);

        }

        function eventSelected() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");

            if (idClassOptionSelected === "8") {

                $("#slc-8 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-8 option:selected").addClass("hidden");
                $("#slc-8 option[value=" + 0 + "]").attr("selected", true);

                $("#tbody-8")
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

            if (idClass === "8")
                $("#slc-8 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }
                });
        }

        function eventsave(event) {
            event.preventDefault();
            var PalabraClave = $("#txt-1-6").val();
            var Descripcion = $("#txt-2-6").val();
            var id = $('option:selected', "#slc-6-tp").attr("value");
            var list8 = [];

            $.each($("#tbody-8 tr"), function (index, data) {
                list8.push($(data).attr("id"));
            });

            ajaxUpdate6(id, PalabraClave, Descripcion, list8);
        }

        function eventLoad() {
            var textOptionSelected = $('option:selected', this).html();

            var id = $('option:selected', this).attr("value");
            $("#tbody-8 tr").empty();

            if (textOptionSelected === '...') {
                $("#txt-1-6").val("");
                $("#txt-2-6").val("");

                $("#tbody-8 tr").each(function (index, data) {

                    $("#slc-8 option").each(function (index, data1) {
                        if ($(data).attr("id") === $(data1).attr("value")) {
                            $(data1).removeClass("hidden");
                        }
                    });
                });


            } else {

                ajaxSelectAll6(function (data) {
                    $.each(data, function (index, data) {

                        if (data.id == id) {
                            $("#txt-1-6").val(data.keyword);
                            $("#txt-2-6").val(data.description);

                            if (data.linkedEvaluations !== undefined) {

                                $("#tbody-8")
                                        .append($("<tr>").attr({"id": data.linkedEvaluations.id, "value": "8"})
                                                .append($("<td>").html(data.linkedEvaluations.id).attr({"width": "80%"}))
                                                .append($("<td>")
                                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                                )
                                                        )
                                                );

                                $("#tbody-8 tr").each(function (index, data) {

                                    $("#slc-8 option").each(function (index, data1) {
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

        function ajaxUpdate6(id, keyword, description, linkedEvaluations)
        {
            $.ajax({
                url: "WikiWeb/criteria/update",
                data: {
                    id: id,
                    keyword: keyword,
                    description: description,
                    linkedEvaluations: JSON.stringify(linkedEvaluations)
                },
                method: "POST"
            }).done(function () {
                alert("Incerto");
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
            });
        }

        function ajaxSelectAll6(callback)
        {
            $.ajax({
                url: "WikiWeb/criteria/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                callback(data);
            }).fail(function (jrxml, errorThrow) {
                callback(null);
            });
        }

        function ajaxSelectAll8(callback)
        {
            $.ajax({
                url: "WikiWeb/evaluation/selectAll",
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




