package net.unipiloto.wiki.web.services.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import javax.ejb.Stateless;
import net.unipiloto.wiki.domain.entities.Alternative;
import net.unipiloto.wiki.domain.entities.Assumption;
import net.unipiloto.wiki.domain.entities.Concern;
import net.unipiloto.wiki.domain.entities.Constraint;
import net.unipiloto.wiki.domain.entities.Criteria;
import net.unipiloto.wiki.domain.entities.Decision;
import net.unipiloto.wiki.domain.entities.Responsible;
import net.unipiloto.wiki.domain.entities.Solution;
import net.unipiloto.wiki.web.others.OntologyTools;
import net.unipiloto.wiki.web.services.DecisionService;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

@Stateless(mappedName = "java:global/DecisionService")
public class DecisionServiceImpl
        implements DecisionService
{

    @Override
    public String selectAllDecisionsByArtifactId(String artifactId,
            RepositoryConnection connection)
    {
        List<Decision> decisions = new ArrayList();
        Repository repo = null;
        RepositoryConnection conn = null;
        if(connection != null)
        {
            conn = connection;
        }else
        {
            repo = OntologyTools.getInstance();
            repo.initialize();
            conn = repo.getConnection();
        }
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?arguments ?state WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + artifactId + "> <http://www.semanticweb.org/sa#artifactHave> ?d . "
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
        }finally
        {
            if(connection == null)
            {
                conn.close();
            }
        }
        return JsonFactory.toJson(decisions);
    }

    @Override
    public String selectAllDecisionsByResponsibleId(String responsibleId,
            RepositoryConnection connection)
    {
        List<Decision> decisions = new ArrayList();
        Repository repo = null;
        RepositoryConnection conn = null;
        if(connection != null)
        {
            conn = connection;
        }else
        {
            repo = OntologyTools.getInstance();
            repo.initialize();
            conn = repo.getConnection();
        }
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?arguments ?state WHERE {\n"
                    + "?d <http://www.semanticweb.org/sa#decisionHave> <http://www.semanticweb.org/sa#" + responsibleId + "> . "
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
        }finally
        {
            if(connection == null)
            {
                conn.close();
            }
        }
        return JsonFactory.toJson(decisions);
    }

    @Override
    public String selectAllDecisionsBySoftwareArchitectureId(String id,
            RepositoryConnection connection)
    {
        List<Decision> decisions = new ArrayList();
        Repository repo = null;
        RepositoryConnection conn = null;
        if(connection != null)
        {
            conn = connection;
        }else
        {
            repo = OntologyTools.getInstance();
            repo.initialize();
            conn = repo.getConnection();
        }
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?arguments ?state WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#isaSetOf> ?d . "
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
        }finally
        {
            if(connection == null)
            {
                conn.close();
            }
        }
        return JsonFactory.toJson(decisions);
    }

    @Override
    public String selectById(String id)
    {
        Decision decision = null;
        Repository repo = OntologyTools.getInstance();;
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?arguments ?state WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Decision> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#name> ?name . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#arguments> ?arguments . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#state> ?state "
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
                decision.setHaveAlternatives(JsonFactory.fromJsonArray(
                        new AlternativeServiceImpl().selectAllAlternativesByDecisionId(
                                id, conn), Alternative.class));
                decision.setHaveAsTriggerConcerns(JsonFactory.fromJsonArray(
                        new ConcernServiceImpl().selectAllConcernsByDecisionId(
                                id, conn), Concern.class));
                decision.setHaveCriterias(JsonFactory.fromJsonArray(
                        new CriteriaServiceImpl().selectAllCriteriasByDecisionId(
                                id, conn), Criteria.class));
                decision.setHaveResponsibles(JsonFactory.fromJsonArray(
                        new ResponsibleServiceImpl().selectAllResponsiblesByDecisionId(
                                id, conn), Responsible.class));
                decision.setHaveSolution(JsonFactory.fromJson(
                        new SolutionServiceImpl().selectSolutionByDecisionId(id,
                                conn), Solution.class));
                decision.setMayHaveAssumptions(JsonFactory.fromJsonArray(
                        new AssumptionServiceImpl().selectAllAssumptionsByDecisionId(
                                id, conn), Assumption.class));
                decision.setMayHaveConstraints(JsonFactory.fromJsonArray(
                        new ConstraintServiceImpl().selectAllConstraintByDecisionId(
                                id, conn), Constraint.class));
            }
        }finally
        {
            conn.close();
        }
        return JsonFactory.toJson(decision);
    }

    @Override
    public String selectAll()
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
                decisions.get(i).setHaveAlternatives(JsonFactory.fromJsonArray(
                        new AlternativeServiceImpl().selectAllAlternativesByDecisionId(
                                decisions.get(i).getId(), conn),
                        Alternative.class));
                decisions.get(i).setHaveAsTriggerConcerns(
                        JsonFactory.fromJsonArray(
                                new ConcernServiceImpl().selectAllConcernsByDecisionId(
                                        decisions.get(i).getId(), conn),
                                Concern.class));
                decisions.get(i).setHaveCriterias(JsonFactory.fromJsonArray(
                        new CriteriaServiceImpl().selectAllCriteriasByDecisionId(
                                decisions.get(i).getId(), conn), Criteria.class));
                decisions.get(i).setHaveResponsibles(JsonFactory.fromJsonArray(
                        new ResponsibleServiceImpl().selectAllResponsiblesByDecisionId(
                                decisions.get(i).getId(), conn),
                        Responsible.class));
                decisions.get(i).setHaveSolution(JsonFactory.fromJson(
                        new SolutionServiceImpl().selectSolutionByDecisionId(
                                decisions.get(i).getId(),
                                conn), Solution.class));
                decisions.get(i).setMayHaveAssumptions(
                        JsonFactory.fromJsonArray(
                                new AssumptionServiceImpl().selectAllAssumptionsByDecisionId(
                                        decisions.get(i).getId(), conn),
                                Assumption.class));
                decisions.get(i).setMayHaveConstraints(
                        JsonFactory.fromJsonArray(
                                new ConstraintServiceImpl().selectAllConstraintByDecisionId(
                                        decisions.get(i).getId(), conn),
                                Constraint.class));
            }
        }finally
        {
            conn.close();
        }
        return JsonFactory.toJson(decisions);
    }
}
