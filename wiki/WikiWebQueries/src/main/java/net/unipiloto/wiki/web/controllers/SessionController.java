package net.unipiloto.wiki.web.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.unipiloto.wiki.web.entities.User;
import org.boon.json.JsonFactory;
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
        if (session != null) {
            User user = (User) session.getAttribute("user");
            if (user != null) {
                json = JsonFactory.toJson(user);
            }
        }

        return json;
    }

    @RequestMapping(value = "/closeSession")
    public void closeSession() {
        if (session != null) {
            session.invalidate();
        }
    }

    @RequestMapping(value = "/saveUser")
    public boolean saveUser(HttpServletRequest request, @RequestParam(value = "user") String user) {
        session = request.getSession(true);
        session.setAttribute("user", user);
        return true;
    }
}
