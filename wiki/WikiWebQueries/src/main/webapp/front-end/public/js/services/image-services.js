(function (angular) {
    var module = angular.module("pmodImageService", []);
    module.service("ImageService", function ($rootScope) {            
            this.loadHTML = function(container, html, $scope) {
                html = $("<div style='width:100%'>" + $(html)[0].outerHTML + "</div>");
                var images = getImages(html);
                html = $(html);
                images.forEach(function (img) {
                    searchImage(html, container, img, $scope);
                });
                $(container).html(html.prop("outerHTML"));
            };
            
            this.getImages = function(html) {
                var images = [];
                html.find("span").each(function (i, span) {
                    if (span.attributes[0].localName === "img") {
                        images.push(span);
                    }
                });
                return images;
            };
            
            this.searchImage = function(html, container, img, $scope) {
                var props = function () {
                    this.name = "";
                    this.height = "";
                    this.width = "";
                    this.url = "";
                };
                props = new props();
                props.name = img.attributes[0].value;
                props.height = img.attributes[1].value;
                props.width = img.attributes[2].value;
                props.url = typeof img.attributes[3] !== "undefined" ? img.attributes[3].value : null;
                if (props.url === null) {
                    $.ajax({
                        url: "/" + window.location.pathname.split("/")[1] + "/downloader/getImage",
                        data: {name: props.name},
                        method: "POST",
                        dataType: "json"
                    }).done(function (response) {
                        var ext = props.name.split(".")[1];
                        var img = ""
                                + "<img "
                                + "name=\"" + props.name + "\" "
                                + "src=\"" + response.base64 + "\" style='width:" + props.width + "; height:" + props.height + ";'/>";
                        var i = 0;
                        $(html).find("span").each(function (i, span) {
                            if (span.attributes[0].localName === "img" && span.attributes[0].value === props.name) {
                                $(html).find("span:eq(" + i + ")").replaceWith(img);
                                $compile($(img))($scope);
                                $scope.$apply();
                            }
                            i++;
                        });
                        $(container).html(html);
                    });
                } else {
                    var img = ""
                            + "<img "
                            + "name=\"" + props.name + "|url\" "
                            + "src=\"" + props.url + "\" style='width:" + props.width + "; height:" + props.height + ";'/>";
                    var i = 0;
                    $(html).find("span").each(function (i, span) {
                        if (span.attributes[0].localName === "img" && span.attributes[0].value === props.name && span.attributes[3].value === props.url) {
                            $(html).find("span:eq(" + i + ")").replaceWith(img);
                        }
                        i++;
                    });
                    $(container).html(html);
                }
            };
            
            var getImages = this.getImages;
            var searchImage = this.searchImage;
        });
})(window.angular);


