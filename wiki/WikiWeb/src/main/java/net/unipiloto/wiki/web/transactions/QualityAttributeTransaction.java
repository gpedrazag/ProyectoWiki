package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import net.unipiloto.wiki.web.entities.QualityAttribute;
import net.unipiloto.wiki.web.others.OntologyTools;
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
        RepositoryConnection conn = repo.getConnection();
        try
        {
            if(id==null)
            {
                List<Integer> ids = selectAllIds(conn);
                if(ids != null)
                {
                    id = "qa_"+(ids.get(0)+1);
                }
                else
                {
                    id = "qa_1";
                }
            }
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#QualityAttributeStage");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#actor"), factory.createLiteral(actor));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#enviroment"), factory.createLiteral(enviroment));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#measure"), factory.createLiteral(measure));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#boost"), factory.createLiteral(boost));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#boostSource"), factory.createLiteral(boostSource));
            if(triggerArtifacts != null)
            {
                for(String s : triggerArtifacts)
                {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#triggerAn"), factory.createLiteral("http://www.semanticweb.org/sa#"+id));
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
                int i = qas.size()-1;
                qas.get(i).setTriggerArtifacts(ArtifactTransaction.selectByQAId(qas.get(i).getId(), connection));
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
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#actor> ?actor . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#enviroment> ?enviroment . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#measure> ?measure . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#boost> ?boost . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#boostSource> ?boostSource "
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
                fr.setTriggerArtifacts(ArtifactTransaction.selectByQAId(id, conn));
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
                qas.add(new QualityAttribute(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("actor").stringValue(), 
                    bs.getValue("enviroment").stringValue(), 
                    bs.getValue("measure").stringValue(), 
                    bs.getValue("boost").stringValue(), 
                    bs.getValue("boostSource").stringValue()
                ));
                
                int i = qas.size()-1;
                qas.get(i).setTriggerArtifacts(ArtifactTransaction.selectByQAId(qas.get(i).getId(), conn));
                
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
            + "?alternative <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#QualityAttributeStage> . "
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
