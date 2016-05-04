(function ($) {

    $.fn.wikiModificarSuposicion = function (id) {
        if (id === "c-13") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de Modificacion");
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

            $("#row-content")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Suposición"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-13-tp"})
                                    .append($("<option>").html("..."))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Suposición que que va a modificar."))
                            );

            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Descripción"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-1-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Descripción de la Suposición."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Fuente"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-2-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Fuente de la Suposición."))
                            )

                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row");

            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
                            );

            ajaxSelectAll13(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-13-tp").append($("<option>").html(data.id).attr({"value": data.id, "idClass": "13"}));
                });
            });

            $("#slc-13-tp").on("change", eventLoad);
        }


        function eventsave(event) {

            event.preventDefault();
            var description = $("#txt-1-7").val();
            var source = $("#txt-2-7").val();
            var id = $('option:selected', "#slc-13-tp").attr("value");

            ajaxUpdate13(id, description, source);
        }

        function eventLoad() {

            var textOptionSelected = $('option:selected', this).html();

            var id = $('option:selected', this).attr("value");

            if (textOptionSelected === '...') {
                $("#txt-1-7").val("");
                $("#txt-2-7").val("");
               
            } else {

                ajaxSelectAll13(function (data) {
                    $.each(data, function (index, data) {

                        if (data.id == id) {
                            $("#txt-1-7").val(data.description);
                            $("#txt-2-7").val(data.source);
                          
                        }
                    });
                });
            }
        }

        function ajaxUpdate13(id, description, source)
        {
            $.ajax({
                url: "WikiWeb/assumption/update",
                data: {
                    id: id,
                    description: description,
                    source: source
                },
                method: "POST"
            }).done(function () {
                alert("Incerto");
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
            });
        }

        function ajaxSelectAll13(callback)
        {
            $.ajax({
                url: "WikiWeb/assumption/selectAll",
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




