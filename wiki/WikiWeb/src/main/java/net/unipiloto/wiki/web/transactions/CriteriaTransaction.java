package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import net.unipiloto.wiki.web.entities.Criteria;
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

public class CriteriaTransaction
{
    public static void insert(String id, String keyword, String description, List<String> linkedEvaluations) throws IOException, URISyntaxException
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
                     id = "criteria_"+(ids.get(0)+1);
                }
                else
                {
                    id = "criteria_1";
                }
            }
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Criteria");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#keyword"), factory.createLiteral(keyword));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#description"), factory.createLiteral(description));
            if(linkedEvaluations != null)
            {
                for(String s : linkedEvaluations)
                {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#criteriaLinkTo"), factory.createIRI("http://www.semanticweb.org/sa#"+s));
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
    
    public static void update(String id, String keyword, String description, List<String> linkedEvaluations) throws IOException, URISyntaxException
    {
        delete(id);
        insert(id, keyword, description, linkedEvaluations);
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
    
    public static List<Criteria> selectAllCriteriasByDecisionId(String id, RepositoryConnection connection)
    {
        List<Criteria> criterias = new ArrayList<Criteria>();
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
                +"}"
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
                + "}"
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
        List<Criteria> criterias = new ArrayList<Criteria>();
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
                + "}"

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
    
    private static List<Integer> selectAllIds(RepositoryConnection conn)
    {
        List<Integer> ids = new ArrayList<Integer>();
        TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
            "SELECT DISTINCT ?id WHERE {\n"
            + "?alternative <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Criteria> . "
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
