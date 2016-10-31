package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Assumption;
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

public class AssumptionTransaction {

    private static void insert(String id, String description, String source) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#" + id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Assumption");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#description"), factory.createLiteral(description));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#source"), factory.createLiteral(source));
            conn.commit();

        } catch (Exception ex) {
            conn.rollback();
        } finally {
            conn.close();

        }

    }

    public static void update(String id, String description, String source) throws IOException, URISyntaxException {
        Assumption assumption = JsonFactory.fromJson(selectById(id), Assumption.class);
        delete(id);
        insert(
            id, 
            description.equals("-_-")?assumption.getDescription():description, 
            source.equals("-_-")?assumption.getSource():source);
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
            conn.prepareUpdate(
                    "DELETE { ?d1 ?p <http://www.semanticweb.org/sa#" + id + "> }\n"
                    + "WHERE { ?d1 ?p <http://www.semanticweb.org/sa#" + id + "> }"
            ).execute();
        } catch (Exception ex) {
            conn.rollback();
        } finally {
            conn.close();

        }
    }

    public static List<Assumption> selectAllAssumptionsByDecisionId(String id, RepositoryConnection connection) {
        List<Assumption> assumptions = new ArrayList();
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
                    "SELECT DISTINCT ?id ?description ?source WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#decisionMayHave> ?d . "
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Assumption> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#description> ?description . "
                    + "?d <http://www.semanticweb.org/sa#source> ?source "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                assumptions.add(
                        new Assumption(
                                bs.getValue("id").stringValue(),
                                bs.getValue("description").stringValue(),
                                bs.getValue("source").stringValue()
                        ));
            }

            if (assumptions.isEmpty()) {
                assumptions = null;
            }
        } finally {
            if (connection == null) {
                conn.close();

            }
        }

        return assumptions;
    }

    public static String selectById(String id) {
        Assumption assumption = null;
        Repository repo = OntologyTools.getInstance();;
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?description ?source WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Assumption> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id ."
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#description> ?description . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#source> ?source "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                assumption = new Assumption(
                        bs.getValue("id").stringValue(),
                        bs.getValue("description").stringValue(),
                        bs.getValue("source").stringValue()
                );
            }
        } finally {
            conn.close();

        }

        return JsonFactory.toJson(assumption);
    }

    public static String selectAll() {
        List<Assumption> assumptions = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        try (RepositoryConnection conn = repo.getConnection()) {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?description ?source WHERE {\n"
                    + "?assumption <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Assumption> . "
                    + "?assumption <http://www.semanticweb.org/sa#id> ?id ."
                    + "?assumption <http://www.semanticweb.org/sa#description> ?description . "
                    + "?assumption <http://www.semanticweb.org/sa#source> ?source "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                assumptions.add(new Assumption(
                        bs.getValue("id").stringValue(),
                        bs.getValue("description").stringValue(),
                        bs.getValue("source").stringValue()
                ));
            }
        }

        return JsonFactory.toJson(assumptions);
    }
    
    public static void deleteContent(String content) {
        List<Assumption> l = JsonFactory.fromJsonArray(selectAll(), Assumption.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getDescription().contains(content)) {
                    a.setDescription(a.getDescription().replace(content, ""));
                    i++;
                }
                if (a.getSource().contains(content)) {
                    a.setSource(a.getSource().replace(content, ""));
                    i++;
                }
                if (i > 0) {
                    update(a.getId(),a.getDescription(), a.getSource());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

    public static void updateContent(String oc, String nc) {
        List<Assumption> l = JsonFactory.fromJsonArray(selectAll(), Assumption.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getDescription().contains(oc)) {
                    a.setDescription(a.getDescription().replace(oc, nc));
                    i++;
                }
                if (a.getSource().contains(oc)) {
                    a.setSource(a.getSource().replace(oc, nc));
                    i++;
                }
                if (i > 0) {
                    update(a.getId(),a.getDescription(), a.getSource());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

}
