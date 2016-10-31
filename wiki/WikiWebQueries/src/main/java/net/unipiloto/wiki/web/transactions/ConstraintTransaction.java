package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Constraint;
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

public class ConstraintTransaction {

    private static void insert(String id, String name, String description, String rationale, String keyword) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#" + id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Constraint");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#name"), factory.createLiteral(name));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#description"), factory.createLiteral(description));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#rationale"), factory.createLiteral(rationale));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#keyword"), factory.createLiteral(keyword));
            conn.commit();
        } catch (Exception ex) {
            conn.rollback();
        } finally {
            conn.close();

        }

    }

    public static void update(String id, String name, String description, String rationale, String keyword) throws IOException, URISyntaxException {
        Constraint constraint = JsonFactory.fromJson(selectById(id), Constraint.class);
        delete(id);
        insert(
                id,
                name.equals("-_-") ? constraint.getName() : name,
                description.equals("-_-") ? constraint.getDescription() : description,
                rationale.equals("-_-") ? constraint.getRationale() : rationale,
                keyword.equals("-_-") ? constraint.getKeyword() : keyword);

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

    public static List<Constraint> selectAllConstraintByDecisionId(String id, RepositoryConnection connection) {
        List<Constraint> constraints = new ArrayList();
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
                    "SELECT DISTINCT ?id ?name ?description ?rationale ?keyword WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#decisionMayHave> ?d . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#name> ?name . "
                    + "?d <http://www.semanticweb.org/sa#description> ?description . "
                    + "?d <http://www.semanticweb.org/sa#rationale> ?rationale . "
                    + "?d <http://www.semanticweb.org/sa#keyword> ?keyword "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {

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

            if (constraints.isEmpty()) {
                constraints = null;
            }
        } finally {
            if (connection == null) {
                conn.close();

            }
        }

        return constraints;
    }

    public static String selectById(String id) {
        Constraint constraint = null;
        Repository repo = OntologyTools.getInstance();;
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?description ?rationale ?keyword WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Constraint> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#name> ?name . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#description> ?description . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#rationale> ?rationale . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#keyword> ?keyword "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                constraint = new Constraint(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue(),
                        bs.getValue("description").stringValue(),
                        bs.getValue("rationale").stringValue(),
                        bs.getValue("keyword").stringValue()
                );
            }
        } finally {
            conn.close();

        }

        return JsonFactory.toJson(constraint);
    }

    public static String selectAll() {
        List<Constraint> constraints = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?description ?rationale ?keyword WHERE {\n"
                    + "?constraint <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Constraint> . "
                    + "?constraint <http://www.semanticweb.org/sa#id> ?id . "
                    + "?constraint <http://www.semanticweb.org/sa#name> ?name . "
                    + "?constraint <http://www.semanticweb.org/sa#description> ?description . "
                    + "?constraint <http://www.semanticweb.org/sa#rationale> ?rationale . "
                    + "?constraint <http://www.semanticweb.org/sa#keyword> ?keyword "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                constraints.add(new Constraint(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue(),
                        bs.getValue("description").stringValue(),
                        bs.getValue("rationale").stringValue(),
                        bs.getValue("keyword").stringValue()
                ));
            }
        } finally {
            conn.close();

        }

        return JsonFactory.toJson(constraints);
    }
    
    public static void deleteContent(String content) {
        List<Constraint> l = JsonFactory.fromJsonArray(selectAll(), Constraint.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getDescription().contains(content)) {
                    a.setDescription(a.getDescription().replace(content, ""));
                    i++;
                }
                if (a.getKeyword().contains(content)) {
                    a.setKeyword(a.getKeyword().replace(content, ""));
                    i++;
                }
                if (a.getName().contains(content)) {
                    a.setName(a.getName().replace(content, ""));
                    i++;
                }
                if (a.getRationale().contains(content)) {
                    a.setRationale(a.getRationale().replace(content, ""));
                    i++;
                }
                if (i > 0) {
                    update(a.getId(), a.getName(), a.getDescription(), a.getRationale(), a.getKeyword());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

    public static void updateContent(String oc, String nc) {
         List<Constraint> l = JsonFactory.fromJsonArray(selectAll(), Constraint.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getDescription().contains(oc)) {
                    a.setDescription(a.getDescription().replace(oc, nc));
                    i++;
                }
                if (a.getKeyword().contains(oc)) {
                    a.setKeyword(a.getKeyword().replace(oc, nc));
                    i++;
                }
                if (a.getName().contains(oc)) {
                    a.setName(a.getName().replace(oc, nc));
                    i++;
                }
                if (a.getRationale().contains(oc)) {
                    a.setRationale(a.getRationale().replace(oc, nc));
                    i++;
                }
                if (i > 0) {
                    update(a.getId(), a.getName(), a.getDescription(), a.getRationale(), a.getKeyword());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }
}
