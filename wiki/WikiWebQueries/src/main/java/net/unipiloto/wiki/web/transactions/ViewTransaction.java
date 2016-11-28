package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Decision;
import net.unipiloto.wiki.web.entities.View;
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

public class ViewTransaction {

    private static void insert(String id, String name, String content, String type, List<Decision> decisions) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#" + id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#" + type);
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#name"), factory.createLiteral(name));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#content"), factory.createLiteral(content));
            if (decisions != null) {
                for (Decision decision : decisions) {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#relatedDecisions"), factory.createIRI("http://www.semanticweb.org/sa#" + decision.getId()));
                }
            }
            conn.commit();
        } catch (Exception ex) {
            conn.rollback();
        } finally {
            conn.close();

        }

    }

    public static void update(String id, String name, String content) throws IOException, URISyntaxException {
        View view = JsonFactory.fromJson(selectById(id), View.class);
        delete(id);
        insert(
                id,
                name.equals("-_-") ? view.getName() : name,
                content.equals("-_-") ? view.getContent() : content,
                view.getType(),
                view.getRelatedDecisions() == null ? null : view.getRelatedDecisions());
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

    public static String selectAll() {
        List<String> list = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT ?type\n"
                    + "WHERE { \n"
                    + "	?type <http://www.w3.org/2000/01/rdf-schema#subClassOf> <http://www.semanticweb.org/sa#Views>\n"
                    + "} ORDER BY ?type"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                list.add(bs.getValue("type").toString().split("#")[1]);
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(list);
    }

    public static String selectAllViews() {
        List<View> list = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT ?id ?name ?content ?type\n"
                    + "WHERE { \n"
                    + "      	?type <http://www.w3.org/2000/01/rdf-schema#subClassOf> <http://www.semanticweb.org/sa#Views> .\n"
                    + "		?view a ?type . \n"
                    + "		?view <http://www.semanticweb.org/sa#id> ?id .\n"
                    + "		OPTIONAL {?view <http://www.semanticweb.org/sa#name> ?name} .\n"
                    + "		?view <http://www.semanticweb.org/sa#content> ?content \n"
                    + "} ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            int i = 0;
            while (result.hasNext()) {
                BindingSet bs = result.next();
                list.add(new View(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name") == null ? "" : bs.getValue("name").stringValue(),
                        bs.getValue("content").stringValue(),
                        bs.getValue("type").stringValue().split("#")[1]
                ));
                list.get(i).setRelatedDecisions(
                        DecisionTransaction.selectAllDecisionsByViewID(list.get(i).getId(), conn
                        ));
                i++;
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(list);
    }

    public static String selectByType(String type) {
        List<View> list = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT ?id ?name ?content\n"
                    + "WHERE { \n"
                    + "	?view a <http://www.semanticweb.org/sa#" + type + "> .\n"
                    + "	?view <http://www.semanticweb.org/sa#id> ?id .\n"
                    + "	OPTIONAL {?view <http://www.semanticweb.org/sa#name> ?name} .\n"
                    + "	?view <http://www.semanticweb.org/sa#content> ?content .\n"
                    + "} ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            int i = 0;
            while (result.hasNext()) {
                BindingSet bs = result.next();
                list.add(new View(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name") == null ? "" : bs.getValue("name").stringValue(),
                        bs.getValue("content").stringValue(),
                        type
                ));
                list.get(i).setRelatedDecisions(
                        DecisionTransaction.selectAllDecisionsByViewID(list.get(i).getId(), conn
                        ));
                i++;

            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(list);
    }

    public static String selectById(String id) {
        View view = null;
        String json = "{}";
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT ?id ?name ?content ?type \n"
                    + "WHERE { \n"
                    + "     ?type <http://www.w3.org/2000/01/rdf-schema#subClassOf> <http://www.semanticweb.org/sa#Views> .\n"
                    + "     <http://www.semanticweb.org/sa#" + id + "> a ?type .\n"
                    + "     <http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id .\n"
                    + "     OPTIONAL {<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#name> ?name} .\n"
                    + "     <http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#content> ?content .\n"
                    + "} ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                view = new View(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name") == null ? "" : bs.getValue("name").stringValue(),
                        bs.getValue("content").stringValue(),
                        bs.getValue("type").stringValue().split("#")[1]
                );
                view.setRelatedDecisions(DecisionTransaction.selectAllDecisionsByViewID(id, conn));
            }
            if (view != null) {
                json = JsonFactory.toJson(view);
            }
        } finally {
            conn.close();
        }

        return json;
    }

    public static void deleteContent(String content) {
        List<View> l = JsonFactory.fromJsonArray(selectAll(), View.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getName().contains(content)) {
                    a.setName(a.getName().replace(content, ""));
                    i++;
                }
                if (a.getContent().contains(content)) {
                    a.setContent(a.getContent().replace(content, ""));
                    i++;
                }
                if (i > 0) {
                    update(a.getId(), a.getName(), a.getContent());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

    public static void updateContent(String oc, String nc) {
        List<View> l = JsonFactory.fromJsonArray(selectAll(), View.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getName().contains(oc)) {
                    a.setName(a.getName().replace(oc, nc));
                    i++;
                }
                if (a.getContent().contains(oc)) {
                    a.setContent(a.getContent().replace(oc, nc));
                    i++;
                }
                if (i > 0) {
                    update(a.getId(), a.getName(), a.getContent());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

}
