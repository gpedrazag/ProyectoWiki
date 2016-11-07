package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import net.unipiloto.wiki.web.others.OntologyTools;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/")
public class IndexController
{
    
    @RequestMapping(method = RequestMethod.GET)
    public String initPage() throws IOException, URISyntaxException
    {
        OntologyTools.initRepository();
        return "login";
    }       
    
    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public String mainPage() throws IOException, URISyntaxException
    {
        return "wiki-main";
    }   
}
