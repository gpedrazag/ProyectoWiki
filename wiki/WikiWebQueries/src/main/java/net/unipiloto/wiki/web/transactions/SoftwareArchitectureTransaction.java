package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Artifact;
import net.unipiloto.wiki.web.entities.Decision;
import net.unipiloto.wiki.web.entities.SoftwareArchitecture;
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

public class SoftwareArchitectureTransaction {

    private static void insert(String id, String name, String description, List<Artifact> relatedArtifacts, List<Decision> decisionsRelated) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#" + id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#SoftwareArchitecture");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#name"), factory.createLiteral(name));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#description"), factory.createLiteral(description));
            if (relatedArtifacts != null) {
                for (Artifact s : relatedArtifacts) {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#composeBy"), factory.createIRI("http://www.semanticweb.org/sa#" + s.getId()));
                }
            }
            if (decisionsRelated != null) {
                for (Decision s : decisionsRelated) {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#isaSetOf"), factory.createIRI("http://www.semanticweb.org/sa#" + s.getId()));
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
        SoftwareArchitecture sa = JsonFactory.fromJson(selectById(id), SoftwareArchitecture.class);
        delete(id);
        insert(
                id, 
                name.equals("-_-")?sa.getName():name, 
                description.equals("-_-")?sa.getDescription():description, 
                sa.getRelatedArtifacts(), 
                sa.getRelatedDecisions());
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
        SoftwareArchitecture sa = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?description WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#SoftwareArchitecture> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#description> ?description . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#name> ?name "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                sa = new SoftwareArchitecture(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue(),
                        bs.getValue("description").stringValue()
                );

                sa.setRelatedArtifacts(ArtifactTransaction.getAllArtifactsBySoftwareArchitectureId(id, conn));
                sa.setRelatedDecisions(DecisionTransaction.selectAllDecisionsBySoftwareArchitectureId(id, conn));
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(sa);
    }

    public static String selectAll() {
        List<SoftwareArchitecture> sas = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?description ?name WHERE {\n"
                    + "?sa <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#SoftwareArchitecture> . "
                    + "?sa <http://www.semanticweb.org/sa#id> ?id . "
                    + "?sa <http://www.semanticweb.org/sa#description> ?description . "
                    + "?sa <http://www.semanticweb.org/sa#name> ?name "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();

                sas.add(new SoftwareArchitecture(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue(),
                        bs.getValue("description").stringValue()
                ));
                int i = sas.size() - 1;
                sas.get(i).setRelatedDecisions(DecisionTransaction.selectAllDecisionsBySoftwareArchitectureId(sas.get(i).getId(), conn));
                sas.get(i).setRelatedArtifacts(ArtifactTransaction.getAllArtifactsBySoftwareArchitectureId(sas.get(i).getId(), conn));

            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(sas);

    }
    
    public static void deleteContent(String content) {
        List<SoftwareArchitecture> l = JsonFactory.fromJsonArray(selectAll(), SoftwareArchitecture.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getName().contains(content)) {
                    a.setName(a.getName().replace(content, ""));
                    i++;
                }
                if (a.getDescription().contains(content)) {
                    a.setDescription(a.getDescription().replace(content, ""));
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
        List<SoftwareArchitecture> l = JsonFactory.fromJsonArray(selectAll(), SoftwareArchitecture.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getName().contains(oc)) {
                    a.setName(a.getName().replace(oc, nc));
                    i++;
                }
                if (a.getDescription().contains(oc)) {
                    a.setDescription(a.getDescription().replace(oc, nc));
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
