(function (angular) {
    var module = angular.module("pmod-ontology-element", ["pmod-ontology-sub-element"]);
    module.controller("pctrlOntologyElement", ["$rootScope", "$scope", "$compile", "FoundationApi", function ($rootScope, $scope, $compile, FoundationApi) {
            var imageCount = 0;
            var selectedImage = null;
            var urlImages = [];
            $scope.showLocalImage = false;
            $scope.showURLImage = false;
            $scope.showExistentImage = false;
            $scope.type = null;
            $scope.images = [];
            $scope.tinyMCE = [];
            $scope.selected = {editor: "", type: "", file: null};
            $scope.haveSolutions = {};
            $rootScope.subElems = [];

            $scope.haveEditPrivilege = function () {
                var haveIt = false;
                var obj = {};
                try {
                    $rootScope.user.havePrivileges.forEach(function (privilege) {
                       if(privilege.privilegeType === "edit" || privilege.privilegeType === "admin") {
                           haveIt = true;
                           throw obj;
                       }
                    });
                } catch(obj) {                    
                }

                return haveIt;
            };
            $scope.isAnAltAndSol = function (d) {
                if (typeof d !== "undefined") {
                    if (d.reference === "/Alternative/" && d.rationale.trim() !== "") {
                        return true;
                    }
                }
                return false;
            };
            $scope.isADcsAndWhtoutSol = function (d, i, key) {
                if (typeof d !== "undefined" && d.reference === "/Decision/") {
                    $.ajax({
                        url: "/" + window.location.pathname.split("/")[1] + d.reference + "haveSolution",
                        method: "POST",
                        data: {id: d.id},
                        dataType: "json"
                    }).done(function (response) {
                        $scope.haveSolutions[key][i].value = !response.value;
                        $scope.$apply();
                    });
                }
                return {value: false, id: d.id};
            };
            $scope.returnOrNotContent = function (data, containerId) {
                var container = document.getElementById(containerId);
                if (container.innerHTML.indexOf("div") < 0 && container.innerHTML.indexOf("<p") < 0) {
                    if (typeof data !== "undefined" && data.trim() !== "") {
                        if (data.indexOf("div") === 1) {
                            loadHTML(container, data, false);
                        } else {
                            $(container).html($("<div>").html(data));
                        }
                    } else {
                        $(container).html($("<div>").html("No existe contenido"));
                    }
                }
            };
            $scope.getN = function (elemData, n) {
                var array = new Array(Math.ceil(elemData.length / n));
                var i = 0;
                while (array[i]) {
                    array[i] = i;
                    i++;
                }
                return array;
            };
            $scope.getNElem = function (row, col, n, data) {
                var pos = (row * n - (n - col)) * 5 - 5;
                var arr = [];
                for (i = pos; i <= pos + 4; i++) {
                    if (typeof data.content[i] !== "undefined") {
                        arr.push(data.content[i]);
                    } else {
                        break;
                    }
                }
                return arr;
            };
            $scope.getNImages = function (row, col, n) {
                var pos = (row * n - (n - col)) - 1;
                if (typeof $scope.images[pos] !== "undefined") {
                    return $scope.images[pos];
                }
                return null;
            };
            $scope.selectedImage = function (id) {
                if (selectedImage !== null) {
                    $(document.getElementById(selectedImage)).hide();
                }
                $(document.getElementById(id)).show();
                selectedImage = id;
            };
            $scope.uploadLocalImage = function (id) {
                $scope.showLocalImage = true;
                $scope.showURLImage = false;
                $scope.showExistentImage = false;
                $scope.selected = {
                    editor: id,
                    type: "l"
                };
            };
            $scope.uploadURLImage = function (id) {
                $scope.showLocalImage = false;
                $scope.showURLImage = true;
                $scope.showExistentImage = false;
                $scope.selected = {
                    editor: id,
                    type: "u"
                };
            };
            $scope.uploadExistentImage = function (id) {
                $scope.showLocalImage = false;
                $scope.showURLImage = false;
                $scope.showExistentImage = true;
                $scope.selected = {
                    editor: id,
                    type: "e"
                };
                $scope.images = [];
            };
            $scope.uploadImage = function () {
                var fileName = null;
                if ($scope.selected.type === "l") {
                    var file = document.getElementById("input-local-image");
                    fileName = document.getElementById("input-local-image-name");
                    if (typeof fileName.value !== "undefined" && fileName.value !== "") {
                        if (typeof file.files[0] !== "undefined" && file.files[0] !== null) {
                            if (/\.(jpe?g|png|gif|jpg)$/i.test(file.files[0].name)) {
                                var reader = new FileReader();
                                reader.onload = function (e) {
                                    imageCount++;
                                    var imgHTML = $(""
                                            + "  <img src='" + reader.result + "' "
                                            + "     name=\"" + fileName.value + "." + file.files[0].name.split(".")[1] + "\" "
                                            + "     id='" + fileName.value + "' />"
                                            );
                                    FoundationApi.closeActiveElements({exclude: fileName.value});
                                    tinymce.get($scope.selected.editor).insertContent($(imgHTML)[0].outerHTML);
                                };
                                reader.readAsDataURL(file.files[0]);
                                $(fileName).removeClass("has-error");
                                $(fileName).removeClass("has-error");
                            } else {
                                FoundationApi.publish("main-notifications", {
                                    title: 'Atención!!!',
                                    content: 'Solo puede subir archivos de imagen jpg, jpeg, png o gif',
                                    position: "bottom-right", color: "dark",
                                    autoclose: "3000"});
                            }
                        } else {
                            $(file).addClass("has-error");
                        }
                    } else {
                        $(fileName).addClass("has-error");
                        fileName.placeholder = "Debe agregar un nombre al archivo";
                    }
                } else if ($scope.selected.type === "u") {
                    var url = document.getElementById("input-url-image").value;
                    fileName = document.getElementById("input-url-image-name");
                    if (typeof fileName.value !== "undefined" && fileName.value !== "") {
                        var imgHTML = $(""
                                + "  <img "
                                + "     name=\"" + fileName.value + "|url\" "
                                + "     id='" + fileName.value + "' />"
                                );
                        imgHTML.error(function () {
                            FoundationApi.publish("main-notifications", {
                                title: 'Atención!!!',
                                content: 'El enlace suministrado está roto',
                                position: "bottom-right",
                                color: "dark",
                                autoclose: "3000"});
                        });
                        imgHTML.load(function () {
                            FoundationApi.closeActiveElements({exclude: fileName.value});
                            tinymce.get($scope.selected.editor).insertContent($(imgHTML)[0].outerHTML);
                        });
                        imgHTML.attr("src", url);
                    } else {
                        $(fileName).addClass("has-error");
                        fileName.placeholder = "Debe agregar un nombre al archivo";
                    }
                } else {
                    var name = selectedImage.split("-")[1];
                    var image = null;
                    var obj = {};
                    try {
                        $scope.images.forEach(function (img) {
                            if (img.name === name) {
                                image = img;
                                throw obj;
                            }
                        });
                    } catch (obj) {
                    }
                    var img = null;
                    if ($scope.type === "url") {
                        img = ""
                                + "<img name=\"" + image.name + "|url\" src=\"" + image.base64 + "\"  />";
                    } else {
                        img = ""
                                + "<img name=\"" + image.name + "|exists\" src=\"" + image.base64 + "\"  />";
                    }
                    tinymce.get($scope.selected.editor).insertContent(img);
                    FoundationApi.closeActiveElements();
                }
            };
            $scope.translate = function (key) {
                return translate(key);
            };
            $scope.saveEdit = function (editorId, key) {
                var html = $("<div style='width:100%'>" + tinymce.get(editorId).getContent() + "</div>");
                var names = [];
                var files = [];
                var imageRegisters = [];
                var images = html.find("img");
                var reference = getElemReference();
                images.each(function (i, img) {
                    var name = $(img).attr("name");
                    var nameProps = name.split("|");
                    var h = $(img).css("height") === "0px" ? img.height + "px" : $(img).css("height");
                    var w = $(img).css("width") === "0px" ? img.width + "px" : $(img).css("width");
                    names.push(nameProps[0]);
                    if (typeof nameProps[1] === "undefined") {
                        imageRegisters.push({
                            type: "local",
                            content: "<span img=\"" + names[i] + "\" h=\"" + h + "\" w=\"" + w + "\"></span>",
                            references: [reference],
                            name: names[i]
                        });
                        files.push(dataURIToBlob(img.src));
                        html.find("img:eq(0)").replaceWith(imageRegisters[i].content);
                    } else {
                        if (nameProps[1] === "url") {
                            imageRegisters.push({
                                type: "url",
                                content: "<span img=\"" + names[i] + "\" h=\"" + h + "\" w=\"" + w + "\" url=\"" + img.src + "\"></span>",
                                references: [reference],
                                name: names[i]
                            });
                            html.find("img:eq(0)").replaceWith(imageRegisters[i].content);
                        } else {
                            imageRegisters.push({
                                type: "local",
                                content: "<span img=\"" + names[i] + "\" h=\"" + h + "\" w=\"" + w + "\"></span>",
                                references: [reference],
                                name: names[i]
                            });
                            html.find("img:eq(0)").replaceWith(imageRegisters[i].content);
                        }
                        files.push(null);
                    }
                });
                saveConfiguration(key, $(html)[0].outerHTML);
                saveArrayOfImages(names, files, function (data) {
                    var go = false;
                    if (typeof data === "undefined") {
                        go = true;
                    } else if (data.val) {
                        go = true;
                    }
                    if (go) {
                        var index = new Number(editorId.split("_")[2]);
                        loadHTML(document.getElementById("neContent-" + index), html, false);
                        $scope.chkList[index] = false;
                        saveImageRegisters(imageRegisters);
                    }
                });
            };
            $scope.getViewerRows = function () {
                return new Array(Math.ceil($scope.images.length / 3));
            };
            $scope.showLocalImages = function () {
                getViewerImages();
            };
            $scope.showURLImages = function () {
                getViewerURLImages();
            };
            $scope.$watchCollection("chkList", function (nl, ol) {
                var i = 0;
                var obj = {};
                var elemIn = null;
                var elemOut = null;
                var isEditorIn = false;
                try
                {
                    nl.forEach(function (bool) {
                        if (bool !== ol[i]) {
                            if (bool) {
                                elemIn = document.getElementById("eContent-" + i);
                                elemOut = document.getElementById("neContent-" + i);
                                isEditorIn = true;
                            } else {
                                elemIn = document.getElementById("neContent-" + i);
                                elemOut = document.getElementById("eContent-" + i);
                            }
                            animate(
                                    {in: elemIn, out: elemOut},
                                    {in: "fade-in", out: "fade-out"},
                                    false
                                    );
                            if (isEditorIn) {
                                showContentInEditor(elemOut.innerHTML, "editor_content_" + i);
                            }
                            throw obj;
                        }
                        i++;
                    });
                } catch (obj) {
                }

            });
            $scope.goTo = function (id, reference, elems) {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + reference + "selectById",
                    data: {id: id},
                    method: "POST",
                    dataType: "json"
                }).done(function (reponse) {
                    $rootScope.subElemData = [];
                    $rootScope.subRelatedElems = [];
                    $rootScope.subElems = elems;
                    $rootScope.$apply();
                    if (reponse !== null && reponse.id === id) {
                        Object.keys(reponse).forEach(function (key) {
                            if (key !== "id") {
                                if (typeof reponse[key] !== "object") {
                                    $rootScope.subElemData.push({key: key, content: reponse[key]});
                                } else {
                                    $rootScope.subRelatedElems.push({
                                        key: key,
                                        content: (typeof reponse[key].length === "undefined" ? [reponse[key]] : reponse[key])
                                    });
                                }
                            } else {
                                $rootScope.elemSubTypeId = reponse[key];
                            }
                        });
                        $rootScope.$apply();
                    }
                });
            };

            function getElemReference() {
                var reference = "";
                var obj = {};
                try {
                    $rootScope.elemData.forEach(function (elem) {
                        if (elem.key === "reference") {
                            reference = elem.content;
                        }
                    });
                } catch (obj) {
                }
                return reference;
            }
            function initTinyMCE(containerId) {
                var obj = {};
                var push = true;
                try {
                    $scope.tinyMCE.forEach(function (mce) {
                        if (mce.id === containerId) {
                            throw obj;
                        }
                    });
                } catch (obj) {
                    tinymce.EditorManager.execCommand('mceRemoveEditor', true, containerId);
                    push = false;
                }
                tinymce.init({
                    selector: "textarea#" + containerId,
                    plugins: "table textcolor",
                    toolbar: "table | forecolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | addImg",
                    menubar: false
                });
                if (push) {
                    $scope.tinyMCE.push({id: containerId});
                }

            }
            function showContentInEditor(data, containerId) {
                var container = document.getElementById(containerId);
                initTinyMCE(containerId);
                if (typeof data !== "undefined" && data.trim() !== "") {
                    if (data.indexOf("div") < 0 || data.indexOf("<p") < 0) {
                        loadHTML(container, data, true);
                    } else {
                        tinymce.get(containerId).setContent("<div>" + data + "</div>");
                    }
                } else {
                    tinymce.get(containerId).setContent("<div>No existe contenido</div>");
                }
            }
            function saveImageRegisters(registers) {
                var json = JSON.stringify(registers);
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/fileManager/saveData",
                    method: "POST",
                    data: {json: json}
                }).done(function (saved) {
                });

            }
            function saveConfiguration(key, content) {
                var obj = {};
                var url = "";
                obj["id"] = $rootScope.elemTypeId;
                $rootScope.elemData.forEach(function (elem) {
                    if (elem.key !== "reference") {
                        obj[elem.key] = elem.key === key ? content : "-_-";
                    }
                });
                if ($rootScope.elemType === "alternative") {
                    url = "/Alternative/update";
                } else if ($rootScope.elemType === "softwarearchitecture") {
                    url = "/SoftwareArchitecture/update";
                } else if ($rootScope.elemType === "artifact") {
                    url = "/Artifact/update";
                } else if ($rootScope.elemType === "qualityattributestage") {
                    url = "/QualityAttributeStage/update";
                } else if ($rootScope.elemType === "criteria") {
                    url = "/Criteria/update";
                } else if ($rootScope.elemType === "decision") {
                    url = "/Decision/update";
                } else if ($rootScope.elemType === "evaluation") {
                    url = "/Evaluation/update";
                } else if ($rootScope.elemType === "functionalrequeriment") {
                    url = "/FunctionalRequeriment/update";
                } else if ($rootScope.elemType === "responsible") {
                    url = "/Responsible/update";
                }
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + url,
                    method: "POST",
                    data: obj
                }).done(function () {

                });
            }
            function loadHTML(container, html, isEditor) {
                var images = getImages(html);
                html = $(html);
                images.forEach(function (img) {
                    searchImage(html, img, container, isEditor);
                });
                if (!isEditor) {
                    $(container).html(html.prop("outerHTML"));
                } else {
                    tinymce.get(container.id).setContent(html.prop("outerHTML"));
                }
            }
            function getViewerImages() {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/downloader/getAllImagesNames",
                    method: "POST",
                    dataType: "json"
                }).done(function (response) {
                    if (typeof response.error === "undefined") {
                        $(document.getElementById("ontoelem-li-local")).addClass("menu-bar-selected");
                        $(document.getElementById("ontoelem-li-url")).removeClass("menu-bar-selected");
                        $scope.type = "local";
                        $scope.images = [];
                        $rootScope.$apply();
                        setImagesInViewer(response, 0);
                    }
                });
            }
            function getViewerURLImages() {
                $.ajax({
                    url: "/" + window.location.pathname.split("/")[1] + "/downloader/getAllURLImages",
                    method: "POST",
                    dataType: "json"
                }).done(function (response) {
                    if (typeof response.error === "undefined") {
                        $(document.getElementById("ontoelem-li-url")).addClass("menu-bar-selected");
                        $(document.getElementById("ontoelem-li-local")).removeClass("menu-bar-selected");
                        $scope.type = "url";
                        $scope.images = [];
                        urlImages = [];
                        $rootScope.$apply();
                        response.forEach(function (r) {
                            urlImages.push(r);
                        });
                        setURLImagesInViewer();
                    } else {
                        FoundationApi.publish("main-rename-notifications", {
                            title: 'Atención!!!',
                            content: 'No se encontraron imágenes por URL',
                            position: "bottom-right", color: "dark",
                            autoclose: "3000"});
                    }
                });
            }
            function setURLImagesInViewer() {
                var i = 0;
                while (urlImages[i]) {
                    addURLImage(urlImages[i]);
                    i++;
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
                    $scope.$apply();
                    animateIn(
                            document.getElementById("div-" + image.attr("name")),
                            "fade-in",
                            false
                            );
                });
            }
            function setImagesInViewer(images, i) {
                if (typeof images[i] !== "undefined") {
                    $.ajax({
                        url: "/" + window.location.pathname.split("/")[1] + "/downloader/getImage",
                        data: {name: images[i].name},
                        method: "POST",
                        dataType: "json"
                    }).done(function (image) {
                        $scope.images.push(image);
                        $scope.$apply();
                        animateIn(
                                document.getElementById("div-" + image.name),
                                "fade-in",
                                false
                                );
                        i++;
                        setImagesInViewer(images, i);
                    });

                }
            }
            function getImages(html) {
                var c = $("<div style='width:100%'>" + $(html)[0].outerHTML + "</div>");
                var images = [];
                c.find("span").each(function (i, span) {
                    if (span.attributes[0].localName === "img") {
                        images.push(span);
                    }
                });
                return images;
            }
            function searchImage(html, img, container, isEditor) {
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
                        if (!isEditor) {
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
                        }
                    });
                } else {
                    var img = ""
                            + "<img "
                            + "name=\"" + props.name + "|url\" "
                            + "src=\"" + props.url + "\" style='width:" + props.width + "; height:" + props.height + ";'/>";
                    if (!isEditor) {
                        var i = 0;
                        $(html).find("span").each(function (i, span) {
                            if (span.attributes[0].localName === "img" && span.attributes[0].value === props.name && span.attributes[3].value === props.url) {
                                $(html).find("span:eq(" + i + ")").replaceWith(img);
                            }
                            i++;
                        });
                        $(container).html(html);
                    }
                }
            }
            function saveArrayOfImages(names, files, cb) {
                for (var i = 0; i < files.length; i++) {
                    if (files[i] !== null) {
                        var frmData = new FormData();
                        frmData.append("name", names[i]);
                        frmData.append("file", files[i]);

                        $.ajax({
                            url: "/" + window.location.pathname.split("/")[1] + "/uploader/uploadFile",
                            contentType: false,
                            data: frmData,
                            dataType: "json",
                            method: "POST",
                            processData: false
                        }).done(function (data) {
                            cb(data);
                        });
                    } else {
                        cb();
                    }

                }
            }
            function dataURIToBlob(data) {
                var byteString;
                if (data.split(',')[0].indexOf('base64') >= 0)
                    byteString = atob(data.split(',')[1]);
                else
                    byteString = unescape(data.split(',')[1]);

                var mimeString = data.split(',')[0].split(':')[1].split(';')[0];

                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                return new Blob([ia], {type: mimeString});
            }

        }]);
    module.directive("pdirecOntoelem", function () {
        return {
            templateUrl: "/" + window.location.pathname.split("/")[1] + "/front-end/views/templates/ontology-element.html",
            restrict: "E",
            replace: "true"
        };
    });

})(window.angular);


