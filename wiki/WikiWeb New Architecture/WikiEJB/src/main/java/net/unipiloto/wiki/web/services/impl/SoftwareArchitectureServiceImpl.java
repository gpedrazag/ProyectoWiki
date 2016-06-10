package net.unipiloto.wiki.web.services.impl;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import net.unipiloto.wiki.domain.entities.Artifact;
import net.unipiloto.wiki.domain.entities.Decision;
import net.unipiloto.wiki.domain.entities.SoftwareArchitecture;
import net.unipiloto.wiki.web.others.OntologyTools;
import net.unipiloto.wiki.web.services.SoftwareArchitectureService;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

@Stateless(mappedName = "java:global/SoftwareArchitectureService")
public class SoftwareArchitectureServiceImpl implements SoftwareArchitectureService
{
    @Override
    public String selectById(String id) 
    {
        SoftwareArchitecture sa = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?name ?description WHERE {\n"
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Artifact> . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#description> ?description . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#name> ?name "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                sa = new SoftwareArchitecture(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(), 
                    bs.getValue("description").stringValue()
                );
                
                sa.setRelatedArtifacts(JsonFactory.fromJsonArray(new ArtifactServiceImpl().getAllArtifactsBySoftwareArchitectureId(id, conn), Artifact.class));
                sa.setRelatedDecisions(JsonFactory.fromJsonArray(new DecisionServiceImpl().selectAllDecisionsBySoftwareArchitectureId(id, conn), Decision.class));
            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(sa);
    }
    
    @Override
    public String selectAll()
    {
        List<SoftwareArchitecture> sas = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?description ?name WHERE {\n"
                + "?sa <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#SoftwareArchitecture> . "
                + "?sa <http://www.semanticweb.org/sa#id> ?id . "
                + "?sa <http://www.semanticweb.org/sa#description> ?description . "
                + "?sa <http://www.semanticweb.org/sa#name> ?name "
                + "}"

            );
            TupleQueryResult result = tq.evaluate(); //sdsdsdds;
            while(result.hasNext())
            {
                BindingSet bs = result.next();

                sas.add(new SoftwareArchitecture(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(), 
                    bs.getValue("description").stringValue()
                ));
                int i = sas.size() - 1;
                sas.get(i).setRelatedArtifacts(JsonFactory.fromJsonArray(new ArtifactServiceImpl().getAllArtifactsBySoftwareArchitectureId(sas.get(i).getId(), conn), Artifact.class));
                sas.get(i).setRelatedDecisions(JsonFactory.fromJsonArray(new DecisionServiceImpl().selectAllDecisionsBySoftwareArchitectureId(sas.get(i).getId(), conn), Decision.class));

            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(sas);
        
    }    
}
