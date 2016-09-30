package net.unipiloto.wiki.web.transactions;

import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Criteria;
import net.unipiloto.wiki.web.others.OntologyTools;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class CriteriaTransaction
{
    public static List<Criteria> selectAllCriteriasByDecisionId(String id, RepositoryConnection connection)
    {
        List<Criteria> criterias = new ArrayList();
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
                "SELECT DISTINCT ?id ?description ?keyword WHERE {"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#decisionHave> ?d . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#description> ?description . "
                +"?d <http://www.semanticweb.org/sa#keyword> ?keyword "
                +"} "
                +"ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                
                BindingSet bs = result.next();
                criterias.add(
                    new Criteria(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("description").stringValue(),
                    bs.getValue("keyword").stringValue()
                ));
                
                int i = criterias.size() - 1;
                criterias.get(i).setLinkedEvaluations(EvaluationTransaction.selectByCriteriaId(criterias.get(i).getId(), conn));
            }
            
            if(criterias.isEmpty())
            {
                criterias = null;
            }
        }
        finally
        {
            if(connection == null)
            {
                conn.close();
                
            }
        }
        return criterias;
    }
    
    public static String selectById(String id) 
    {
        Criteria criteria = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?description ?keyword WHERE {\n"
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Criteria> . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#description> ?description . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#keyword> ?keyword "
                + "} "
                + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                criteria = new Criteria(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("description").stringValue(),
                    bs.getValue("keyword").stringValue()
                );
                
                criteria.setLinkedEvaluations(EvaluationTransaction.selectByCriteriaId(id, conn));
            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(criteria);
    }
    
    public static String selectAll()
    {
        List<Criteria> criterias = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?description ?keyword WHERE {\n"
                + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Criteria> . "
                + "?d <http://www.semanticweb.org/sa#id> ?id . "
                + "?d <http://www.semanticweb.org/sa#description> ?description . "
                + "?d <http://www.semanticweb.org/sa#keyword> ?keyword "
                + "} "
                + "ORDER BY ?id"

            );
            TupleQueryResult result = tq.evaluate(); //sdsdsdds;
            while(result.hasNext())
            {
                BindingSet bs = result.next();

                criterias.add(new Criteria(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("description").stringValue(),
                    bs.getValue("keyword").stringValue()
                ));
                int i = criterias.size() - 1;
                criterias.get(i).setLinkedEvaluations(EvaluationTransaction.selectByCriteriaId(criterias.get(i).getId(), conn));
            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(criterias);
        
    }
}
