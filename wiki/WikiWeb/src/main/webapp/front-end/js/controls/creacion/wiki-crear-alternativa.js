(function ($) {

    $.fn.wikiCrearAlternativa = function (id) {

        if (id === "c-1") {

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
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Nombre"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-1"}))
                            .append($("<p>").addClass("help-block").html("Ingreses el nombre de la alternativa."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Descripción"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-area-1"}))
                            .append($("<p>").addClass("help-block").html("Ingreses la descripción de la alternativa."))
                            )
                    .append($("<button>").attr({"id": "btn-1"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Evaluación"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-8"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Evaluación que tiene relación con la alternativa."))

                            )
                    ;

            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
                            .append($("<div>").addClass("col-lg-4").attr({"id": "row-foot-8"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Evaluaciones"))
                                                            .append($("<th>"))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-8"})

                                                    )
                                            )
                                    )
                            );

            ajaxSelectAll8(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-8").append($("<option>").html("Evaluacion "+data.id.split("_")[1]).attr({"value": data.id, "idClass": "8"}));
                });
            });

            $("#slc-8").on("change", eventSelected);
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
                                                                    .append($("<th>").html("Pros"))
                                                                    .append($("<th>").html("Cons"))
                                                                    .append($("<th>").html("Valoración"))
                                                                    
                                                                    )
                                                            )
                                                    .append($("<tbody>").attr({"id": "tbody-1"})

                                                            )
                                                    )
                                            )
                                    .append($("<div>").addClass("modal-footer").css({"padding": "8px 10px"})
                                            .append($("<button>").addClass("btn btn-primary").attr({"data-dismiss": "modal", "type": "button"}).html("Aceptar").on("click", function () {

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
                                            }))
                                            .append($("<button>").addClass("btn btn-default").attr({"data-dismiss": "modal", "type": "button"}).html("Cancelar").on("click", function () {

                                                $("#slc-8 option[value=" + 0 + "]").attr("selected", false);
                                                $("#slc-8 option[value=" + 0 + "]").attr("selected", true);

                                            }))
                                            )
                                    )
                            );


            $(modal).modal({keyboard: true}).on("hidden.bs.modal", function () {
                $("#my-modal").remove();
            });

            ajaxSelectById1(idOptionSelected, function (data) {
                $(modal).find("#tbody-1")
                        .append($("<tr>").attr({"id": data.id, "value": "1"})
                                .append($("<td>").html("Evaluation "+data.id.split("_")[1]).attr({"width": "25%"}))
                                .append($("<td>").html(data.pros).attr({"width": "25%"}))
                                .append($("<td>").html(data.cons).attr({"width": "25%"}))
                                .append($("<td>").html(data.valoration).attr({"width": "25%"}))
                                );
            });
        }

        function eventRemove() {
            $(this).parent().parent().remove();
            var tableId = $(this).parent().parent().attr("id");
            var idClass = $(this).parent().parent().attr("value");

            if (idClass === "8") {
                $("#slc-8 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
            }

        }

        function eventsave(event) {

            event.preventDefault();

            var name = $("#txt-1").val();
            var description = $("#txt-area-1").val();

            var list8 = "";

            $.each($("#tbody-8 tr"), function (index, data) {
                list8 = $(data).attr("id");

            });

            ajaxInsert1(name, description, list8);
        }

        function ajaxInsert1(name, description, evaluationId)
        {
            $.ajax({
                url: "WikiWeb/alternative/insert",
                data: {
                    name: name,
                    description: description,
                    evaluationId: evaluationId
                },
                method: "POST"
            }).done(function () {
                alert("Creo");
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
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

        function ajaxSelectById1(id, callback)
        {
            $.ajax({
                url: "WikiWeb/evaluation/selectById",
                data: {
                    id: id
                },
                method: "POST",
                dataType: "json"
            }).done(function (data) {
                alert("Encontro"+" "+data.id);
                callback(data);
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
            });
        }

        return this;
    };

})(jQuery);




