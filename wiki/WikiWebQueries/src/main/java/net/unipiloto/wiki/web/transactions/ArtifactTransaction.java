package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Artifact;
import net.unipiloto.wiki.web.entities.Decision;
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

public class ArtifactTransaction {

    private static void insert(String id, String name, String description, List<Decision> decisions) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        ValueFactory factory = repo.getValueFactory();
        IRI subject = factory.createIRI("http://www.semanticweb.org/sa#" + id);
        IRI object = factory.createIRI("http://www.semanticweb.org/sa#Artifact");
        RepositoryConnection conn = repo.getConnection();
        try {
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#name"), factory.createLiteral(name));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#description"), factory.createLiteral(description));
            if (decisions != null) {
                for (Decision decision : decisions) {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#artifactHave"), factory.createIRI("http://www.semanticweb.org/sa#" + decision.getId()));
                }
            }
            conn.commit();
        } catch (Exception ex) {
            conn.rollback();
        } finally {
            conn.close();

        }

    }

    public static void update(String id, String name, String description) throws IOException, URISyntaxException {
        Artifact artifact = JsonFactory.fromJson(selectById(id), Artifact.class);
        delete(id);
        insert(
                id,
                name.equals("-_-") ? artifact.getName() : name,
                description.equals("-_-") ? artifact.getDescription() : description,
                artifact.getHaveDecisions());
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

    public static String selectById(String id) {
        Artifact artifact = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?description WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Artifact> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id ."
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#name> ?name ."
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#description> ?description "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                artifact = new Artifact(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue(),
                        bs.getValue("description").stringValue()
                );

                artifact.setHaveDecisions(DecisionTransaction.selectAllDecisionsByArtifactId(artifact.getId(), conn));
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(artifact);
    }

    public static String selectAll() {
        List<Artifact> artifacts = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?description WHERE {\n"
                    + "?artifact <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Artifact> . "
                    + "?artifact <http://www.semanticweb.org/sa#id> ?id . "
                    + "?artifact <http://www.semanticweb.org/sa#name> ?name ."
                    + "?artifact <http://www.semanticweb.org/sa#description> ?description "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate(); //sdsdsdds;
            while (result.hasNext()) {
                BindingSet bs = result.next();

                artifacts.add(new Artifact(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue(),
                        bs.getValue("description").stringValue()
                ));
                int i = artifacts.size() - 1;
                artifacts.get(i).setHaveDecisions(DecisionTransaction.selectAllDecisionsByArtifactId(artifacts.get(i).getId(), conn));

            }
        } finally {
            conn.close();

        }

        return JsonFactory.toJson(artifacts);

    }

    public static List<Artifact> selectByQAId(String id, RepositoryConnection connection) {
        List<Artifact> artifacts = new ArrayList();

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
                    "SELECT DISTINCT ?id ?name ?description WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#triggerAn> ?d . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#name> ?name ."
                    + "?d <http://www.semanticweb.org/sa#description> ?description "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {

                BindingSet bs = result.next();
                artifacts.add(
                        new Artifact(
                                bs.getValue("id").stringValue(),
                                bs.getValue("name").stringValue(),
                                bs.getValue("description").stringValue()
                        ));
                int i = artifacts.size() - 1;
                artifacts.get(i).setHaveDecisions(DecisionTransaction.selectAllDecisionsByArtifactId(artifacts.get(i).getId(), conn));
            }

            if (artifacts.isEmpty()) {
                artifacts = null;
            }
        } finally {
            if (connection == null) {
                conn.close();

            }
        }

        return artifacts;
    }

    public static List<Artifact> getAllArtifactsBySoftwareArchitectureId(String id, RepositoryConnection connection) {
        List<Artifact> artifacts = new ArrayList();

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
                    "SELECT DISTINCT ?id ?name ?description WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#composeBy> ?d . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#name> ?name ."
                    + "?d <http://www.semanticweb.org/sa#description> ?description "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {

                BindingSet bs = result.next();
                artifacts.add(
                        new Artifact(
                                bs.getValue("id").stringValue(),
                                bs.getValue("name").stringValue(),
                                bs.getValue("description").stringValue()
                        ));
                int i = artifacts.size() - 1;
                artifacts.get(i).setHaveDecisions(DecisionTransaction.selectAllDecisionsByArtifactId(artifacts.get(i).getId(), conn));
            }

            if (artifacts.isEmpty()) {
                artifacts = null;
            }
        } finally {
            if (connection == null) {
                conn.close();

            }
        }

        return artifacts;
    }

    public static void deleteContent(String content) {
        List<Artifact> l = JsonFactory.fromJsonArray(selectAll(), Artifact.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getDescription().contains(content)) {
                    a.setDescription(a.getDescription().replace(content, ""));
                    i++;
                }
                if (a.getName().contains(content)) {
                    a.setName(a.getName().replace(content, ""));
                    i++;
                }
                if (i > 0) {
                    update(a.getId(), a.getName(), a.getDescription());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

    public static void updateContent(String oc, String nc) {
        List<Artifact> l = JsonFactory.fromJsonArray(selectAll(), Artifact.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getDescription().contains(oc)) {
                    a.setDescription(a.getDescription().replace(oc, nc));
                    i++;
                }
                if (a.getName().contains(oc)) {
                    a.setName(a.getName().replace(oc, nc));
                    i++;
                }
                if (i > 0) {
                    update(a.getId(), a.getName(), a.getDescription());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }
}
