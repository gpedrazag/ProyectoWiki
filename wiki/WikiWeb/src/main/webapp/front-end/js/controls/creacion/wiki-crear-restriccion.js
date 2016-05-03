(function ($) {

    $.fn.wikiCrearRestriccion = function (id) {

        if (id === "c-11") {

            $("#left-row").empty();
            $("#right-row").empty();
            $("#row-content").empty();
            $("#row-foot").empty();
            $("#panel-foot").empty();
            $("#page-name").html("Formulario De Creacion");
            $("#panel-heading-left").html("Restricción");
            $("#panel-heading-right").html("Relaciones");
            $("#header").removeClass("hidden");
            $("#content").removeClass("hidden");
            $(".col-lg-6").removeClass("hidden");
            $("#row-foot").removeClass("hidden");

            $("#left-row")
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Nombre"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-1-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese el Nombre de la Restricción."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Descripción"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-2-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Descripción de la Restricción."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Justificación"))
                            .append($("<textarea>").addClass("form-control").attr({"id": "txt-3-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Justificación de la Restricción."))
                            )
                    .append($("<div>").addClass("form-group")
                            .append($("<label>").html("Palabra clave"))
                            .append($("<input>").addClass("form-control").attr({"id": "txt-4-7"}))
                            .append($("<p>").addClass("help-block").html("Ingrese la Palabra clave de la Restricción."))
                            )

                    .append($("<button>").attr({"id": "btn-5"}).addClass("btn btn-primary").html("Guardar").css({"margin-right": "10px"}).on("click", eventsave))
                    .append($("<button>").addClass("btn btn-default").html("Reset Button"))
                    ;

            $("#right-row");

            $("#panel-foot");
        }

       
        function eventsave(event) {
            event.preventDefault();
            var name = $("#txt-1-7").val();
            var description = $("#txt-2-7").val();
            var rationale = $("#txt-3-7").val();
            var keyword = $("#txt-4-7").val();

            ajaxInsert11(name, description, rationale, keyword);
        }

        function ajaxInsert11(name, description, rationale, keyword)
        {
            $.ajax({
                url: "WikiWeb/constraint/insert",
                data: {
                    name: name,
                    description: description,
                    rationale: rationale,
                    keyword: keyword
                },
                method: "POST"
            }).done(function () {
                alert("Incerto la constraint");
            }).fail(function (jrxml, errorThrow) {
                alert("Error no se pudo insertar la constraint");
            });
        }

        return this;
    };

})(jQuery);




