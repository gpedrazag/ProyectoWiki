(function (angular) {
    var module = angular.module("pmodGeneralService", []);
    module.service("GeneralService", [
        "$rootScope",
        function ($rootScope) {
            this.getCheckedStructure = function () {
                var arr = [];
                $rootScope.elemData.forEach(function (data) {
                    arr.push(false);
                });
                return arr;
            };
            
            this.haveNameButNotDescription = function (data) {
                var obj = {
                    haveName: false,
                    haveDescription: false
                };
                if (data) {
                    if (data.name) {
                        obj.haveName = true;
                    } else if (data.description) {
                        obj.haveDescription = true;
                    }
                }
                return obj;
            };

            
            var getCheckedStructure = this.getCheckedStructure;
        }]);
})(window.angular);


