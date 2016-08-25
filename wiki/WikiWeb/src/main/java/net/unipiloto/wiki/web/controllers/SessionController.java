package net.unipiloto.wiki.web.controllers;

import java.util.Enumeration;
import javax.servlet.http.HttpSession;
import net.unipiloto.wiki.web.others.PrivilegeCarrier;
import org.boon.json.JsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/Session")
@Service
public class SessionController
{
    @Autowired
    private HttpSession session;
    
    @RequestMapping(value = "/GetPrivilegies")
    public String getPrivilegies()
    {
        String json = "";
        if(session != null)
        {
            Enumeration<String> privilegies = session.getAttributeNames();
            PrivilegeCarrier carrier = new PrivilegeCarrier();
            while(privilegies.hasMoreElements())
            {
                int code = (int)session.getAttribute(privilegies.nextElement());
                switch (code)
                {
                    case 0:
                        carrier.setQuery(true);
                        break;
                    case 1:
                        carrier.setInsert(true);
                        break;
                    case 2:
                        carrier.setUpdate(true);
                        break;
                    case 3:
                        carrier.setDelete(true);
                        break;
                    case 4:
                        carrier.setAdmin(true);
                        break;
                    default:
                        break;
                }
            }
            
            json = JsonFactory.toJson(carrier);
        }
        
        return json;
    }
}
