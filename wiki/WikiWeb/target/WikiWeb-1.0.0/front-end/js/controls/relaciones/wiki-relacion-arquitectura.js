(function ($) {

    $.fn.wikiRelacionArquitectura = function (id) {

        if (id === "r-9") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Relaciones");
            $("#panel-heading-left").addClass("hidden");
            $("#panel-heading-right").addClass("hidden");
            $("#left-row").addClass("hidden");
            $("#right-row").addClass("hidden");
            $("#panel-foot-down").html("Decisiones Vs Req Funcionales");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");
            $("#save-relations").removeClass("hidden");
            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
                            .append($("<div>").addClass("col-lg-10").attr({"id": "row-foot"})
                                    .append($("<table>").addClass("table table-bordered")
                                            .append($("<thead>").attr({"id": "thead"})
                                                    .append($("<tr>")
                                                            .append($("<th>").html("\\").css({"text-align": "center"}))
                                                            )
                                                    )
                                            .append($("<tbody>").attr({"id": "tbody"})

                                                    )
                                            )
                                    )
                            );


            ajaxSelectAll7(function (data) {
                $.each(data, function (index, data) {
                    if (data !== undefined) {
                        $("#tbody")
                                .append($("<tr>")
                                        .append($("<th>").html(data.name).attr({"id": data.id}).css({"text-align": "center"}))
                                        //.append($("<td>").html("X").css({"text-align": "center"}))
                                        );

                    }
                });

                ajaxSelectAll9(function (data) {
                    $.each(data, function (index, data) {
                        if (data !== undefined) {
                            $("#tbody").find("tr").append($("<td>").html(" ").css({"text-align": "center"})
                                    );
                        }
                    });

                    var objetos = {"Des": [
                            {"id": "Des 1",
                                "arq": [
                                    {"id": "arq 1"},
                                    {"id": "arq 2"},
                                    {"id": "arq 3"}
                                ]},
                            {"id": "Des 2",
                                "arq": [
                                    {"id": "arq 6"},
                                    {"id": "arq 4"},
                                    {"id": "arq 5"}
                                ]}

                        ]};
                    $.each(objetos, function (index, data) {
                        data.arq.id;
                    });

                    $("#tbody").find("tr:eq(0) td:eq(0)").html("X");
                    $("#tbody").find("tr:eq(2) td:eq(3)").html("X");
                });
            });

            ajaxSelectAll9(function (data) {
                $.each(data, function (index, data) {
                    if (data !== undefined) {
                        $("#thead tr")
                                .append($("<th>").html(data.name).attr({"id": data.id}).css({"text-align": "center"}))
                                ;
                    }
                });
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

        return this;
    };
})(jQuery);




