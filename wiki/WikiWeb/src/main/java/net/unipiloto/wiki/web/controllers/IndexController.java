package net.unipiloto.wiki.web.controllers;

import javax.ejb.EJB;
import net.unipiloto.wiki.web.services.OntologyGeneralService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController
{
    @EJB(lookup = "java:app/wiki/OntologyGeneralService")
    private OntologyGeneralService ontService;
            
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String initPage()
    {
        ontService.initRepository();
        return "index";
    }
    
    
}
