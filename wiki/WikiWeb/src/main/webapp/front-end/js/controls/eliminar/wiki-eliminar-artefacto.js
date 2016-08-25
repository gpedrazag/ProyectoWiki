(function ($) {

    $.fn.wikiEliminarArtefacto = function (id) {

        if (id === "d-3") {

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
            $("#panel-foot-down").html("Artefacto");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");
            $("#save-relations").removeClass("hidden");

            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
                            .append($("<div>").addClass("col-lg-10").attr({"id": "row-foot-3"})
                                    .append($("<table>").addClass("table table-hover")
                                            .append($("<thead>")
                                                    .append($("<tr>").addClass("active")
                                                            .append($("<th>").html("Id"))
                                                            .append($("<th>").html("Descripcion"))
                                                            .append($("<th>").html(""))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody-3"})

                                                    )
                                            )
                                    )
                            );

            ajaxSelectAll3(function (data) {
                $.each(data, function (index, data) {

                    if (data !== undefined) {

                        $("#tbody-3")
                                .append($("<tr>").attr({"id": data.id, "value": "3"})
                                        .append($("<td>").html("Artefacto " + data.id).attr({"width": "20%"}))
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
            ajaxDelete3(tableId);
            $(this).parent().parent().remove();

        }

        function ajaxDelete3(id) {
            $.ajax({
                url: "WikiWeb/artifact/delete",
                data: {
                    id: id
                },
                method: "POST"
            }).done(function () {
                swal({title: "Eliminacion Compeltada!!!", text: "Se elimino correctamente el artefacto", timer: 2000, showConfirmButton: false, type: "success"});
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
            });
        }

        function ajaxSelectAll3(callback) {
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

        return this;
    };

})(jQuery);




