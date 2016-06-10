package net.unipiloto.wiki.web.services.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import javax.ejb.Stateless;
import net.unipiloto.wiki.domain.entities.Assumption;
import net.unipiloto.wiki.web.others.OntologyTools;
import net.unipiloto.wiki.web.services.AssumptionService;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

@Stateless(mappedName = "java:global/AssuptionService")
public class AssumptionServiceImpl implements AssumptionService
{
    
    @Override
    public String selectAllAssumptionsByDecisionId(String id, RepositoryConnection connection)
    {
        List<Assumption> assumptions = new ArrayList();
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
                "SELECT DISTINCT ?id ?description ?source WHERE {"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#decisionMayHave> ?d . "
                +"?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Assumption> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#description> ?description . "
                +"?d <http://www.semanticweb.org/sa#source> ?source "
                +"}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                assumptions.add(
                    new Assumption(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("description").stringValue(),
                    bs.getValue("source").stringValue()
                ));
            }
            
            if(assumptions.isEmpty())
            {
                assumptions = null;
            }
        }
        finally
        {
            if(connection == null)
            {
                conn.close();
                
            }
        }
        
        return JsonFactory.toJson(assumptions);
    }
    
    @Override
    public String selectById(String id) 
    {
        Assumption assumption = null;
        Repository repo = OntologyTools.getInstance();;
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?description ?source WHERE {\n"
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Assumption> . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id ."
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#description> ?description . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#source> ?source "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                assumption = new Assumption(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("description").stringValue(),
                    bs.getValue("source").stringValue() 
                );
            }
        }
        finally
        {
            conn.close();
            
        }
        
        return JsonFactory.toJson(assumption);
    }
    
    @Override
    public String selectAll()
    {
        List<Assumption> assumptions = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        try
        (RepositoryConnection conn = repo.getConnection()) {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?description ?source WHERE {\n"
                + "?assumption <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Assumption> . "
                + "?assumption <http://www.semanticweb.org/sa#id> ?id ."
                + "?assumption <http://www.semanticweb.org/sa#description> ?description . "
                + "?assumption <http://www.semanticweb.org/sa#source> ?source "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                assumptions.add(new Assumption(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("description").stringValue(), 
                    bs.getValue("source").stringValue()
                ));
            }
        }
        
        return JsonFactory.toJson(assumptions);
    }
    
    private  List<Integer> selectAllIds(RepositoryConnection conn)
    {
        List<Integer> ids = new ArrayList<Integer>();
        TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
            "SELECT DISTINCT ?id WHERE {\n"
            + "?alternative <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Assumption> . "
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
