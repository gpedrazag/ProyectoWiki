package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Comparator;
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
    public static void insert(String pros, String cons, String valoration) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            List<Integer> ids = selectAllIds(conn);
            String id = "";
            if(ids != null)
            {
                id = "evaluation_"+(ids.get(0)+1);
            }
            else
            {
                id = "evaluation_1";
            }
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Evaluation");
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
        insert(pros, cons, valoration);
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
    
    public static Evaluation selectByAlternativeId(String alternativeId, RepositoryConnection connection)
    {
        Evaluation evaluation = null;
        
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
                "SELECT DISTINCT ?id ?pros ?cons ?valoration WHERE {"
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
            if(connection == null)
            {
                conn.close();
            }
        }
        
        return evaluation;
    }
    
    public static List<Evaluation> selectByCriteriaId(String id, RepositoryConnection connection)
    {
        List<Evaluation> evaluations = null;
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
                "SELECT DISTINCT ?id ?pros ?cons ?valoration WHERE {"
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
            if(connection == null)
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
                "SELECT DISTINCT ?id ?pros ?cons ?valoration WHERE {\n"
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
    
    public static String selectAll()
    {
        List<Evaluation> qas = new ArrayList<Evaluation>();
        
        Repository repo = null;
        repo = OntologyTools.getInstance();
        repo.initialize();
        
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?pros ?cons ?valoration WHERE {"
                +"?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Evaluation> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#pros> ?pros . "
                +"?d <http://www.semanticweb.org/sa#cons> ?cons . "
                +"?d <http://www.semanticweb.org/sa#valoration> ?valoration "
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
            conn.close();
            
        }
        
        return JsonFactory.toJson(qas);
    }
    
    private static List<Integer> selectAllIds(RepositoryConnection conn)
    {
        List<Integer> ids = new ArrayList<Integer>();
        TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
            "SELECT DISTINCT ?id WHERE {\n"
            + "?alternative <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Evaluation> . "
            + "?alternative <http://www.semanticweb.org/sa#id> ?id "
            + "}"
        );
        TupleQueryResult result = tq.evaluate();
        while(result.hasNext())
        {
            BindingSet bs = result.next();
            ids.add(Integer.parseInt(bs.getValue("id").stringValue().split("_")[1]));
        }
        if(ids.isEmpty())
        {
            ids = null;
        }
        else
        {
            ids.sort(new Comparator<Integer>() {
                @Override
                public int compare(Integer t, Integer t1)
                {
                    if(t1 > t)
                    {
                        return 1;
                    }
                    else if (t1 < t)
                    {
                        return -1;
                    }
                    return 0;
                }
            });
        }
        return ids;
    }
}
