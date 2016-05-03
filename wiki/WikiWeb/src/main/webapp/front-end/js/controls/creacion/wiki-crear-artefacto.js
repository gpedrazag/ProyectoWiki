(function ($) {

    $.fn.wikiCrearArtefacto = function (id) {

        if (id === "c-3") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
            $("#panel-heading-left").html("Artefacto");
            $("#panel-heading-right").html("Relaciones");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");

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
                    .append($("<button>").attr({"id": "btn-3"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row")
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

            ajaxSelectAll7(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-7").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "7"}));
                });
            });

            $("#slc-7").on("change", eventSelected);
        }

        function eventSelected() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");

            if (idClassOptionSelected === "7") {

                $("#slc-7 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-7 option:selected").addClass("hidden");
                $("#slc-7 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-7")
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

            if (idClass === "7") {
                $("#slc-7 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
            }

        }

        function eventsave(event) {

            event.preventDefault();
            var id = $("#txt-3").val();
            var description = $("#txt-area-3").val();
            var list7 = [];

            $.each($("#tbody-7 tr"), function (index, data) {
                list7.push($(data).attr("id"));

            });

            ajaxInsert3(id, description, list7);
        }

        function ajaxInsert3(id, description, decision)
        {
            $.ajax({
                url: "WikiWeb/artifact/insert",
                data: {
                    id: id,
                    description: description,
                    decision: JSON.stringify(decision)
                },
                method: "POST"
            }).done(function () {
                alert("Creo");
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
            });
        }

        function ajaxSelectAll7(callback)
        {
            $.ajax({
                url: "WikiWeb/decision/selectAll",
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




