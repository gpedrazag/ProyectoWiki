(function ($) {

    $.fn.wikiModificarSolucion = function (id) {
        if (id === "m-12") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creModificacionacion");
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
            $("#save-relations").removeClass("hidden");

            $("#row-content")
                    .append($("<div>").addClass("form-group").attr({"id": "frm-3"})
                            .append($("<label>").html("Solución"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-12-tp"})
                                    .append($("<option>").html("...").attr({"value":"0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Solución que que va a modificar."))
                            );

            $("#left-row")
                    .append($("<div>").addClass("form-group").attr({"id": "frm-1"})
                            .append($("<label>").html("Justificación"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-1-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Justificación de la Solución."))
                            )

                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row")

                    ;

            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")

                            )
                    ;

            ajaxSelectAll12(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-12-tp").append($("<option>").html(data.id).attr({"value": data.id, "idClass": "12"}));
                });
            });

            $("#slc-12-tp").on("change", eventLoad);
        }

        function eventsave(event) {
            event.preventDefault();

            var rationale = $("#txt-1-7").val();
            var id = $('option:selected', "#slc-12-tp").attr("value");

            ajaxUpdate12(id, rationale);
        }

        function eventLoad() {
            var textOptionSelected = $('option:selected', this).html();

            var id = $('option:selected', this).attr("value");

            if (textOptionSelected === '...') {
                $("#txt-1-7").val("");
               
            } else {

                ajaxSelectAll12(function (data) {
                    $.each(data, function (index, data) {

                        if (data.id == id) {
                            $("#txt-1-7").val(data.rationale);
                            
                        }
                    });
                });
            }
        }

        function ajaxUpdate12(id, rationale)
        {
            $.ajax({
                url: "WikiWeb/solution/update",
                data: {
                    id: id,
                    rationale: rationale
                },
                method: "POST"
            }).done(function () {
                alert("Incerto");
            }).fail(function (jrxml, errorThrow) {
                alert("Errorn");
            });
        }
        
        function ajaxSelectAll12(callback)
        {
            $.ajax({
                url: "WikiWeb/solution/selectAll",
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




