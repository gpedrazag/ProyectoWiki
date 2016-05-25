(function ($) {

    $.fn.wikiModificarDecision = function (id) {

        if (id === "m-7") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de Modificacion");
            $("#panel-heading-left").html("Decision");
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
                            .append($("<label>").html("Decisión"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-7-tp"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Decisión que que va a modificar."))
                            );

            $("#left-row")
                    .append($("<div>").addClass("form-group").attr({"id": "frm-1"})
                            .append($("<label>").html("Nombre"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-1-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Nombre de la Decisión."))
                            )
                    .append($("<div>").addClass("form-group").attr({"id": "frm-2"})
                            .append($("<label>").html("Argumento"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-2-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Argumento de la Decisión."))
                            )
                    .append($("<div>").addClass("form-group").attr({"id": "frm-3"})
                            .append($("<label>").html("Estado"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-3-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Estado de la Decisión."))
                            )
                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Responsable"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-10"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Responsable que tiene relacion con la Decisión."))
                            )

                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Asunto"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-4"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Asunto que tiene relacion con la Decisión."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Criterio"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-6"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Criterio  que tiene relacion con la Decisión."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Suposición"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-13"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Suposición que tiene relacion con la Decisión."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Restricción"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-11"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Restricción que tiene relacion con la Decisión."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Solución"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-12"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Solución que tiene relacion con la Decisión."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Alternativa"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-1"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Alternativa que tiene relacion con la Decisión."))
                            )
                    ;
            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")

                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-10"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Responsable"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-10"})

                                                    )
                                            )
                                    )
                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-4"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Asunto"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-4"})

                                                    )
                                            )
                                    )
                            )
                    .append($("<div>").addClass("col-lg-12")
                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-6"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Criterio"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-6"})

                                                    )
                                            )
                                    )
                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-13"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Suposición"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-13"})

                                                    )
                                            )
                                    )
                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-11"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Restricción"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-11"})

                                                    )
                                            )
                                    )
                            )
                    .append($("<div>").addClass("col-lg-12")
                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-12"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Solución"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-12"})

                                                    )
                                            )
                                    )
                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-1"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Alternativa"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-1"})

                                                    )
                                            )
                                    )
                            );

            ajaxSelectAll7(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-7-tp").append($("<option>").html("Decision " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "7"}));
                });
            });

            ajaxSelectAll10(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-10").append($("<option>").html("Responsable " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "10"}));
                });
            });

            ajaxSelectAll4(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-4").append($("<option>").html("Asunto " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "4"}));
                });
            });

            ajaxSelectAll6(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-6").append($("<option>").html("Criterio " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "6"}));
                });
            });

            ajaxSelectAll13(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-13").append($("<option>").html("Suposicion " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "13"}));
                });
            });

            ajaxSelectAll11(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-11").append($("<option>").html("Restriccion " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "11"}));
                });
            });

            ajaxSelectAll12(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-12").append($("<option>").html("Solucion " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "12"}));
                });
            });

            ajaxSelectAll1(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-1").append($("<option>").html("Alternativa " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "1"}));
                });
            });

            $("#slc-2-tp").on("change", eventLoad);
            $("#slc-10").on("change", eventSelected);
            $("#slc-4").on("change", eventSelected);
            $("#slc-6").on("change", eventSelected);
            $("#slc-13").on("change", eventSelected);
            $("#slc-11").on("change", eventSelected);
            $("#slc-12").on("change", eventSelected);
            $("#slc-1").on("change", eventSelected);

        }


        function eventSelected() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");

            if (idClassOptionSelected === "10") {

                $("#slc-10 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-10 option:selected").addClass("hidden");
                $("#slc-10 option[value=" + 0 + "]").attr("selected", true);

                $("#tbody-10")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );
            }

            if (idClassOptionSelected === "4") {

                $("#slc-4 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-4 option:selected").addClass("hidden");
                $("#slc-4 option[value=" + 0 + "]").attr("selected", true);

                $("#tbody-4")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );
            }

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

            if (idClassOptionSelected === "13") {

                $("#slc-13 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-13 option:selected").addClass("hidden");
                $("#slc-13 option[value=" + 0 + "]").attr("selected", true);

                $("#tbody-13")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );
            }

            if (idClassOptionSelected === "11") {

                $("#slc-11 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-11 option:selected").addClass("hidden");
                $("#slc-11 option[value=" + 0 + "]").attr("selected", true);

                $("#tbody-11")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );
            }

            if (idClassOptionSelected === "12") {

                $("#slc-12 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-12 option:selected").addClass("hidden");
                $("#slc-12 option[value=" + 0 + "]").attr("selected", true);

                $("#tbody-12")
                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
                                .append($("<td>")
                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                )
                                        )
                                );
            }

            if (idClassOptionSelected === "1") {

                $("#slc-1 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-1 option:selected").addClass("hidden");
                $("#slc-1 option[value=" + 0 + "]").attr("selected", true);

                $("#tbody-1")
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

            if (idClass === "10")
                $("#slc-10 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });

            if (idClass === "4")
                $("#slc-4 option").each(function () {

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

            if (idClass === "13")
                $("#slc-13 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });

            if (idClass === "11")
                $("#slc-11 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });

            if (idClass === "12")
                $("#slc-12 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });

            if (idClass === "1")
                $("#slc-1 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
        }


        function eventsave(event) {

            var id = $('option:selected', "#slc-7-tp").attr("value");
            event.preventDefault();
            var Nombre = $("#txt-1-7").val();
            var Argumento = $("#txt-2-7").val();
            var estado = $("#txt-3-7").val();
            var list10 = [];
            var list4 = [];
            var list6 = [];
            var list13 = [];
            var list11 = [];
            var list12 = "";
            var list1 = [];

            $.each($("#tbody-10 tr"), function (index, data) {
                list10.push($(data).attr("id"));

            });

            $.each($("#tbody-4 tr"), function (index, data) {
                list4.push($(data).attr("id"));

            });

            $.each($("#tbody-6 tr"), function (index, data) {
                list6.push($(data).attr("id"));

            });

            $.each($("#tbody-13 tr"), function (index, data) {
                list13.push($(data).attr("id"));

            });

            $.each($("#tbody-11 tr"), function (index, data) {
                list11.push($(data).attr("id"));

            });

            $.each($("#tbody-12 tr"), function (index, data) {
                list12.push($(data).attr("id"));

            });

            $.each($("#tbody-1 tr"), function (index, data) {
                list1.push($(data).attr("id"));

            });

            var ok = true;

            if (Nombre == "")
            {
                $("#frm-1").addClass("has-error");
                ok = false;
            } else {
                $("#frm-1").removeClass("has-error");
            }

            if (Argumento == "")
            {
                $("#frm-2").addClass("has-error");
                ok = false;
            } else {
                $("#frm-2").removeClass("has-error");
            }

            if (estado == "")
            {
                $("#frm-3").addClass("has-error");
                ok = false;
            } else {
                $("#frm-3").removeClass("has-error");
            }

            if (ok == true) {

                ajaxUpdate7(id, Nombre, Argumento, estado, list11, list6, list13, list4, list10, list1, list12);

                $("#txt-1-7").val("");
                $("#txt-2-7").val("");
                $("#txt-3-7").val("");
                $("#tbody-10").empty();
                $("#tbody-4").empty();
                $("#tbody-6").empty();
                $("#tbody-13").empty();
                $("#tbody-11").empty();
                $("#tbody-12").empty();
                $("#tbody-1").empty();

                $("#slc-10 option").removeClass("hidden");
                $("#slc-4 option").removeClass("hidden");
                $("#slc-6 option").removeClass("hidden");
                $("#slc-13 option").removeClass("hidden");
                $("#slc-12 option").removeClass("hidden");
                $("#slc-11 option").removeClass("hidden");
                $("#slc-1 option").removeClass("hidden");

                $("#slc-7-tp option[value=" + 0 + "]").attr("selected", false);
                $("#slc-7-tp option[value=" + 0 + "]").attr("selected", true);

            }

        }


        function eventLoad() {
            var textOptionSelected = $('option:selected', this).html();
            var id = $('option:selected', this).attr("value");
            $("#tbody-10 tr").empty();
            $("#tbody-4 tr").empty();
            $("#tbody-6 tr").empty();
            $("#tbody-13 tr").empty();
            $("#tbody-11 tr").empty();
            $("#tbody-12 tr").empty();
            $("#tbody-1 tr").empty();


            if (textOptionSelected === '...') {
                $("#txt-1-7").val("");
                $("#txt-2-7").val("");
                $("#txt-3-7").val("");

                $("#tbody-10 tr").each(function (index, data) {

                    $("#slc-10 option").each(function (index, data1) {
                        if ($(data).attr("id") === $(data1).attr("value")) {
                            $(data1).removeClass("hidden");
                        }
                    });
                });

                $("#tbody-4 tr").each(function (index, data) {

                    $("#slc-4 option").each(function (index, data1) {
                        if ($(data).attr("id") === $(data1).attr("value")) {
                            $(data1).removeClass("hidden");
                        }
                    });
                });

                $("#tbody-6 tr").each(function (index, data) {

                    $("#slc-6 option").each(function (index, data1) {
                        if ($(data).attr("id") === $(data1).attr("value")) {
                            $(data1).removeClass("hidden");
                        }
                    });
                });

                $("#tbody-13 tr").each(function (index, data) {

                    $("#slc-13 option").each(function (index, data1) {
                        if ($(data).attr("id") === $(data1).attr("value")) {
                            $(data1).removeClass("hidden");
                        }
                    });
                });

                $("#tbody-11 tr").each(function (index, data) {

                    $("#slc-11 option").each(function (index, data1) {
                        if ($(data).attr("id") === $(data1).attr("value")) {
                            $(data1).removeClass("hidden");
                        }
                    });
                });

                $("#tbody-12 tr").each(function (index, data) {

                    $("#slc-12 option").each(function (index, data1) {
                        if ($(data).attr("id") === $(data1).attr("value")) {
                            $(data1).removeClass("hidden");
                        }
                    });
                });

                $("#tbody-1 tr").each(function (index, data) {

                    $("#slc-1 option").each(function (index, data1) {
                        if ($(data).attr("id") === $(data1).attr("value")) {
                            $(data1).removeClass("hidden");
                        }
                    });
                });


            } else {

                ajaxSelectAll7(function (data) {
                    $.each(data, function (index, data) {

                        if (data.id == id) {
                            $("#txt-1-7").val(data.nombre);
                            $("#txt-2-7").val(data.arguments);
                            $("#txt-3-7").val(data.state);

                            if (data.haveResponsibles !== undefined) {
                                $("#tbody-10")
                                        .append($("<tr>").attr({"id": data.mayHaveConstraints.id, "value": "8"})
                                                .append($("<td>").html(data.mayHaveConstraints.id).attr({"width": "80%"}))
                                                .append($("<td>")
                                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                                )
                                                        )
                                                );

                                $("#tbody-10 tr").each(function (index, data) {

                                    $("#slc-10 option").each(function (index, data1) {
                                        if ($(data).attr("id") === $(data1).attr("value")) {
                                            $(data1).addClass("hidden");
                                        } else {
                                            $(data1).removeClass("hidden");
                                        }
                                    });
                                });
                            }

                            if (data.haveAsTriggerConcerns !== undefined) {
                                $("#tbody-4")
                                        .append($("<tr>").attr({"id": data.haveCriterias.id, "value": "8"})
                                                .append($("<td>").html(data.haveCriterias.id).attr({"width": "80%"}))
                                                .append($("<td>")
                                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                                )
                                                        )
                                                );

                                $("#tbody-4 tr").each(function (index, data) {

                                    $("#slc-4 option").each(function (index, data1) {
                                        if ($(data).attr("id") === $(data1).attr("value")) {
                                            $(data1).addClass("hidden");
                                        } else {
                                            $(data1).removeClass("hidden");
                                        }
                                    });
                                });
                            }

                            if (data.haveCriterias !== undefined) {
                                $("#tbody-6")
                                        .append($("<tr>").attr({"id": data.mayHaveAssumptions.id, "value": "8"})
                                                .append($("<td>").html(data.mayHaveAssumptions.id).attr({"width": "80%"}))
                                                .append($("<td>")
                                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                                )
                                                        )
                                                );

                                $("#tbody-6 tr").each(function (index, data) {

                                    $("#slc-6 option").each(function (index, data1) {
                                        if ($(data).attr("id") === $(data1).attr("value")) {
                                            $(data1).addClass("hidden");
                                        } else {
                                            $(data1).removeClass("hidden");
                                        }
                                    });
                                });
                            }

                            if (data.mayHaveAssumptions !== undefined) {
                                $("#tbody-13")
                                        .append($("<tr>").attr({"id": data.mayHaveAssumptions.id, "value": "8"})
                                                .append($("<td>").html(data.mayHaveAssumptions.id).attr({"width": "80%"}))
                                                .append($("<td>")
                                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                                )
                                                        )
                                                );

                                $("#tbody-13 tr").each(function (index, data) {

                                    $("#slc-13 option").each(function (index, data1) {
                                        if ($(data).attr("id") === $(data1).attr("value")) {
                                            $(data1).addClass("hidden");
                                        } else {
                                            $(data1).removeClass("hidden");
                                        }
                                    });
                                });
                            }

                            if (data.mayHaveConstraints !== undefined) {
                                $("#tbody-11")
                                        .append($("<tr>").attr({"id": data.mayHaveAssumptions.id, "value": "8"})
                                                .append($("<td>").html(data.mayHaveAssumptions.id).attr({"width": "80%"}))
                                                .append($("<td>")
                                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                                )
                                                        )
                                                );

                                $("#tbody-11 tr").each(function (index, data) {

                                    $("#slc-11 option").each(function (index, data1) {
                                        if ($(data).attr("id") === $(data1).attr("value")) {
                                            $(data1).addClass("hidden");
                                        } else {
                                            $(data1).removeClass("hidden");
                                        }
                                    });
                                });
                            }

                            if (data.haveSolution !== undefined) {
                                $("#tbody-12")
                                        .append($("<tr>").attr({"id": data.mayHaveAssumptions.id, "value": "8"})
                                                .append($("<td>").html(data.mayHaveAssumptions.id).attr({"width": "80%"}))
                                                .append($("<td>")
                                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                                )
                                                        )
                                                );

                                $("#tbody-12 tr").each(function (index, data) {

                                    $("#slc-12 option").each(function (index, data1) {
                                        if ($(data).attr("id") === $(data1).attr("value")) {
                                            $(data1).addClass("hidden");
                                        } else {
                                            $(data1).removeClass("hidden");
                                        }
                                    });
                                });
                            }

                            if (data.haveAlternatives !== undefined) {
                                $("#tbody-1")
                                        .append($("<tr>").attr({"id": data.mayHaveAssumptions.id, "value": "8"})
                                                .append($("<td>").html(data.mayHaveAssumptions.id).attr({"width": "80%"}))
                                                .append($("<td>")
                                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                                )
                                                        )
                                                );

                                $("#tbody-1 tr").each(function (index, data) {

                                    $("#slc-1 option").each(function (index, data1) {
                                        if ($(data).attr("id") === $(data1).attr("value")) {
                                            $(data1).addClass("hidden");
                                        } else {
                                            $(data1).removeClass("hidden");
                                        }
                                    });
                                });
                            }
                        }
                    });
                });
            }
        }

        function ajaxUpdate7(id, name, argumen, state, mayHaveConstraints, haveCriterias, mayHaveAssumptions, haveAsTriggerConcerns, haveResponsibles, haveAlternatives, haveSolution)
        {
            $.ajax({
                url: "WikiWeb/decision/insert",
                data: {
                    id: id,
                    name: name,
                    argumen: argumen,
                    state: state,
                    mayHaveConstraints: JSON.stringify(mayHaveConstraints),
                    haveCriterias: JSON.stringify(haveCriterias),
                    mayHaveAssumptions: JSON.stringify(mayHaveAssumptions),
                    haveAsTriggerConcerns: JSON.stringify(haveAsTriggerConcerns),
                    haveResponsibles: JSON.stringify(haveResponsibles),
                    haveAlternatives: JSON.stringify(haveAlternatives),
                    haveSolution: haveSolution
                },
                method: "POST"
            }).done(function () {
                alert("Modifico");
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

        function ajaxSelectAll13(callback)
        {
            $.ajax({
                url: "WikiWeb/assumption/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                callback(data);
            }).fail(function (jrxml, errorThrow) {
                callback(null);
            });
        }

        function ajaxSelectAll11(callback)
        {
            $.ajax({
                url: "WikiWeb/constraint/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                callback(data);
            }).fail(function (jrxml, errorThrow) {
                callback(null);
            });
        }

        function ajaxSelectAll12(callback)
        {
            $.ajax({
                url: "WikiWeb/solution/selectAll",
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                callback(data);
            }).fail(function (jrxml, errorThrow) {
                callback(null);
            });
        }

        function ajaxSelectAll1(callback)
        {
            $.ajax({
                url: "WikiWeb/alternative/selectAll",
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




