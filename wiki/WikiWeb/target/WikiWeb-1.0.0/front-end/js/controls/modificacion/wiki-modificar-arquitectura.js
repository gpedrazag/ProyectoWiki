(function ($) {

    $.fn.wikiModificarArquitectura = function (id) {

        if (id === "m-2") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de Modificacion");
            $("#panel-heading-left").html("Arquitectura de Software");
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
                            .append($("<label>").html("Arquitectura De Software"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-2-tp"})
                                    .append($("<option>").html("...").attr({"value": "0"}))

                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Arquitectura De Software que que va a modificar."))
                            );

            $("#left-row")
                    .append($("<div>").addClass("form-group").attr({"id": "frm-1"})
                            .append($("<label>").html("Nombre"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-2"}))
                            .append($("<p>").addClass("help-block").html("Ingreses el nombre de la Arquitectura."))
                            )
                    .append($("<div>").addClass("form-group").attr({"id": "frm-2"})
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
                    $("#slc-2-tp").append($("<option>").html("Arquitectura " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "2"}));
                });
            });

            ajaxSelectAll3(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-3").append($("<option>").html("Artefacto " + data.id).attr({"value": data.id, "idClass": "3"}));
                });
            });

            ajaxSelectAll7(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-7").append($("<option>").html("Decision " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "7"}));
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
                                                                        .append($("<th>").html("Descripcion"))
                                                                        )
                                                                )
                                                        .append($("<tbody>").attr({"id": "tbody-3"})

                                                                )
                                                        )
                                                )
                                        .append($("<div>").addClass("modal-footer").css({"padding": "8px 10px"})
                                                .append($("<button>").addClass("btn btn-primary").attr({"data-dismiss": "modal", "type": "button"}).html("Aceptar").on("click", function () {

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
                                                }))
                                                .append($("<button>").addClass("btn btn-default").attr({"data-dismiss": "modal", "type": "button"}).html("Cancelar").on("click", function () {

                                                    $("#slc-3 option[value=" + 0 + "]").attr("selected", false);
                                                    $("#slc-3 option[value=" + 0 + "]").attr("selected", true);
                                                }))
                                                )
                                        )
                                );
                $(modal).modal({keyboard: true}).on("hidden.bs.modal", function () {
                    $("#my-modal").remove();
                });
                ajaxSelectById3(idOptionSelected, function (data) {
                    $(modal).find("#tbody-3")
                            .append($("<tr>").attr({"id": data.id, "value": "3"})
                                    .append($("<td>").html("Artefacto " + data.id).attr({"width": "25%"}))
                                    .append($("<td>").html(data.description).attr({"width": "25%"}))
                                    );
                });


            }

            if (idClassOptionSelected === "7") {

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
                                    .append($("<td>").html(data.arguments).attr({"width": "25%"}))
                                    .append($("<td>").html(data.state).attr({"width": "25%"}))
                                    );
                });


            }

        }

        function eventsave(event) {

            event.preventDefault();

            var id = $('option:selected', "#slc-2-tp").attr("value");
            var name = $("#txt-2").val();
            var description = $("#txt-area-2").val();
            var list3 = [];
            var list7 = [];

            $.each($("#tbody-3 tr"), function (index, data) {
                list3.push($(data).attr("id"));
            });

            $.each($("#tbody-7 tr"), function (index, data) {
                list7.push($(data).attr("id"));
            });

            var ok = true;

            if (name == "")
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


                ajaxUpdate2(id, name, description, list3, list7);
                $("#txt-2").val("");
                $("#txt-area-2").val("");
                $("#tbody-3").empty();
                $("#tbody-7").empty();
                $("#slc-3 option").removeClass("hidden");
                $("#slc-7 option").removeClass("hidden");
                $("#slc-2-tp option[value=" + 0 + "]").attr("selected", false);
                $("#slc-2-tp option[value=" + 0 + "]").attr("selected", true);
            }


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
                                $.each(data.relatedArtifacts, function (index, data) {
                                    $("#tbody-3")
                                            .append($("<tr>").attr({"id": data.id, "value": "3"})
                                                    .append($("<td>").html("Artefacto " + data.id).attr({"width": "80%"}))
                                                    .append($("<td>")
                                                            .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                                    .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                                    )
                                                            )
                                                    );
                                });


                                $("#tbody-3 tr").each(function (index, data) {

                                    $("#slc-3 option").each(function (index, data1) {
                                        if ($(data).attr("id") === $(data1).attr("value")) {
                                            $(data1).addClass("hidden");
                                        } else {
                                            $(data1).removeClass("hidden");
                                        }
                                    });
                                });
                            }

                            if (data.relatedDecisions !== undefined) {
                                $.each(data.relatedDecisions, function (index, data) {
                                    $("#tbody-7")
                                            .append($("<tr>").attr({"id": data.id, "value": "7"})
                                                    .append($("<td>").html("Decision " + data.id.split("_")[1]).attr({"width": "80%"}))
                                                    .append($("<td>")
                                                            .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                                    .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                                    )
                                                            )
                                                    );
                                });


                                $("#tbody-7 tr").each(function (index, data) {

                                    $("#slc-7 option").each(function (index, data1) {
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
                swal({title: "Modificacion Compeltada!!!", text: "Se modifico correctamente la arquitectura de software", timer: 2000, showConfirmButton: false, type: "success"});
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
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

        function ajaxSelectById3(id, callback)
        {
            $.ajax({
                url: "WikiWeb/SoftwareArchitecture/selectById",
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




