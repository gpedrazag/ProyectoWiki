package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import net.unipiloto.wiki.web.others.OntologyTools;
import net.unipiloto.wiki.web.transactions.GeneralTransactions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/")
public class IndexController
{
                
    @RequestMapping(method = RequestMethod.GET)
    public String initPage() throws IOException, URISyntaxException
    {

        OntologyTools.initRepository();
        return "wiki-main";
    }
    
    @RequestMapping(value = "/prueba", method = RequestMethod.GET)
    @ResponseBody
    public String getArtifact() throws Exception
    {
        
        return "sd";
    }
    
    
    
    
}
