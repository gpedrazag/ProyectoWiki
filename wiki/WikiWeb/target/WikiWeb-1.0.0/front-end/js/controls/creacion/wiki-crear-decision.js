(function ($) {

    $.fn.wikiCrearDecision = function (id) {


        if (id === "c-7") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
            $("#panel-heading-left").html("Decisión");
            $("#panel-heading-right").html("Relaciones");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");


            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Nombre"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-1-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Nombre de la Decisión."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Argumento"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-2-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Argumento de la Decisión."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Estado"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-3-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Estado de la Decisión."))
                            )
                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row")
//                    .append($("<div>").addClass("form-group")
//                            .append($("<label>").html("Decisión compatible"))
//                            .append($("<select>").addClass("form-control").attr({"id": "slc-7_1"})
//                                    .append($("<option>").html("...").attr({"value": "0"}))
//                                    )
//                            .append($("<p>").addClass("help-block").html("Seleccione la Decisión compatible"))
//                            )
//                    .append($("<div>").addClass("form-group")
//                            .append($("<label>").html("Decisión No compatible"))
//                            .append($("<select>").addClass("form-control").attr({"id": "slc-7_2"})
//                                    .append($("<option>").html("...").attr({"value": "0"}))
//                                    )
//                            .append($("<p>").addClass("help-block").html("Seleccione la Decisión compatible"))
//                            )
//                    .append($("<div>").addClass("form-group")
//                            .append($("<label>").html("Decisión se descompone"))
//                            .append($("<select>").addClass("form-control").attr({"id": "slc-7_3"})
//                                    .append($("<option>").html("...").attr({"value": "0"}))
//                                    )
//                            .append($("<p>").addClass("help-block").html("Seleccione la Decisión en que se descompone"))
//                            )
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
//                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-7_1"})
//                                    .append($("<table>").addClass("table table-hover")
//                                            .append($("<thead>")
//                                                    .append($("<tr>").addClass("active")
//                                                            .append($("<th>").html("Dec compatible"))
//                                                            .append($("<th>"))
//                                                            )
//                                                    )
//                                            .append($("<tbody>").attr({"id": "tbody-7_1"})
//
//                                                    )
//                                            )
//                                    )
//
//                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-7_2"})
//                                    .append($("<table>").addClass("table table-hover")
//                                            .append($("<thead>")
//                                                    .append($("<tr>").addClass("active")
//                                                            .append($("<th>").html("Dec No compatible"))
//                                                            .append($("<th>"))
//                                                            )
//                                                    )
//                                            .append($("<tbody>").attr({"id": "tbody-7_2"})
//
//                                                    )
//                                            )
//                                    )
//                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-7_3"})
//                                    .append($("<table>").addClass("table table-hover")
//                                            .append($("<thead>")
//                                                    .append($("<tr>").addClass("active")
//                                                            .append($("<th>").html("Dec descomponer"))
//                                                            .append($("<th>"))
//                                                            )
//                                                    )
//                                            .append($("<tbody>").attr({"id": "tbody-7_3"})
//
//                                                    )
//                                            )
//                                    )
//                            )
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


//            $.each(des, function (index, data) {
//                $("#slc-7_1").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "7_1"}));
//            });
//
//            $.each(des, function (index, data) {
//                $("#slc-7_2").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "7_2"}));
//            });
//
//            $.each(des, function (index, data) {
//                $("#slc-7_3").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "7_3"}));
//            });

            ajaxSelectAll10(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-10").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "10"}));
                });
            });

            ajaxSelectAll4(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-4").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "4"}));
                });
            });

            ajaxSelectAll6(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-6").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "6"}));
                });
            });

            ajaxSelectAll13(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-13").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "13"}));
                });
            });

            ajaxSelectAll11(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-11").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "11"}));
                });
            });

            ajaxSelectAll12(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-12").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "12"}));
                });
            });

            ajaxSelectAll1(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-1").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "1"}));
                });
            });



            $("#slc-7_1").on("change", eventSelected);
            $("#slc-7_2").on("change", eventSelected);
            $("#slc-7_3").on("change", eventSelected);
            $("#slc-2").on("change", eventSelected);
            $("#slc-10").on("change", eventSelected);
            $("#slc-4").on("change", eventSelected);
            $("#slc-6").on("change", eventSelected);
            $("#slc-13").on("change", eventSelected);
            $("#slc-11").on("change", eventSelected);
            $("#slc-12").on("change", eventSelected);
            $("#slc-1").on("change", eventSelected);
            $("#slc-3").on("change", eventSelected);

        }


        function eventSelected() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");


