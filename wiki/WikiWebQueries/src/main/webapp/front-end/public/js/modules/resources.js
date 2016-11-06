(function (angular) {
    var module = angular.module("pmodResources", []);
    module.controller("pctrlResources", ["$scope", "$rootScope", "FoundationApi", function ($scope, $rootScope, FoundationApi) {
            var selectedImage = null;
            var page = 1;
            var nPages = 0;
            var count = 0;
            var name = "";
            var urlImages = [];
            $scope.images = [];
            $scope.type = null;

            $scope.getPages = function (n) {
                if (typeof $rootScope.rImages !== "undefined") {
                    nPages = Math.ceil($rootScope.rImages.length / n);
                    return new Array(nPages);
                }
                return [];
            };
            $scope.getImageInPos = function (row, col, n) {
                if ($scope.images.length > 0) {
                    return $scope.images[(row * n - (n - col)) - 1];
                }
            };
            $scope.selectedImage = function (id) {
                var cover = $(document.getElementById(id));
                cover.show();
                if (selectedImage !== null) {
                    $(document.getElementById(selectedImage)).hide();
                }
                selectedImage = id;
                name = id.split("-")[2];
            };
            $scope.showImagesForPage = function (p, max) {
                var context = document.getElementById("main-content-resources");
                $(context).find("span[name=page-" + page + "]")
                        .removeClass("secondary").addClass("dark");
                page = p;
                $scope.images = [];
                var pos = (page - 1) * max;
                if ($scope.type === "local") {
                    setImagesInViewer(pos, max, pos);
                } else {
                    setURLImagesInViewer(pos, max, pos);
                }
                $(context).find("span[name=page-" + page + "]").
                        addClass("secondary").removeClass("dark");
            };
            $scope.existPrevious = function () {
                var exists = false;
                if (typeof $rootScope.rImages !== "undefined") {
                    return page !== 1 && page <= nPages;
                }
                return exists;
            };
            $scope.existNext = function () {
                var exists = false;
                if (typeof $rootScope.rImages !== "undefined") {
                    return page < nPages;
                }
                return exists;
            };
            $scope.showPrevious = function (max) {
                var context = document.getElementById("main-content-resources");
                $(context).find("span[name=page-" + page + "]")
                        .removeClass("secondary").addClass("dark");
                page--;
                $scope.images = [];
                var pos = (page - 1) * max;
                if ($scope.type === "local") {
                    setImagesInViewer(pos, max, pos);
                } else {
                    setURLImagesInViewer(pos, max, pos);
                }
                $(context).find("span[name=page-" + page + "]").
                        addClass("secondary").removeClass("dark");
            };
            $scope.showNext = function (max) {
                var context = document.getElementById("main-content-resources");
                $(context).find("span[name=page-" + page + "]")
                        .removeClass("secondary").addClass("dark");
                page++;
                $scope.images = [];
                var pos = (page - 1) * max;
                if ($scope.type === "local") {
                    setImagesInViewer(pos, max, pos);
                } else {
                    setURLImagesInViewer(pos, max, pos);
                }
                $(context).find("span[name=page-" + page + "]").
                        addClass("secondary").removeClass("dark");
            };
            $scope.deleteImage = function (limit) {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/fileManager/deleteFile",
                    method: "POST",
                    data: {name: name, type: $scope.type}
                }).done(function (response) {
                    if (response) {
                        $scope.images = [];
                        if ($scope.type === "local") {
                            getViewerImages(1, limit, $scope.showImagesForPage);
                        } else if ($scope.type === "url") {
                            getViewerURLImages(1, limit, $scope.showImagesForPage);
                        }
                    }
                });
            };
            $scope.updateImage = function (limit, event) {
                if (event) {
                    event.stopPropagation();
                }
                var elem = document.getElementById("input-new-name");
                if (elem.value === "") {
                    FoundationApi.publish("main-rename-notifications", {
                        title: 'Atención!!!',
                        content: 'Debe ingFoundatresar un nuevo nombre',
                        position: "bottom-right", color: "dark",
                        autoclose: "3000"});
                } else {
                    $.ajax({
                        url: "/" + window.location.pathname.split("/")[1] + "/fileManager/updateFile",
                        method: "POST",
                        data: {name: name, nName: elem.value, type: $scope.type}
                    }).done(function (response) {
                        if (response) {
                            $scope.images = [];
                            if ($scope.type === "local") {
                                getViewerImages(1, limit, $scope.showImagesForPage);
                            } else if ($scope.type === "url") {
                                getViewerURLImages(1, limit, 0, $scope.showImagesForPage);
                            }
                        }
                    });
                    FoundationApi.closeActiveElements();
                    $scope.nName = "";
                }
            };
            $scope.showLocalImages = function (i, limit) {
                getViewerImages(i, limit, $scope.showImagesForPage);
            };
            $scope.showURLImages = function (i, limit) {
                getViewerURLImages(i, limit, $scope.showImagesForPage);
            };
            $scope.$watchCollection("rImages", function (ol, nl) {
                if ($rootScope.rImages && $rootScope.rImagesDoCount === 0) {
                    $scope.type = null;
                    $scope.images = [];
                    FoundationApi.closeActiveElements();
                    setImagesInViewer(0, 6, 0);
                    $rootScope.rImagesDoCount++;
                }
            });

            function setImagesInViewer(i, limit, cons) {
                if (i < limit + cons) {
                    if (typeof $rootScope.rImages !== "undefined") {
                        var images = $rootScope.rImages;
                        if (typeof images[i] !== "undefined") {
                            $.ajax({
                                url: "/" + window.location.pathname.split("/")[1] + "/downloader/getImage",
                                data: {name: images[i].name},
                                method: "POST",
                                dataType: "json"
                            }).done(function (image) {
                                $scope.images.push(image);
                                $rootScope.$apply();
                                i++;
                                animateIn(
                                        document.getElementById("r-div-" + image.name),
                                        "fade-in",
                                        false
                                        );
                                setImagesInViewer(i, limit, cons);
                            });

                        }
                    }

                }
            }
            function getViewerImages(i, limit, cb) {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/downloader/getAllImagesNames",
                    method: "POST",
                    dataType: "json"
                }).done(function (response) {
                    if (typeof response.error === "undefined") {
                        $(document.getElementById("ontoelem-li-local")).addClass("menu-bar-selected");
                        $(document.getElementById("ontoelem-li-url")).removeClass("menu-bar-selected");
                        $scope.type = "local";
                        $rootScope.rImages = response;
                        $scope.images = [];
                        $rootScope.$apply();
                        cb(i, limit);
                    } else {
                        FoundationApi.publish("main-rename-notifications", {
                            title: 'Atención!!!',
                            content: 'No se encontraron imágenes locales',
                            position: "bottom-right", color: "dark",
                            autoclose: "3000"});
                    }
                });
            }
            function getViewerURLImages(i, limit, cb) {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/downloader/getAllURLImages",
                    method: "POST",
                    dataType: "json"
                }).done(function (response) {
                    if (typeof response.error === "undefined") {
                        $(document.getElementById("resources-li-url")).addClass("menu-bar-selected");
                        $(document.getElementById("resources-li-local")).removeClass("menu-bar-selected");
                        $scope.type = "url";
                        $scope.images = [];
                        $rootScope.rImages = [];
                        urlImages = [];
                        $rootScope.$apply();
                        response.forEach(function (r) {
                            $rootScope.rImages.push(r.name);
                            urlImages.push(r);
                        });
                        $rootScope.$apply();
                        cb(i, limit);
                    } else {
                        FoundationApi.publish("main-rename-notifications", {
                            title: 'Atención!!!',
                            content: 'No se encontraron imágenes por URL',
                            position: "bottom-right", color: "dark",
                            autoclose: "3000"});
                    }
                });
            }
            function setURLImagesInViewer(pos, limit, cons) {
                var i = pos;
                var obj = {};
                try {
                    while (i < limit + cons) {
                        if (urlImages[i]) {
                            addURLImage(urlImages[i]);
                            i++;
                        } else {
                            throw obj;
                        }
                    }
                } catch (obj) {
                }
            }
            function addURLImage(img) {
                var elem = $(img.content);
                var image = $("<img>");
                image.attr({"src": elem.attr("url"), "name": elem.attr("img")});
                image.load(function () {
                    $scope.images.push({
                        name: image.attr("name"),
                        base64: image.attr("src"),
                        resolution: image[0].width + "x" + image[0].height
                    });
                    $rootScope.$apply();
                    setTimeout(function () {
                        animateIn(
                                document.getElementById("r-div-" + image.attr("name")),
                                "fade-in",
                                false
                                );
                    }, 500);
                });
            }
        }]);
    module.directive("pdirecResources", function () {
        return {
            replace: "true",
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/resources.html",
            restrict: "E"
        };
    });
})(window.angular);

