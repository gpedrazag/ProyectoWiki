(function ($) {

    $.fn.wikiModificarArquitectura = function (id) {

        if (id === "m-2") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de Modificacion");
            $("#panel-heading-left").html("Alternativa");
            $("#panel-heading-right").html("Relaciones");

            $("#panel-heading-left").removeClass("hidden");
            $("#panel-heading-right").removeClass("hidden");
            $("#left-row").removeClass("hidden");
            $("#right-row").removeClass("hidden");

            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");

            $("#row-content")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Arquitectura De Software"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-2-tp"})
                                    .append($("<option>").html("..."))

                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Arquitectura De Software que que va a modificar."))
                            );

            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Nombre"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-2"}))
                            .append($("<p>").addClass("help-block").html("Ingreses el nombre de la Arquitectura."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Descripción"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-area-2"}))
                            .append($("<p>").addClass("help-block").html("Ingreses la descripción de la Arquitectura."))
                            )
                    .append($("<button>").attr({"id": "btn-2"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Artefacto"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-3"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Artefacto que tiene relación con la Arquitectura."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Decisión"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-7"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Decisión que tiene relación con la Arquitectura."))
                            )
                    ;
            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-3"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Artefactos"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-3"})

                                                    )
                                            )
                                    )

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

            ajaxSelectAll2(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-2-tp").append($("<option>").html(data.name).attr({"value": data.name, "idClass": "2"}));
                });
            });

            ajaxSelectAll3(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-3").append($("<option>").html(data.id).attr({"value": data.id, "idClass": "3"}));
                });
            });

            ajaxSelectAll7(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-7").append($("<option>").html(data.id).attr({"value": data.id, "idClass": "7"}));
                });
            });

            $("#slc-2-tp").on("change", eventLoad);
            $("#slc-3").on("change", eventSelected);
            $("#slc-7").on("change", eventSelected);

        }

        function eventRemove() {
            $(this).parent().parent().remove();
            var tableId = $(this).parent().parent().attr("id");
            var idClass = $(this).parent().parent().attr("value");

            if (idClass === "3") {
                $("#slc-3 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
            }

            if (idClass === "7") {
                $("#slc-7 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
            }

        }


        function eventSelected() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");

            if (idClassOptionSelected === "3") {

                $("#slc-3 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-3 option:selected").addClass("hidden");
                $("#slc-3 option[value=" + 0 + "]").attr("selected", true);



                $("#tbody-3")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
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
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );

            }
        }

        function eventsave(event) {

            event.preventDefault();

            var name = $("#txt-2").val();
            var description = $("#txt-area-2").val();
            var id = $('option:selected', "#slc-2-tp").attr("value");
            var list3 = [];
            var list7 = [];

            $.each($("#tbody-3 tr"), function (index, data) {
                list3.push($(data).attr("id"));

            });

            $.each($("#tbody-7 tr"), function (index, data) {
                list7.push($(data).attr("id"));

            });

            ajaxUpdate2(id, name, description, list3, list7);
        }

        function eventLoad() {
            var textOptionSelected = $('option:selected', this).html();
            var id = $('option:selected', this).attr("value");
            $("#tbody-3 tr").empty();
            $("#tbody-7 tr").empty();

            if (textOptionSelected === '...') {
                $("#txt-2").val("");
                $("#txt-area-2").val("");

                $("#tbody-3 tr").each(function (index, data) {

                    $("#slc-3 option").each(function (index, data1) {
                        if ($(data).attr("id") === $(data1).attr("value")) {
                            $(data1).removeClass("hidden");
                        }
                    });
                });

                $("#tbody-7 tr").each(function (index, data) {

                    $("#slc-7 option").each(function (index, data1) {
                        if ($(data).attr("id") === $(data1).attr("value")) {
                            $(data1).removeClass("hidden");
                        }
                    });
                });


            } else {

                ajaxSelectAll2(function (data) {
                    $.each(data, function (index, data) {

                        if (data.id == id) {
                            $("#txt-2").val(data.name);
                            $("#txt-area-2").val(data.description);

                            if (data.relatedArtifacts !== undefined) {
                                $("#tbody-3")
                                        .append($("<tr>").attr({"id": data.relatedArtifacts.id, "value": "8"})
                                                .append($("<td>").html(data.relatedArtifacts.id).attr({"width": "80%"}))
                                                .append($("<td>")
                                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                                )
                                                        )
                                                );

                                $("#tbody-3 tr").each(function (index, data) {

                                    $("#slc-3 option").each(function (index, data1) {
                                        if ($(data).attr("id") === $(data1).attr("value")) {
                                            $(data1).addClass("hidden");
                                        }
                                    });
                                });
                            }

                            if (data.decisionsRelated !== undefined) {
                                $("#tbody-7")
                                        .append($("<tr>").attr({"id": data.decisionsRelated.id, "value": "8"})
                                                .append($("<td>").html(data.decisionsRelated.name).attr({"width": "80%"}))
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

        function ajaxUpdate2(id, name, description, relatedArtifacts, decisionsRelated)
        {
            $.ajax({
                url: "WikiWeb/SoftwareArchitecture/update",
                data: {
                    id: id,
                    name: name,
                    description: description,
                    relatedArtifacts: JSON.stringify(relatedArtifacts),
                    decisionsRelated: JSON.stringify(decisionsRelated)
                },
                method: "POST"
            }).done(function () {
                alert("Incerto la alternativa");
            }).fail(function (jrxml, errorThrow) {
                alert("Error no se pudo insertar la alternativa");
            });
        }

        function ajaxSelectAll2(callback)
        {
            $.ajax({
                url: "WikiWeb/SoftwareArchitecture/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                callback(data);
            }).fail(function (jrxml, errorThrow) {
                callback(null);
            });
        }

        function ajaxSelectAll3(callback)
        {
            $.ajax({
                url: "WikiWeb/artifact/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                callback(data);
            }).fail(function (jrxml, errorThrow) {
                callback(null);
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