//            if (idClassOptionSelected === "7_1") {
//
//                $("#slc-7_1 option[value=" + 0 + "]").attr("selected", false);
//                $("#slc-7_1 option:selected").addClass("hidden");
//                $("#slc-7_1 option[value=" + 0 + "]").attr("selected", true);
//
//
//
//                $("#tbody-7_1")
//                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
//                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
//                                .append($("<td>")
//                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
//                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
//                                                )
//                                        )
//                                );
//
//            }
//
//           
//            if (idClassOptionSelected === "7_2") {
//
//                $("#slc-7_2 option[value=" + 0 + "]").attr("selected", false);
//                $("#slc-7_2 option:selected").addClass("hidden");
//                $("#slc-7_2 option[value=" + 0 + "]").attr("selected", true);
//
//
//
//                $("#tbody-7_2")
//                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
//                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
//                                .append($("<td>")
//                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
//                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
//                                                )
//                                        )
//                                );
//
//            }
//
//            //llena la tabla de artefactos
//            if (idClassOptionSelected === "7_3") {
//
//                $("#slc-7_3 option[value=" + 0 + "]").attr("selected", false);
//                $("#slc-7_3 option:selected").addClass("hidden");
//                $("#slc-7_3 option[value=" + 0 + "]").attr("selected", true);
//
//
//
//                $("#tbody-7_3")
//                        .append($("<tr>").attr({"id": idOptionSelected, "value": idClassOptionSelected})
//                                .append($("<td>").html(textOptionSelected).attr({"width": "80%"}))
//                                .append($("<td>")
//                                        .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
//                                                .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
//                                                )
//                                        )
//                                );
//
//            }


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

//            if (idClass === "7_1")
//                $("#slc-7_1 option").each(function () {
//
//                    if (tableId === $(this).attr("value")) {
//                        $(this).removeClass("hidden");
//                    }
//
//                });
//
//            if (idClass === "7_2")
//                $("#slc-7_2 option").each(function () {
//
//                    if (tableId === $(this).attr("value")) {
//                        $(this).removeClass("hidden");
//                    }
//
//                });
//
//            if (idClass === "7_3")
//                $("#slc-7_3 option").each(function () {
//
//                    if (tableId === $(this).attr("value")) {
//                        $(this).removeClass("hidden");
//                    }
//
//                });

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


        //evento que guarda los datos de una atributo de calidad
        function eventsave(event) {
            event.preventDefault();
            var Nombre = $("#txt-1-7").val();
            var Argumento = $("#txt-2-7").val();
            var estado = $("#txt-3-7").val();
//            var list7_1 = [];
//            var list7_2 = [];
//            var list7_3 = [];
            var list10 = [];
            var list4 = [];
            var list6 = [];
            var list13 = [];
            var list11 = [];
            var list12 = [];
            var list1 = [];

//            $.each($("#tbody-7_1 tr"), function (index, data) {
//                list7_1.push($(data).attr("id"));
//
//            });
//
//            alert(list7_1);
//
//            $.each($("#tbody-7_2 tr"), function (index, data) {
//                list7_2.push($(data).attr("id"));
//
//            });
//
//            alert(list7_2);
//
//            $.each($("#tbody-7_3 tr"), function (index, data) {
//                list7_3.push($(data).attr("id"));
//
//            });
//
//            alert(list7_3);


            $.each($("#tbody-10 tr"), function (index, data) {
                list10.push($(data).attr("id"));

            });

            alert(list10);

            $.each($("#tbody-4 tr"), function (index, data) {
                list4.push($(data).attr("id"));

            });

            alert(list4);

            $.each($("#tbody-6 tr"), function (index, data) {
                list6.push($(data).attr("id"));

            });

            alert(list6);

            $.each($("#tbody-13 tr"), function (index, data) {
                list13.push($(data).attr("id"));

            });

            alert(list13);

            $.each($("#tbody-11 tr"), function (index, data) {
                list11.push($(data).attr("id"));

            });

            alert(list11);

            $.each($("#tbody-12 tr"), function (index, data) {
                list12.push($(data).attr("id"));

            });

            alert(list12);

            $.each($("#tbody-1 tr"), function (index, data) {
                list1.push($(data).attr("id"));

            });

            alert(list1);

            alert(Nombre + " " + Argumento + " " + estado);

            ajaxInsert7(Nombre, Argumento, estado, list11, list6, list13, list4, list10, list1, list12);
        }

        function ajaxInsert7(id, name, argumen, state, mayHaveConstraints, haveCriterias, mayHaveAssumptions, haveAsTriggerConcerns, haveResponsibles, haveAlternatives, haveSolution)
        {
            $.ajax({
                url: "WikiWeb/decision/insert",
                data: {
                    id: id,
                    name: name,
                    argumen: argumen,
                    state: state,
                    mayHaveConstraints: mayHaveConstraints,
                    haveCriterias: haveCriterias,
                    mayHaveAssumptions: mayHaveAssumptions,
                    haveAsTriggerConcerns: haveAsTriggerConcerns,
                    haveResponsibles: haveResponsibles,
                    haveAlternatives: haveAlternatives,
                    haveSolution: haveSolution
                },
                method: "POST"
            }).done(function () {
                alert("Incerto la alternativa");
            }).fail(function (jrxml, errorThrow) {
                alert("Error no se pudo insertar la alternativa");
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




