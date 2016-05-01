package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.FunctionalRequeriment;
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

public class FunctionalRequerimentTransaction
{
    public static void insert(String id, String name, String actor, String description, String input, String output) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        ValueFactory factory = repo.getValueFactory();
        IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
        IRI object = factory.createIRI("http://www.semanticweb.org/sa#FunctionalRequeriment");
        RepositoryConnection conn = repo.getConnection();
        try
        {
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#name"), factory.createLiteral(name));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#actor"), factory.createLiteral(description));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#description"), factory.createLiteral(description));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#input"), factory.createLiteral(input));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#output"), factory.createLiteral(output));
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
    
    public static void update(String id, String name, String actor, String description, String input, String output) throws IOException, URISyntaxException
    {
        
        delete(id);
        insert(id, name, actor, description, input, output);
        
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
                factory.createIRI("http://www.semanticweb.org/sa#FunctionalRequeriment")
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
            
        }
    }
    
    public static List<FunctionalRequeriment> selectFRByConcernId(String id, RepositoryConnection connection)
    {
        List<FunctionalRequeriment> frs = new ArrayList<FunctionalRequeriment>();
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
                "SELECT DISTINCT ?id ?name ?actor ?description ?input ?output WHERE {"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#determinedBy> ?d . "
                +"?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#FunctionalRequeriment> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#name> ?name . "
                +"?d <http://www.semanticweb.org/sa#actor> ?actor . "
                +"?d <http://www.semanticweb.org/sa#description> ?description . "
                +"?d <http://www.semanticweb.org/sa#input> ?input . "
                +"?d <http://www.semanticweb.org/sa#output> ?output "
                +"}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                frs.add(
                    new FunctionalRequeriment(
                        bs.getValue("id").stringValue(), 
                        bs.getValue("name").stringValue(), 
                        bs.getValue("actor").stringValue(), 
                        bs.getValue("description").stringValue(), 
                        bs.getValue("input").stringValue(), 
                        bs.getValue("output").stringValue()
                    ));
            }
            
            if(frs.isEmpty())
            {
                frs = null;
            }
        }
        finally
        {
            if(connection == null)
            {
                conn.close();
                
            }
        }
        
        return frs;
    }
    
    public static String selectById(String id)
    {
        FunctionalRequeriment fr = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?name ?actor ?description ?input ?output WHERE {\n"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#FunctionalRequeriment> . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#name> ?name . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#actor> ?actor . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#description> ?description . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#input> ?input . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#output> ?output "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                fr = new FunctionalRequeriment(
                    bs.getValue("id").stringValue(), 
                        bs.getValue("name").stringValue(), 
                        bs.getValue("actor").stringValue(), 
                        bs.getValue("description").stringValue(), 
                        bs.getValue("input").stringValue(), 
                        bs.getValue("output").stringValue()
                );
            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(fr);
    }
    
    public static String selectAll()
    {
        List<FunctionalRequeriment> frs = new ArrayList<FunctionalRequeriment>();
        
        Repository repo = null;
        repo = OntologyTools.getInstance();
        repo.initialize();
        
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?name ?actor ?description ?input ?output WHERE {"
                +"?d http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#FunctionalRequeriment> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#name> ?name . "
                +"?d <http://www.semanticweb.org/sa#actor> ?actor . "
                +"?d <http://www.semanticweb.org/sa#description> ?description . "
                +"?d <http://www.semanticweb.org/sa#input> ?input . "
                +"?d <http://www.semanticweb.org/sa#output> ?output "
                +"}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                frs.add(new FunctionalRequeriment(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(), 
                    bs.getValue("actor").stringValue(), 
                    bs.getValue("description").stringValue(), 
                    bs.getValue("input").stringValue(), 
                    bs.getValue("output").stringValue()
                ));
            }
            
            if(frs.isEmpty())
            {
                frs = null;
            }
        }
        finally
        {
            conn.close();
       
        }
        
        return JsonFactory.toJson(frs);
    }
}
