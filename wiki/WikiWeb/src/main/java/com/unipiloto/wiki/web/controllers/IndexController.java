package com.unipiloto.wiki.web.controllers;

import javax.servlet.http.HttpSession;
import net.unipiloto.wiki.web.services.OntologyGeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@Service
public class IndexController
{
    @Autowired
    private OntologyGeneralService ontService;
    
    @Autowired
    private HttpSession session;
    
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String initPage()
    {
        String contextPath = session.getServletContext().getContextPath();
        //String 
        //ontService.initRepository(null, null);
        return "index";
    }
}
