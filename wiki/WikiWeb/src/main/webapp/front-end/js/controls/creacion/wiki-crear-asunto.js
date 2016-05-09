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

            $("#panel-heading-left").removeClass("hidden");
            $("#panel-heading-right").removeClass("hidden");
            $("#left-row").removeClass("hidden");
            $("#right-row").removeClass("hidden");

            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");

            $("#left-row")
                    .append($("<div>").addClass("form-group").attr({"id": "frm-1"})
                            .append($("<label>").html("Asunto"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-4"}))
                            .append($("<p>").addClass("help-block").html("Ingreses el Asunto."))
                            )
                    .append($("<button>").attr({"id": "btn-4"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row")
                    .append($("<div>").addClass("form-group").attr({"id": "frm-2"})
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
                    $("#slc-5").append($("<option>").html("Atributo de Calidad " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "5"}));
                });
            });

            ajaxSelectAll9(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-9").append($("<option>").html("Requerimiento Funcional " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "9"}));
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

                var modal = $("<div>").attr({"id": "my-modal", "tabindex": "-1", "role": "dialog"}).addClass("modal fade")
                        //<div class="modal-dialog" style="overflow-y: scroll; max-height:85%;  margin-top: 50px; margin-bottom:50px;"> 
                        .append($("<div>").addClass("modal-dialog modal-lg")
                                .append($("<div>").addClass("modal-content")
                                        .append($("<div>").addClass("modal-header").css({"padding": "8px 10px"})
                                                .append($("<button>").addClass("close").attr({"type": "button", "data-dismiss": "modal", "aria-label": "close"})
                                                        .append($("<span>").attr("aria-hidden", "true").html("&times;")
                                                                )
                                                        )
                                                .append($("<h4>").addClass("modal-title").html("Esta Seguro De Agregar Esta Relacion?")
                                                        )
                                                )
                                        .append($("<div>").addClass("modal-body")
                                                .append($("<table>").addClass("table table-hover")
                                                        .append($("<thead>")
                                                                .append($("<tr>").addClass("active")
                                                                        .append($("<th>").html("Id"))
                                                                        .append($("<th>").html("asunto"))
                                                                        )
                                                                )
                                                        .append($("<tbody>").attr({"id": "tbody-5"})

                                                                )
                                                        )
                                                )
                                        .append($("<div>").addClass("modal-footer").css({"padding": "8px 10px"})
                                                .append($("<button>").addClass("btn btn-primary").attr({"data-dismiss": "modal", "type": "button"}).html("Aceptar").on("click", function () {

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
                                                }))
                                                .append($("<button>").addClass("btn btn-default").attr({"data-dismiss": "modal", "type": "button"}).html("Cancelar").on("click", function () {

                                                    $("#slc-5 option[value=" + 0 + "]").attr("selected", false);
                                                    $("#slc-5 option[value=" + 0 + "]").attr("selected", true);
                                                }))
                                                )
                                        )
                                );
                $(modal).modal({keyboard: true}).on("hidden.bs.modal", function () {
                    $("#my-modal").remove();
                });
                ajaxSelectById5(idOptionSelected, function (data) {
                    $(modal).find("#tbody-5")
                            .append($("<tr>").attr({"id": data.id, "value": "3"})
                                    .append($("<td>").html("Atributo de Calidad " + data.id).attr({"width": "25%"}))
                                    .append($("<td>").html(data.description).attr({"width": "25%"}))
                                    );
                });


            }

            if (idClassOptionSelected === "9") {

                var modal = $("<div>").attr({"id": "my-modal", "tabindex": "-1", "role": "dialog"}).addClass("modal fade")
                        //<div class="modal-dialog" style="overflow-y: scroll; max-height:85%;  margin-top: 50px; margin-bottom:50px;"> 
                        .append($("<div>").addClass("modal-dialog modal-lg")
                                .append($("<div>").addClass("modal-content")
                                        .append($("<div>").addClass("modal-header").css({"padding": "8px 10px"})
                                                .append($("<button>").addClass("close").attr({"type": "button", "data-dismiss": "modal", "aria-label": "close"})
                                                        .append($("<span>").attr("aria-hidden", "true").html("&times;")
                                                                )
                                                        )
                                                .append($("<h4>").addClass("modal-title").html("Esta Seguro De Agregar Esta Relacion?")
                                                        )
                                                )
                                        .append($("<div>").addClass("modal-body")
                                                .append($("<table>").addClass("table table-hover")
                                                        .append($("<thead>")
                                                                .append($("<tr>").addClass("active")
                                                                        .append($("<th>").html("Id"))
                                                                        .append($("<th>").html("Nombre"))
                                                                        .append($("<th>").html("Actor"))
                                                                        .append($("<th>").html("Descripcion"))
                                                                        .append($("<th>").html("Entrada"))
                                                                        .append($("<th>").html("salida"))
                                                                        )
                                                                )
                                                        .append($("<tbody>").attr({"id": "tbody-9"})

                                                                )
                                                        )
                                                )
                                        .append($("<div>").addClass("modal-footer").css({"padding": "8px 10px"})
                                                .append($("<button>").addClass("btn btn-primary").attr({"data-dismiss": "modal", "type": "button"}).html("Aceptar").on("click", function () {

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
                                                }))
                                                .append($("<button>").addClass("btn btn-default").attr({"data-dismiss": "modal", "type": "button"}).html("Cancelar").on("click", function () {

                                                    $("#slc-9 option[value=" + 0 + "]").attr("selected", false);
                                                    $("#slc-9 option[value=" + 0 + "]").attr("selected", true);
                                                }))
                                                )
                                        )
                                );
                $(modal).modal({keyboard: true}).on("hidden.bs.modal", function () {
                    $("#my-modal").remove();
                });
                ajaxSelectById9(idOptionSelected, function (data) {
                    $(modal).find("#tbody-9")
                            .append($("<tr>").attr({"id": data.id, "value": "7"})
                                    .append($("<td>").html("Decision " + data.id.split("_")[1]).attr({"width": "10%"}))
                                    .append($("<td>").html(data.name).attr({"width": "20%"}))
                                    .append($("<td>").html(data.actor).attr({"width": "20%"}))
                                    .append($("<td>").html(data.description).attr({"width": "20%"}))
                                    .append($("<td>").html(data.input).attr({"width": "15%"}))
                                    .append($("<td>").html(data.output).attr({"width": "15%"}))
                                    );
                });


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
            var list5 = [];
            var list9 = [];

            $.each($("#tbody-5 tr"), function (index, data) {
                list5.push($(data).attr("id"));
            });

            $.each($("#tbody-9 tr"), function (index, data) {
                list9.push($(data).attr("id"));

            });

            var ok = true;

            if (asunto == "")
            {
                $("#frm-1").addClass("has-error");
                ok = false;
            } else {
                $("#frm-1").removeClass("has-error");
            }

            if (ok == true) {
                $("#frm-1").removeClass("has-error");
                ajaxInsert4(asunto, list5, list9);
                $("#txt-4").val("");
                $("#tbody-5").empty();
                $("#tbody-9").empty();
                $("#slc-5 option").removeClass("hidden");
                $("#slc-9 option").removeClass("hidden");
            }


        }

        function ajaxInsert4(concern, describedByQA, describedByFR)
        {
            $.ajax({
                url: "WikiWeb/concern/insert",
                data: {
                    concern: concern,
                    describedByQA: JSON.stringify(describedByQA),
                    describedByFR: JSON.stringify(describedByFR)
                },
                method: "POST"
            }).done(function () {
                swal({title: "Creacion Compeltada!!!", text: "Se creo correctamente el asunto", timer: 2000, showConfirmButton: false, type: "success"});
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
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
        
        function ajaxSelectById5(id, callback)
        {
            $.ajax({
                url: "WikiWeb/qualityAttribute/selectById",
                data: {
                    id: id
                },
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                callback(data);
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
            });
        }

        function ajaxSelectById9(id, callback)
        {
            $.ajax({
                url: "WikiWeb/functionalRequeriment/selectById",
                data: {
                    id: id
                },
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                callback(data);
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
            });
        }

        return this;
    };

})(jQuery);




