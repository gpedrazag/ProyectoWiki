package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.entities.Alternative;
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

public class AlternativeTransaction {

    private static void insert(String id, String rationale, String description, String evaluationId) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#" + id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Alternative");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#description"), factory.createLiteral(description));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#rationale"), factory.createLiteral(rationale));
            if (!evaluationId.equals("")) {
                conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#alternativeLinkTo"), factory.createIRI("http://www.semanticweb.org/sa#" + evaluationId));
            }
            conn.commit();
        } catch (Exception ex) {
            conn.rollback();
        } finally {
            conn.close();

        }

    }

    public static void update(String id, String rationale, String description) throws IOException, URISyntaxException {
        Alternative alternative = JsonFactory.fromJson(selectById(id), Alternative.class);
        delete(id);
        insert(
                id,
                rationale.equals("-_-") ? alternative.getRationale() : rationale,
                description.equals("-_-") ? alternative.getDescription() : description,
                alternative.getHaveEvaluation() == null ? "" : alternative.getHaveEvaluation().getId());
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

    public static List<Alternative> selectAllAlternativesByDecisionId(String id, RepositoryConnection connection) {
        List<Alternative> concerns = new ArrayList();
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
                    "SELECT DISTINCT ?id ?description ?rationale WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#decisionHave> ?d . "
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Alternative> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#description> ?description . "
                    + "?d <http://www.semanticweb.org/sa#rationale> ?rationale "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                concerns.add(
                        new Alternative(
                                bs.getValue("id").stringValue(),
                                bs.getValue("rationale").stringValue(),
                                bs.getValue("description").stringValue()
                        ));
            }

            if (concerns.isEmpty()) {
                concerns = null;
            }
        } finally {
            if (connection == null) {
                conn.close();

            }
        }

        return concerns;
    }

    public static List<Alternative> selectAllAlternativesByEvalationId(String id, RepositoryConnection connection) {
        List<Alternative> concerns = new ArrayList();
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
                    "SELECT DISTINCT ?id ?description ?rationale WHERE {"
                    + "?d  <http://www.semanticweb.org/sa#alternativeLinkTo> <http://www.semanticweb.org/sa#" + id + "> . "
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Alternative> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#description> ?description . "
                    + "?d <http://www.semanticweb.org/sa#rationale> ?rationale "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                concerns.add(
                        new Alternative(
                                bs.getValue("id").stringValue(),
                                bs.getValue("rationale").stringValue(),
                                bs.getValue("description").stringValue()
                        ));
            }

            if (concerns.isEmpty()) {
                concerns = null;
            }
        } finally {
            if (connection == null) {
                conn.close();

            }
        }

        return concerns;
    }

    public static String selectById(String id) {
        Alternative alternative = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?description ?rationale ?did WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Alternative> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id ."
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#description> ?description . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#rationale> ?rationale . "
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Decision> . "
                    + "?d <http://www.semanticweb.org/sa#decisionHave> <http://www.semanticweb.org/sa#" + id + "> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?did "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                alternative = new Alternative(
                        bs.getValue("id").stringValue(),
                        bs.getValue("rationale").stringValue(),
                        bs.getValue("description").stringValue(),
                        bs.getValue("did").stringValue()
                );
                alternative.setHaveEvaluation(EvaluationTransaction.selectByAlternativeId(id, conn));
            }
        } finally {
            conn.close();

        }

        return JsonFactory.toJson(alternative);
    }

    public static String selectAll() {
        List<Alternative> alternatives = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?description ?rationale ?did WHERE {\n"
                    + "?alternative <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Alternative> . "
                    + "?alternative <http://www.semanticweb.org/sa#id> ?id ."
                    + "?alternative <http://www.semanticweb.org/sa#description> ?description . "
                    + "?alternative <http://www.semanticweb.org/sa#rationale> ?rationale . "
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Decision> . "
                    + "?d <http://www.semanticweb.org/sa#decisionHave> ?alternative . "
                    + "?d <http://www.semanticweb.org/sa#id> ?did "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                alternatives.add(new Alternative(
                        bs.getValue("id").stringValue(),
                        bs.getValue("rationale").stringValue(),
                        bs.getValue("description").stringValue(),
                        bs.getValue("did").stringValue()
                ));
                int i = alternatives.size() - 1;
                alternatives.get(i).setHaveEvaluation(EvaluationTransaction.selectByAlternativeId(alternatives.get(i).getId(), conn));
            }
        } finally {
            conn.close();

        }

        return JsonFactory.toJson(alternatives);
    }

    public static void deleteContent(String content) {
        List<Alternative> alternatives = JsonFactory.fromJsonArray(selectAll(), Alternative.class);
        alternatives.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getDescription().contains(content)) {
                    a.setDescription(a.getDescription().replace(content, ""));
                    i++;
                }
                if (a.getRationale().contains(content)) {
                    a.setRationale(a.getRationale().replace(content, ""));
                    i++;
                }
                if (i > 0) {
                    update(a.getId(), a.getRationale(), a.getDescription());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

    public static void updateContent(String oc, String nc) {
        List<Alternative> alternatives = JsonFactory.fromJsonArray(selectAll(), Alternative.class);
        alternatives.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getDescription().contains(oc)) {
                    a.setDescription(a.getDescription().replace(oc, nc));
                    i++;
                }
                if (a.getRationale().contains(oc)) {
                    a.setRationale(a.getRationale().replace(oc, nc));
                    i++;
                }
                if (i > 0) {
                    update(a.getId(), a.getRationale(), a.getDescription());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

}
