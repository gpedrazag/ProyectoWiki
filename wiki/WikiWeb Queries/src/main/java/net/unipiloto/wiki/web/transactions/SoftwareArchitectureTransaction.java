package net.unipiloto.wiki.web.transactions;

import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.SoftwareArchitecture;
import net.unipiloto.wiki.web.others.OntologyTools;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class SoftwareArchitectureTransaction
{
    public static String selectById(String id) 
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
                + "} "
                + "ORDER BY ?id"
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
                
                sa.setRelatedArtifacts(ArtifactTransaction.getAllArtifactsBySoftwareArchitectureId(id, conn));
                sa.setRelatedDecisions(DecisionTransaction.selectAllDecisionsBySoftwareArchitectureId(id, conn));
            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(sa);
    }
    
    public static String selectAll()
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
                + "} "
                + "ORDER BY ?id"

            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();

                sas.add(new SoftwareArchitecture(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(), 
                    bs.getValue("description").stringValue()
                ));
                int i = sas.size() - 1;
                sas.get(i).setRelatedDecisions(DecisionTransaction.selectAllDecisionsBySoftwareArchitectureId(sas.get(i).getId(),conn));
                sas.get(i).setRelatedArtifacts(ArtifactTransaction.getAllArtifactsBySoftwareArchitectureId(sas.get(i).getId(), conn));

            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(sas);
        
    }
    
}
