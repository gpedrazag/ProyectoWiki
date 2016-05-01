package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Decision;
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

public class DecisionTransaction
{
    public static void insert(
        String id, 
        String name, 
        String arguments, 
        String state,
        List<String> mayHaveConstraints,
        List<String> haveCriterias,
        List<String> mayHaveAssumptions,
        List<String> haveAsTriggerConcerns,
        List<String> haveResponsibles,
        List<String> haveAlternatives,
        String haveSolution) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        ValueFactory factory = repo.getValueFactory();
        
        if(selectById(id) == null)
        {
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Decision");
            RepositoryConnection conn = repo.getConnection();
            try
            {
                conn.begin();
                conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
                conn.add(subject, RDF.TYPE, object);
                conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
                conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#name"), factory.createLiteral(name));
                conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#arguments"), factory.createLiteral(arguments));
                conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#state"), factory.createLiteral(state));
                if(mayHaveConstraints != null)
                {
                    for(String s : mayHaveConstraints)
                    {
                        conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#decisionMayHave"), factory.createIRI("http://www.semanticweb.org/sa#"+s));
                    }
                }
                if(haveCriterias != null)
                {
                    for(String s : haveCriterias)
                    {
                       conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#decisionHave"), factory.createIRI("http://www.semanticweb.org/sa#"+s)); 
                    }
                }
                if(mayHaveAssumptions != null)
                {
                    for(String s : mayHaveAssumptions)
                    {
                       conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#decisionMayHave"), factory.createIRI("http://www.semanticweb.org/sa#"+s));
                    }
                }
                if(haveAsTriggerConcerns != null)
                {
                    for(String s : haveAsTriggerConcerns)
                    {
                       conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#havaAsTrigger"), factory.createIRI("http://www.semanticweb.org/sa#"+s));  
                    }
                }
                if(haveResponsibles != null)
                {
                    for(String s : haveResponsibles)
                    {
                       conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#decisionHave"), factory.createIRI("http://www.semanticweb.org/sa#"+s)); 
                    }
                }
                if(haveAlternatives != null)
                {
                    for(String s : haveAlternatives)
                    {
                       conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#decisionHave"), factory.createIRI("http://www.semanticweb.org/sa#"+s));  
                    }
                }
                
                if(!haveSolution.equals(""))
                {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#decisionHave"), factory.createIRI("http://www.semanticweb.org/sa#"+haveSolution));  
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
        
    }
    
    public static void update(
        String id, 
        String name, 
        String arguments, 
        String state,List<String> mayHaveConstraints,
        List<String> haveCriterias,
        List<String> mayHaveAssumptions,
        List<String> haveAsTriggerConcerns,
        List<String> haveResponsibles,
        List<String> haveAlternatives,
        String haveSolution) throws IOException, URISyntaxException
    {
        delete(id);
        insert(id, name, arguments, state, mayHaveConstraints, haveCriterias, mayHaveAssumptions, haveAsTriggerConcerns, haveResponsibles, haveAlternatives, haveSolution);
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
                factory.createIRI("http://www.semanticweb.org/sa#Decision")
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
    
    public static List<Decision> selectAllDecisionsByArtifactId(String artifactId, RepositoryConnection connection)
    {
        List<Decision> decisions = new ArrayList<Decision>();
        
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
                "SELECT DISTINCT ?id ?name ?arguments ?state WHERE {\n"
                + "<http://www.semanticweb.org/sa#"+artifactId+"> <http://www.semanticweb.org/sa#artifactHave> ?d . "
                + "?d <http://www.semanticweb.org/sa#id> ?id . "
                + "?d <http://www.semanticweb.org/sa#name> ?name . "
                + "?d <http://www.semanticweb.org/sa#arguments> ?arguments . "
                + "?d <http://www.semanticweb.org/sa#state> ?state "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                
                BindingSet bs = result.next();
                decisions.add(
                    new Decision(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(), 
                    bs.getValue("arguments").stringValue(), 
                    bs.getValue("state").stringValue()
                ));
                
            }
            
            if(decisions.isEmpty())
            {
                decisions = null;
            }
        }
        finally
        {
            if(connection == null)
            {
                conn.close();
                
            }
        }
        
        return decisions;
    }
    
    public static List<Decision> selectAllDecisionsBySoftwareArchitectureId(String id, RepositoryConnection connection)
    {
        List<Decision> decisions = new ArrayList<Decision>();
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
                "SELECT DISTINCT ?id ?name ?arguments ?state WHERE {"
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#isaSetOf> ?d . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                + "?d <http://www.semanticweb.org/sa#name> ?name . "
                + "?d <http://www.semanticweb.org/sa#arguments> ?arguments . "
                + "?d <http://www.semanticweb.org/sa#state> ?state "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                
                BindingSet bs = result.next();
                decisions.add(
                    new Decision(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(), 
                    bs.getValue("arguments").stringValue(), 
                    bs.getValue("state").stringValue()
                ));
            }
            
            if(decisions.isEmpty())
            {
                decisions = null;
            }
        }
        finally
        {
            if(connection == null)
            {
                conn.close();
                
            }
        }
        
