package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.entities.Change;
import net.unipiloto.wiki.web.others.OntologyTools;
import org.boon.json.JsonFactory;
import org.openrdf.model.IRI;
import org.openrdf.model.ValueFactory;
import org.openrdf.model.vocabulary.OWL;
import org.openrdf.model.vocabulary.RDF;
import org.openrdf.query.BindingSet;
import org.openrdf.query.MalformedQueryException;
import org.openrdf.query.QueryEvaluationException;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.query.UpdateExecutionException;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;
import org.openrdf.repository.RepositoryException;

public class ChangesTransaction {

    public static final HashMap<String, String> DICTIONARY = initDictionary();

    private static HashMap initDictionary() {
        HashMap<String, String> dictionary = new HashMap();
        dictionary.put("pastContent", "past_content");
        dictionary.put("newContent", "new_content");
        dictionary.put("dpChanged", "dataPropChanged");
        dictionary.put("privilegeType", "privilege_type");
        dictionary.put("firstName", "first_name");
        dictionary.put("lastName", "last_name");
        dictionary.put("utility", "stakeholder_utility");
        return dictionary;
    }

    public static String insert(String pastContent, String newContent, String indvID, String userID, long date, String dpChanged, boolean isActive) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        String id = "";
        try {
            ValueFactory factory = repo.getValueFactory();
            id = getId(conn);
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#" + id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Change");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#new_content"), factory.createLiteral(newContent));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#past_content"), factory.createLiteral(pastContent));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#date"), factory.createLiteral(date));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#dataPropChanged"), factory.createLiteral(dpChanged));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#isActive"), factory.createLiteral(isActive));
            if (!indvID.equals("")) {
                conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#isaChangeOf"), factory.createIRI("http://www.semanticweb.org/sa#" + indvID));
            }
            if (!userID.equals("")) {
                conn.add(factory.createIRI("http://www.semanticweb.org/sa#" + userID), factory.createIRI("http://www.semanticweb.org/sa#userDoChanges"), subject);
            }
            conn.commit();
        } catch (Exception ex) {
            conn.rollback();
            id = "";
        } finally {
            conn.close();
        }
        return id;
    }

    private static void insert(String id, String pastContent, String newContent, String indvID, String userID, long date, String dpChanged, boolean isActive, RepositoryConnection conn) throws IOException, URISyntaxException {
        try {
            ValueFactory factory = conn.getRepository().getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#" + id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#Change");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#new_content"), factory.createLiteral(newContent));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#past_content"), factory.createLiteral(pastContent));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#date"), factory.createLiteral(date));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#dataPropChanged"), factory.createLiteral(dpChanged));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#isActive"), factory.createLiteral(isActive));
            if (!indvID.equals("")) {
                conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#isaChangeOf"), factory.createIRI("http://www.semanticweb.org/sa#" + indvID));
            }
            if (!userID.equals("")) {
                conn.add(factory.createIRI("http://www.semanticweb.org/sa#" + userID), factory.createIRI("http://www.semanticweb.org/sa#userDoChanges"), subject);
            }
            conn.commit();
        } catch (Exception ex) {
            conn.rollback();
        }
    }

    public static void delete(String id) {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            conn.prepareUpdate(
                    "DELETE { <http://www.semanticweb.org/sa#" + id + "> ?p ?d2 }\n"
                    + "WHERE { <http://www.semanticweb.org/sa#" + id + "> ?p ?d2 }"
            ).execute();
            conn.prepareUpdate(
                    "DELETE { ?p ?d2 <http://www.semanticweb.org/sa#" + id + "> }\n"
                    + "WHERE { ?p ?d2 <http://www.semanticweb.org/sa#" + id + "> }"
            ).execute();
        } catch (RepositoryException | MalformedQueryException | UpdateExecutionException ex) {
            conn.rollback();
        } finally {
            conn.close();
        }
    }

    private static void delete(String id, RepositoryConnection conn) {
        try {
            conn.prepareUpdate(
                    "DELETE { <http://www.semanticweb.org/sa#" + id + "> ?p ?d2 }\n"
                    + "WHERE { <http://www.semanticweb.org/sa#" + id + "> ?p ?d2 }"
            ).execute();
            conn.prepareUpdate(
                    "DELETE { ?p ?d2 <http://www.semanticweb.org/sa#" + id + "> }\n"
                    + "WHERE { ?p ?d2 <http://www.semanticweb.org/sa#" + id + "> }"
            ).execute();
        } catch (RepositoryException | MalformedQueryException | UpdateExecutionException ex) {
            conn.rollback();
        }
    }

    public static void updateChange(String id, String indvID, String dp) throws Exception {
        List<Change> changes = JsonFactory.fromJsonArray(selectAllChangesByIdAndDp(indvID, dp), Change.class);
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            changes.stream().forEach((change) -> {
                delete(change.getId(), conn);
                try {
                    insert(
                            change.getId(),
                            change.getPastContent(),
                            change.getNewContent(),
                            change.getIndividualID(),
                            change.getUserID(),
                            change.getDate(),
                            change.getDpChanged(),
                            change.getId().equals(id),
                            conn
                    );
                } catch (IOException | URISyntaxException ex) {
                    Logger.getLogger(ChangesTransaction.class.getName()).log(Level.SEVERE, null, ex);
                }

            });
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        } finally {
            conn.close();
        }
    }

    public static String selectActualChange(String id, String dp) {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        String content = "";
        try {
            dp = DICTIONARY.get(dp) == null ? dp : DICTIONARY.get(dp);
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?content \n"
                    + "WHERE {\n"
                    + "	<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#" + dp + "> ?content\n"
                    + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                content = bs.getValue("content").stringValue();
            }
        } catch (RepositoryException | MalformedQueryException | QueryEvaluationException | NumberFormatException ex) {
            conn.rollback();
        } finally {
            conn.close();
        }

        return content;
    }

    private static String selectAllChangesByIdAndDp(String id, String dp) {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        List<Change> changes = new ArrayList();
        try {
            dp = DICTIONARY.get(dp) == null ? dp : DICTIONARY.get(dp);
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?pastContent ?newContent ?date ?userID ?indvID ?dpChanged ?isActive\n"
                    + "WHERE {\n"
                    + "	?change <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Change> .\n"
                    + "	?user <http://www.semanticweb.org/sa#userDoChanges> ?change .\n"
                    + "	?change <http://www.semanticweb.org/sa#isaChangeOf> ?indv .\n"
                    + "	?change <http://www.semanticweb.org/sa#id> ?id .\n"
                    + "	?change <http://www.semanticweb.org/sa#past_content> ?pastContent .\n"
                    + "	?change <http://www.semanticweb.org/sa#new_content> ?newContent .\n"
                    + "	?change <http://www.semanticweb.org/sa#date> ?date .\n"
                    + "	?change <http://www.semanticweb.org/sa#dataPropChanged> \"" + dp + "\"^^<http://www.w3.org/2001/XMLSchema#string> .\n"
                    + "	?change <http://www.semanticweb.org/sa#isActive> ?isActive .\n"
                    + "	?user <http://www.semanticweb.org/sa#id> ?userID .\n"
                    + "	?indv <http://www.semanticweb.org/sa#id> \"" + id + "\"^^<http://www.w3.org/2001/XMLSchema#string> \n"
                    + "} ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                changes.add(new Change(
                        bs.getValue("id").stringValue(),
                        bs.getValue("pastContent").stringValue(),
                        bs.getValue("newContent").stringValue(),
                        bs.getValue("userID").stringValue(),
                        id,
                        dp,
                        Boolean.parseBoolean(bs.getValue("isActive").stringValue()),
                        Long.parseLong(bs.getValue("date").stringValue())
                ));
            }
        } catch (RepositoryException | MalformedQueryException | QueryEvaluationException | NumberFormatException ex) {
            conn.rollback();
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(changes);
    }

    public static String selectAllChangesByClassAndDp(String classType, String dp) {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        List<Change> changes = new ArrayList();
        try {
            dp = DICTIONARY.get(dp) == null ? dp : DICTIONARY.get(dp);
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?pastContent ?newContent ?date ?userID ?indvID ?dpChanged ?isActive\n"
                    + "WHERE {\n"
                    + "	?change <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Change> .\n"
                    + "	?user <http://www.semanticweb.org/sa#userDoChanges> ?change .\n"
                    + "	?change <http://www.semanticweb.org/sa#isaChangeOf> ?indv .\n"
                    + "	?change <http://www.semanticweb.org/sa#id> ?id .\n"
                    + "	?change <http://www.semanticweb.org/sa#past_content> ?pastContent .\n"
                    + "	?change <http://www.semanticweb.org/sa#new_content> ?newContent .\n"
                    + "	?change <http://www.semanticweb.org/sa#date> ?date .\n"
                    + "	?change <http://www.semanticweb.org/sa#dataPropChanged> \"" + dp + "\"^^<http://www.w3.org/2001/XMLSchema#string> .\n"
                    + "	?change <http://www.semanticweb.org/sa#isActive> ?isActive .\n"
                    + "	?user <http://www.semanticweb.org/sa#id> ?userID .\n"
                    + "	?indv <http://www.semanticweb.org/sa#id> ?indvID .\n"
                    + "	?indv <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#" + classType + "> \n"
                    + "} ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                changes.add(new Change(
                        bs.getValue("id").stringValue(),
                        bs.getValue("pastContent").stringValue(),
                        bs.getValue("newContent").stringValue(),
                        bs.getValue("userID").stringValue(),
                        bs.getValue("indvID").stringValue(),
                        dp,
                        Boolean.parseBoolean(bs.getValue("isActive").stringValue()),
                        Long.parseLong(bs.getValue("date").stringValue())
                ));
            }
        } catch (RepositoryException | MalformedQueryException | QueryEvaluationException | NumberFormatException ex) {
            conn.rollback();
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(changes);
    }

    public static String selectAllChangesByClass(String classType) {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        List<Change> changes = new ArrayList();
        try {
            TupleQuery tq = null;
            if (classType.equals("")) {
                tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                        "SELECT DISTINCT ?id ?pastContent ?newContent ?date ?userID ?indvID ?dpChanged ?isActive\n"
                        + "WHERE {\n"
                        + "	?change <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Change> .\n"
                        + "	?user <http://www.semanticweb.org/sa#userDoChanges> ?change .\n"
                        + "	?change <http://www.semanticweb.org/sa#isaChangeOf> ?indv .\n"
                        + "	?change <http://www.semanticweb.org/sa#id> ?id .\n"
                        + "	?change <http://www.semanticweb.org/sa#past_content> ?pastContent .\n"
                        + "	?change <http://www.semanticweb.org/sa#new_content> ?newContent .\n"
                        + "	?change <http://www.semanticweb.org/sa#date> ?date .\n"
                        + "	?change <http://www.semanticweb.org/sa#dataPropChanged> ?dpChanged .\n"
                        + "	?change <http://www.semanticweb.org/sa#isActive> ?isActive .\n"
                        + "	?user <http://www.semanticweb.org/sa#id> ?userID .\n"
                        + "	?indv <http://www.semanticweb.org/sa#id> ?indvID \n"
                        + "} ORDER BY ?id"
                );
            } else {
                tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                        "SELECT DISTINCT ?id ?pastContent ?newContent ?date ?userID ?indvID ?dpChanged ?isActive\n"
                        + "WHERE {\n"
                        + "	?change <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Change> .\n"
                        + "	?user <http://www.semanticweb.org/sa#userDoChanges> ?change .\n"
                        + "	?change <http://www.semanticweb.org/sa#isaChangeOf> ?indv .\n"
                        + "	?change <http://www.semanticweb.org/sa#id> ?id .\n"
                        + "	?change <http://www.semanticweb.org/sa#past_content> ?pastContent .\n"
                        + "	?change <http://www.semanticweb.org/sa#new_content> ?newContent .\n"
                        + "	?change <http://www.semanticweb.org/sa#date> ?date .\n"
                        + "	?change <http://www.semanticweb.org/sa#dataPropChanged> ?dpChanged .\n"
                        + "	?change <http://www.semanticweb.org/sa#isActive> ?isActive .\n"
                        + "	?user <http://www.semanticweb.org/sa#id> ?userID .\n"
                        + "	?indv <http://www.semanticweb.org/sa#id> ?indvID .\n"
                        + "	?indv <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#" + classType + "> \n"
                        + "} ORDER BY ?id"
                );
            }
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                changes.add(new Change(
                        bs.getValue("id").stringValue(),
                        bs.getValue("pastContent").stringValue(),
                        bs.getValue("newContent").stringValue(),
                        bs.getValue("userID").stringValue(),
                        bs.getValue("indvID").stringValue(),
                        bs.getValue("dpChanged").stringValue(),
                        Boolean.parseBoolean(bs.getValue("isActive").stringValue()),
                        Long.parseLong(bs.getValue("date").stringValue())
                ));
            }
        } catch (RepositoryException | MalformedQueryException | QueryEvaluationException | NumberFormatException ex) {
            conn.rollback();
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(changes);
    }

    public static String selectById(String id) {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        Change change = null;
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?pastContent ?newContent ?date ?userID ?indvID ?dpChanged ?isActive\n"
                    + "WHERE {\n"
                    + "	<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Change> .\n"
                    + "	?user <http://www.semanticweb.org/sa#userDoChanges> <http://www.semanticweb.org/sa#" + id + ">  .\n"
                    + "	<http://www.semanticweb.org/sa#" + id + ">  <http://www.semanticweb.org/sa#isaChangeOf> ?indv .\n"
                    + "	<http://www.semanticweb.org/sa#" + id + ">  <http://www.semanticweb.org/sa#id> ?id .\n"
                    + "	<http://www.semanticweb.org/sa#" + id + ">  <http://www.semanticweb.org/sa#past_content> ?pastContent .\n"
                    + "	<http://www.semanticweb.org/sa#" + id + ">  <http://www.semanticweb.org/sa#new_content> ?newContent .\n"
                    + "	<http://www.semanticweb.org/sa#" + id + ">  <http://www.semanticweb.org/sa#date> ?date .\n"
                    + "	<http://www.semanticweb.org/sa#" + id + ">  <http://www.semanticweb.org/sa#dataPropChanged> ?dpChanged .\n"
                    + "	<http://www.semanticweb.org/sa#" + id + ">  <http://www.semanticweb.org/sa#isActive> ?isActive .\n"
                    + "	?user <http://www.semanticweb.org/sa#id> ?userID .\n"
                    + "	?indv <http://www.semanticweb.org/sa#id> ?indvID \n"
                    + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                change = new Change(
                        bs.getValue("id").stringValue(),
                        bs.getValue("pastContent").stringValue(),
                        bs.getValue("newContent").stringValue(),
                        bs.getValue("userID").stringValue(),
                        bs.getValue("indvID").stringValue(),
                        bs.getValue("dpChanged").stringValue(),
                        Boolean.parseBoolean(bs.getValue("isActive").stringValue()),
                        Long.parseLong(bs.getValue("date").stringValue())
                );
            }
        } catch (RepositoryException | MalformedQueryException | QueryEvaluationException | NumberFormatException ex) {
            conn.rollback();
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(change);
    }

    public static String selectAll() {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        List<Change> changes = new ArrayList();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?pastContent ?newContent ?date ?userID ?indvID ?dpChanged ?isActive\n"
                    + "WHERE {\n"
                    + "	?change <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Change> .\n"
                    + "	?user <http://www.semanticweb.org/sa#userDoChanges> ?change .\n"
                    + "	?change <http://www.semanticweb.org/sa#isaChangeOf> ?indv .\n"
                    + "	?change <http://www.semanticweb.org/sa#id> ?id .\n"
                    + "	?change <http://www.semanticweb.org/sa#past_content> ?pastContent .\n"
                    + "	?change <http://www.semanticweb.org/sa#new_content> ?newContent .\n"
                    + "	?change <http://www.semanticweb.org/sa#date> ?date .\n"
                    + "	?change <http://www.semanticweb.org/sa#dataPropChanged> ?dpChanged .\n"
                    + "	?change <http://www.semanticweb.org/sa#isActive> ?isActive .\n"
                    + "	?user <http://www.semanticweb.org/sa#id> ?userID .\n"
                    + "	?indv <http://www.semanticweb.org/sa#id> ?indvID \n"
                    + "} ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                changes.add(new Change(
                        bs.getValue("id").stringValue(),
                        bs.getValue("pastContent").stringValue(),
                        bs.getValue("newContent").stringValue(),
                        bs.getValue("userID").stringValue(),
                        bs.getValue("indvID").stringValue(),
                        bs.getValue("dpChanged").stringValue(),
                        Boolean.parseBoolean(bs.getValue("isActive").stringValue()),
                        Long.parseLong(bs.getValue("date").stringValue())
                ));
            }
        } catch (RepositoryException | MalformedQueryException | QueryEvaluationException | NumberFormatException ex) {
            conn.rollback();
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(changes);
    }

    private static String getId(RepositoryConnection connection) {
        Repository repo = null;
        RepositoryConnection conn = null;
        String id = "";
        if (connection != null) {
            conn = connection;
        } else {
            repo = OntologyTools.getInstance();
            repo.initialize();
            conn = repo.getConnection();
        }
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id WHERE {\n"
                    + "	?change <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Change> .\n"
                    + "	?change <http://www.semanticweb.org/sa#id> ?id\n"
                    + "} ORDER BY DESC (?id) LIMIT 1"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                int i = Integer.parseInt(bs.getValue("id").stringValue().split("-")[1]) + 1;
                id = "CHNG-" + (i < 10 ? ("0" + i) : i);
            }
            if (id.equals("")) {
                id = "CHNG-01";
            }
        } finally {

        }
        return id;
    }
}
