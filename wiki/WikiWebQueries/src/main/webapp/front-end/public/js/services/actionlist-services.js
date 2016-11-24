(function (angular) {
    var module = angular.module("pmodActionListService",[]);
    module.service("QuickActionListService", [
        "$rootScope", 
        "FoundationApi", 
        "AnimationService", 
        "GeneralService", 
        function ($rootScope, FoundationApi, AnimationService, GeneralService) {
            this.addAction = function (id, url, description, elementType) {
                var go = true;
                $rootScope.actions.forEach(function (action) {
                    if (action.id === id) {
                        go = false;
                    }
                });
                if (go) {
                    $rootScope.actions.push({
                        id: id,
                        description: description,
                        do: function (event) {
                            if (event) {
                                event.stopPropagation();
                            }
                            $.ajax({
                                url: url,
                                method: "POST",
                                dataType: "json",
                                data: {id: id.split(":")[1]}
                            }).done(function (response) {
                                $rootScope.elemData = [];
                                $rootScope.relatedElems = [];
                                $rootScope.subElemData = [];
                                $rootScope.subRelatedElems = [];
                                $rootScope.elemTypeId = "";
                                $rootScope.ontologyElementSelected = false;
                                $rootScope.$apply();
                                Object.keys(response).forEach(function (key) {
                                    if (key !== "id") {
                                        if (key === "reference") {
                                            $rootScope.actualReference = response[key];
                                        }
                                        if (typeof response[key] !== "object") {
                                            $rootScope.elemData.push({
                                                key: key,
                                                content: response[key]});
                                        } else {
                                            $rootScope.relatedElems.push({
                                                key: key,
                                                content: (typeof response[key].length === "undefined" ? [response[key]] : response[key])});
                                        }
                                    } else {
                                        $rootScope.elemTypeId = response[key];
                                    }
                                });
                                $rootScope.chkList = GeneralService.getCheckedStructure();
                                $rootScope.elemType = elementType;
                                $rootScope.ontologyElementSelected = true;
                                $rootScope.$apply();
                                AnimationService.animate(
                                        {in: $("#main-content-ontology-element"), out: $rootScope.selectedContext},
                                        {in: "fade-in", out: "fade-out"},
                                        true
                                        );
                                $rootScope.selectedContext = document.getElementById("main-content-ontology-element");
                                FoundationApi.closeActiveElements();
                            });
                        }
                    });
                }
            };            
        }]);
})(window.angular);

