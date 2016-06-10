package net.unipiloto.wiki.web.services.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

@Stateless(mappedName = "java:global/DataBaseService")
public class DataBaseServiceImpl
{
       
    public List<Integer> getLogin(String login, String password) throws SQLException, NamingException
    {
        Connection conn = null;
        ResultSet rs = null;
        PreparedStatement ps = null;
        List<Integer> privileges = new ArrayList<Integer>();
        try
        {
            DataSource ds = (DataSource)InitialContext.doLookup("jdbc/WikiWeb");
            conn = ds.getConnection();
            ps = conn.prepareStatement(
                "select p.codigo_privilegio from usuarios as usr "+
                "inner join usuarios_roles as ur on ur.id_usuarios = usr.id "+
                "inner join roles_privilegios as rp on rp.id_roles = ur.id_roles "+ 
                "inner join privilegios as p on p.id = rp.id_privilegios "+
                "where login = ? and password = ?"
            );
            ps.setString(1, login);
            ps.setString(2, password);
            rs = ps.executeQuery();
            while(rs.next())
            {
                privileges.add((int)rs.getShort(1));
            }
            if(privileges.isEmpty())
            {
                privileges = null;
            }
        }
        finally
        {
            if(rs != null)
            {
               rs.close(); 
            }
            if(ps != null)
            {
               ps.close(); 
            }
            if(conn != null)
            {
               conn.close();
            }
            
        }
        return privileges;
    }
}
