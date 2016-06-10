package net.unipiloto.wiki.web.services;

import javax.ejb.Remote;
import org.openrdf.repository.RepositoryConnection;

@Remote
public interface ResponsibleService 
{
    public String selectAllResponsiblesByDecisionId(String id, RepositoryConnection connection);
    public String selectById(String id);
    public String selectAll();
}
