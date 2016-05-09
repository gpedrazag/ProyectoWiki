package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Artifact;
import net.unipiloto.wiki.web.tools.OntologyTools;
import org.boon.json.JsonFactory;
import org.openrdf.model.IRI;
import org.openrdf.model.ValueFactory;
import org.openrdf.model.vocabulary.OWL;
import org.openrdf.model.vocabulary.RDF;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class ArtifactTransaction
{
    public static void insert(String id, String description, List<String> decisions) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        ValueFactory factory = repo.getValueFactory();
        IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
        IRI object = factory.createIRI("http://www.semanticweb.org/sa#Artifact");
        RepositoryConnection conn = repo.getConnection();
        try
        {
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#description"), factory.createLiteral(description));
            if(decisions != null)
            {
                for(String decision : decisions)
                {
                   conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#artifactHave"), factory.createIRI("http://www.semanticweb.org/sa#"+decision)); 
                }
            }
            conn.commit();
        }
        catch(Exception ex)
        {
            conn.rollback();
        }
        finally
        {
            conn.close();
            
        }
        
    }
    
    public static void update(String newId, String oldId, String description, List<String> decisions) throws IOException, URISyntaxException
    {
        delete(oldId);
        insert(newId, description, decisions);
    }
    
    public static void delete(String id) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            conn.prepareUpdate(
                "DELETE { <http://www.semanticweb.org/sa#"+id+"> ?p ?d2 }\n"
                +"WHERE { <http://www.semanticweb.org/sa#"+id+"> ?p ?d2 }"
                
            ).execute();
            conn.prepareUpdate(
                "DELETE { ?d1 ?p <http://www.semanticweb.org/sa#"+id+"> }\n"
                +"WHERE { ?d1 ?p <http://www.semanticweb.org/sa#"+id+"> }"
                
            ).execute();
        }
        catch(Exception ex)
        {
            conn.rollback();
        }
        finally
        {
            conn.close();
            
        }
    }
    
    public static String selectById(String id) 
    {
        Artifact artifact = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?description WHERE {\n"
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Artifact> . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id ."
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#description> ?description "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                artifact = new Artifact(
                    bs.getValue("id").stringValue(),
                    bs.getValue("description").stringValue()
                );
                
                artifact.setHaveDecisions(DecisionTransaction.selectAllDecisionsByArtifactId(artifact.getId(), conn));
            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(artifact);
    }
    
    public static String selectAll()
    {
        List<Artifact> artifacts = new ArrayList<Artifact>();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection(); 
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?description WHERE {\n"
                + "?artifact <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Artifact> . "
                + "?artifact <http://www.semanticweb.org/sa#id> ?id . "
                + "?artifact <http://www.semanticweb.org/sa#description> ?description "
                + "}"

            );
            TupleQueryResult result = tq.evaluate(); //sdsdsdds;
            while(result.hasNext())
            {
                BindingSet bs = result.next();

                artifacts.add(new Artifact(
                    bs.getValue("id").stringValue(),
                    bs.getValue("description").stringValue()
                ));
                int i = artifacts.size() - 1;
                artifacts.get(i).setHaveDecisions(DecisionTransaction.selectAllDecisionsByArtifactId(artifacts.get(i).getId(),conn));

            }
        }
        finally
        {
            conn.close();
            
        }
        
        return JsonFactory.toJson(artifacts);
        
    }
    
    public static List<Artifact> selectByQAId(String id, RepositoryConnection connection)
    {
        List<Artifact> artifacts = new ArrayList<Artifact>();
        
        Repository repo = null;
        RepositoryConnection conn = null;
        if(connection != null)
        {
            conn = connection;
        }
        else
        {
            repo = OntologyTools.getInstance();
            repo.initialize();
            conn = repo.getConnection();
        }
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?description WHERE {"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#triggerAn> ?d . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#description> ?description "
                +"}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                
                BindingSet bs = result.next();
                artifacts.add(
                    new Artifact(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("description").stringValue()
                ));
                int i = artifacts.size() - 1;
                artifacts.get(i).setHaveDecisions(DecisionTransaction.selectAllDecisionsByArtifactId(artifacts.get(i).getId(),conn));
            }
            
            if(artifacts.isEmpty())
            {
                artifacts = null;
            }
        }
        finally
        {
            if(connection == null)
            {
                conn.close();
                
            }
        }
        
        return artifacts;
    }
    
    public static List<Artifact> getAllArtifactsBySoftwareArchitectureId(String id, RepositoryConnection connection)
    {
        List<Artifact> artifacts = new ArrayList<Artifact>();
        
        Repository repo = null;
        RepositoryConnection conn = null;
        if(connection != null)
        {
            conn = connection;
        }
        else
        {
            repo = OntologyTools.getInstance();
            repo.initialize();
            conn = repo.getConnection();
        }
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?description WHERE {"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#composeBy> ?d . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#description> ?description "
                +"}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                
                BindingSet bs = result.next();
                artifacts.add(
                    new Artifact(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("description").stringValue()
                ));
                int i = artifacts.size() - 1;
                artifacts.get(i).setHaveDecisions(DecisionTransaction.selectAllDecisionsByArtifactId(artifacts.get(i).getId(),conn));
            }
            
            if(artifacts.isEmpty())
            {
                artifacts = null;
            }
        }
        finally
        {
            if(connection == null)
            {
                conn.close();
                
            }
        }
        
        return artifacts;
    }
}
