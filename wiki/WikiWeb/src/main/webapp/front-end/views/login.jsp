<%--
version:    0.1.0
author:     dcortes
since:      13/11/2015
see:        Pagina del login de la aplicacion
--%>
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/front-end/css/plugins/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/front-end/css/plugins/sweetalert.css">
      
    </head>
    <body>
        <div class="container-fluid main-container">            
            <div class="container text-center">
                <div class="row">
                    <div class="hidden-xs col-sm-3 col-md-4 col-lg-4">
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                        <div class="panel panel-primary" id="login-panel">
                            <div class="panel-heading text-left"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>  Login</div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <form class="form-horizontal">
                                            <div class="hidden-sm hidden-md hidden-lg form-group">
                                                <select id="cmb-usertype" class="col-xs-12" data-style="btn-info">                                                    
                                                </select>                                                
                                            </div>    
                                            <div class="form-group">
                                                <div class="col-sm-12">
                                                    <div class="input-group">
                                                        <span class="input-group-addon" hidden><span class="glyphicon glyphicon-user" aria-hidden="true"></span></span>
                                                        <input id="txt-username" type="text" class="form-control focus" placeholder="Usuario"/>                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-sm-12">
                                                    <div class="input-group">
                                                        <span class="input-group-addon"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span></span>
                                                        <input id="txt-password" type="password" class="form-control" placeholder="Contrase&#241;a"/>
                                                    </div>                                                                                                  
                                                </div>
                                            </div>
                                            <div id="alert-login" class="alert alert-danger hidden" role="alert">                                                    

                                            </div>     
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hidden-xs col-sm-3 col-md-4 col-lg-4">
                    </div>
                </div>                
            </div>
        </div>

        <script type="text/javascript" src="${pageContext.request.contextPath}/front-end/js/plugins/jquery.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/front-end/js/plugins/bootstrap.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/front-end/js/plugins/sweetalert.min.js"></script>
                
    </body>
</html>