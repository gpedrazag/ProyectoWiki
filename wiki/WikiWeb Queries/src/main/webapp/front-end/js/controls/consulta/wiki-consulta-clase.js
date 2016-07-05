(function ($) {
    String.prototype.toPascalCase = function () {
        var pascal = "";
        var string = this.toString();
        var upper = false;
        var added = false;
        for (var i = 0; i <= string.length; i++)
        {
            var char = string.charCodeAt(i);
            added = false;
            if((i === 0 || upper) &&  char !== 32)
            {
                pascal += String.fromCharCode(char).toUpperCase();
                upper = false;
                added = true;
            }
            if(char === 32)
            {
                upper = true;
            }
            if(!added)
            {
                pascal += String.fromCharCode(char);
            }
        }
        return pascal;
    };

    $.fn.consultaClase = function (clase, id)
    {

        function init()
        {
            var content = $("#row-content");
            $(content).empty();
            var lower = clase.toLowerCase();
            $.ajax({
                url: "WikiWeb/" + clase + "/selectById",
                method: "POST",
                dataType: "json",
                data: {"id": id}
            }).done(function (data) {
                Object.keys(data).forEach(function (field) {
                    var content = $("#row-content");
                    if (typeof data[field] !== "object")
                    {
                        if (lower === "alternative")
                        {
                            if (field !== "id")
                            {
                                $(content)
                                        .append($("<div>").addClass("row")
                                                .append($("<div>").addClass("col-lg-12, page-header")
                                                        .append($("<h2>").html($.i18n.prop(field).toPascalCase()))
                                                        )
                                                .append($("<span>").html(data[field]))
                                                )
                                        ;
                            }
                        } else
                        {
                            var html = "";
                            var span = "";
                            if (field === "id")
                            {
                                html = "name";
                                span = clase.toPascalCase() + " " + data[field];

                            } else
                            {
                                html = field;
                                span = data[field];
                            }
                            $(content)
                                    .append($("<div>").addClass("row")
                                            .append($("<div>").addClass("col-lg-12, page-header")
                                                    .append($("<h2>").html($.i18n.prop(html)))
                                                    )
                                            .append($("<span>").html(span))
                                            )
                                    ;
                        }

                    } else
                    {
                        var content = $(content)
                                .append($("<div>").addClass("row")
                                        .append($("<div>").addClass("col-lg-12, page-header")
                                                .append($("<h2>").html($.i18n.prop(field).toPascalCase()))
                                                )
                                        )
                                ;

                        var row = $(content).find(".row")[$(content).find(".row").length - 1];
                        if (data[field].length >= 1)
                        {
                            var table = $(row).append($("<table>").addClass("table"));
                            var nRow = $(table).append($("<tr>"));
                            var i = 0;
                            var html = "";
                            data[field].forEach(function (obj) {
                                html = getHtml(field, obj);
                                if (i < 3)
                                {
                                    $(nRow).append($("<td>").html(html));
                                } else
                                {
                                    i = 0;
                                    $(table).append($("<tr>"));
                                    nRow = $(table).find("row")[$(table).find("row").length - 1];
                                    $(nRow).append($("<td>").html(html));
                                }
                                i++;
                            });

                        } else
                        {
                            html = getHtml(field, data[field]);
                            $(row)
                                    .append($("<div>").addClass("col-lg-12, page-header")
                                            .append($("<span>").html(html))
                                            )
                                    ;
                        }
                    }
                });
            });
        }


        function getHtml(field, obj)
        {
            var html = "";
            if (field.match(new RegExp("alternat")) || field.match(new RegExp("decisi","i")))
            {
                html = obj.name;
            } else
            {
                html = function (f) 
                {
                    var content = "";
                    if (f.match(new RegExp("decisi","i")))
                    {
                        content = "Decision " + obj.id.split("_")[1];
                    } else if (f.match(new RegExp("artefai","i")))
                    {
                        content = "Artefacto " + obj.id.split("_")[1];
                    } else if (f.match(new RegExp("assumpt","i")))
                    {
                        content = "Supuesto " + obj.id.split("_")[1];
                    } else if (f.match(new RegExp("concer","i")))
                    {
                        content = "Preocupacion " + obj.id.split("_")[1];
                    } else if (f.match(new RegExp("restric","i")))
                    {
                        content = "Restriccion " + obj.id.split("_")[1];
                    } else if (f.match(new RegExp("criteri","i")))
                    {
                        content = "Criterio " + obj.id.split("_")[1];
                    } else if (f.match(new RegExp("evalua","i")))
                    {
                        content = "Evaluacion " + obj.id.split("_")[1];
                    } else if (f.match(new RegExp("describedByQA","i")))
                    {
                        content = "Requerimiento Funcional " + obj.id;
                    } else if (f.match(new RegExp("describedByFR","i")))
                    {
                        content = "Atributo de Calidad " + obj.id.split("_")[1];
                    } else if (f.match(new RegExp("responsi","i")))
                    {
                        content = "Responsable " + obj.id.split("_")[1];
                    } else
                    {
                        content = "Solucion " + obj.id.split("_")[1];
                    }
                    return content;
                }(field);
            }
            return html;
        }

        function loadLanguage(callback) {
            $.i18n.properties({
                name: 'Language',
                path: 'WikiWeb/front-end/i18n/',
                mode: 'both',
                language: 'es',
                callback: function () {
                    callback();
                }
            });
        }
        loadLanguage(init);
    };
})($);
