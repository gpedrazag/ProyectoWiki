package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Concern;
import net.unipiloto.wiki.web.entities.FunctionalRequeriment;
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

public class ConcernTransaction {

    private static void insert(String id, String concern, List<QualityAttribute> describedByQA, List<FunctionalRequeriment> describedByFR) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#" + id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Concern");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#concern"), factory.createLiteral(concern));
            if (describedByFR != null) {
                for (FunctionalRequeriment s : describedByFR) {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#determinedBy"), factory.createIRI("http://www.semanticweb.org/sa#" + s.getId()));
                }
            }
            if (describedByQA != null) {
                for (QualityAttribute s : describedByQA) {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#determinedBy"), factory.createIRI("http://www.semanticweb.org/sa#" + s.getId()));
                }
            }
            conn.commit();
        } catch (Exception ex) {
            conn.rollback();
        } finally {
            conn.close();

        }

    }

    public static void update(String id, String concern) throws IOException, URISyntaxException {
        Concern c = JsonFactory.fromJson(selectById(id), Concern.class);
        delete(id);
        insert(
                id,
                concern.equals("-_-") ? c.getConcern() : concern,
                c.getDescribedByQA(),
                c.getDescribedByFR());
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

    public static List<Concern> selectAllConcernsByDecisionId(String id, RepositoryConnection connection) {
        List<Concern> concerns = new ArrayList<Concern>();
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
                    "SELECT DISTINCT ?id ?concern WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#havaAsTrigger> ?d . "
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Concern> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#concern> ?concern "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                concerns.add(
                        new Concern(
                                bs.getValue("id").stringValue(),
                                bs.getValue("concern").stringValue()
                        ));
                int i = concerns.size() - 1;
                concerns.get(i).setDescribedByFR(FunctionalRequerimentTransaction.selectFRByConcernId(concerns.get(i).getId(), conn));
                concerns.get(i).setDescribedByQA(QualityAttributeTransaction.selectQAByConcenrId(concerns.get(i).getId(), conn));
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
        Concern concern = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?concern WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Concern> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#concern> ?concern "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                concern = new Concern(
                        bs.getValue("id").stringValue(),
                        bs.getValue("concern").stringValue()
                );
                concern.setDescribedByFR(FunctionalRequerimentTransaction.selectFRByConcernId(id, conn));
                concern.setDescribedByQA(QualityAttributeTransaction.selectQAByConcenrId(id, conn));
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(concern);
    }

    public static String selectAll() {
        List<Concern> concerns = new ArrayList<Concern>();

        Repository repo = null;
        repo = OntologyTools.getInstance();
        repo.initialize();

        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?concern WHERE {"
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Concern> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#concern> ?concern "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {

                BindingSet bs = result.next();
                concerns.add(
                        new Concern(
                                bs.getValue("id").stringValue(),
                                bs.getValue("concern").stringValue()
                        ));
                int i = concerns.size() - 1;
                concerns.get(i).setDescribedByFR(FunctionalRequerimentTransaction.selectFRByConcernId(concerns.get(i).getId(), conn));
                concerns.get(i).setDescribedByQA(QualityAttributeTransaction.selectQAByConcenrId(concerns.get(i).getId(), conn));
            }

            if (concerns.isEmpty()) {
                concerns = null;
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(concerns);
    }

    public static void deleteContent(String content) {
        List<Concern> l = JsonFactory.fromJsonArray(selectAll(), Concern.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getConcern().contains(content)) {
                    a.setConcern(a.getConcern().replace(content, ""));
                    i++;
                }

                if (i > 0) {
                    update(a.getId(), a.getConcern());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

    public static void updateContent(String oc, String nc) {
        List<Concern> l = JsonFactory.fromJsonArray(selectAll(), Concern.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getConcern().contains(oc)) {
                    a.setConcern(a.getConcern().replace(oc, nc));
                    i++;
                }

                if (i > 0) {
                    update(a.getId(), a.getConcern());
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

}
