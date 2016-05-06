<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link href="${pageContext.request.contextPath}/front-end/css/plugins/bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/front-end/css/plugins/metisMenu.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/front-end/css/plugins/sb-admin-2.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/front-end/css/plugins/sweetalert.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/front-end/css/plugins/font-awesome.min.css" rel="stylesheet" type="text/css">
        <link href="${pageContext.request.contextPath}/front-end/css/controls/wiki-control.css" rel="stylesheet" type="text/css">
        <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon"> 

    </head>
    <body>

        <div id="wrapper">

            <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="${pageContext.request.contextPath}/wiki-main.jsp">Wiki</a>
                </div>
                <ul class="nav navbar-top-links navbar-right">
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i class="fa fa-envelope fa-fw"></i>  <i class="fa fa-caret-down"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-messages">
                            <li>
                                <a href="#">
                                    <div>
                                        <strong>John Smith</strong>
                                        <span class="pull-right text-muted">
                                            <em>Yesterday</em>
                                        </span>
                                    </div>
                                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <strong>John Smith</strong>
                                        <span class="pull-right text-muted">
                                            <em>Yesterday</em>
                                        </span>
                                    </div>
                                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <strong>John Smith</strong>
                                        <span class="pull-right text-muted">
                                            <em>Yesterday</em>
                                        </span>
                                    </div>
                                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a class="text-center" href="#">
                                    <strong>Read All Messages</strong>
                                    <i class="fa fa-angle-right"></i>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i class="fa fa-tasks fa-fw"></i>  <i class="fa fa-caret-down"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-tasks">
                            <li>
                                <a href="#">
                                    <div>
                                        <p>
                                            <strong>Task 1</strong>
                                            <span class="pull-right text-muted">40% Complete</span>
                                        </p>
                                        <div class="progress progress-striped active">
                                            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                                                <span class="sr-only">40% Complete (success)</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <p>
                                            <strong>Task 2</strong>
                                            <span class="pull-right text-muted">20% Complete</span>
                                        </p>
                                        <div class="progress progress-striped active">
                                            <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%">
                                                <span class="sr-only">20% Complete</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <p>
                                            <strong>Task 3</strong>
                                            <span class="pull-right text-muted">60% Complete</span>
                                        </p>
                                        <div class="progress progress-striped active">
                                            <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">
                                                <span class="sr-only">60% Complete (warning)</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <p>
                                            <strong>Task 4</strong>
                                            <span class="pull-right text-muted">80% Complete</span>
                                        </p>
                                        <div class="progress progress-striped active">
                                            <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%">
                                                <span class="sr-only">80% Complete (danger)</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a class="text-center" href="#">
                                    <strong>See All Tasks</strong>
                                    <i class="fa fa-angle-right"></i>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i class="fa fa-bell fa-fw"></i>  <i class="fa fa-caret-down"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-alerts">
                            <li>
                                <a href="#">
                                    <div>
                                        <i class="fa fa-comment fa-fw"></i> New Comment
                                        <span class="pull-right text-muted small">4 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <i class="fa fa-twitter fa-fw"></i> 3 New Followers
                                        <span class="pull-right text-muted small">12 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <i class="fa fa-envelope fa-fw"></i> Message Sent
                                        <span class="pull-right text-muted small">4 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <i class="fa fa-tasks fa-fw"></i> New Task
                                        <span class="pull-right text-muted small">4 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <i class="fa fa-upload fa-fw"></i> Server Rebooted
                                        <span class="pull-right text-muted small">4 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a class="text-center" href="#">
                                    <strong>See All Alerts</strong>
                                    <i class="fa fa-angle-right"></i>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-user">
                            <li><a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a>
                            </li>
                            <li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>
                            </li>
                            <li class="divider"></li>
                            <li><a href="login.html"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>

                <div class="navbar-default sidebar" role="navigation">
                    <div class="sidebar-nav navbar-collapse">
                        <ul class="nav" id="side-menu">
                            <li class="sidebar-search">
                                <div class="input-group custom-search-form">
                                    <input type="text" class="form-control" placeholder="Search...">
                                    <span class="input-group-btn">
                                        <button class="btn btn-default" type="button">
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <a href="#"><i></i>Alternativa<span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
                                    <li>
                                        <a id="c-1" href="#modificarAlternativa"><i class="fa fa-plus-square-o" aria-hidden="true">&nbsp</i>Crear</a>
                                    </li>
                                    <li>
                                        <a id="m-1" href="#modificarAlternativa"><i class="fa fa-pencil-square-o" aria-hidden="true">&nbsp</i>Modificar</a>
                                    </li>
                                    <li>
                                        <a id="d-1" href="#eliminarAlternativa"><i class="fa fa-minus-square-o" aria-hidden="true">&nbsp</i>Eliminar</a>
                                    </li>
                                    <li>
                                        <a id="r-1" href="#relacionesAlternativa"><i class="fa fa-arrows-h" aria-hidden="true">&nbsp</i>Relaciones</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i></i>Arquitectura de software<span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
                                    <li>
                                        <a id="c-2" href="#crearArquitectura"><i class="fa fa-plus-square-o" aria-hidden="true">&nbsp</i>Crear</a>
                                    </li>
                                    <li>
                                        <a id="m-2" href="#modificarArquitectura"><i class="fa fa-pencil-square-o" aria-hidden="true">&nbsp</i>Modificar</a>
                                    </li>
                                    <li>
                                        <a id="d-2" href="#eliminarArquitectura"><i class="fa fa-minus-square-o" aria-hidden="true">&nbsp</i>Eliminar</a>
                                    </li>
                                    <li>
                                        <a href="#relacionesArquitectura"><i class="fa fa-arrows-h" aria-hidden="true">&nbsp</i>Relaciones</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i></i>Artefacto<span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
                                    <li >
                                        <a id="c-3" href="#modificarArtefacto"><i class="fa fa-plus-square-o" aria-hidden="true">&nbsp</i>Crear</a>
                                    </li>
                                    <li>
                                        <a id="m-3" href="#modificarArtefacto"><i class="fa fa-pencil-square-o" aria-hidden="true">&nbsp</i>Modificar</a>
                                    </li>
                                    <li>
                                        <a id="d-3" href="#eliminarArtefacto"><i class="fa fa-minus-square-o" aria-hidden="true">&nbsp</i>Eliminar</a>
                                    </li>
                                    <li>
                                        <a href="#relacionesArtefacto"><i class="fa fa-arrows-h" aria-hidden="true">&nbsp</i>Relaciones</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i></i>Asunto<span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
                                    <li>
                                        <a id="c-4" href="#crearAsunto"><i class="fa fa-plus-square-o" aria-hidden="true">&nbsp</i>Crear</a>
                                    </li>
                                    <li>
                                        <a id="m-4" href="#modificarAsunto"><i class="fa fa-pencil-square-o" aria-hidden="true">&nbsp</i>Modificar</a>
                                    </li>
                                    <li>
                                        <a id="d-4" href="#eliminarAsunto"><i class="fa fa-minus-square-o" aria-hidden="true">&nbsp</i>Eliminar</a>
                                    </li>
                                    <li>
                                        <a href="#relacionesAsunto"><i class="fa fa-arrows-h" aria-hidden="true">&nbsp</i>Relaciones</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i></i>Atributo de Calidad<span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
                                    <li>
                                        <a id="c-5" href="#crearAtributo"><i class="fa fa-plus-square-o" aria-hidden="true">&nbsp</i>Crear</a>
                                    </li>
                                    <li>
                                        <a id="m-5" href="#modificarAtributo"><i class="fa fa-pencil-square-o" aria-hidden="true">&nbsp</i>Modificar</a>
                                    </li>
                                    <li>
                                        <a id="d-5" href="#eliminarAtributo"><i class="fa fa-minus-square-o" aria-hidden="true">&nbsp</i>Eliminar</a>
                                    </li>
                                    <li>
                                        <a href="#relacionesAtributo"><i class="fa fa-arrows-h" aria-hidden="true">&nbsp</i>Relaciones</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i></i>Criterio<span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
                                    <li>
                                        <a id="c-6" href="#crearCriterio"><i class="fa fa-plus-square-o" aria-hidden="true">&nbsp</i>Crear</a>
                                    </li>
                                    <li>
                                        <a id="m-6" href="#modificarCriterio"><i class="fa fa-pencil-square-o" aria-hidden="true">&nbsp</i>Modificar</a>
                                    </li>
                                    <li>
                                        <a id="d-6" href="#eliminarCriterio"><i class="fa fa-minus-square-o" aria-hidden="true">&nbsp</i>Eliminar</a>
                                    </li>
                                    <li>
                                        <a href="#relacionesCriterio"><i class="fa fa-arrows-h" aria-hidden="true">&nbsp</i>Relaciones</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i></i>Decisión<span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
                                    <li>
                                        <a id="c-7" href="#crearDecisión"><i class="fa fa-plus-square-o" aria-hidden="true">&nbsp</i>Crear</a>
                                    </li>
                                    <li>
                                        <a  id="m-7" href="#modificarDecisión"><i class="fa fa-pencil-square-o" aria-hidden="true">&nbsp</i>Modificar</a>
                                    </li>
                                    <li>
                                        <a id="d-7" href="#eliminarDecisión"><i class="fa fa-minus-square-o" aria-hidden="true">&nbsp</i>Eliminar</a>
                                    </li>
                                    <li>
                                        <a href="#relacionesDecisión"><i class="fa fa-arrows-h" aria-hidden="true">&nbsp</i>Relaciones</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i></i>Evaluación<span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
                                    <li>
                                        <a id="c-8" href="#crearEvaluación"><i class="fa fa-plus-square-o" aria-hidden="true">&nbsp</i>Crear</a>
                                    </li>
                                    <li>
                                        <a id="m-8" href="#modificarEvaluación"><i class="fa fa-pencil-square-o" aria-hidden="true">&nbsp</i>Modificar</a>
                                    </li>
                                    <li>
                                        <a id="d-8" href="#eliminarEvaluación"><i class="fa fa-minus-square-o" aria-hidden="true">&nbsp</i>Eliminar</a>
                                    </li>
                                    <li>
                                        <a href="#relacionesEvaluación"><i class="fa fa-arrows-h" aria-hidden="true">&nbsp</i>Relaciones</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i></i>Requerimiento funcional<span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
                                    <li>
                                        <a  id="c-9" href="#crearRequerimiento"><i class="fa fa-plus-square-o" aria-hidden="true">&nbsp</i>Crear</a>
                                    </li>
                                    <li>
                                        <a id="m-9" href="#modificarRequerimiento"><i class="fa fa-pencil-square-o" aria-hidden="true">&nbsp</i>Modificar</a>
                                    </li>
                                    <li>
                                        <a id="d-9" href="#eliminarRequerimiento><i class="fa fa-minus-square-o" aria-hidden="true">&nbsp</i>Eliminar</a>
                                    </li>
                                    <li>
                                        <a href="#relacionesRequerimiento"><i class="fa fa-arrows-h" aria-hidden="true">&nbsp</i>Relaciones</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i></i>Responsable<span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
                                    <li>
                                        <a id="c-10" href="#crearResponsable"><i class="fa fa-plus-square-o" aria-hidden="true">&nbsp</i>Crear</a>
                                    </li>
                                    <li>
                                        <a id="m-10" href="#modificarResponsable"><i class="fa fa-pencil-square-o" aria-hidden="true">&nbsp</i>Modificar</a>
                                    </li>
                                    <li>
                                        <a id="d-10" href="#eliminarResponsable><i class="fa fa-minus-square-o" aria-hidden="true">&nbsp</i>Eliminar</a>
                                    </li>
                                    <li>
                                        <a href="#relacionesResponsable"><i class="fa fa-arrows-h" aria-hidden="true">&nbsp</i>Relaciones</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i></i>Restricción<span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
                                    <li>
                                        <a id="c-11" href="#crearRestricción"><i class="fa fa-plus-square-o" aria-hidden="true">&nbsp</i>Crear</a>
                                    </li>
                                    <li>
                                        <a id="m-11" href="#modificarRestricción"><i class="fa fa-pencil-square-o" aria-hidden="true">&nbsp</i>Modificar</a>
                                    </li>
                                    <li>
                                        <a id="d-11" href="#eliminarRestricción><i class="fa fa-minus-square-o" aria-hidden="true">&nbsp</i>Eliminar</a>
                                    </li>
                                    <li>
                                        <a href="#relacionesRestricción"><i class="fa fa-arrows-h" aria-hidden="true">&nbsp</i>Relaciones</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i></i>Solución<span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
                                    <li>
                                        <a id="c-12" href="#crearSolución"><i class="fa fa-plus-square-o" aria-hidden="true">&nbsp</i>Crear</a>
                                    </li>
                                    <li>
                                        <a id="m-12" href="#modificarSolución"><i class="fa fa-pencil-square-o" aria-hidden="true">&nbsp</i>Modificar</a>
                                    </li>
                                    <li>
                                        <a id="d-12" href="#eliminarSolución><i class="fa fa-minus-square-o" aria-hidden="true">&nbsp</i>Eliminar</a>
                                    </li>
                                    <li>
                                        <a href="#relacionesSolución"><i class="fa fa-arrows-h" aria-hidden="true">&nbsp</i>Relaciones</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i></i>Suposición<span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
                                    <li>
                                        <a id="c-13" href="#crearSuposición"><i class="fa fa-plus-square-o" aria-hidden="true">&nbsp</i>Crear</a>
                                    </li>
                                    <li>
                                        <a id="m-13" href="#modificarSuposición"><i class="fa fa-pencil-square-o" aria-hidden="true">&nbsp</i>Modificar</a>
                                    </li>
                                    <li>
                                        <a id="d-13" href="#eliminarSuposición><i class="fa fa-minus-square-o" aria-hidden="true">&nbsp</i>Eliminar</a>
                                    </li>
                                    <li>
                                        <a href="#relacionesSuposición"><i class="fa fa-arrows-h" aria-hidden="true">&nbsp</i>Relaciones</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div id="page-wrapper">
                <div class="container-fluid">
                    <div class="row hidden" id="header">
                        <div class="col-lg-12">
                            <h1 class="page-header" id="page-name"></h1>
                        </div>
                    </div>
                    <div class="row hidden" id="content">
                        <div class="col-lg-12">
                            <form role="form">
                                <div class="row" >
                                    <div class="col-lg-12" id="row-content">

                                    </div>
                                    <div class="col-lg-6">
                                        <div class="panel panel-default">
                                            <div class="panel-heading" id="panel-heading-left">

                                            </div>
                                            <div class="panel-body" id="left-row">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="panel panel-default">
                                            <div class="panel-heading" id="panel-heading-right">
                                            </div>
                                            <div class="panel-body" id="right-row">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="panel panel-default">
                                            <div class="panel-heading" id="panel-foot-down">
                                                <h5>Relaciones que se van a guardar</h5>
                                            </div>
                                            <div class="panel-body"  id="panel-foot">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script src="${pageContext.request.contextPath}/front-end/js/plugins/jquery.min.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/plugins/bootstrap.min.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/plugins/metisMenu.min.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/plugins/sweetalert.min.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/plugins/sweetalert-dev.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/plugins/sb-admin-2.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/wiki-main-control.js"></script>

        <script src="${pageContext.request.contextPath}/front-end/js/controls/creacion/wiki-crear-alternativa.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/creacion/wiki-crear-arquitectura.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/creacion/wiki-crear-artefacto.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/creacion/wiki-crear-asunto.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/creacion/wiki-crear-atr-calidad.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/creacion/wiki-crear-criterio.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/creacion/wiki-crear-decision.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/creacion/wiki-crear-evaluacion.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/creacion/wiki-crear-requerimiento-funcional.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/creacion/wiki-crear-responsable.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/creacion/wiki-crear-restriccion.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/creacion/wiki-crear-solucion.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/creacion/wiki-crear-suposicion.js"></script>


        <script src="${pageContext.request.contextPath}/front-end/js/controls/modificacion/wiki-modificar-alternativa.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/modificacion/wiki-modificar-arquitectura.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/modificacion/wiki-modificar-artefacto.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/modificacion/wiki-modificar-asunto.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/modificacion/wiki-modificar-atr-calidad.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/modificacion/wiki-modificar-criterio.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/modificacion/wiki-modificar-decision.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/modificacion/wiki-modificar-evaluacion.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/modificacion/wiki-modificar-requerimiento-funcional.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/modificacion/wiki-modificar-responsable.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/modificacion/wiki-modificar-restriccion.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/modificacion/wiki-modificar-solucion.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/modificacion/wiki-modificar-suposicion.js"></script>

        <script src="${pageContext.request.contextPath}/front-end/js/controls/eliminar/wiki-eliminar-alternativa.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/eliminar/wiki-eliminar-arquitectura.js"></script>
        <script src="${pageContext.request.contextPath}/front-end/js/controls/eliminar/wiki-eliminar-artefacto.js"></script>
        
    </body>
</html>
