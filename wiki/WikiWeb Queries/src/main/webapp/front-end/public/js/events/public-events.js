function animate(elems, animations, all) {
    if (elems.in !== elems.out || all) {
        animateOut(elems.out, animations.out, all, function () {
            animateIn(elems.in, animations.in, all);
        });
    }
}

function animateIn(elem, animation, all) {
    $(elem).show();
    $(elem).children().show();
    MotionUI.animateIn(all ? document.getElementById("content") : elem, animation);
}

function animateOut(elem, animation, all, cb) {
    MotionUI.animateOut(all ? document.getElementById("content") : elem, animation, function () {
        $(elem).hide();
        $(elem).children().hide();
        cb();
    });
}
