package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Evaluation;
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

public class EvaluationTransaction
{
    public static void insert(String id, String pros, String cons, String valoration) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        ValueFactory factory = repo.getValueFactory();
        IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
        IRI object = factory.createIRI("http://www.semanticweb.org/sa#Evaluation");
        RepositoryConnection conn = repo.getConnection();
        try
        {
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#pros"), factory.createLiteral(pros));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#cons"), factory.createLiteral(cons));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#valoration"), factory.createLiteral(valoration));
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
    
    public static void update(String id, String pros, String cons, String valoration) throws IOException, URISyntaxException
    {
        delete(id);
        insert(id, pros, cons, valoration);
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
                factory.createIRI("http://www.semanticweb.org/sa#Evaluation")
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
    
    public static Evaluation selectByAlternativeId(String alternativeId, Repository repository)
    {
        Evaluation evaluation = null;
        
        Repository repo = repository == null ? OntologyTools.getInstance() : repository;
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT ?id ?pros ?cons ?valoration WHERE {"
                + "<http://www.semanticweb.org/sa#"+alternativeId+"> <http://www.semanticweb.org/sa#alternativeLinkTo> ?d . "
                + "?d <http://www.semanticweb.org/sa#id> ?id . "
                + "?d <http://www.semanticweb.org/sa#pros> ?pros . "
                + "?d <http://www.semanticweb.org/sa#cons> ?cons . "
                + "?d <http://www.semanticweb.org/sa#valoration> ?valoration "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                evaluation = new Evaluation(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("pros").stringValue(), 
                    bs.getValue("cons").stringValue(), 
                    bs.getValue("valoration").stringValue()
                );
            }
           
        }
        finally
        {
            if(repository == null)
            {
                conn.close();
            }
        }
        
        return evaluation;
    }
    
    public static List<Evaluation> selectByCriteriaId(String id, Repository repository)
    {
        List<Evaluation> evaluations = null;
        
        Repository repo = repository == null ? OntologyTools.getInstance() : repository;
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT ?id ?pros ?cons ?valoration WHERE {"
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#criteriaLinkTo> ?d . "
                + "?d <http://www.semanticweb.org/sa#id> ?id . "
                + "?d <http://www.semanticweb.org/sa#pros> ?pros . "
                + "?d <http://www.semanticweb.org/sa#cons> ?cons . "
                + "?d <http://www.semanticweb.org/sa#valoration> ?valoration "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                evaluations.add(new Evaluation(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("pros").stringValue(), 
                    bs.getValue("cons").stringValue(), 
                    bs.getValue("valoration").stringValue()
                ));
            }
        }
        finally
        {
            if(repository == null)
            {
                conn.close();
            }
        }
        
        return evaluations;
    }
    
    public static String selectById(String id)
    {
        Evaluation evaluation = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT ?id ?pros ?cons ?valoration WHERE {\n"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Evaluation> . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#pros> ?pros . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#cons> ?cons . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#valoration> ?valoration "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                evaluation = new Evaluation(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("pros").stringValue(), 
                    bs.getValue("cons").stringValue(), 
                    bs.getValue("valoration").stringValue()
                );
            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(evaluation);
    }
    
    public static String selectAll(String id, Repository repository)
    {
        List<Evaluation> qas = new ArrayList<Evaluation>();
        
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
                "SELECT ?id ?pros ?cons ?valoration WHERE {"
                +"?d http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Evaluation> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#description> ?pros . "
                +"?d <http://www.semanticweb.org/sa#name> ?cons . "
                +"?d <http://www.semanticweb.org/sa#name> ?valoration "
                +"}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                
                BindingSet bs = result.next();
                qas.add(new Evaluation(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("pros").stringValue(), 
                    bs.getValue("cons").stringValue(), 
                    bs.getValue("valoration").stringValue()
                ));
                
            }
            
            if(qas.isEmpty())
            {
                qas = null;
            }
        }
        finally
        {
            if(repository == null)
            {
                conn.close();
                
            }
        }
        
        return JsonFactory.toJson(qas);
    }
}
