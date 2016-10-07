<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="application">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Wiki</title>
        <link href="${pageContext.request.contextPath}/front-end/public/css/plugins/foundation.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/front-end/public/css/plugins/motion-ui.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/front-end/public/css/jsp/wiki-main.css" rel="stylesheet" type="text/css">
        <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/angular.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/angular-animate.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/angular-ui-router.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/foundation.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/foundation-apps-templates.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/modules/drilldown.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/modules/wiki-main.js" type="text/javascript"></script>

    </head>
    <body ng-controller="pctrl-views">
        <pdirec:nav></pdirec:nav>
        <pdirec:content></pdirec:content>
    </body>
    <link href="${pageContext.request.contextPath}/front-end/public/css/jsp/wiki-main.css" rel="stylesheet" type="text/css">
    <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/jquery.min.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/motion-ui.js" type="text/javascript"></script>    
    <script src="${pageContext.request.contextPath}/front-end/public/js/events/public-events.js" type="text/javascript"></script>
</html>
