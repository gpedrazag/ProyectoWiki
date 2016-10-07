var selectedItem = 1;

var evtDrilldownSlideIn = new CustomEvent("evt-drilldown-slide-in",
        {
            bubbles: false,
            cancelable: true
        }
);
var evtSearchingSlideIn = new CustomEvent("evt-searching-slide-in",
        {
            bubbles: false,
            cancelable: true
        }
);
var evtResourcesSlideIn = new CustomEvent("evt-resources-slide-in",
        {
            bubbles: false,
            cancelable: true
        }
);

document.addEventListener("evt-drilldown-slide-in", function () {
    var elem = document.getElementById("content");
    var elem1 = document.getElementById("main-content-drilldown");
    var elem2 = document.getElementById("main-content-searching");
    var elem3 = document.getElementById("main-content-resources");
    if (selectedItem === 2) {
        animateOut(elem, function () {
            $(elem2).hide();
            $(elem2).children().hide();
            $(elem1).show();
            $(elem1).children().show();
            MotionUI.animateIn(elem, "slide-in-left");
        });
    } else if (selectedItem === 3) {
        animateOut(elem, function () {
            $(elem3).hide();
            $(elem2).children().hide();
            $(elem1).show();
            $(elem1).children().show();
            MotionUI.animateIn(elem, "slide-in-left");
        });
    }
    selectedItem = 1;
});
document.addEventListener("evt-searching-slide-in", function () {
    var elem = document.getElementById("content");
    var elem1 = document.getElementById("main-content-drilldown");
    var elem2 = document.getElementById("main-content-searching");
    var elem3 = document.getElementById("main-content-resources");
    if (selectedItem === 1) {
        animateOut(elem, function () {
            $(elem1).hide();
            $(elem1).children().hide();
            $(elem2).show();
            $(elem2).children().show();
            MotionUI.animateIn(elem, "slide-in-left");
        });
    } else if (selectedItem === 3) {
        animateOut(elem, function () {
            $(elem3).hide();
            $(elem3).children().hide();
            $(elem2).show();
            $(elem2).children().show();
            MotionUI.animateIn(elem, "slide-in-left");
        });
    }
    selectedItem = 2;
});
document.addEventListener("evt-resources-slide-in", function () {
    var elem = document.getElementById("content");
    var elem1 = document.getElementById("main-content-drilldown");
    var elem2 = document.getElementById("main-content-searching");
    var elem3 = document.getElementById("main-content-resources");
    if (selectedItem === 1) {
        animateOut(elem, function () {
            $(elem1).hide();
            $(elem1).children().hide();
            $(elem3).show();
            $(elem3).children().show();
            MotionUI.animateIn(elem, "slide-in-left");
        });
    } else if (selectedItem === 2) {
        animateOut(elem, function () {
            $(elem2).hide();
            $(elem2).children().hide();
            $(elem3).show();
            $(elem3).children().show();
            MotionUI.animateIn(elem, "slide-in-left");
        });
    }
    selectedItem = 3;
});

function animateOut(elem, cb) {
    MotionUI.animateOut(elem, "slide-out-right", cb);
}
