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
                    $("#login").css({"background-color": "#F04124", "border-color": "red"});
                }
                if ($scope.password.trim() === "") {
                    go = false;
                    showNotification("Atencion!!!", "El campo de password no puede estar vacio");
                    $("#password").css({"background-color": "#F04124", "border-color": "red"});
                } else {
                    $("#password").css({"background-color": "#FFF", "border": "1px solid #bbb"});
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
                            var user = JSON.stringify(response);
                            $.ajax({
                                url: window.location.pathname + "/session/saveUser",
                                method: "POST",
                                data: {user: user}
                            }).done(function (response) {
                                window.location.href = window.location.pathname + "/main";
                            });
                        }
                    });
                }
            };
            $scope.$watch("login", function (nv) {
                if ($scope.login.trim() !== "") {
                    $("#login").css({"background-color": "#FFF", "border": "1px solid #bbb"});
                }
            });
            $scope.$watch("password", function (nv) {
                if ($scope.password.trim() !== "") {
                    $("#password").css({"background-color": "#FFF", "border": "1px solid #bbb"});
                }
            });

            function showNotification(title, content) {
                FoundationApi.publish("main-notifications", {
                    title: title,
                    content: content,
                    color: "alert",
                    autoclose: "3500"
                });
            }
        }]);
})(window.angular);

