(function ($) {

    $.fn.wikiEliminarAtributoDeCalidad = function (id) {

        if (id === "d-5") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Eliminar");
            $("#panel-heading-left").addClass("hidden");
            $("#panel-heading-right").addClass("hidden");
            $("#left-row").addClass("hidden");
            $("#right-row").addClass("hidden");
            $("#panel-foot-down").html("Atributo de Calidad");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");

            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
                            .append($("<div>").addClass("col-lg-10").attr({"id": "row-foot-5"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Id"))
                                                            .append($("<th>").html("Actor"))
                                                            .append($("<th>").html("Ambiente"))
                                                            .append($("<th>").html("Medida"))
                                                            .append($("<th>").html("Estimulo"))
                                                            .append($("<th>").html("Fuente de Estimulo"))
                                                            .append($("<th>").html(""))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-5"})

                                                    )
                                            )
                                    )
                            );

            ajaxSelectAll5(function (data) {
                $.each(data, function (index, data) {

                    if (data !== undefined) {

                        $("#tbody-5")
                                .append($("<tr>").attr({"id": data.id, "value": "5"})
                                        .append($("<td>").html("Atributo de Calidad " + data.id.split("_")[1]).attr({"width": "20%"}))
                                        .append($("<td>").html(data.actor).attr({"width": "20%"}))
                                        .append($("<td>").html(data.enviroment).attr({"width": "20%"}))
                                        .append($("<td>").html(data.measure).attr({"width": "20%"}))
                                        .append($("<td>").html(data.boost).attr({"width": "20%"}))
                                        .append($("<td>").html(data.boostSource).attr({"width": "20%"}))
                                        .append($("<td>")
                                                .append($("<button>").addClass("btn btn-danger btn-sm").on("click", eventRemove)
                                                        .append($("<span>").addClass("glyphicon glyphicon-minus").attr({"aria-hidden": "true"}))
                                                        )
                                                )
                                        );
                    }
                });
            });
        }

        function eventRemove() {

            var tableId = $(this).parent().parent().attr("id");
            var idClass = $(this).parent().parent().attr("value");
            ajaxDelete5(tableId);
            $(this).parent().parent().remove();

        }

        function ajaxDelete5(id) {
            $.ajax({
                url: "WikiWeb/qualityAttribute/delete",
                data: {
                    id: id
                },
                method: "POST"
            }).done(function () {
                swal({title: "Eliminacion Compeltada!!!", text: "Se elimino correctamente el Atributo de Calidad", timer: 2000, showConfirmButton: false, type: "success"});
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
            });
        }

        function ajaxSelectAll5(callback) {
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

        return this;
    };

})(jQuery);




