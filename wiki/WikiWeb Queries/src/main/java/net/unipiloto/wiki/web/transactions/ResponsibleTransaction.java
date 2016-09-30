package net.unipiloto.wiki.web.transactions;

import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Responsible;
import net.unipiloto.wiki.web.others.OntologyTools;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class ResponsibleTransaction
{
    public static List<Responsible> selectAllResponsiblesByDecisionId(String id, RepositoryConnection connection)
    {
        List<Responsible> responsibles = new ArrayList();
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
                "SELECT DISTINCT ?id ?name WHERE {"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#decisionHave> ?d . "
                +"?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Responsible> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#name> ?name "
                +"} "
                +"ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                
                BindingSet bs = result.next();
                responsibles.add(
                    new Responsible(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue()
                ));
            }
            
            if(responsibles.isEmpty())
            {
                responsibles = null;
            }
        }
        finally
        {
            if(connection == null)
            {
                conn.close();
                
            }
        }
        
        return responsibles;
    }
    
    public static String selectById(String id) 
    {
        Responsible responsible = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?name WHERE {\n"
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Responsible> . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#name> ?name "
                + "} "
                + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                responsible = new Responsible(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue()
                );
            }
            responsible.setDecisions(DecisionTransaction.selectAllDecisionsByResponsibleId(id, conn));
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(responsible);
    }
    
    public static String selectAll()
    {
        List<Responsible> responsibles = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?name WHERE {\n"
                + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Responsible> . "
                + "?d <http://www.semanticweb.org/sa#id> ?id . "
                + "?d <http://www.semanticweb.org/sa#name> ?name "
                + "} "
                + "ORDER BY ?id"

            );
            TupleQueryResult result = tq.evaluate(); //sdsdsdds;
            while(result.hasNext())
            {
                BindingSet bs = result.next();

                responsibles.add(new Responsible(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue()
                ));
                
                int i = responsibles.size() -1 ;
                responsibles.get(i).setDecisions(DecisionTransaction.selectAllDecisionsByResponsibleId(responsibles.get(0).getId(), conn));
            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(responsibles);
        
    }
}
