package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Artifact;
import net.unipiloto.wiki.web.entities.QualityAttribute;
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

public class QualityAttributeTransaction {

    private static void insert(String id, String name, String description, List<Artifact> triggerArtifacts) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#" + id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#QualityAttributeStage");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#name"), factory.createLiteral(name));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#description"), factory.createLiteral(description));
            if (triggerArtifacts != null) {
                for (Artifact s : triggerArtifacts) {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#triggerAn"), factory.createIRI("http://www.semanticweb.org/sa#" + s.getId()));
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
        QualityAttribute qa = JsonFactory.fromJson(selectById(id), QualityAttribute.class);
        delete(id);
        insert(
                id, 
                name.equals("-_-")?qa.getName():name, 
                description.equals("-_-")?qa.getDescription():description, 
                qa.getTriggerArtifacts());

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

    public static List<QualityAttribute> selectQAByConcenrId(String id, RepositoryConnection connection) {
        List<QualityAttribute> qas = new ArrayList();
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
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#determinedBy> ?d . "
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#QualityAttributeStage> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#name> ?name . "
                    + "?d <http://www.semanticweb.org/sa#description> ?description "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                qas.add(
                        new QualityAttribute(
                                bs.getValue("id").stringValue(),
                                bs.getValue("name").stringValue(),
                                bs.getValue("description").stringValue()
                        ));
                int i = qas.size() - 1;
                qas.get(i).setTriggerArtifacts(ArtifactTransaction.selectByQAId(qas.get(i).getId(), connection));
            }

            if (qas.isEmpty()) {
                qas = null;
            }
        } finally {
            if (connection == null) {
                conn.close();

            }
        }

        return qas;
    }

    public static String selectById(String id) {
        QualityAttribute fr = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?description WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#QualityAttributeStage> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#name> ?name . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#description> ?description "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                fr = new QualityAttribute(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue(),
                        bs.getValue("description").stringValue()
                );
                fr.setTriggerArtifacts(ArtifactTransaction.selectByQAId(id, conn));
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(fr);
    }

    public static String selectAll() {
        List<QualityAttribute> qas = new ArrayList();
        Repository repo = null;
        repo = OntologyTools.getInstance();
        repo.initialize();

        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?description WHERE {"
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#QualityAttributeStage> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#name> ?name . "
                    + "?d <http://www.semanticweb.org/sa#description> ?description " 
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {

                BindingSet bs = result.next();
                qas.add(new QualityAttribute(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue(),
                        bs.getValue("description").stringValue()
                ));

                int i = qas.size() - 1;
                qas.get(i).setTriggerArtifacts(ArtifactTransaction.selectByQAId(qas.get(i).getId(), conn));

            }

            if (qas.isEmpty()) {
                qas = null;
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(qas);
    }
    
    public static void deleteContent(String content) {
        List<QualityAttribute> l = JsonFactory.fromJsonArray(selectAll(), QualityAttribute.class);
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
        List<QualityAttribute> l = JsonFactory.fromJsonArray(selectAll(), QualityAttribute.class);
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
