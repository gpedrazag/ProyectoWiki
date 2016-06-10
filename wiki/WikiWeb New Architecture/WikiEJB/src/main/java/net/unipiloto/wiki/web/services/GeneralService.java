package net.unipiloto.wiki.web.services;

import javax.ejb.Remote;
import org.openrdf.repository.RepositoryConnection;

@Remote
public interface GeneralService 
{
    public String search(String pattern, int limit, int offset, RepositoryConnection connection);
    public int searchCount(String pattern, RepositoryConnection connection);
}
