<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Wiki</title>
        <link href="${pageContext.request.contextPath}/front-end/css/plugins/bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/front-end/css/plugins/sweetalert.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/front-end/css/jsp/wiki-main.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <nav id="superior-nav-bar" class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
            <div class="col-lg-2 col-sm-2 col-md-2 col-xs-2"></div>
            <div class="superior-nav col-lg-4 col-sm-4 col-md-4 col-xs-4">
                <span>Wiki | Great Knowledge</span>
            </div>
            <div class="superior-nav col-lg-4 col-sm-4 col-md-4 col-xs-4">
                <input type="text" id="txt-general-query" class="p-form-control" />
            </div>
            <div class="col-lg-2 col-sm-2 col-md-2 col-xs-2"></div>
        </nav>
        <nav id="menu-nav-bar" class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
            <div class="col-lg-2 col-sm-2 col-md-2 col-xs-2"></div>
            <div class="col-lg-8 col-sm-8 col-md-8 col-xs-8"></div>
            <div class="col-lg-2 col-sm-2 col-md-2 col-xs-2"></div>
        </nav>
        <div class="container col-lg-12 col-sm-12 col-md-12 col-xs-12">
            <div class="container-side col-lg-2 col-sm-2 col-md-2 col-xs-2"></div>
            <div id = "main-container" class="col-lg-8 col-sm-8 col-md-8 col-xs-8"></div>
            <div class="container-side col-lg-2 col-sm-2 col-md-2 col-xs-2"></div>
        </div>
    </body>
</html>
