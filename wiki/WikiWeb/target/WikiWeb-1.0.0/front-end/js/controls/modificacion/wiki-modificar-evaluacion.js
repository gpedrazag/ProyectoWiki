(function ($) {

    $.fn.wikiModificarEvaluacion = function (id) {
        if (id === "c-8") {

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
                            .append($("<label>").html("Asunto"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-8-tp"})
                                    .append($("<option>").html("..."))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione la Evaluación que que va a modificar."))
                            );

            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Pros"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-1-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese los Pros de la Evaluación."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Contras"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-2-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese los Contras de la Evaluación."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Valoración"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-3-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Valoración de la Evaluación."))
                            )
                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row");
            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12")
                            );

            ajaxSelectAll8(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-8-tp").append($("<option>").html(data.id).attr({"value": data.id, "idClass": "8"}));
                });
            });

            $("#slc-8-tp").on("change", eventLoad);

        }

        function eventsave(event) {
            event.preventDefault();
            var pros = $("#txt-1-7").val();
            var cons = $("#txt-2-7").val();
            var valoration = $("#txt-3-7").val();
            var id = $('option:selected', "#slc-8-tp").attr("value");

            ajaxUpdate8(id, pros, cons, valoration);
        }

        function eventLoad() {
            var textOptionSelected = $('option:selected', this).html();

            var id = $('option:selected', this).attr("value");

            if (textOptionSelected === '...') {
                $("#txt-1-7").val("");
                $("#txt-2-7").val("");
                $("#txt-3-7").val("");

            } else {

                ajaxSelectAll8(function (data) {
                    $.each(data, function (index, data) {

                        if (data.id == id) {
                            $("#txt-1-7").val(data.pros);
                            $("#txt-2-7").val(data.cons);
                            $("#txt-3-7").val(data.valoration);
                           
                        }
                    });
                });
            }
        }

        function ajaxUpdate8(id, pros, cons, valoration)
        {
            $.ajax({
                url: "WikiWeb/evaluation/update",
                data: {
                    id: id,
                    pros: pros,
                    cons: cons,
                    valoration: valoration
                },
                method: "POST"
            }).done(function () {
                alert("Incerto");
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




