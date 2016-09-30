<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="application">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Wiki</title>
        <link href="${pageContext.request.contextPath}/front-end/public/css/plugins/foundation.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/front-end/public/css/jsp/wiki-main.css" rel="stylesheet" type="text/css">
        <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/angular.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/angular-animate.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/angular-ui-router.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/foundation.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/foundation-apps-templates.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="dark title-bar">
            <div class="center">
                <input type="text" placeholder="Busque algo aquí" id="search" />
            </div>
            <div class="right">
                <div class="tittle-bar-right-elem float-left">
                    <zf-action-sheet id="action-menu">
                        <zf-as-button>
                            <a id="actions-button" ></a>
                        </zf-as-button>
                        <zf-as-content position="bottom">
                            <ul class="menu">
                                <li id="li-drilldown" name="link-drilldown">
                                    <div class="grid-block">
                                        <div class="grid-block"><span id="drilldown" name="link-drilldown"></span></div>
                                        <div class="grid-block"><a id="a-drilldown" name="link-drilldown">Ontology Drilldown</a></div>
                                    </div>
                                </li>
                                <li id="li-searching" name="link-searching">
                                    <div class="grid-block">
                                        <div class="grid-block"><span id="searching" name="link-searching"></span></div>
                                        <div class="grid-block"><a id="a-searching" name="link-searching">Advance Searching</a></div>
                                    </div>
                                </li>
                                <li id="li-resources" name="link-resources">
                                    <div class="grid-block">
                                        <div class="grid-block"><span id="resources" name="link-resources"></span></div>
                                        <div class="grid-block"><a id="a-resources" name="link-resources">Resources</a></div>
                                    </div>
                                </li>
                            </ul>
                        </zf-as-content>
                    </zf-action-sheet>
                </div>
            </div>
        </div>
        <div class="grid-block">
            <div class="grid-block small-2 medium-2 large-2"></div>
            <div id="main-content" class="grid-block small-8 medium-8 large-8">
                
            </div>
            <div class="grid-block small-2 medium-2 large-2"></div>
        </div>
    </body>
    <link href="${pageContext.request.contextPath}/front-end/public/css/jsp/wiki-main.css" rel="stylesheet" type="text/css">
    <script src="${pageContext.request.contextPath}/front-end/public/js/plugins/jquery.min.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/front-end/public/js/jsp/wiki-main.js" type="text/javascript"></script>
</html>
