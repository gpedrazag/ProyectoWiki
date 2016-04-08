package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import net.unipiloto.wiki.web.services.ArtifactServiceImpl;
import net.unipiloto.wiki.web.services.OntologyGeneralService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController
{
                
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String initPage() throws IOException, URISyntaxException
    {

        OntologyGeneralService.initRepository();
        ArtifactServiceImpl.createArtifact(455, "Artefacto de prueba");
        return "index";
    }
    
    
}
