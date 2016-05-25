(function ($) {

    $.fn.wikiModificarRestriccion = function (id) {
        if (id === "m-11") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creaciModificacionon");
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
                            .append($("<label>").html("Restricción"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-11-tp"})
                                    .append($("<option>").html("...").attr({"value":"0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Restricción que que va a modificar."))
                            );

            $("#left-row")
                    .append($("<div>").addClass("form-group").attr({"id": "frm-1"})
                            .append($("<label>").html("Nombre"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-1-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Nombre de la Restricción."))
                            )
                    .append($("<div>").addClass("form-group").attr({"id": "frm-2"})
                            .append($("<label>").html("Descripción"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-2-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Descripción de la Restricción."))
                            )
                    .append($("<div>").addClass("form-group").attr({"id": "frm-3"})
                            .append($("<label>").html("Justificación"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-3-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Justificación de la Restricción."))
                            )
                    .append($("<div>").addClass("form-group").attr({"id": "frm-4"})
                            .append($("<label>").html("Palabra clave"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-4-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Palabra clave de la Restricción."))
                            )

                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row");
            $("#panel-foot");

            ajaxSelectAll11(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-11-tp").append($("<option>").html(data.id).attr({"value": data.id, "idClass": "11"}));
                });
            });

            $("#slc-11-tp").on("change", eventLoad);
        }

        function eventsave(event) {
            event.preventDefault();
            var name = $("#txt-1-7").val();
            var description = $("#txt-2-7").val();
            var rationale = $("#txt-3-7").val();
            var keyword = $("#txt-4-7").val();
            var id = $('option:selected', "#slc-11-tp").attr("value");

            ajaxUpdate11(name, description, rationale, keyword);
        }

        function eventLoad() {

            var textOptionSelected = $('option:selected', this).html();

            var id = $('option:selected', this).attr("value");

            if (textOptionSelected === '...') {
                $("#txt-1-7").val("");
                $("#txt-2-7").val("");
                $("#txt-3-7").val("");
                $("#txt-4-7").val("");
               

            } else {

                ajaxSelectAll11(function (data) {
                    $.each(data, function (index, data) {

                        if (data.id == id) {
                            $("#txt-1-7").val(data.name);
                            $("#txt-2-7").val(data.description);
                            $("#txt-3-7").val(data.rationale);
                            $("#txt-4-7").val(data.keyword);
                          
                        }
                    });
                });
            }
        }

        function ajaxUpdate11(name, description, rationale, keyword)
        {
            $.ajax({
                url: "WikiWeb/constraint/update",
                data: {
                    id: id,
                    name: name,
                    description: description,
                    rationale: rationale,
                    keyword: keyword
                },
                method: "POST"
            }).done(function () {
                alert("Incerto");
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
            });
        }

        function ajaxSelectAll11(callback)
        {
            $.ajax({
                url: "WikiWeb/constraint/selectAll",
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




