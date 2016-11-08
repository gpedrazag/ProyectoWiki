package net.unipiloto.wiki.web.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/session")
@Service
public class SessionController {

    @Autowired
    private HttpSession session;

    @RequestMapping(value = "/getPrivilegies")
    public String getPrivilegies() {
        String json = "";
        try {
            if (session != null) {
                json = String.valueOf(session.getAttribute("user"));
            }
        } catch (Exception ex) {
        }
        if (json.equals("null") || json.equals("")) {
            json = "{\"error\":true}";
        }
        return json;
    }

    @RequestMapping(value = "/closeSession")
    public void closeSession() {
        if (session != null) {
            try {
                session.invalidate();
            } catch(Exception ex) {
                
            }
        }
    }

    @RequestMapping(value = "/saveUser")
    public boolean saveUser(HttpServletRequest request, @RequestParam(value = "user") String user) {
        session = request.getSession(true);
        session.setAttribute("user", user);
        return true;
    }
}
