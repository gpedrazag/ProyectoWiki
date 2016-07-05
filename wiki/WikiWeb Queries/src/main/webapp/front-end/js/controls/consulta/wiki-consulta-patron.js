(function($){
    var paginator = null;
    var pttr = "";
    String.prototype.toPascalCase = function () {
        var pascal = "";
        var string = this.toString();
        var upper = false;
        var added = false;
        for (var i = 0; i <= string.length; i++)
        {
            var char = string.charCodeAt(i);
            added = false;
            if((i === 0 || upper) &&  char !== 32)
            {
                pascal += String.fromCharCode(char).toUpperCase();
                upper = false;
                added = true;
            }
            if(char === 32)
            {
                upper = true;
            }
            if(!added)
            {
                pascal += String.fromCharCode(char);
            }
        }
        return pascal;
    };
    
    $.fn.showSearchResults = function(pattern)
    {
        pttr = pattern;
        $.ajax({
            url:"WikiWeb/search/patternSearchCount",
            method:"POST",
            data:{"pattern":pattern}
        }).done(function(data){
            if(data === 0)
            {
                $(document).find(".cant-remove").prop("hidden",true);
                $(document).find(".can-remove").remove();
                $("#row-content").append($("<div>").addClass("row").append($("<h3>").html("No se encontraron coincidencias")));
            }
            else
            {
                var floor = Math.floor(data/2);
                paginator = createPaginator(data/2>floor?floor+1:floor);
                ajaxGetResults(pattern, 2, 0, showPanel);
            }
            
        });
    };
    
    function ajaxGetResults(pattern, limit,offset, callback)
    {
        $.ajax({
            url:"WikiWeb/search/patternSearch",
            method:"POST",
            dataType:"json",
            data:{"pattern":pattern, "limit":limit, "offset":offset}
        }).done(function(data){
            callback(data);
            $(paginator).find("a").on("click",doPagination);
        });
    }
    
    function createPaginator(num)
    {
        var paginator = $("<ul>").addClass("pagination");
        var active = true;
        if(num === 0)
        {
            paginator = null;
        }
        for(var i=0; i<num; i++)
        {
            if(i===0)
            {
                $(paginator).append($("<li>").append($("<a>").attr({"href":"#", "name":"p"}).html("&laquo;")).addClass("disabled"));
                active = true;
            }
            $(paginator).append($("<li>").append($("<a>").attr("href","#").html(i+1)));
            if(active)
            {
                $($(paginator).find("li")[0]).addClass("active");
                active = false;
            }
            if(i===num-1)
            {
                $(paginator).append($("<li>").append($("<a>").attr({"href":"#", "name":"u"}).html("&raquo;")));
            }
        }
        return paginator;
    }
    
    function showPanel(data)
    {
        var panel = $("#row-content");
        $(document).find(".cant-remove").prop("hidden",true);
        $(document).find(".can-remove").remove();
        if(data.length > 0)
        {
            $(panel).append($("<div>").addClass("can-remove panel-group").attr({"id":"search-accordion","role":"tablelist","aria-multiselectable":"true"}));
            data.forEach(function(obj){
                var id = obj.id;
                var type = id.indexOf("_")===-1?"artifact":id.split("_")[0];
                $(panel).find("#search-accordion")
                    .append($("<div>").addClass("panel panel-default")
                        .append($("<div>").addClass("panel-heading").attr({"role":"tab","id":id+""})
                            .append($("<h4>").addClass("panel-title")
                                .append($("<a>").on("click", eventCollapse).attr({"href":"collapse-"+id,"role":"button", "data-toggle":"collapse","data-parent":"#search-accordion", "aria-expanded":"false", "aria-controls":"collapse-"+id}).html(typeof obj.name==="undefined"?type.toPascalCase()+" "+id:obj.name))
                            )
                        )
                        .append($("<div>").attr({"id":"collapse-"+id, "role":"tabpanel", "aria-labelledby":id+""}).addClass("panel-collapse collapse")
                            
                        )
                        
                    )
                ;
                var keys = Object.keys(obj);
                keys.forEach(function(key){
                   $("#collapse-"+id)
                        .append($("<ul>").addClass("list-group")
                            .append($("<li>").addClass("list-group-item").html(key+" : "+obj[key]))
                        )
                    ; 
                });
            });
        }
        
        $(panel).append($("<div>").addClass("row can-remove").append($(paginator)));
    }
    
    function eventCollapse(event)
    {
        var collapsable = $(event.target).parent().parent().parent().find("div")[1];
        var accordion = $(collapsable).parent().parent();
        $.each($(accordion).find(".collapse"), function(i, elem){
           $(elem).collapse('hide');
        });
        $(collapsable).collapse('show');
    }
    
    function doPagination(event)
    {
        var page = event.target.innerHTML;
        if(event.target.name === "p")
        {
            page = 1;
        }
        else if(event.target.name === "u")
        {
            page = $(event.target).parent().parent().find("li").size()-2;
        }
        ajaxGetResults(pttr, 2, (new Number(page)-1)*2, showPanel);
    }
})($);