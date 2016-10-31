package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
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

public class ResponsibleTransaction {

    private static void insert(String id, String name, List<Decision> decisions) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#" + id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Responsible");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#name"), factory.createLiteral(name));
            if (decisions != null) {
                for (Decision decision : decisions) {
                    conn.add(factory.createIRI("http://www.semanticweb.org/sa#" + decision.getId()), factory.createIRI("http://www.semanticweb.org/sa#decisionHave"), subject);
                }
            }
            conn.commit();
        } catch (Exception ex) {
            conn.rollback();
        } finally {
            conn.close();

        }

    }

    public static void update(String id, String name) throws IOException, URISyntaxException {
        Responsible responsible = JsonFactory.fromJson(selectById(id), Responsible.class);
        delete(id);
        insert(
                id, 
                name.equals("-_-")?responsible.getName():name, 
                responsible.getDecisions());
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

    public static List<Responsible> selectAllResponsiblesByDecisionId(String id, RepositoryConnection connection) {
        List<Responsible> responsibles = new ArrayList();
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
                    "SELECT DISTINCT ?id ?name WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#decisionHave> ?d . "
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Responsible> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#name> ?name "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {

                BindingSet bs = result.next();
                responsibles.add(
                        new Responsible(
                                bs.getValue("id").stringValue(),
                                bs.getValue("name").stringValue()
                        ));
            }

            if (responsibles.isEmpty()) {
                responsibles = null;
            }
        } finally {
            if (connection == null) {
                conn.close();

            }
        }

        return responsibles;
    }

    public static String selectById(String id) {
        Responsible responsible = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Responsible> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#name> ?name "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                responsible = new Responsible(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue()
                );
            }
            responsible.setDecisions(DecisionTransaction.selectAllDecisionsByResponsibleId(id, conn));
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(responsible);
    }

    public static String selectAll() {
        List<Responsible> responsibles = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name WHERE {\n"
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Responsible> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#name> ?name "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();

                responsibles.add(new Responsible(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue()
                ));

                int i = responsibles.size() - 1;
                responsibles.get(i).setDecisions(DecisionTransaction.selectAllDecisionsByResponsibleId(responsibles.get(i).getId(), conn));
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(responsibles);

    }
    
    public static void deleteContent(String content) {
        List<Responsible> l = JsonFactory.fromJsonArray(selectAll(), Responsible.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getName().contains(content)) {
                    a.setName(a.getName().replace(content, ""));
                    i++;
                }
                
                if (i > 0) {
                    update(a.getId(), a.getName());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

    public static void updateContent(String oc, String nc) {
        List<Responsible> l = JsonFactory.fromJsonArray(selectAll(), Responsible.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getName().contains(oc)) {
                    a.setName(a.getName().replace(oc, nc));
                    i++;
                }
                
                if (i > 0) {
                    update(a.getId(), a.getName());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }
}
