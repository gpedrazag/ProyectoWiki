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
        <script src="${pageContext.request.contextPath}/front-end/public/js/modules/ontology-sub-element.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/modules/ontology-element.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/modules/resources.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/modules/dcsAltMap.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/front-end/public/js/modules/wiki-main.js" type="text/javascript"></script>

    </head>
    <body ng-controller="pctrlViews">
        <pdirec:nav></pdirec:nav>
        <pdirec:content></pdirec:content>
            <img id="img-quick-list" 
                 zf-open="quick-list-modal"
                 src="${pageContext.request.contextPath}/front-end/resources/img/quick-list.png"/>
        <div zf-modal="" id="quick-list-modal" class="collapse">
            <div class="dark title-bar">
                <span class="title center">Lista Rápida de Acciones</span>
                <span class="left"><a zf-close="">Cerrar</a></span>
            </div>
            <div style="margin-top: 30px;">
                <section class="block-list">
                    <ul>
                        <li ng-click="action.do()" ng-repeat="action in actions track by $index">
                            <a style="padding-left: 30px;" ng-click="action.do()">{{action.description}}</a>
                        </li>                            
                    </ul>
                </section>
            </div>
        </div>
    <zf-panel id="search-panel" position="bottom" class="dark">
        <a ng-click="closeSearchPanel()" class="close-button link-item-hover">×</a>
        <div style="margin-top: 40px;">
            <zf-accordion>
                <zf-accordion-item title="{{coincidence.classType}} {{coincidence.id}}" ng-repeat="coincidence in coincidences track by $index">
                    <div class="grid-block vertical">
                        <div class="grid-block" ng-repeat="match in coincidence.matches track by $index">
                            <div class="grid-block vertical">
                                <div class="grid-block">
                                    <span style="display: inline-table;">{{match.property}} : </span>
                                    <span style="display: inline-table;" ng-bind-html="match.content | trustHTML"></span>
                                </div>                                
                            </div>
                        </div>
                        <div class="grid-block" style="padding: 15px 0px 15px 15px;">
                            <a class="dark button large" ng-click="enterEditModeMain(coincidence.id, coincidence.reference)">Modo edición</a>
                        </div>
                    </div>
                </zf-accordion-item>
        </div>
    </zf-panel>

</body>
<link href="${pageContext.request.contextPath}/front-end/public/css/jsp/wiki-main.css" rel="stylesheet" type="text/css">
<script src="${pageContext.request.contextPath}/front-end/public/js/plugins/jquery.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/front-end/public/js/plugins/tinymce/tinymce.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/front-end/public/js/plugins/motion-ui.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/front-end/public/js/plugins/sweetalert.min.js" type="text/javascript"></script>        
<script src="${pageContext.request.contextPath}/front-end/public/js/events/public-events.js" type="text/javascript"></script>
</html>
