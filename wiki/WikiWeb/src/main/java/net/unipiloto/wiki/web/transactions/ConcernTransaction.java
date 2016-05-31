package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import net.unipiloto.wiki.web.entities.Concern;
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

public class ConcernTransaction
{
    public static void insert(String id, String concern, List<String> describedByQA, List<String> describedByFR) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            if(id == null)
            {
                List<Integer> ids = selectAllIds(conn);
                if(ids != null)
                {
                     id = "concern_"+(ids.get(0)+1);
                }
                else
                {
                    id = "concern_1";
                }
            }
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Concern");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#concern"), factory.createLiteral(concern));
            if(describedByFR != null)
            {
                for(String s : describedByFR)
                {
                   conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#determinedBy"), factory.createIRI("http://www.semanticweb.org/sa#"+s));
                }
            }
            if(describedByQA != null)
            {
                for(String s : describedByQA)
                {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#determinedBy"), factory.createIRI("http://www.semanticweb.org/sa#"+s));
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
    
    public static void update(String newId, String oldId, String concern, List<String> describedByQA, List<String> describedByFR) throws IOException, URISyntaxException
    {
        delete(oldId);
        insert(newId, concern, describedByQA, describedByFR);
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
    
    public static List<Concern> selectAllConcernsByDecisionId(String id, RepositoryConnection connection)
    {
        List<Concern> concerns = new ArrayList<Concern>();
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
                "SELECT DISTINCT ?id ?concern WHERE {"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#havaAsTrigger> ?d . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#concern> ?concern "
                +"}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                concerns.add(
                    new Concern(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("concern").stringValue()
                ));
                int i = concerns.size() - 1;
                concerns.get(i).setDescribedByFR(FunctionalRequerimentTransaction.selectFRByConcernId(concerns.get(i).getId(), conn));
                concerns.get(i).setDescribedByQA(QualityAttributeTransaction.selectQAByConcenrId(concerns.get(i).getId(), conn));
            }
            
            if(concerns.isEmpty())
            {
                concerns = null;
            }
        }
        finally
        {
            if(connection == null)
            {
                conn.close();
                
            }
        }
        
        return concerns;
    }
    
    public static String selectById(String id)
    {
        Concern concern = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?concern WHERE {\n"
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Concern> . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#concern> ?concern "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                concern = new Concern(
                    bs.getValue("id").stringValue(),
                    bs.getValue("concern").stringValue()
                );
                concern.setDescribedByFR(FunctionalRequerimentTransaction.selectFRByConcernId(id, conn));
                concern.setDescribedByQA(QualityAttributeTransaction.selectQAByConcenrId(id, conn));
            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(concern);
    }
    
    public static String selectAll()
    {
        List<Concern> concerns = new ArrayList<Concern>();
        
        Repository repo = null;
        repo = OntologyTools.getInstance();
        repo.initialize();
        
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?concern WHERE {"
                +"?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Concern> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#concern> ?concern "
                +"}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                
                BindingSet bs = result.next();
                concerns.add(
                    new Concern(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("concern").stringValue()
                ));
                int i = concerns.size() - 1;
                concerns.get(i).setDescribedByFR(FunctionalRequerimentTransaction.selectFRByConcernId(concerns.get(i).getId(), conn));
                concerns.get(i).setDescribedByQA(QualityAttributeTransaction.selectQAByConcenrId(concerns.get(i).getId(), conn));
            }
            
            if(concerns.isEmpty())
            {
                concerns = null;
            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(concerns);
    }
    
    private static List<Integer> selectAllIds(RepositoryConnection conn)
    {
        List<Integer> ids = new ArrayList<Integer>();
        TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
            "SELECT DISTINCT ?id WHERE {\n"
            + "?alternative <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Concern> . "
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
