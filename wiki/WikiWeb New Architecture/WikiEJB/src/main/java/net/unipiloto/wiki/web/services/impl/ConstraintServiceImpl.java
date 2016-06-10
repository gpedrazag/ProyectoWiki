package net.unipiloto.wiki.web.services.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import javax.ejb.Stateless;
import net.unipiloto.wiki.domain.entities.Constraint;
import net.unipiloto.wiki.web.others.OntologyTools;
import net.unipiloto.wiki.web.services.ConstraintService;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

@Stateless(mappedName = "java:global/ConstraintService")
public class ConstraintServiceImpl implements ConstraintService
{
    @Override
    public String selectAllConstraintByDecisionId(String id, RepositoryConnection connection)
    {
        List<Constraint> constraints = new ArrayList();
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
                "SELECT DISTINCT ?id ?name ?description ?rationale ?keyword WHERE {"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#decisionMayHave> ?d . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#name> ?name . "
                +"?d <http://www.semanticweb.org/sa#description> ?description . "
                +"?d <http://www.semanticweb.org/sa#rationale> ?rationale . "
                +"?d <http://www.semanticweb.org/sa#keyword> ?keyword "
                +"}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                
                BindingSet bs = result.next();
                constraints.add(
                    new Constraint(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(),
                    bs.getValue("description").stringValue(),
                    bs.getValue("rationale").stringValue(),
                    bs.getValue("keyword").stringValue()
                ));
            }
            
            if(constraints.isEmpty())
            {
                constraints = null;
            }
        }
        finally
        {
            if(connection == null)
            {
                conn.close();
                
            }
        }
        
        return JsonFactory.toJson(constraints);
    }
    
    @Override
    public String selectById(String id) 
    {
        Constraint constraint = null;
        Repository repo = OntologyTools.getInstance();;
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?name ?description ?rationale ?keyword WHERE {\n"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Constraint> . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#name> ?name . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#description> ?description . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#rationale> ?rationale . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#keyword> ?keyword "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                constraint = new Constraint(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(),
                    bs.getValue("description").stringValue(),
                    bs.getValue("rationale").stringValue(),
                    bs.getValue("keyword").stringValue()
                );
            }
        }
        finally
        {
            conn.close();
            
        }
        
        return JsonFactory.toJson(constraint);
    }
    
    @Override
    public String selectAll()
    {
        List<Constraint> constraints = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?name ?description ?rationale ?keyword WHERE {\n"
                +"?constraint <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Constraint> . "
                +"?constraint <http://www.semanticweb.org/sa#id> ?id . "
                +"?constraint <http://www.semanticweb.org/sa#name> ?name . "
                +"?constraint <http://www.semanticweb.org/sa#description> ?description . "
                +"?constraint <http://www.semanticweb.org/sa#rationale> ?rationale . "
                +"?constraint <http://www.semanticweb.org/sa#keyword> ?keyword "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                constraints.add(new Constraint(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(),
                    bs.getValue("description").stringValue(),
                    bs.getValue("rationale").stringValue(),
                    bs.getValue("keyword").stringValue()
                ));
            }
        }
        finally
        {
            conn.close();
            
        }
        
        return JsonFactory.toJson(constraints);
    }
    
    private List<Integer> selectAllIds(RepositoryConnection conn)
    {
        List<Integer> ids = new ArrayList<Integer>();
        TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
            "SELECT DISTINCT ?id WHERE {\n"
            + "?alternative <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Constraint> . "
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
