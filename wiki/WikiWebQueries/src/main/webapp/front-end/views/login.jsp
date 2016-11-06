<!DOCTYPE html>
<html ng-app="applicationForLogin">
    <head>
        <title>Login</title>
        <link href="${pageContext.request.contextPath}/front-end/public/css/plugins/foundation.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/front-end/public/css/jsp/login.css" rel="stylesheet">        
        <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/angular.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/angular-animate.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/angular-ui-router.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/foundation.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/foundation-apps-templates.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/modules/login.js" type="text/javascript"></script>
    </head>
    <body ng-controller="pcrtlLogin">
        <div style="position: relative; width: 100%; height: 100%;">
            <div class="div-login">
                <div class="dark title-bar">
                    <div class="center" style="">
                        LOGIN
                    </div>
                </div>
                <div style="margin-top: 15px; padding: 5px; width: 100%; height: 100%;">
                    <div>
                        <label>
                            Login
                            <input type="text" id="login" ng-model="login">
                        </label>
                    </div>
                    <div>
                        <label>
                            Password
                            <input type="password" id="password" ng-model="password">
                        </label>
                    </div>
                    <div style="width: 100%; height: 100%;">
                        <a class="button dark" ng-click="doLogin()">Hecho</a>
                    </div>
                </div>
            </div>
        </div>
    <zf-notification-set id="main-notifications" position="top-left"></zf-notification-set>
    <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/jquery.min.js" type="text/javascript"></script>
</body>
</html>