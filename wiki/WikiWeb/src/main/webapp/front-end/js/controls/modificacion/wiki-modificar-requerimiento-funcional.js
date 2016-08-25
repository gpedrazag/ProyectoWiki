(function ($) {

    $.fn.wikiModificarRequerimientoFuncional = function (id) {

        if (id === "m-9") {

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
            $("#save-relations").removeClass("hidden");

            $("#row-content")
                    .append($("<div>").addClass("form-group").attr({"id": "frm-3"})
                            .append($("<label>").html("Requerimiento Funcional"))
                            .append($("<select>").addClass("form-control").attr({"id": "slc-9-tp"})
                                    .append($("<option>").html("...").attr({"value": "0"}))
                                    )
                            .append($("<p>").addClass("help-block").html("Seleccione el Requerimiento Funcional que que va a modificar."))
                            );


            $("#left-row")
                    .append($("<div>").addClass("form-group").attr({"id": "frm-1"})
                            .append($("<label>").html("Nombre"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-1-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Nombre del Requerimiento Funcional."))
                            )
                    .append($("<div>").addClass("form-group").attr({"id": "frm-2"})
                            .append($("<label>").html("Actor"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-2-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Actor del Requerimiento Funcional."))
                            )
                    .append($("<div>").addClass("form-group").attr({"id": "frm-3"})
                            .append($("<label>").html("Descripción"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-3-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Descripción del Requerimiento Funcional."))
                            )
                    .append($("<div>").addClass("form-group").attr({"id": "frm-4"})
                            .append($("<label>").html("Entrada"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-4-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Entrada del Requerimiento Funcional."))
                            )
                    .append($("<div>").addClass("form-group").attr({"id": "frm-5"})
                            .append($("<label>").html("Salida"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-5-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Salida del Requerimiento Funcional."))
                            )
                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row");

            $("#panel-foot")
                    .append($("<div>").addClass("col-lg-12"));

            ajaxSelectAll9(function (data) {
                $.each(data, function (index, data) {
                    $("#slc-9-tp").append($("<option>").html("Requerimiento Funcional " + data.id.split("_")[1]).attr({"value": data.id, "idClass": "9"}));
                });
            });

            $("#slc-9-tp").on("change", eventLoad);

        }

        function eventsave(event) {
            event.preventDefault();
            var name = $("#txt-1-7").val();
            var actor = $("#txt-2-7").val();
            var description = $("#txt-3-7").val();
            var input = $("#txt-4-7").val();
            var output = $("#txt-5-7").val();
            var id = $('option:selected', "#slc-9-tp").attr("value");

            ajaxUpdate9(id, name, actor, description, input, output);
        }

        function eventLoad() {
            var textOptionSelected = $('option:selected', this).html();

            var id = $('option:selected', this).attr("value");

            if (textOptionSelected === '...') {
                $("#txt-1-7").val("");
                $("#txt-2-7").val("");
                $("#txt-3-7").val("");
                $("#txt-4-7").val("");
                $("#txt-5-7").val("");

            } else {

                ajaxSelectAll9(function (data) {
                    $.each(data, function (index, data) {

                        if (data.id == id) {
                            $("#txt-1-7").val(data.name);
                            $("#txt-2-7").val(data.actor);
                            $("#txt-3-7").val(data.description);
                            $("#txt-4-7").val(data.input);
                            $("#txt-5-7").val(data.output);

                        }
                    });
                });
            }
        }

        function ajaxUpdate9(id, name, actor, description, input, output)
        {
            $.ajax({
                url: "WikiWeb/functionalRequeriment/update",
                data: {
                    id: id,
                    name: name,
                    actor: actor,
                    description: description,
                    input: input,
                    output: output
                },
                method: "POST"
            }).done(function () {
                swal({title: "Modificacion Compeltada!!!", text: "Se modifico correctamente el requerimiento funcional", timer: 2000, showConfirmButton: false, type: "success"});
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
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




