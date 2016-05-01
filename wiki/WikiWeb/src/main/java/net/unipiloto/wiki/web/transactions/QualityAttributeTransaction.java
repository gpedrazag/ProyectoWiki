package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.QualityAttribute;
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

public class QualityAttributeTransaction
{
    public static void insert(String id, String actor, String enviroment, String measure, String boost, String boostSource, List<String> triggerArtifacts) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        ValueFactory factory = repo.getValueFactory();
        IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
        IRI object = factory.createIRI("http://www.semanticweb.org/sa#QualityAttributeStage");
        RepositoryConnection conn = repo.getConnection();
        try
        {
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#actor"), factory.createLiteral(actor));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#enviroment"), factory.createLiteral(enviroment));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#measure"), factory.createLiteral(measure));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#boost"), factory.createLiteral(boost));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#boostSource"), factory.createLiteral(boostSource));
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
    
    public static void update(String id, String actor, String enviroment, String measure, String boost, String boostSource, List<String> triggerArtifacts) throws IOException, URISyntaxException
    {
        
        delete(id);
        insert(id, actor, enviroment, measure, boost, boostSource, triggerArtifacts);
        
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
                factory.createIRI("http://www.semanticweb.org/sa#QualityAttributeStage")
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
    
    public static List<QualityAttribute> selectQAByConcenrId(String id, RepositoryConnection connection) 
    {
        List<QualityAttribute> qas = new ArrayList<QualityAttribute>();
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
                "SELECT DISTINCT ?id ?actor ?enviroment ?measure ?boost ?boostSource WHERE {"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#determinedBy> ?d . "
                +"?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#QualityAttribute> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#actor> ?actor . "
                +"?d <http://www.semanticweb.org/sa#enviroment> ?enviroment . "
                +"?d <http://www.semanticweb.org/sa#measure> ?measure . "
                +"?d <http://www.semanticweb.org/sa#boost> ?boost . "
                +"?d <http://www.semanticweb.org/sa#boostSource> ?boostSource "
                +"}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                qas.add(
                    new QualityAttribute(
                        bs.getValue("id").stringValue(), 
                        bs.getValue("actor").stringValue(), 
                        bs.getValue("enviroment").stringValue(), 
                        bs.getValue("measure").stringValue(), 
                        bs.getValue("boost").stringValue(), 
                        bs.getValue("boostSource").stringValue()
                    ));
            }
            
            if(qas.isEmpty())
            {
                qas = null;
            }
        }
        finally
        {
            if(connection == null)
            {
                conn.close();
                
            }
        }
        
        return qas;
    }
    
    public static String selectById(String id)
    {
        QualityAttribute fr = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?actor ?enviroment ?measure ?boost ?boostSource WHERE {\n"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#QualityAttributeStage> . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#name> ?actor . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#actor> ?enviroment . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#description> ?measure . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#input> ?boost . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#output> ?boostSource "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                fr = new QualityAttribute(
                    bs.getValue("id").stringValue(), 
                        bs.getValue("actor").stringValue(), 
                        bs.getValue("enviroment").stringValue(), 
                        bs.getValue("measure").stringValue(), 
                        bs.getValue("boost").stringValue(), 
                        bs.getValue("boostSource").stringValue()
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
        List<QualityAttribute> qas = new ArrayList<QualityAttribute>();
        Repository repo = null;
        repo = OntologyTools.getInstance();
        repo.initialize();
        
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?actor ?enviroment ?measure ?boost ?boostSource WHERE {"
                +"?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#QualityAttributeStage> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#name> ?actor . "
                +"?d <http://www.semanticweb.org/sa#actor> ?enviroment . "
                +"?d <http://www.semanticweb.org/sa#description> ?measure . "
                +"?d <http://www.semanticweb.org/sa#input> ?boost . "
                +"?d <http://www.semanticweb.org/sa#output> ?boostSource "
                +"}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                
                BindingSet bs = result.next();
                qas.add(new QualityAttribute(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("actor").stringValue(), 
                    bs.getValue("enviroment").stringValue(), 
                    bs.getValue("measure").stringValue(), 
                    bs.getValue("boost").stringValue(), 
                    bs.getValue("boostSource").stringValue()
                ));
                
                int i = qas.size() - 1;
                
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
}
