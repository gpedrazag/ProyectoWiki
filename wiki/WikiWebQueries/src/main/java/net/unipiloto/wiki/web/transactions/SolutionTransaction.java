package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Solution;
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

public class SolutionTransaction {

    private static void insert(String id, String rationale) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#" + id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Solution");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#rationale"), factory.createLiteral(rationale));
            conn.commit();
        } finally {
            conn.close();

        }

    }

    public static void update(String id, String rationale) throws IOException, URISyntaxException {
        Solution solution = JsonFactory.fromJson(selectById(id), Solution.class);
        delete(id);
        insert(
                id, 
                rationale.equals("-_-")?solution.getRationale():rationale);
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

    public static Solution selectSolutionByDecisionId(String id, RepositoryConnection connection) {
        Solution solution = null;
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
                    "SELECT DISTINCT ?id ?rationale WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#decisionHave> ?d . "
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Alternative> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#rationale> ?rationale . "
                    + "FILTER NOT EXISTS { FILTER  (?rationale = str(\"\") ) } }"
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {

                BindingSet bs = result.next();
                solution = new Solution(
                        bs.getValue("id").stringValue(),
                        "",
                        ""
                );
                solution.setRationale(bs.getValue("rationale").stringValue());
            }
        } finally {
            if (connection == null) {
                conn.close();

            }
        }

        return solution;
    }

    public static String selectById(String id) {
        Solution solution = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?rationale WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Alternative> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#rationale> ?rationale "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                solution = new Solution(
                        bs.getValue("id").stringValue(),
                        "",
                        ""
                );
                solution.setRationale(bs.getValue("rationale").stringValue());
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(solution);
    }

    public static String selectAll() {
        List<Solution> solutions = new ArrayList();
        Repository repo = null;
        repo = OntologyTools.getInstance();
        repo.initialize();

        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?rationale WHERE {"
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Alternative> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#rationale> ?rationale . "
                    + "FILTER NOT EXISTS { FILTER  (?rationale = str(\"\") ) } }"
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {

                BindingSet bs = result.next();
                solutions.add(
                        new Solution(
                                bs.getValue("id").stringValue(),
                                "",
                                ""
                        ));
                int i = solutions.size() - 1;
                solutions.get(i).setRationale(bs.getValue("rationale").stringValue());
            }

            if (solutions.isEmpty()) {
                solutions = null;
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(solutions);
    }

}
