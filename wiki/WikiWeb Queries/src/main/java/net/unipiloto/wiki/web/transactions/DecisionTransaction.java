package net.unipiloto.wiki.web.transactions;

import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Decision;
import net.unipiloto.wiki.web.others.OntologyTools;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class DecisionTransaction
{
    public static List<Decision> selectAllDecisionsByArtifactId(String artifactId, RepositoryConnection connection)
    {
        List<Decision> decisions = new ArrayList();
        
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
    
    public static List<Decision> selectAllDecisionsByResponsibleId(String responsibleId, RepositoryConnection connection)
    {
        List<Decision> decisions = new ArrayList();
        
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
                + "?d <http://www.semanticweb.org/sa#decisionHave> <http://www.semanticweb.org/sa#"+responsibleId+"> . "
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
        List<Decision> decisions = new ArrayList();
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
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Decision> . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#name> ?name . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#arguments> ?arguments . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#state> ?state "
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
        List<Decision> decisions = new ArrayList();
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
