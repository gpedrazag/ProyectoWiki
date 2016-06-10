package net.unipiloto.wiki.web.services;

import org.openrdf.repository.RepositoryConnection;

public interface DecisionService 
{
    public String selectAllDecisionsByArtifactId(String artifactId, RepositoryConnection connection);    
    public String selectAllDecisionsByResponsibleId(String responsibleId, RepositoryConnection connection);
    public String selectAllDecisionsBySoftwareArchitectureId(String id, RepositoryConnection connection);
    public String selectById(String id);
    public String selectAll();
}
