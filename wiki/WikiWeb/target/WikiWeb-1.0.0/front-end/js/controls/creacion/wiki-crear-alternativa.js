(function ($) {

    $.fn.wikiCrearAlternativa = function (des, sol, eval, id) {

        if (id === "c-1") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
            $("#panel-heading-left").html("Alternativa");
            $("#panel-heading-right").html("Relaciones");
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
                    $("#slc-8").append($("<option>").html(data.name).attr({"value": data.id, "idClass": "8"}));
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

            if (idClass === "8") {
                $("#slc-8 option").each(function () {

                    if (tableId === $(this).attr("value")) {
                        $(this).removeClass("hidden");
                    }

                });
            }

        }

        function eventsave() {

            var name = $("#txt-1").val();
            var description = $("#txt-area-1").val();

            var list8 = [];

            $.each($("#tbody-8 tr"), function (index, data) {
                list8.push($(data).attr("id"));

            });

            alert(list8);

            alert(name + " " + description);

            var id = 0;

            ajaxInsert1(id, name, description);
        }

        function ajaxInsert1(id, name, description)
        {

            $.ajax({
                url: "WikiWeb/alternative/insert",
                data: {
                    id: id,
                    name: name,
                    description: description
                },
                method: "POST"
            }).done(function () {
                alert("Incerto la alternativa");
            }).fail(function (jrxml, errorThrow) {
                
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




