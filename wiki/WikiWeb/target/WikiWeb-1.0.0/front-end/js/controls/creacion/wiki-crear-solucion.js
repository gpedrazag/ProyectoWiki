(function ($) {

    $.fn.wikiCrearSolucion = function (id) {

        if (id === "c-12") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario de creacion");
            $("#panel-heading-left").html("Solucion");
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

            $("#left-row")
                    .append($("<div>").addClass("form-group")
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
        }

        function eventsave(event) {
            event.preventDefault();

            var rationale = $("#txt-1-7").val();

            ajaxInsert12(rationale);
        }

        function ajaxInsert12(rationale)
        {
            $.ajax({
                url: "WikiWeb/solution/insert",
                data: {
                    rationale: rationale
                },
                method: "POST"
            }).done(function () {
                swal({title: "Creacion Compeltada!!!", text: "Se creo correctamente la solucion", timer: 2000, showConfirmButton: false, type: "success"});
            }).fail(function (jrxml, errorThrow) {
                alert("Errorn");
            });
        }

        return this;
    };

})(jQuery);




