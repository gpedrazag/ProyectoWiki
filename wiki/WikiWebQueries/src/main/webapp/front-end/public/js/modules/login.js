(function (angular) {
    var module = angular.module("pmodLogin", []);
    module.controller("pcrtlLogin", ["$scope", "FoundationApi", function ($scope, FoundationApi) {
            $scope.login = "";
            $scope.password = "";

            $scope.doLogin = function () {
                var go = true;
                if ($scope.login.trim() === "") {
                    go = false;
                    showNotification("Atencion!!!", "El campo del login no puede estar vacio");
                    $("#login").css({"background-color":"#f4425c", "border-color":"red"});
                } else {
                    $("#login").css({"background-color":"#fff", "border":"1px solid #bbb"});
                }
                if ($scope.password.trim() === "") {
                    go = false;
                    showNotification("Atencion!!!", "El campo de password no puede estar vacio");
                    $("#password").css({"background-color":"#f4425c", "border-color":"red"});
                } else {
                    $("#password").css({"background-color":"#fff", "border":"1px solid #bbb"});
                }
                if (go) {
                    $.ajax({
                        url: window.location.pathname + "/user/getUserLoginPassword",
                        data: {login: $scope.login, password: $scope.password},
                        method: "POST",
                        dataType: "json"
                    }).done(function (response) {
                        if (response.error) {
                            showNotification("Atencion!!!", "El login o el password son icorrectos");
                        } else {
                            window.location.href = window.location.pathname + "/main";
                        }
                    });
                }
            };

            function showNotification(title, content) {
                FoundationApi.publish("main-notifications", {
                    title: title,
                    content: content,
                    color: "alert",
                    autoclose: "5000"
                });
            }
        }]);
})(window.angular);

