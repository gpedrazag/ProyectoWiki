(function ($) {

    $.fn.wikiCrearCriterio = function (id) {

        if (id === "c-6") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
            $("#panel-heading-left").html("Criterio");
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

            ajaxSelectAll8(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-8").append($("<option>").html("Evaluacion " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "8"}));
                });
            });


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

            var ok = true;

            if (PalabraClave == "")
            {
                $("#frm-1").addClass("has-error");
                ok = false;
            } else {
                $("#frm-1").removeClass("has-error");
            }

            if (Descripcion == "")
            {
                $("#frm-2").addClass("has-error");
                ok = false;
            } else {
                $("#frm-2").removeClass("has-error");
            }

            if (ok == true) {

                ajaxInsert6(PalabraClave, Descripcion, list8);
                $("#txt-1-6").val("");
                $("#txt-2-6").val("");
                $("#txt-area-2-6").val("");
                $("#tbody-8").empty();
                $("#slc-8 option").removeClass("hidden");

                $("#slc-6-tp option[value=" + 0 + "]").attr("selected", false);
                $("#slc-6-tp option[value=" + 0 + "]").attr("selected", true);
            }

            
        }

        function ajaxInsert6(keyword, description, linkedEvaluations)
        {
            $.ajax({
                url: "WikiWeb/criteria/insert",
                data: {
                    keyword: keyword,
                    description: description,
                    linkedEvaluations: JSON.stringify(linkedEvaluations)
                },
                method: "POST"
            }).done(function () {
                 swal({title: "Creacion Compeltada!!!", text: "Se creo correctamente el criterio", timer: 2000, showConfirmButton: false, type: "success"});
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

        return this;
    };

})(jQuery);




