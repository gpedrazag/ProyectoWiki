package net.unipiloto.wiki.web.transactions;

import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Concern;
import net.unipiloto.wiki.web.others.OntologyTools;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class ConcernTransaction
{
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
                +"?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Concern> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#concern> ?concern "
                +"} "
                +"ORDER BY ?id"
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
                + "} "
                + "ORDER BY ?id"
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
                +"} "
                +"ORDER BY ?id"
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
    
}
