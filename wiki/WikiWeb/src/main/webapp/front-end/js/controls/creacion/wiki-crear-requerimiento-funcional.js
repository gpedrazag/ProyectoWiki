(function ($) {

    $.fn.wikiCrearRequerimientoFuncional = function (id) {

        if (id === "c-9") {

           $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
            $("#panel-heading-left").html("Requerimiento Funcional");
            $("#panel-heading-right").html("Relaciones");

            $("#panel-heading-left").removeClass("hidden");
            $("#panel-heading-right").removeClass("hidden");
            $("#left-row").removeClass("hidden");
            $("#right-row").removeClass("hidden");

            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");


            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Nombre"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-1-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Nombre del Requerimiento Funcional."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Actor"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-2-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Actor del Requerimiento Funcional."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Descripción"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-3-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Descripción del Requerimiento Funcional."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Entrada"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-4-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Entrada del Requerimiento Funcional."))
                            )
                    .append($("<div>").addClass("form-group")
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



        }

        function eventsave(event) {
            event.preventDefault();
            var name = $("#txt-1-7").val();
            var actor = $("#txt-2-7").val();
            var description = $("#txt-3-7").val();
            var input = $("#txt-4-7").val();
            var output = $("#txt-5-7").val();

            ajaxInsert9(name, actor, description, input, output);
        }

        function ajaxInsert9(name, actor, description, input, output)
        {
            $.ajax({
                url: "WikiWeb/functionalRequeriment/insert",
                data: {
                    name: name,
                    actor: actor,
                    description: description,
                    input: input,
                    output: output
                },
                method: "POST"
            }).done(function () {
                swal({title: "Creacion Compeltada!!!", text: "Se creo correctamente el requerimietno funcional", timer: 2000, showConfirmButton: false, type: "success"});
            }).fail(function (jrxml, errorThrow) {
                alert("Error");
            });
        }

        return this;
    };

})(jQuery);




