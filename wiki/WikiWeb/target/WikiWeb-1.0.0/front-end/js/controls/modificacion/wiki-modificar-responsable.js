(function ($) {

    $.fn.wikiModificarResponsable = function (id) {

        if (id === "m-10") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creaModificacioncion");
            $("#panel-heading-left").html("Responsable");
            $("#panel-heading-right").html("Relaciones");

            $("#panel-heading-left").removeClass("hidden");
            $("#panel-heading-right").removeClass("hidden");
            $("#left-row").removeClass("hidden");
            $("#right-row").removeClass("hidden");

            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");
            $("#save-relations").removeClass("hidden");

            $("#row-content")
                    .append($("<div>").addClass("form-group").attr({"id": "frm-3"})
                            .append($("<label>").html("Responsable"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-10-tp"})
                                    .append($("<option>").html("...").attr({"value":"0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Responsable que que va a modificar."))
                            );

            $("#left-row")
                    .append($("<div>").addClass("form-group").attr({"id": "frm-1"})
                            .append($("<label>").html("Nombre"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-1-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Nombre del Responsable."))
                            )

                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

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


            ajaxSelectAll10(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-10-tp").append($("<option>").html("Responsable " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "10"}));
                });
            });

            ajaxSelectAll7(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-7").append($("<option>").html("Decision " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "7"}));
                });
            });

            $("#slc-10-tp").on("change", eventLoad);
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

        function eventsave(event) {
            event.preventDefault();
            var name = $("#txt-1-7").val();
            var id = $('option:selected', "#slc-2-tp").attr("value");

            var list7 = [];

            $.each($("#tbody-7 tr"), function (index, data) {
                list7.push($(data).attr("id"));

            });

            ajaxUpdate10(id, name, list7);
        }

        function eventLoad() {
            var textOptionSelected = $('option:selected', this).html();

            var id = $('option:selected', this).attr("value");
            $("#tbody-7 tr").empty();

            if (textOptionSelected === '...') {
                $("#txt-1-7").val("");
              
                $("#tbody-7 tr").each(function (index, data) {

                    $("#slc-7 option").each(function (index, data1) {
                        if ($(data).attr("id") === $(data1).attr("value")) {
                            $(data1).removeClass("hidden");
                        }
                    });
                });


            } else {

                ajaxSelectAll10(function (data) {
                    $.each(data, function (index, data) {

                        if (data.id == id) {
                            $("#txt-1-7").val(data.name);
                           
                            if (data.haveDecisions !== undefined) {

                                $("#tbody-7")
                                        .append($("<tr>").attr({"id": data.linkedEvaluations.id, "value": "8"})
                                                .append($("<td>").html(data.linkedEvaluations.id).attr({"width": "80%"}))
                                                .append($("<td>")
                                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                                )
                                                        )
                                                );

                                $("#tbody-7 tr").each(function (index, data) {

                                    $("#slc-7 option").each(function (index, data1) {
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

        function ajaxUpdate10(id, name, decisions)
        {
            $.ajax({
                url: "WikiWeb/responsible/update",
                data: {
                    id: id,
                    name: name,
                    description: JSON.stringify(decisions)
                },
                method: "POST"
            }).done(function () {
                swal({title: "Modificacion Compeltada!!!", text: "Se modifico correctamente el responsable", timer: 2000, showConfirmButton: false, type: "success"});
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

        function ajaxSelectAll10(callback)
        {
            $.ajax({
                url: "WikiWeb/responsible/selectAll",
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




