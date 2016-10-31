package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Criteria;
import net.unipiloto.wiki.web.entities.Evaluation;
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

public class CriteriaTransaction {

    private static void insert(String id, String keyword, String description, List<Evaluation> linkedEvaluations) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#" + id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Criteria");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#keyword"), factory.createLiteral(keyword));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#description"), factory.createLiteral(description));
            if (linkedEvaluations != null) {
                for (Evaluation s : linkedEvaluations) {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#criteriaLinkTo"), factory.createIRI("http://www.semanticweb.org/sa#" + s.getId()));
                }
            }
            conn.commit();
        } catch (Exception ex) {
            conn.rollback();
        } finally {
            conn.close();

        }

    }

    public static void update(String id, String keyword, String description) throws IOException, URISyntaxException {
        Criteria criteria = JsonFactory.fromJson(selectById(id), Criteria.class);
        delete(id);
        insert(
            id, 
            keyword.equals("-_-")?criteria.getKeyword():keyword, 
            description.equals("-_-")?criteria.getDescription():description, 
            criteria.getLinkedEvaluations());
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

    public static List<Criteria> selectAllCriteriasByDecisionId(String id, RepositoryConnection connection) {
        List<Criteria> criterias = new ArrayList();
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
                    "SELECT DISTINCT ?id ?description ?keyword WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#decisionHave> ?d . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#description> ?description . "
                    + "?d <http://www.semanticweb.org/sa#keyword> ?keyword "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {

                BindingSet bs = result.next();
                criterias.add(
                        new Criteria(
                                bs.getValue("id").stringValue(),
                                bs.getValue("description").stringValue(),
                                bs.getValue("keyword").stringValue()
                        ));

                int i = criterias.size() - 1;
                criterias.get(i).setLinkedEvaluations(EvaluationTransaction.selectByCriteriaId(criterias.get(i).getId(), conn));
            }

            if (criterias.isEmpty()) {
                criterias = null;
            }
        } finally {
            if (connection == null) {
                conn.close();

            }
        }
        return criterias;
    }

    public static String selectById(String id) {
        Criteria criteria = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?description ?keyword WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Criteria> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#description> ?description . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#keyword> ?keyword "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                criteria = new Criteria(
                        bs.getValue("id").stringValue(),
                        bs.getValue("description").stringValue(),
                        bs.getValue("keyword").stringValue()
                );

                criteria.setLinkedEvaluations(EvaluationTransaction.selectByCriteriaId(id, conn));
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(criteria);
    }

    public static String selectAll() {
        List<Criteria> criterias = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?description ?keyword WHERE {\n"
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Criteria> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#description> ?description . "
                    + "?d <http://www.semanticweb.org/sa#keyword> ?keyword "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate(); //sdsdsdds;
            while (result.hasNext()) {
                BindingSet bs = result.next();

                criterias.add(new Criteria(
                        bs.getValue("id").stringValue(),
                        bs.getValue("description").stringValue(),
                        bs.getValue("keyword").stringValue()
                ));
                int i = criterias.size() - 1;
                criterias.get(i).setLinkedEvaluations(EvaluationTransaction.selectByCriteriaId(criterias.get(i).getId(), conn));
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(criterias);
    }
    
    public static void deleteContent(String content) {
        List<Criteria> l = JsonFactory.fromJsonArray(selectAll(), Criteria.class);
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
                
                if (i > 0) {
                    update(a.getId(), a.getKeyword(), a.getDescription());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

    public static void updateContent(String oc, String nc) {
        List<Criteria> l = JsonFactory.fromJsonArray(selectAll(), Criteria.class);
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
                
                if (i > 0) {
                    update(a.getId(), a.getKeyword(), a.getDescription());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }
}
