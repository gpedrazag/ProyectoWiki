(function ($) {

    $.fn.wikiCrearArtefacto = function (id) {

        if (id === "c-3") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
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

            $("#left-row")
                    .append($("<div>").addClass("form-group").attr({"id": "frm-1"})
                            .append($("<label>").html("Id"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-3"}))
                            .append($("<p>").addClass("help-block").html("Ingreses el id del artefacto."))
                            )
                    .append($("<div>").addClass("form-group").attr({"id": "frm-2"})
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
                    $("#slc-7").append($("<option>").html("Decision " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "7"}));
                });
            });

            $("#slc-7").on("change", eventSelected);
        }

        function eventSelected() {

            var textOptionSelected = $('option:selected', this).html();
            var idClassOptionSelected = $('option:selected', this).attr("idClass");
            var idOptionSelected = $('option:selected', this).attr("value");

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
                                                                    .append($("<th>").html("Argumento"))
                                                                    .append($("<th>").html("Estado"))

                                                                    )
                                                            )
                                                    .append($("<tbody>").attr({"id": "tbody-7"})

                                                            )
                                                    )
                                            )
                                    .append($("<div>").addClass("modal-footer").css({"padding": "8px 10px"})
                                            .append($("<button>").addClass("btn btn-primary").attr({"data-dismiss": "modal", "type": "button"}).html("Aceptar").on("click", function () {

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
                                            }))
                                            .append($("<button>").addClass("btn btn-default").attr({"data-dismiss": "modal", "type": "button"}).html("Cancelar").on("click", function () {

                                                $("#slc-7 option[value=" + 0 + "]").attr("selected", false);
                                                $("#slc-7 option[value=" + 0 + "]").attr("selected", true);
                                            }))
                                            )
                                    )
                            );
            $(modal).modal({keyboard: true}).on("hidden.bs.modal", function () {
                $("#my-modal").remove();
            });
            ajaxSelectById7(idOptionSelected, function (data) {
                $(modal).find("#tbody-7")
                        .append($("<tr>").attr({"id": data.id, "value": "7"})
                                .append($("<td>").html("Decision " + data.id.split("_")[1]).attr({"width": "25%"}))
                                .append($("<td>").html(data.nombre).attr({"width": "25%"}))
                                .append($("<td>").html(data.argument).attr({"width": "25%"}))
                                .append($("<td>").html(data.state).attr({"width": "25%"}))
                                );
            });

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

            var ok = true;

            if (id == "")
            {
                $("#frm-1").addClass("has-error");
                ok = false;
            } else {
                $("#frm-1").removeClass("has-error");
            }

            if (description == "")
            {
                $("#frm-2").addClass("has-error");
                ok = false;
            } else {
                $("#frm-2").removeClass("has-error");
            }

            if (ok == true) {
                $("#frm-1").removeClass("has-error");
                $("#frm-2").removeClass("has-error");
                ajaxInsert3(id, description, list7);
                $("#txt-3").val("");
                $("#txt-area-3").val("");
                $("#tbody-7").empty();
                $("#slc-7 option").removeClass("hidden");
                $("#slc-7 option[value=" + 0 + "]").attr("selected", false);
                $("#slc-7 option[value=" + 0 + "]").attr("selected", true);
            }


        }

        function ajaxInsert3(id, description, decision)
        {
            $.ajax({
                url: "WikiWeb/artifact/insert",
                data: {
                    id: id,
                    description: description,
                    decisions: JSON.stringify(decision)
                },
                method: "POST"
            }).done(function () {
                swal({title: "Creacion Compeltada!!!", text: "Se creo correctamente el artefacto", timer: 2000, showConfirmButton: false, type: "success"});
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

        function ajaxSelectById7(id, callback)
        {
            $.ajax({
                url: "WikiWeb/decision/selectById",
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




