(function (angular) {
    var module = angular.module("pmodGeneralService", []);
    module.service("GeneralService", [
        "$rootScope",
        "AnimationService",
        "TranslatorService",
        function ($rootScope, AnimationService, QuickActionListService, TranslatorService) {
            this.getCheckedStructure = function () {
                var arr = [];
                $rootScope.elemData.forEach(function (data) {
                    arr.push(false);
                });
                return arr;
            };

            
            var getCheckedStructure = this.getCheckedStructure;
        }]);
})(window.angular);


