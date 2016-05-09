(function ($) {

    $.fn.wikiEliminarCriterio = function (id) {

        if (id === "d-6") {

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
            $("#panel-foot-down").html("Criterio");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");

            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
                            .append($("<div>").addClass("col-lg-10").attr({"id": "row-foot-6"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Id"))
                                                            .append($("<th>").html("Palabra clave"))
                                                            .append($("<th>").html("Descripcion"))
                                                            .append($("<th>").html(""))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-6"})

                                                    )
                                            )
                                    )
                            );

            ajaxSelectAll6(function (data) {
                $.each(data, function (index, data) {

                    if (data !== undefined) {

                        $("#tbody-6")
                                .append($("<tr>").attr({"id": data.id, "value": "6"})
                                        .append($("<td>").html("Criterio " + data.id.split("_")[1]).attr({"width": "20%"}))
                                        .append($("<td>").html(data.keyword).attr({"width": "40%"}))
                                        .append($("<td>").html(data.description).attr({"width": "40%"}))
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
            ajaxDelete6(tableId);
            $(this).parent().parent().remove();

        }

        function ajaxDelete6(id) {
            $.ajax({
                url: "WikiWeb/criteria/delete",
                data: {
                    id: id
                },
                method: "POST"
            }).done(function () {
                swal({title: "Eliminacion Compeltada!!!", text: "Se elimino correctamente el criterio", timer: 2000, showConfirmButton: false, type: "success"});
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
            });
        }

        function ajaxSelectAll6(callback) {
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

        return this;
    };

})(jQuery);




