(function ($) {

    $.fn.wikiMainPage = function () {

        $("#row-content")
                .append($("<div>").addClass("row")
                        .append($("<div>").addClass("col-lg-6")
                                .append($("<h2>").addClass("page-header").html("Proyecto PUA"))
                                )
                        );
        $("#left-panel").removeClass("col-lg-6");
        $("#left-panel").addClass("col-lg-12");
        $("#left-row")
                .append($("<div>")
                        .append($("<p>").html("El sistema de comando y control de misión del grupo PUA es un proyecto universitario que busca automatizar, sistematizar, mejorar el tiempo en la recopilación de información, el monitoreo, control y la toma de decisiones de críticas de procesos y protocolos experimentales en las misiones."))
                        .append($("<p>").html("El sistema se divide básicamente en cuatro partes principales:"))
                        .append($("<p>").html("La primera sección comprende la instrumentación y las computadoras a bordo de los vehículos de prueba y misiones realizadas. Estos recopilarán y transmitirán información del ambiente (velocidad de viento, temperatura, nivel de ruido, etc.), monitorearán el estado de los componentes (válvulas, tubería, cableado, etc.) y controlarán los periféricos necesarios para el cumplimiento de los objetivos de la misión (ignición de motor, control de válvulas, corte de potencia a los componentes, etc.). Además de recopilar la información sustancial para los objetivos de los experimentos (presión de cámara, temperatura de combustión, velocidad de flujo, fuerza de empuje, altura de vuelo, etc.)."))
                        .append($("<p>").html("La segunda sección del sistema está instalada en el sitio de lanzamiento y es llamada Plataforma en Tierra, ésta es usada como una estación intermedia que comunica el Centro de Control y Comando con el vehículo. Su principal funcionalidad es la de monitorear, compactar, procesar y emitir al C3 información recibida de los puntos de control y de las condiciones del área de lanzamiento. También provee al personal ubicado en la plataforma de lanzamiento la información necesaria para el correcto desarrollo de las misiones."))
                        .append($("<p>").html("Como tercera sección se encuentran los Puntos de Control (PC). Los PC son módulos replicables que reciben de las antenas receptoras la información telemétrica del vehículo experimental y la transmiten a la Plataforma en Tierra quien la compacta con la información recibida de las otras antenas."))
                        .append($("<p>").html("Por último está la sección del centro de comando, que recibe la información de la plataforma en tierra, del vehículo de pruebas y de otros lugares (lecturas de radar en tierra, informes meteorológicos, informes de vigías, etc.) y las despliega a los diferentes controladores y al jefe de misión, de tal manera que puedan utilizar ésta información para seguir el protocolo experimental y cumplir con los objetivos de la misión. Por otra parte, el centro de comando sirve como centro de difusión de información a invitados y otras entidades tales como canales de televisión, estaciones de radio, portales de internet y otras instituciones universitarias que estén interesadas en seguir el desarrollo de las misiones."))
                        .append($("<p>").html("Además, la conexión entre estas cuatro secciones del sistema, junto con el vehículo experimental y las instituciones externas, debe ser principalmente de naturaleza inalámbrica, de carácter simultáneo, seguro y controlado de tal forma que permita una correcta ejecución de las misiones de manera sistemática y repetitiva, poniendo por encima la seguridad de los controladores, personal en tierra e invitados a la plataforma de lanzamiento."))
                        .append($("<p>").html("De la misma manera el jefe de misión, los controladores y el personal en tierra deberán recibir la información pertinente para cada uno de ellos de manera oportuna (vía radio, video u otro tipo despliegue de información), lo que les permitirá tomar decisiones y acciones que contribuyan al buen desarrollo de la misión."))
                        .append($("<p>").html("Por último debido a la sensibilidad de la información transmitida y persistida por el sistema, este debe generar y mantener bitácoras de procesos, archivos de monitoreo e informes experimentales de manera segura y acorde a las regulaciones y leyes locales (Diagrama explicativo presente en la Ilustración 2)."))
                        );
        $("#right-panel").removeClass("col-lg-6");
        $("#right-panel").addClass("col-lg-12");
        $("#left-row").append("<div id = 'carousel-example-generic' class = 'carousel slide' data - ride = 'carousel'><div id = 'carousel-example-generic' class = 'carousel slide' data - ride = 'carousel' >< ol class = 'carousel-indicators' >< li data - target = '#carousel-example-generic' data - slide - to = '0' class = 'active' > < /li>< li data - target = '#carousel-example-generic' data - slide - to = '1' > < /li>< li data - target = '#carousel-example-generic' data - slide - to = '2' > < /li>< /ol>< div class = 'carousel-inner' role = 'listbox' >< div class = 'item active' >< img src = '...' alt = '...' >< div class = 'carousel-caption' >...< /div>< /div>< div class = 'item' >< img src = '...' alt = '...' >< div class = 'carousel-caption' >...< /div>< /div>...< /div>< a class = 'left carousel-control' href = '#carousel-example-generic' role = 'button' data - slide = 'prev' >< span class = 'glyphicon glyphicon-chevron-left' aria - hidden = 'true' > < /span>< span class = 'sr-only' > Previous < /span>< /a>< a class = 'right carousel-control' href = '#carousel-example-generic' role = 'button' data - slide = 'next' >< span class = 'glyphicon glyphicon-chevron-right' aria - hidden = 'true' > < /span>< span class = 'sr-only' > Next < /span>< /a>< /div>");
        return this;
    };
})(jQuery);




