package net.unipiloto.wiki.web.controllers;

import net.unipiloto.wiki.web.entities.User;
import net.unipiloto.wiki.web.transactions.UserTransaction;
import org.boon.json.JsonFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    
    @RequestMapping(value = "/getUserLoginPassword", method = RequestMethod.POST)
    public String getUserByLoginAndPassword(@RequestParam(value = "login") String login, @RequestParam(value = "password") String password) {
        String json = "{\"error\":true}";
        User user = UserTransaction.selectByLoginAndPassword(login, password);
        if(user != null) {
            json = JsonFactory.toJson(user);
        }
        return json;
    }
}
