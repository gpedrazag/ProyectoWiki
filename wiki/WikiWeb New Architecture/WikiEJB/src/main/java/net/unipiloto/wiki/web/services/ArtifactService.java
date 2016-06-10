package net.unipiloto.wiki.web.services;

import javax.ejb.Remote;
import org.openrdf.repository.RepositoryConnection;

@Remote
public interface ArtifactService 
{
    public String selectById(String id);
    public String selectAll();
    public String selectByQAId(String id, RepositoryConnection connection);
    public String getAllArtifactsBySoftwareArchitectureId(String id, RepositoryConnection connection);
        
}
