(function ($) {

    $.fn.wikiCrearSuposicion = function (id) {

        if (id === "c-13") {

           $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
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
        }

              
        function eventsave(event) {

            event.preventDefault();
            var description = $("#txt-1-7").val();
            var source = $("#txt-2-7").val();

            ajaxInsert13(description, source);
        }

        function ajaxInsert13(description, source)
        {
            $.ajax({
                url: "WikiWeb/assumption/insert",
                data: {
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


        return this;
    };

})(jQuery);




