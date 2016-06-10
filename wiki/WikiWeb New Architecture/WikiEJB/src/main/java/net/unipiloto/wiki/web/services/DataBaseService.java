package net.unipiloto.wiki.web.services;

import java.sql.SQLException;
import java.util.List;
import javax.ejb.Remote;
import javax.naming.NamingException;

@Remote
public interface DataBaseService 
{
    public List<Integer> getLogin(String login, String password) throws SQLException, NamingException;
}