        return decisions;
    }
    
    public static String selectById(String id)
    {
        Decision decision = null;
        Repository repo = OntologyTools.getInstance();;
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?name ?arguments ?state WHERE {"
                + "<http://www.semanticweb.org/sa#"+id+" <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Decision> . "
                + "<http://www.semanticweb.org/sa#"+id+" <http://www.semanticweb.org/sa#id> ?id . "
                + "<http://www.semanticweb.org/sa#"+id+" <http://www.semanticweb.org/sa#name> ?name . "
                + "<http://www.semanticweb.org/sa#"+id+" <http://www.semanticweb.org/sa#arguments> ?arguments . "
                + "<http://www.semanticweb.org/sa#"+id+" <http://www.semanticweb.org/sa#state> ?state "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                decision = new Decision(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(), 
                    bs.getValue("arguments").stringValue(), 
                    bs.getValue("state").stringValue()
                );
                
                decision.setHaveAlternatives(AlternativeTransaction.selectAllAlternativesByDecisionId(id, conn));
                decision.setHaveAsTriggerConcerns(ConcernTransaction.selectAllConcernsByDecisionId(id, conn));
                decision.setHaveCriterias(CriteriaTransaction.selectAllCriteriasByDecisionId(id, conn));
                decision.setHaveResponsibles(ResponsibleTransaction.selectAllResponsiblesByDecisionId(id, conn));
                decision.setHaveSolution(SolutionTransaction.selectSolutionByDecisionId(id, conn));
                decision.setMayHaveAssumptions(AssumptionTransaction.selectAllAssumptionsByDecisionId(id, conn));
                decision.setHaveSolution(SolutionTransaction.selectSolutionByDecisionId(id, conn));
            }
        }
        finally
        {
            conn.close();
        }
        return JsonFactory.toJson(decision);
    }
    
    public static String selectAll()
    {
        List<Decision> decisions = new ArrayList<Decision>();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?name ?arguments ?state WHERE {\n"
                + "?decision <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Decision> . "
                + "?decision <http://www.semanticweb.org/sa#id> ?id . "
                + "?decision <http://www.semanticweb.org/sa#name> ?name . "
                + "?decision <http://www.semanticweb.org/sa#arguments> ?arguments . "
                + "?decision <http://www.semanticweb.org/sa#state> ?state "
                + "}"

            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();

                decisions.add(new Decision(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(), 
                    bs.getValue("arguments").stringValue(), 
                    bs.getValue("state").stringValue()
                ));
                int i = decisions.size() - 1;
                
                decisions.get(i).setHaveAlternatives(AlternativeTransaction.selectAllAlternativesByDecisionId(decisions.get(i).getId(), conn));
                decisions.get(i).setHaveAsTriggerConcerns(ConcernTransaction.selectAllConcernsByDecisionId(decisions.get(i).getId(), conn));
                decisions.get(i).setHaveCriterias(CriteriaTransaction.selectAllCriteriasByDecisionId(decisions.get(i).getId(), conn));
                decisions.get(i).setHaveResponsibles(ResponsibleTransaction.selectAllResponsiblesByDecisionId(decisions.get(i).getId(), conn));
                decisions.get(i).setHaveSolution(SolutionTransaction.selectSolutionByDecisionId(decisions.get(i).getId(), conn));
                decisions.get(i).setMayHaveAssumptions(AssumptionTransaction.selectAllAssumptionsByDecisionId(decisions.get(i).getId(), conn));
                decisions.get(i).setHaveSolution(SolutionTransaction.selectSolutionByDecisionId(decisions.get(i).getId(), conn));
            }
        }
        finally
        {
            conn.close();
            
        }
        
        return JsonFactory.toJson(decisions);
    }
}
