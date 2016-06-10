package net.unipiloto.wiki.web.services.impl;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import net.unipiloto.wiki.domain.entities.Solution;
import net.unipiloto.wiki.web.others.OntologyTools;
import net.unipiloto.wiki.web.services.SolutionService;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

@Stateless(mappedName = "java:global/SolutionService")
public class SolutionServiceImpl implements SolutionService
{
    @Override
    public String selectSolutionByDecisionId(String id, RepositoryConnection connection)
    {
        Solution solution = null;
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
                "SELECT DISTINCT ?id ?rationale WHERE {"
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#decisionHave> ?d . "
                +"?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Solution> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#rationale> ?rationale "
                +"}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                
                BindingSet bs = result.next();
                solution = new Solution(
                    bs.getValue("id").stringValue(), 
                    "", 
                    ""       
                );
                solution.setRationale(bs.getValue("rationale").stringValue());
            }
        }
        finally
        {
            if(connection == null)
            {
                conn.close();
                
            }
        }
        
        return JsonFactory.toJson(solution);
    }
    
    @Override
    public String selectById(String id)
    {
        Solution solution = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?rationale WHERE {\n"
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Solution> . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#rationale> ?rationale "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                solution = new Solution(
                    bs.getValue("id").stringValue(),
                    "",
                    ""
                );
                solution.setRationale(bs.getValue("rationale").stringValue());
            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(solution);
    }
    
    @Override
    public String selectAll()
    {
        List<Solution> solutions = new ArrayList();
        Repository repo = null;
        repo = OntologyTools.getInstance();
        repo.initialize();
        
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?rationale WHERE {"
                +"?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Solution> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#rationale> ?rationale "
                +"}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                
                BindingSet bs = result.next();
                solutions.add(
                    new Solution(
                    bs.getValue("id").stringValue(), 
                    "",
                    ""
                ));
                int i = solutions.size() - 1;
                solutions.get(i).setRationale(bs.getValue("rationale").stringValue());
            }
            
            if(solutions.isEmpty())
            {
                solutions = null;
            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(solutions);
    }
    
}
