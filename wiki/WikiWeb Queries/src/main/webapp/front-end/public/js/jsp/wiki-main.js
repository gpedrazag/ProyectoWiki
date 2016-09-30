$(document).ready(function () {
    document.getElementById("li-drilldown").onmouseover = hoverMenuOption;
    document.getElementById("li-searching").onmouseover = hoverMenuOption;
    document.getElementById("li-resources").onmouseover = hoverMenuOption;
    
    document.getElementById("drilldown").onmouseover = hoverMenuOption;
    document.getElementById("searching").onmouseover = hoverMenuOption;
    document.getElementById("resources").onmouseover = hoverMenuOption;
    
    document.getElementById("li-drilldown").onmouseout = outHoverMenuOption;
    document.getElementById("li-searching").onmouseout = outHoverMenuOption;
    document.getElementById("li-resources").onmouseout = outHoverMenuOption;
    
    document.getElementById("drilldown").onmouseout = outHoverMenuOption;
    document.getElementById("searching").onmouseout = outHoverMenuOption;
    document.getElementById("resources").onmouseout = outHoverMenuOption;

    document.getElementById("li-drilldown").onclick = clickMenuOption;
    document.getElementById("li-searching").onclick = clickMenuOption;
    document.getElementById("li-resources").onclick = clickMenuOption;

    document.getElementById("a-drilldown").onclick = clickMenuOption;
    document.getElementById("a-searching").onclick = clickMenuOption;
    document.getElementById("a-resources").onclick = clickMenuOption;

    document.getElementById("drilldown").onclick = clickMenuOption;
    document.getElementById("searching").onclick = clickMenuOption;
    document.getElementById("resources").onclick = clickMenuOption;
    
    
});

function clickMenuOption(event) {
    var source = $(event.target);
    deselectMenuOption();
    if ($(source).is("a") || $(source).is("span")) {
        source = $(event.target).parent().parent().parent();
    } else {
        source = $(event.target).parent().parent();
    }
    $(source).find("a").addClass("selected");
    $(source).addClass("selected");
}

function outHoverMenuOption() {
    deselectMenuOption(true);
}

function hoverMenuOption(event) {
    var source = $(event.target);
    if ($(source).is("span")) {
        source = $(event.target).parent().parent().parent();
    } else {
        source = $(event.target).parent().parent();
    }
    $($(source).find("div")[2]).find("a").addClass("selected");
}

function deselectMenuOption(bool) {
    var isHover = bool || false;
    if (isHover) {
        $.each($($(document).find(".action-sheet.is-active ul li")), function (i, obj) {
            if (typeof $(obj).attr("class") === "undefined" || $(obj).attr("class") === "") {
                $(obj).find("a").removeClass("selected");
            }

        });
    } else {
        $($(document).find(".action-sheet.is-active .selected")).removeClass("selected");
    }
}