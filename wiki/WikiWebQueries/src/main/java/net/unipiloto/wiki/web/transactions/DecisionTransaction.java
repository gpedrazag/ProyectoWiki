package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Alternative;
import net.unipiloto.wiki.web.entities.Assumption;
import net.unipiloto.wiki.web.entities.Concern;
import net.unipiloto.wiki.web.entities.Constraint;
import net.unipiloto.wiki.web.entities.Criteria;
import net.unipiloto.wiki.web.entities.Decision;
import net.unipiloto.wiki.web.entities.Responsible;
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

public class DecisionTransaction {

    private static void insert(
            String id,
            String name,
            String arguments,
            String state,
            List<Constraint> mayHaveConstraints,
            List<Criteria> haveCriterias,
            List<Assumption> mayHaveAssumptions,
            List<Concern> haveAsTriggerConcerns,
            List<Responsible> haveResponsibles,
            List<Alternative> haveAlternatives) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();

        RepositoryConnection conn = repo.getConnection();
        try {
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#" + id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Decision");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#name"), factory.createLiteral(name));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#arguments"), factory.createLiteral(arguments));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#state"), factory.createLiteral(state));
            if (mayHaveConstraints != null) {
                for (Constraint s : mayHaveConstraints) {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#decisionMayHave"), factory.createIRI("http://www.semanticweb.org/sa#" + s.getId()));
                }
            }
            if (haveCriterias != null) {
                for (Criteria s : haveCriterias) {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#decisionHave"), factory.createIRI("http://www.semanticweb.org/sa#" + s.getId()));
                }
            }
            if (mayHaveAssumptions != null) {
                for (Assumption s : mayHaveAssumptions) {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#decisionMayHave"), factory.createIRI("http://www.semanticweb.org/sa#" + s.getId()));
                }
            }
            if (haveAsTriggerConcerns != null) {
                for (Concern s : haveAsTriggerConcerns) {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#havaAsTrigger"), factory.createIRI("http://www.semanticweb.org/sa#" + s.getId()));
                }
            }
            if (haveResponsibles != null) {
                for (Responsible s : haveResponsibles) {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#decisionHave"), factory.createIRI("http://www.semanticweb.org/sa#" + s.getId()));
                }
            }
            if (haveAlternatives != null) {
                for (Alternative s : haveAlternatives) {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#decisionHave"), factory.createIRI("http://www.semanticweb.org/sa#" + s.getId()));
                }
            }
            conn.commit();
        } catch (Exception ex) {
            conn.rollback();
        } finally {
            conn.close();

        }
    }

    public static void update(
            String id,
            String name,
            String arguments,
            String state) throws IOException, URISyntaxException {
        Decision decision = JsonFactory.fromJson(selectById(id), Decision.class);
        delete(id);
        insert(
                id, 
                name.equals("-_-")?decision.getName():name, 
                arguments.equals("-_-")?decision.getArguments():arguments, 
                state.equals("-_-")?decision.getState():state, 
                decision.getMayHaveConstraints(), 
                decision.getHaveCriterias(), 
                decision.getMayHaveAssumptions(), 
                decision.getHaveAsTriggerConcerns(), 
                decision.getHaveResponsibles(), 
                decision.getHaveAlternatives()
        );
    }

    private static void delete(String id) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            conn.prepareUpdate(
                    "DELETE { <http://www.semanticweb.org/sa#" + id + "> ?p ?d2 }\n"
                    + "WHERE { <http://www.semanticweb.org/sa#" + id + "> ?p ?d2 }"
            ).execute();
        } catch (Exception ex) {
            conn.rollback();
        } finally {
            conn.close();

        }
    }

    public static List<Decision> selectAllDecisionsByArtifactId(String artifactId, RepositoryConnection connection) {
        List<Decision> decisions = new ArrayList();

        Repository repo = null;
        RepositoryConnection conn = null;
        if (connection != null) {
            conn = connection;
        } else {
            repo = OntologyTools.getInstance();
            repo.initialize();
            conn = repo.getConnection();
        }

        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?arguments ?state WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + artifactId + "> <http://www.semanticweb.org/sa#artifactHave> ?d . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#name> ?name . "
                    + "?d <http://www.semanticweb.org/sa#arguments> ?arguments . "
                    + "?d <http://www.semanticweb.org/sa#state> ?state "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {

                BindingSet bs = result.next();
                decisions.add(
                        new Decision(
                                bs.getValue("id").stringValue(),
                                bs.getValue("name").stringValue(),
                                bs.getValue("arguments").stringValue(),
                                bs.getValue("state").stringValue()
                        ));

            }

            if (decisions.isEmpty()) {
                decisions = null;
            }
        } finally {
            if (connection == null) {
                conn.close();

            }
        }

        return decisions;
    }

    public static List<Decision> selectAllDecisionsByResponsibleId(String responsibleId, RepositoryConnection connection) {
        List<Decision> decisions = new ArrayList();

        Repository repo = null;
        RepositoryConnection conn = null;
        if (connection != null) {
            conn = connection;
        } else {
            repo = OntologyTools.getInstance();
            repo.initialize();
            conn = repo.getConnection();
        }

        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?arguments ?state WHERE {\n"
                    + "?d <http://www.semanticweb.org/sa#decisionHave> <http://www.semanticweb.org/sa#" + responsibleId + "> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#name> ?name . "
                    + "?d <http://www.semanticweb.org/sa#arguments> ?arguments . "
                    + "?d <http://www.semanticweb.org/sa#state> ?state "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {

                BindingSet bs = result.next();
                decisions.add(
                        new Decision(
                                bs.getValue("id").stringValue(),
                                bs.getValue("name").stringValue(),
                                bs.getValue("arguments").stringValue(),
                                bs.getValue("state").stringValue()
                        ));

            }

            if (decisions.isEmpty()) {
                decisions = null;
            }
        } finally {
            if (connection == null) {
                conn.close();

            }
        }

        return decisions;
    }

    public static List<Decision> selectAllDecisionsBySoftwareArchitectureId(String id, RepositoryConnection connection) {
        List<Decision> decisions = new ArrayList();
        Repository repo = null;
        RepositoryConnection conn = null;
        if (connection != null) {
            conn = connection;
        } else {
            repo = OntologyTools.getInstance();
            repo.initialize();
            conn = repo.getConnection();
        }
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?arguments ?state WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#isaSetOf> ?d . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#name> ?name . "
                    + "?d <http://www.semanticweb.org/sa#arguments> ?arguments . "
                    + "?d <http://www.semanticweb.org/sa#state> ?state "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {

                BindingSet bs = result.next();
                decisions.add(
                        new Decision(
                                bs.getValue("id").stringValue(),
                                bs.getValue("name").stringValue(),
                                bs.getValue("arguments").stringValue(),
                                bs.getValue("state").stringValue()
                        ));
            }

            if (decisions.isEmpty()) {
                decisions = null;
            }
        } finally {
            if (connection == null) {
                conn.close();

            }
        }

        return decisions;
    }
    
    public static String haveSolution(String id) {
        boolean haveSolution = false;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        List<Alternative> l = AlternativeTransaction.selectAllAlternativesByDecisionId(id, conn);
        for(Alternative a : l) {
            if(!a.getRationale().trim().equals("")) {
                haveSolution = true;
                break;
            }
        }
        return "{\"value\":"+haveSolution+", \"id\":\""+id+"\"}";
    }

    public static String selectById(String id) {
        Decision decision = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?arguments ?state WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Decision> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#name> ?name . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#arguments> ?arguments . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#state> ?state "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
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
                decision.setMayHaveAssumptions(AssumptionTransaction.selectAllAssumptionsByDecisionId(id, conn));
            }
        } finally {
            conn.close();
        }
        return JsonFactory.toJson(decision);
    }

    public static String selectAll() {
        List<Decision> decisions = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?arguments ?state WHERE {\n"
                    + "?decision <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Decision> . "
                    + "?decision <http://www.semanticweb.org/sa#id> ?id . "
                    + "?decision <http://www.semanticweb.org/sa#name> ?name . "
                    + "?decision <http://www.semanticweb.org/sa#arguments> ?arguments . "
                    + "?decision <http://www.semanticweb.org/sa#state> ?state "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
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
                decisions.get(i).setMayHaveAssumptions(AssumptionTransaction.selectAllAssumptionsByDecisionId(decisions.get(i).getId(), conn));                
            }
        } finally {
            conn.close();

        }

        return JsonFactory.toJson(decisions);
    }
    
    public static void deleteContent(String content) {
        List<Decision> l = JsonFactory.fromJsonArray(selectAll(), Decision.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getArguments().contains(content)) {
                    a.setArguments(a.getArguments().replace(content, ""));
                    i++;
                }
                if (a.getName().contains(content)) {
                    a.setName(a.getName().replace(content, ""));
                    i++;
                }
                if (a.getState().contains(content)) {
                    a.setState(a.getState().replace(content, ""));
                    i++;
                }
                
                if (i > 0) {
                    update(a.getId(), a.getName(), a.getArguments(), a.getState());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

    public static void updateContent(String oc, String nc) {
        List<Decision> l = JsonFactory.fromJsonArray(selectAll(), Decision.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getArguments().contains(oc)) {
                    a.setArguments(a.getArguments().replace(oc, nc));
                    i++;
                }
                if (a.getName().contains(oc)) {
                    a.setName(a.getName().replace(oc, nc));
                    i++;
                }
                if (a.getState().contains(oc)) {
                    a.setState(a.getState().replace(oc, nc));
                    i++;
                }
                
                if (i > 0) {
                    update(a.getId(), a.getName(), a.getArguments(), a.getState());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

}
