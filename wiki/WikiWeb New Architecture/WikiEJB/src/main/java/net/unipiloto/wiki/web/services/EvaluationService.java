package net.unipiloto.wiki.web.services;

import javax.ejb.Remote;
import org.openrdf.repository.RepositoryConnection;

@Remote
public interface EvaluationService 
{
    public String selectByAlternativeId(String alternativeId, RepositoryConnection connection);
    public String selectByCriteriaId(String id, RepositoryConnection connection);
    public String selectById(String id);
    public String selectAll();
    
}
