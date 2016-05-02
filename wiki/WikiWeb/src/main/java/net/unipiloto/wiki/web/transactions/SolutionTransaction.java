package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import net.unipiloto.wiki.web.entities.Solution;
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

public class SolutionTransaction
{
    public static void insert(String rationale) throws IOException, URISyntaxException
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
                id = "solution_"+(ids.get(0)+1);
            }
            else
            {
                id = "solution_1";
            }
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Solution");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#rationale"), factory.createLiteral(rationale));
            conn.commit();
        }
        finally
        {
            conn.close();
            
        }
        
    }
    
    public static void update(String id, String rationale) throws IOException, URISyntaxException
    {
        delete(id);
        insert(rationale);
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
                factory.createIRI("http://www.semanticweb.org/sa#Solution")
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
    
    public static Solution selectSolutionByDecisionId(String id, RepositoryConnection connection)
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
        
        return solution;
    }
    
    public static String selectById(String id)
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
    
    public static String selectAll()
    {
        List<Solution> solutions = new ArrayList<Solution>();
        Repository repo = null;
        repo = OntologyTools.getInstance();
        repo.initialize();
        
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?rationale WHERE {"
                +"?d http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Solution> . "
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
    
    private static List<Integer> selectAllIds(RepositoryConnection conn)
    {
        List<Integer> ids = new ArrayList<Integer>();
        TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
            "SELECT DISTINCT ?id WHERE {\n"
            + "?alternative <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Solution> . "
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
