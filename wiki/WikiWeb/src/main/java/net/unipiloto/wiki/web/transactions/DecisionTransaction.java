package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Decision;
import net.unipiloto.wiki.web.tools.OntologyTools;
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

public class DecisionTransaction
{
    public static void insert(String id, String name, String arguments, String state) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        ValueFactory factory = repo.getValueFactory();
        
        if(selectById(id) == null)
        {
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Decision");
            RepositoryConnection conn = repo.getConnection();
            try
            {
                conn.begin();
                conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
                conn.add(subject, RDF.TYPE, object);
                conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
                conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#name"), factory.createLiteral(name));
                conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#arguments"), factory.createLiteral(arguments));
                conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#state"), factory.createLiteral(state));
                conn.commit();
            }
            catch(Exception ex)
            {
                conn.rollback();
            }
            finally
            {
                conn.close();
                repo.shutDown();
            }
        }
        
    }
    
    public static void update(String id, String name, String arguments, String state) throws IOException, URISyntaxException
    {
        delete(id);
        insert(id, name, arguments, state);
    }
    
    public static void delete(String id) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        ValueFactory factory = repo.getValueFactory();
        IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
        try
        {
            conn.begin();
            conn.remove(
                subject,
                factory.createIRI("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),
                factory.createIRI("http://www.semanticweb.org/sa#Decision")
            );
            conn.commit();
        }
        catch(Exception ex)
        {
            conn.rollback();
        }
        finally
        {
            conn.close();
            repo.shutDown();
        }
    }
    
    public static List<Decision> selectAllDecisionsByArtifactId(String artifactId, Repository repository)
    {
        List<Decision> decisions = new ArrayList<Decision>();
        
        Repository repo = null;
        if(repository != null)
        {
            repo = repository;
        }
        else
        {
            repo = OntologyTools.getInstance();
            repo.initialize();
        }
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT ?d WHERE {"
                + "<http://www.semanticweb.org/sa#"+artifactId+"> <http://www.semanticweb.org/sa#artifactHave> ?d . "
                 +"?d <http://www.semanticweb.org/sa#id> ?id . "
                + "?d <http://www.semanticweb.org/sa#name> ?name . "
                + "?d <http://www.semanticweb.org/sa#arguments> ?arguments . "
                + "?d <http://www.semanticweb.org/sa#state> ?state "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                
                BindingSet bs = result.next();
                decisions.add(
                    new Decision(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(), 
                    bs.getValue("arguments").stringValue(), 
                    bs.getValue("state").stringValue()
                ));
            }
            
            if(decisions.isEmpty())
            {
                decisions = null;
            }
        }
        finally
        {
            if(repository == null)
            {
                conn.close();
                repo.shutDown();
            }
        }
        
        return decisions;
    }
    
    public static Decision selectById(String id)
    {
        Decision decision = null;
        Repository repo = OntologyTools.getInstance();;
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT ?id ?name ?arguments ?state WHERE {"
                + "<http://www.semanticweb.org/sa#"+id+" <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Decision> . "
                + "<http://www.semanticweb.org/sa#"+id+" <http://www.semanticweb.org/sa#id> ?id . "
                + "<http://www.semanticweb.org/sa#"+id+" <http://www.semanticweb.org/sa#name> ?name . "
                + "<http://www.semanticweb.org/sa#"+id+" <http://www.semanticweb.org/sa#arguments> ?arguments . "
                + "<http://www.semanticweb.org/sa#"+id+" <http://www.semanticweb.org/sa#state> ?state "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                decision = new Decision(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(), 
                    bs.getValue("arguments").stringValue(), 
                    bs.getValue("state").stringValue()
                );
            }
        }
        finally
        {
            conn.close();
            repo.shutDown();
        }
        return decision;
    }
}
