package net.unipiloto.wiki.web.controllers;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.unipiloto.wiki.web.transactions.DataBaseTransactions;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/Login")
public class LoginController
{
    @RequestMapping(method = RequestMethod.POST)
    public boolean getPrivilegies(
        @RequestParam(value = "login") String login,
        @RequestParam(value = "password") String password,
        HttpServletRequest request)
    {
        boolean go = true;
        HttpSession session = request.getSession();
        if(session != null) 
        {
            try
            {
                List<Integer> privilegies = new DataBaseTransactions().getLogin(login, password);
                if(privilegies != null)
                {
                    int i = 1;
                    for(int p : privilegies)
                    {
                        session.setAttribute("privilege"+i, p);
                        i++;
                    }
                }
                else
                {
                    go = false;
                }
            }
            catch(Exception ex)
            {
                go = false;
            }
        }
        return go;
    }
}
