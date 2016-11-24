(function (angular) {
    var module = angular.module("pmodAnimationServices", []);
    module.service("AnimationService", function () {
        this.animate = function (elems, animations, all, visibleChildrens) {
            visibleChildrens = visibleChildrens | true;
            if (elems.in !== null && typeof elems.in[0] === "undefined") {
                elems.in = [elems.in];
            }
            if (elems.out !== null && typeof elems.out[0] === "undefined") {
                elems.out = [elems.out];
            }
            if (elems.out !== null || elems.in !== null) {
                if (elems.out === null) {
                    animateIn(elems.in, animations.in, all, visibleChildrens);
                } else if (elems.in === null) {
                    animateOut(elems.out, animations.out, all);
                } else {
                    animateOut(elems.out, animations.out, all, function () {
                        animateIn(elems.in, animations.in, all, visibleChildrens);
                    });
                }
            }
        };

        this.animateIn = function (elem, animation, all, visibleChildrens) {
            visibleChildrens = visibleChildrens | true;
            $(elem).show();
            if (visibleChildrens) {
                $(elem).children().show();
            }
            MotionUI.animateIn(all ? document.getElementById("content") : elem, animation);
        };

        this.animateOut = function (elem, animation, all, cb) {
            MotionUI.animateOut(all ? document.getElementById("content") : elem, animation, function () {
                $(elem).hide();
                $(elem).children().hide();
                if (typeof cb !== "undefined") {
                    cb();
                }
            });
        };
        
        var animateIn = this.animateIn;
        var animateOut = this.animateOut;
    });    
})(window.angular);

